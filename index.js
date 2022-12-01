const { spawnSync } = require("child_process");
const fs = require("fs");

const ls = spawnSync("CLIPSDOS.exe", ["-f", "commands"]);

// console.log(ls);

const data = fs.readFileSync("./1.fct", { encoding: "utf8", flag: "r" });

const works = [
  "ConnectPower",
  "ReplaceFuse",
  "FixSocket",
  "CleanPollution",
  "CloseDoor",
  "ReplaceDoorLatches",
];

const formattedArray = data.split("\r\n").filter((str) => str.length > 0);

const res = {};

for (let i = 0; i < formattedArray.length; i += 2) {
  for (let work of works) {
    if (formattedArray[i].includes(work)) {
      res[work] = true;
    }
  }
}

console.log(res);
