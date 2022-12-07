const { spawnSync } = require("child_process");
const fs = require("fs");

const { partBefore, partAfter } = require("./data.js");

const works = [
  "ConnectPower",
  "ReplaceFuse",
  "FixSocket",
  "CleanPollution",
  "CloseDoor",
  "ReplaceDoorLatches",
];

const entriesToInstances = {
  DoesNotWork: "(doesNotWorking of DoesNotWork (Value yes))",
  DoesNotHeatUp: "(doesNotHeatUp of DoesNotHeatUp (Value yes))",
  HasNoise: "(hasNoise of HasNoise (Value yes))",
};

module.exports = {
  writeCLP: (entries) => {
    let clpCode = "";

    for (let entry in entries) {
      if (entries[entry]) {
        clpCode += entriesToInstances[entry];
      }
    }

    const allClpCode = partBefore + clpCode + partAfter;

    fs.writeFileSync("server2.clp", allClpCode);
  },

  resolve: () => {
    const ls = spawnSync("CLIPSDOS.exe", ["-f", "commands"]);

    // console.log(ls);

    const data = fs.readFileSync("./1.fct", { encoding: "utf8", flag: "r" });

    const formattedArray = data.split("\r\n").filter((str) => str.length > 0);

    const res = {};

    for (let i = 0; i < formattedArray.length; i += 2) {
      for (let work of works) {
        if (formattedArray[i].includes(work)) {
          res[work] = true;
        }
      }
    }

    return res;
  },
};
