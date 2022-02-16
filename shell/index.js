/* eslint-disable*/
const shell = require("shelljs");
const readlineSync = require("readline-sync");
const path = require("path");
let packageJSON = require(path.resolve("package.json"));

// 当前版本
const currentVersion = packageJSON.version;
shell.echo(currentVersion);

// 获取git当前分支
let currentBranch = shell.exec("git symbolic-ref --short -q HEAD", { async: false, silent: true }).stdout.trim();
if (currentBranch != "master") {
  gitCommit();
  shell.exec(`git pull origin ${currentBranch}`);
  shell.exec(`git push origin ${currentBranch} --tags`);
} else {
  gitCommit();
  let confirm5 = readlineSync.question("是否修改版本号？\n\
  -- are you sure? (y/n)");
  if (confirm5.trim().toLowerCase() == "y") {
    versionAdd();
  }
}

//git commit
function gitCommit() {
  let confirm2 = readlineSync.question(`确定要提交"${currentBranch}"分支吗？\n\
   -- are you sure? (y/n)`);
  if (confirm2.trim().toLowerCase() == "y") {
    shell.exec("git add .");
    let confirm4 = readlineSync.question("commit 信息\n\
   -- message:");

    commitType = ["fix", "feat", "refactor", "docs"],
      index = readlineSync.keyInSelect(commitType, "Which commit type?");
    let gitC = "git commit -m ",
     gitSele = commitType[index];
    switch (gitSele) {
      case "fix":
        shell.exec(`${gitC}"fix:${confirm4}"`);
        break;
      case "feat":
        shell.exec(`${gitC}"feat:${confirm4}"`);
        break;
      case "refactor":
        shell.exec(`${gitC}"refactor:${confirm4}"`);
        break;
      case "docs":
        shell.exec(`${gitC}"docs:${confirm4}"`);
        break;
    }
  } else {
    shell.exit();
  }
}


// 修改版本号方法
function versionAdd() {
  let confirm = readlineSync.question(`Current is "v${currentVersion}".\n\
   -- p:patch m:minor s:major n:Exit default:patch
   -- 请选择： (p/m/s/n)`);
  // 直接升级小号
  if (confirm.trim() == "" || confirm.trim().toLowerCase() == "p") {
    shell.exec("npm version patch");
  }
  // 则升级一位中号，大号不动，小号置为空
  else if (confirm.trim().toLowerCase() == "m") {
    shell.exec("npm version minor");
  }
  // 升级一位大号，其他位都置为0
  else if (confirm.trim().toLowerCase() == "s") {
    shell.exec("npm version major");
  } else {
    shell.echo("\033[1;31m Error: 输入错误 已自动退出\033[0m");
    shell.exit();
  }
  if (shell.exec("git push origin local --tags").code != 0) {
    shell.echo("\033[1;31mError: git push ogigin local 失败! 已退出\033[0m");
    shell.exec("git checkout local");
    shell.exit();
  }
}