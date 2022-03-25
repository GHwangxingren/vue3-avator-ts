<!--
 * @Author: wangxingren
 * @Date: 2022-02-07 17:32:53
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-03-22 18:20:50
 * @Descripttion: TS-高级类型
 * @FilePath: /vue3-avator-ts/src/components/TestHighType.vue
-->
<script setup lang="ts">
// ==========交叉类型

function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};

  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!(<any>result).hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}

class Person {
  constructor(public name: string) {}
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
    console.log(11);
  }
}
// let jim = extend(new Person("Jim"), new ConsoleLogger());
// let n = jim.name;
// jim.log();

// =========联合类型

function padLeft(value: string, padding: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
// const pad = padLeft("Hello world", true);
// console.log(pad);
// 编译阶段通过，运行时报错
// padding参数的类型指定成了 any。 这就是说我们可以传入一个既不是 number也不是 string类型的参数，但是TypeScript却不报错。
// 代替 any，可以使用 联合类型做为 padding的参数
function padLeft1(value: string, padding: string | number) {
  // ...
}
// let indentedString = padLeft1("Hello world", true); // errors during compilation

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
interface Bird {
  fly(): any;
  layEggs(): any;
}

interface Fish {
  swim(): any;
  layEggs(): any;
}

function getSmallPet(): Fish | Bird {
  let fly = () => {
    console.log(1);
  };
  let layEggs = () => {
    console.log(2);
  };
  return { fly, layEggs };
  // ...
}

// let pet = getSmallPet();
// pet.layEggs(); // okay
// // pet.swim(); // errors
// console.log(pet.layEggs);

// ======= 类型保护与区分类型

// 联合类型适合于那些值可以为不同类型的情况。 但当我们想确切地了解是否为 Fish时怎么办？ JavaScript里常用来区分2个可能值的方法是检查成员是否存在。 如之前提及的，我们只能访问联合类型中共同拥有的成员。
let pet1 = getSmallPet();
// 每一个成员访问都会报错
if (pet1.swim) {
  pet1.swim();
} else if (pet1.fly) {
  pet1.fly();
}

// 为了让这段代码工作，我们要使用类型断言：
let pet = getSmallPet();

if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
} else {
  (<Bird>pet).fly();
}
// ======用户自定义的类型保护

// 这里可以注意到我们不得不多次使用类型断言。 假若我们一旦检查过类型，就能在之后的每个分支里清楚地知道 pet的类型的话就好了。TypeScript里的 类型保护机制让它成为了现实。 类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词：
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
// pet is Fish就是类型谓词。 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。
// 每当使用一些变量调用 isFish时，TypeScript会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型是兼容的。
// 'swim' 和 'fly' 调用都没有问题了

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// =========typeof类型保护

// 使用联合类型书写 padLeft代码
function isNumber(x: any): x is number {
  return typeof x === "number";
}
function isString(x: any): x is string {
  return typeof x === "string";
}
function padLeft2(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(" ") + value;
  }
  if (isString(padding)) {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
// 必须要定义一个函数来判断类型是否是原始类型，这太痛苦了。 幸运的是，现在我们不必将 typeof x === "number"抽象成一个函数，因为TypeScript可以将它识别为一个类型保护。 也就是说我们可以直接在代码里检查类型了。
function padLeft3(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
// 这些* typeof类型保护*只有两种形式能被识别： typeof v === "typename"和 typeof v !== "typename"， "typename"必须是 "number"， "string"， "boolean"或 "symbol"。 但是TypeScript并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。

interface Padder {
  getPaddingString(): string;
}
class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5 ? new SpaceRepeatingPadder(4) : new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  // eslint-disable-next-line no-unused-expressions
  padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  // eslint-disable-next-line no-unused-expressions
  padder; // 类型细化为'StringPadder'
}

// 使用了 --strictNullChecks，可选参数会被自动地加上 | undefined:
function f(x: number, y?: number) {
  return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
f(1, null);

// ===========类型保护和类型断言
function f1(sn: string | null): string {
  return sn || "default";
}

// 如果编译器不能够去除 null或 undefined，你可以使用类型断言手动去除。 语法是添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined：
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + ".  the " + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return name!.charAt(0) + ".  the " + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}

// =============类型别名
// 类型别名会给一个类型起个新名字。 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  console.log(typeof n);
  if (typeof n === "string") {
    return n;
  }
  return n();
}
function aaa() {
  return "1";
}
getName(aaa);

// 起别名不会新建一个类型 - 它创建了一个新名字来引用那个类型。 给原始类型起别名通常没什么用，尽管可以做为文档的一种形式使用。
// 同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入：
type Container<T> = { value: T };

// 也可以使用类型别名来在属性里引用自己：
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};

// 接口 vs. 类型别名
// 1. 其一，接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字—比如，错误信息就不会使用别名。 在下面的示例代码里，在编译器中将鼠标悬停在 interfaced上，显示它返回的是 Interface，但悬停在 aliased上时，显示的却是对象字面量类型
type Alias = { num: number };
interface Interface {
  num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;

// 2. 类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）。
// 3. 如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。

// ============字符串字面量类型
// 字符串字面量类型允许你指定字符串必须的固定值。 在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。 通过结合使用这些特性，你可以实现类似枚举类型的字符串。
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElemnt {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      console.log(1);
    } else if (easing === "ease-out") {
      console.log(2);
    } else if (easing === "ease-in-out") {
      console.log(3);
    } else {
      console.log(4);
    }
  }
}
let button = new UIElemnt();
button.animate(0, 1, "ease-out");
button.animate(0, 1, "ease-out1");

// ===========可辨识联合
// 1.具有普通的单例类型属性— 可辨识的特征。2.一个类型别名包含了那些类型的联合— 联合。3. 此属性上的类型保护。
interface Square1 {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle1 {
  kind: "circle";
  radius: number;
}
// 首先我们声明了将要联合的接口。 每个接口都有 kind属性但有不同的字符串字面量类型。 kind属性称做 可辨识的特征或 标签。 其它的属性则特定于各个接口。 注意，目前各个接口间是没有联系的。 下面我们把它们联合到一起：
type Shape = Square1 | Rectangle | Circle1;
function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
    default:
  }
}

// ==========完整性检查(当没有涵盖所有可辨识联合的变化时，我们想让编译器可以通知我们。 比如，如果我们添加了 Triangle到 Shape，我们同时还需要更新 area)
interface Triangle {
  kind: "circle1";
  radius: number;
}
type Shape1 = Square1 | Rectangle | Circle1 | Triangle;
function area1(s: Shape1) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
    default:
  }
  // should error here - we didn't handle case "triangle"
}
// 完整性检测方式一：启用 --strictNullChecks并且指定一个返回值类型
// switch没有包涵所有情况，所以TypeScript认为这个函数有时候会返回 undefined, 如果你明确地指定了返回值类型为 number，那么你会看到一个错误，因为实际上返回值的类型为 number | undefined。 然而，这种方法存在些微妙之处且 --strictNullChecks对旧代码支持不好。
function area2(s: Shape1): number {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
    default:
  }
  // should error here - we didn't handle case "triangle"
}

// 完整性检测方式二：使用 never类型，编译器用它来进行完整性检查
// assertNever检查 s是否为 never类型—即为除去所有可能情况后剩下的类型。 如果你忘记了某个case，那么 s将具有一个真实的类型并且你会得到一个错误。 这种方式需要你定义一个额外的函数，但是在你忘记某个case的时候也更加明显
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
function area3(s: Shape1): number {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
    default:
      return assertNever(s); // error here if there are missing cases
  }
}

// ============映射类型
interface PersonPartial {
    name?: string;
    age?: number;
}
interface PersonReadonly {
    readonly name: string;
    readonly age: number;
}
// TypeScript提供了从旧类型中创建新类型的一种方式 — 映射类型。 在映射类型里，新类型以相同的形式去转换旧类型里每个属性。 例如，你可以令每个属性成为 readonly类型或可选的。
type Readonly1<T> = {
  readonly [P in keyof T]: T[P];
}
type Partial1<T> = {
  [P in keyof T]?: T[P]
}
interface Person1 {
  name: string,
  age: number;
}
type Readonly2 = Readonly1<Person1>;
type Partial12 = Partial1<Person1>;
// 它的语法与索引签名的语法类型，内部使用了 for .. in。 具有三个部分：

// 类型变量 K，它会依次绑定到每个属性。
// 字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
// 属性的结果类型。

</script>
