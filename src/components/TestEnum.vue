<!--
 * @Author: wangxingren
 * @Date: 2022-03-02 15:57:25
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-03-03 09:47:26
 * @Descripttion: 枚举
 * @FilePath: /vue3-avator-ts/src/components/TestEnum.vue
-->
<script setup lang="ts">
// =======数字枚举
enum Direction {
  Up,
  Down = 2,
  Left,
  Right
}

function respond(recip: string, msg: Direction) {
  console.log(msg);
}
respond("11", Direction.Up);

// ========异构枚举（从技术的角度来说，枚举可以混合字符串和数字成员，但是似乎你并不会这么做。除非你真的想要利用JavaScript运行时的行为，否则我们不建议这样做）
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES"
}

// ========联合枚举与枚举成员的类型
enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

const c1: Circle = {
  kind: ShapeKind.Square, // ShapeKind.Circle;
  radius: 100
};

enum E {
  Foo,
  Bar
}

function e(x: E) {
  console.log(x, "===x==");
  if (x !== E.Foo || x !== E.Bar) {
    console.log(x);
  }
}
e(1);

// ========运行时的枚举
enum E1 {
  X, Y, Z
}

function e1(obj: {X: number}) {
  return obj.X;
}
e1(E1);
</script>
