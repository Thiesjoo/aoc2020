var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
  if (!err) {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        let program = data.split(",").map(Number);
        program[1] = i;
        program[2] = j;
        let curr = 0;

        while (curr < program.length && program[curr] !== 99) {
          let opCode = program[curr];
          switch (opCode) {
            case 1:
              program[program[curr + 3]] =
                program[program[curr + 1]] + program[program[curr + 2]];
              break;

            case 2:
              program[program[curr + 3]] =
                program[program[curr + 1]] * program[program[curr + 2]];
          }
          curr += 4;
        }
        if (program[0] === 19690720) {
          console.log(i, j);
        }
      }
    }
  } else {
    console.log(err);
  }
});
