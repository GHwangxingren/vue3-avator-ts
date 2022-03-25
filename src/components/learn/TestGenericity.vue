<!--
 * @Author: wangxingren
 * @Date: 2022-02-28 15:38:23
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-03-25 17:58:58
 * @Descripttion: 函数
 * @FilePath: /vue3-avator-ts/src/components/TestGenericity.vue
-->
<template>
  <div />
</template>

<script setup lang="ts">
// 使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据
// =========定义泛型函数

// 使返回值的类型与传入参数的类型是相同的。使用 类型变量，它是一种特殊的变量，只用于表示类型而不是值。
// 添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。
function identity<T>(arg: T): T {
  return arg;
}

// ==========使用泛型函数
// 方法一：传入所有的参数，包含类型参数（明确的指定了T是string类型，并做为一个参数传给函数，使用了<>括起来而不是()）
let output1 = identity<string>("myString");
// 方法二：结合类型推论
let output2 = identity("myString");

// 使用泛型变量（编译器要求在函数体必须正确的使用这个通用的类型。）
// 错误
function loggingIdentity1<T>(arg: T): T {
  // console.log(arg.length); // Error: T doesn't have .length
  return arg;
}
// 正确
function loggingIdentity2<T>(arg: Array<T>): T[] {
  console.log(arg.length);
  return arg;
}

// ============泛型类型
function identity1<T>(arg: T): T {
  return arg;
}

let myIdentity1: <T>(arg: T) => T = identity1;

// 等同于(也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。)
function identity2<T>(arg: T): T {
  return arg;
}

let myIdentity2: <U>(arg: U) => U = identity2;

// 等同于
function identity3<T>(arg: T): T {
  return arg;
}

let myIdentity3: {<T>(arg: T): T} = identity3;

// 泛型接口
interface GenericIdentityFn1 {
  <T>(arg: T): T;
}
function identity4<T>(arg: T): T {
  return arg;
}
let myIdentity4: GenericIdentityFn1 = identity3;

// 把泛型参数当作整个接口的一个参数。 这样我们就能清楚的知道使用的具体是哪个泛型类型
interface GenericIdentityFn2<T> {
  (arg: T): T;
}
let myIdentity5: GenericIdentityFn2<number> = identity;

// ==========泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
 return x + y;
};
myGenericNumber.add(1, 2);

// ============泛型约束
// 想访问arg的length属性，但是编译器并不能证明每种类型都有length属性。为此，我们定义一个接口来描述约束条件。 创建一个包含 .length属性的接口，使用这个接口和extends关键字来实现约束
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
// 现在这个泛型函数被定义了约束，因此它不再是适用于任意类型
loggingIdentity(3); // Error, number doesn't have a .length property
// 需要传入符合约束类型的值，必须包含必须的属性
loggingIdentity({length: 10, value: 3});

// ============在泛型约束中使用类型参数
// function getProperty(obj: T, key: K) {
//   return obj[key];
// }
// let x = { a: 1, b: 2, c: 3, d: 4 };
// getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

// ============在泛型里使用类类型
// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型
function create<T>(C: {new(): T; }): T {
  return new C();
}

// 使用原型属性推断并约束构造函数与类实例的关系
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal5 {
    numLegs: number;
}

class Bee extends Animal5 {
    keeper: BeeKeeper;
}

class Lion extends Animal5 {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal5>(C: new () => A): A {
    return new C();
}

// eslint-disable-next-line no-unused-expressions
createInstance(Lion).keeper.nametag; // typechecks!
// eslint-disable-next-line no-unused-expressions
createInstance(Bee).keeper.hasMask; // typechecks!
</script>
