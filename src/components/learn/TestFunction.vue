<!--
 * @Author: wangxingren
 * @Date: 2022-02-28 15:38:23
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-02-28 18:35:25
 * @Descripttion: 函数
 * @FilePath: /vue3-avator-ts/src/components/TestFunction.vue
-->
<template>
  <div />
</template>

<script setup lang="ts">
// ==========定义函数类型
function add1(x: number, y: number): string {
  return x + y + "";
}
// 匿名函数
let add2 = function(x: number = 1, y: number, z?: number): string {
  if (z) {
    return x + y + z + "";
  }
  return x + y + "";
};
// 完整函数类型(只要类型匹配)
let add3: (x1: number, y: number) => number = function(x: number, y: number): number {
  return x + y;
};
// 推断类型
let myAdd: (baseValue: number, increment: number) => number = function(x, y) {
 return x + y;
};
myAdd(1, 2);
// 可选参数与默认参数
// 1.传递给一个函数的参数个数必须与函数期望的参数个数一致。
// 2.可选参数必须跟在必须参数后面
// 3. 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值 add2(undefined, "Adams");

const result1 = add2(1);
const result2 = add2(1, 2);
const result3 = add2(1, 2, 3);

// 剩余参数
let buildName: (fName: string, ...rest: string[]) => string = function(firstName: string, ...restName: string[]): string {
  return firstName + restName.join("");
};
// 重载
let suits = ["hearts", "spades", "clubs", "diamonds"];

interface ObjectInterface {
  suit: string;
  card: number;
}
// function pickCard(x: ObjectInterface[]): number {};
// function pickCard(x: number): {suit: string; card: number}[] {};
function pickCard(x): any {
  if (typeof x === "object") {
    const pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x === "number") {
    const pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}
let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard("15");
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
</script>
