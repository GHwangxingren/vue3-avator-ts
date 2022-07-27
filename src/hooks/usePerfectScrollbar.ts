/*
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-06-22 15:24:02
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-22 16:28:06
 * @FilePath: /vue3-avator-ts/src/hooks/usePerfectScrollbar.ts
 */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

export default function usePerfectScrollbar() {
  let ps: PerfectScrollbar;

  return {
    createBar(el: Element | string, opts: PerfectScrollbar.Options) {
      ps = new PerfectScrollbar(el, {
        ...opts
      });
      return ps;
    },
    destroyBar() {
      ps.destroy();
    }
  };
}