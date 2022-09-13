/*
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-06-27 18:38:58
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-09-13 15:38:49
 * @FilePath: /vue3-avator-ts/src/utils/index.ts
 */
import { AvatarOption, None } from "@/types";
import { SETTINGS, NONE, AVATAR_LAYER, SPECIAL_AVATARS } from "./constant";
import { TopsShape, Gender, BeardShape, WrapperShape, FaceShape, EarShape, EarringsShape, EyebrowsShape, GlassesShape, EyesShape, NoseShape, MouthShape, ClothesShape } from "@/enums";

/**
 * @description 从一个数组获取随机数
 * @param { array } arr 筛选的数组列表
 * @param { object } avoid 禁止使用的选项 usually 希望概率选中的选项
 * @return { T } 返回随机值
 */
function getRandomValue<T>(arr: T[], { avoid = [], usually = [] }: {
  avoid?: unknown[];
  usually?: T[]
 } = {}) {
  const avoidArr = avoid.filter(Boolean);
  const filterArr = arr.filter(v => !avoidArr.includes(v));
  const usuallyArr = usually.filter(Boolean).reduce<T[]>((acc, cur) => acc.concat(new Array(15).fill(cur)) , []);
  const finalArr = filterArr.concat(usuallyArr);
  const randonIdx = Math.floor(Math.random() * finalArr.length);
  const randomValue = finalArr[randonIdx];

  return randomValue;
}

/**
 * @description 从一个数组获取随机数
 */
function getRandomFillColor() {
  return SETTINGS.commonColors[Math.floor(Math.random() * SETTINGS.commonColors.length)];
}

/**
 * @description 获取随机工具
 * @param { object } presentOpts 当前的选择配置
 * @param { object } useOpts
 * @return { AvatarOption } 返回配置组合
 */
export function getRandomAvatarOption(presentOpts: Partial<AvatarOption> = {}, useOpts: Partial<AvatarOption> = {}): AvatarOption {
  const gender = getRandomValue<Gender>(SETTINGS.gender);
  const wrapperShape = presentOpts?.wrapperShape || getRandomValue<WrapperShape>(SETTINGS.wrapperShape);
  const beardList: BeardShape[] = [];
  const beardShape = getRandomValue<BeardShape | None>(beardList, { usually: [NONE] });
  let topList: TopsShape[] = [TopsShape.Danny, TopsShape.Wave, TopsShape.Pixie];

  if (presentOpts?.gender === Gender.Male) {
    beardList.push(BeardShape.Scruff);
    topList = SETTINGS.topsShape.filter(v => !topList.includes(v));
  }
  const hairShape = getRandomValue<TopsShape>(topList, { avoid: [useOpts.widgets?.tops?.shape] });
  const widgets = {
    face: {
      shape: getRandomValue<FaceShape>(SETTINGS.faceShape)
    },
    tops: {
      shape: hairShape,
      fillColor: getRandomFillColor()
    },
    ear: {
      shape: getRandomValue<EarShape>(SETTINGS.earShape, { avoid: [useOpts.widgets?.ear?.shape] })
    },
    earrings: {
      shape: getRandomValue<EarringsShape>(SETTINGS.earringsShape, { avoid: [useOpts.widgets?.earrings?.shape] })
    },
    eyebrows: {
      shape: getRandomValue<EyebrowsShape>(SETTINGS.eyebrowsShape, { avoid: [useOpts.widgets?.eyebrows?.shape] })
    },
    glasses:{
      shape: getRandomValue<GlassesShape | None>(SETTINGS.glassesShape, { usually: [NONE] })
    },
    eyes: {
      shape: getRandomValue<EyesShape>(SETTINGS.eyesShape, { avoid: [useOpts.widgets?.eyes?.shape] })
    },
    nose: {
      shape: getRandomValue<NoseShape>(SETTINGS.noseShape, { avoid: [useOpts.widgets?.nose?.shape] })
    },
    mouth: {
      shape: getRandomValue<MouthShape>(SETTINGS.mouthShape, { avoid: [useOpts.widgets?.mouth?.shape] })
    },
    beard: {
      shape: beardShape,
      ...(beardShape === BeardShape.Scruff ?
        { zIndex: AVATAR_LAYER["mouth"].zIndex - 1 } :
        undefined)
    },
    clothes: {
      shape: getRandomValue<ClothesShape>(SETTINGS.clothesShape, { avoid: [useOpts.widgets?.clothes?.shape] }),
      fillColor: getRandomFillColor()
    }
  };
  const avatarOption: AvatarOption = {
    gender,
    wrapperShape,
    background: {
      color: getRandomValue(SETTINGS.backgroundColor, {
        avoid: [
          useOpts.background?.color,
          (hairShape === TopsShape.Punk || hairShape === TopsShape.Fonze) &&
          getRandomFillColor()
        ]
      })
    },
    widgets
  };
  return avatarOption;
}

/**
 * @description 从特定的组合列表中获取随机一个
 */
export function getSpecialAvatarOption(): AvatarOption {
  return SPECIAL_AVATARS[Math.floor(Math.random() * SPECIAL_AVATARS.length)];
}

/**
 * @description 将json高亮处理
 */
export function highlightJSON(json: string): string {
  if (!json) {
    return "";
  }
  if (typeof json !== "string") {
    json = JSON.stringify(json, null, 2);
  }
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = "";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      } else {
        cls = "number";
      }
      return `<span class="token ${cls}">${match}</span>`;
    }
  );
}