<!--
 * @Author: wangxingren
 * @Date: 2022-02-07 17:32:53
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-02-26 14:34:20
 * @Descripttion: TS-接口
 * @FilePath: /vue3-avator-ts/src/components/TestInterface.vue
-->
<script setup lang="ts">
// 类类型
// ============实现接口
interface ClockInterface {
  currentDate: Date;
  setTime(d: Date): any;
}

class ClockTest1 implements ClockInterface {
  currentDate: Date;
  constructor(h: number, m: number, d: Date) {
    this.currentDate = d;
    console.log(h, m, d);
  }
  setTime(d: Date) {
    console.log(d);
  }
}
const a = new ClockTest1(1, 2, new Date());
console.log(a);

// ============类静态部分与实例部分的区别
 interface ClockInterfase {
   tick(): void;
 }
 interface ClockStructor {
   new (hour: number, minute: number): ClockInterfase;
 }
 let creteClock = (Clock: ClockStructor, h: number, m: number): ClockInterfase => new Clock(h, m);

 class Dig1 implements ClockInterfase {
   constructor(h: number, m: number) {
     console.log(h, m);
   }
   tick() {
     console.log(!11);
   }
 }

 class Dig2 implements ClockInterfase {
   constructor(h: number, m: number) {
     console.log(h, m);
   }
   tick() {
     console.log(!22);
   }
 }
let digital = creteClock(Dig1, 12, 17),
    analog = creteClock(Dig2, 7, 32);
 console.log(digital);
 console.log(analog);

// ==========继承接口
interface inter1 {
  color: string;
}
interface inter2 {
  width: number;
}
interface inter3 {
  height?: number;
}
interface inter4 extends inter1, inter2, inter3 {
  long: number;
  arr: any[];
  // [propName: string]: any;
}
let square = <inter4>{};
square.color = "red";
square.width = 1;
square.height = 1;
square.arr = [1, 2, "3"];

// ============混合类型
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

const getCounter = (): Counter => {
  let counter = <Counter>function (start: number) {
    console.log(start);
    return "2222";
  };
  counter.interval = 1;
  counter.reset = () => {
    console.log(111);
  };
  return counter;
};
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// ==========接口继承类
class Control {
  private state: any;
}
interface Selectable extends Control {
  select(): any;
}
class Button extends Control implements Selectable {
  select() {
    console.log(121);
  }
}
class TextBox extends Control {
  select() {
    console.log(121);
  }
}
// 必须为Control的子类,即继承Control
class Image1 implements Selectable {
  select() {
    console.log(121);
  }
}
console.log(Button, TextBox, Image1);
</script>
