<!--
 * @Author: wangxingren
 * @Date: 2022-02-07 17:32:53
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-02-26 16:41:08
 * @Descripttion: TS-类
 * @FilePath: /vue3-avator-ts/src/components/TestClass.vue
-->
<template>
  <div />
</template>
<script setup lang="ts">
// ===========类
class Gretter {
  greeting: string;
  constructor(msg: string) {
    this.greeting = msg;
  }
  greet() {
    return `Hello, ${this.greeting}`;
  }
}

// ==========继承
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

// ==========公有、私有与受保护的修饰符
class Animal1 {
  private name: number;
  name2: string;
  constructor(theName: number, theName1: string) {
    this.name = theName;
    this.name2 = theName1;
  }
}

class Animal2 extends Animal1 {
  constructor(name: number, name3: string) {
    super(name, name3);
    console.log(name, "name");
    console.log(name3, "name3");
  }
}

const animal = new Animal2(1, "2");
console.log(animal.name);
console.log(animal.name2);

// =========存取器
const code = "update";
class Employee {
  private _fullName: string = "1";
  get fullname() {
    return this._fullName;
  }
  set fullname(newName: string) {
    if (code && code === "update") {
      this._fullName = newName;
    } else {
      console.log("无权限");
    }
  }
}

const employee = new Employee();
console.log(employee.fullname, "get");
employee.fullname = "2";
console.log(employee.fullname, "get");
console.log(typeof Employee, "typeof");

class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
</script>
