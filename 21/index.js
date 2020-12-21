"use strict";
const now = require("performance-now");

// Part 1
// ======
// ~1.3 ms - answer: 2061

const part1 = (input) => {
  const start = now();

  const { final, ingredients } = parseInput(input);
  let allergicIngredients = Object.values(final);
  let safeIngredients = ingredients.filter((x) => {
    return !allergicIngredients.includes(x);
  });

  const end = now();
  console.log("Execution time: ~%dms", (end - start).toFixed(3));

  return safeIngredients.length;
};

function parseInput(input) {
  let ingredients = []; //All the ingredients
  let allergens = new Set(); //All the allergens
  let allergensInformation = {}; //Allergen mapped to ingredients

  input.split("\n").forEach((x) => {
    const [, ing, aller] = x.match(/(.+) \(contains (.+)\)/);
    let allergensLocal = aller.split(", ");
    let ingredientsLocal = new Set(ing.split(" "));

    ingredients.push(...ingredientsLocal);

    allergensLocal.forEach((y) => {
      allergens.add(y);
      if (!allergensInformation[y]) {
        allergensInformation[y] = ingredientsLocal;
      } else {
        allergensInformation[y] = new Set(
          [...allergensInformation[y]].filter((y) => ingredientsLocal.has(y))
        );
      }
    });
  });

  let final = {}; //The result of the calculation. So allergen mapped to 1 ingredient
  let allergenicItems = new Set(); //Keeping track of which items we already processed
  while (Object.keys(final).length !== allergens.size) {
    Object.entries(allergensInformation).forEach((x, i) => {
      const [all, ingr] = x;
      let finalIngredients = [...ingr].filter((y) => !allergenicItems.has(y));

      if (finalIngredients.length === 1) {
        let item = finalIngredients.pop();
        final[all] = item;

        allergenicItems.add(item);
      }
    });
  }
  return { final, ingredients };
}

// Part 2
// ======
// ~1.1 ms - answer: cdqvp,dglm,zhqjs,rbpg,xvtrfz,tgmzqjz,mfqgx,rffqhl

const part2 = (input) => {
  const start = now();

  const { final, ingredients } = parseInput(input);
  let allergenToIngredient = Object.entries(final);
  let sorted = [];

  //Sort with the first property, but get the second property
  allergenToIngredient.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] > b[0]) {
      return 1;
    }
    return 0;
  });
  allergenToIngredient.forEach((x) => {
    sorted.push(x[1]);
  });

  const end = now();
  console.log("Execution time: ~%dms", (end - start).toFixed(3));

  return sorted.join(",");
};

module.exports = { part1, part2 };
