var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
  if (!err) {
    let sum = 0;
    data.split("\n").forEach((x) => {
      console.log(x);


      let tempFuel = Math.floor(parseInt(x) / 3) - 2;
      while (tempFuel > 0) {
        sum += tempFuel;
        tempFuel = Math.floor(parseInt(tempFuel) / 3) - 2;
      }
    });
    console.log(sum);
  } else {
    console.log(err);
  }
});
