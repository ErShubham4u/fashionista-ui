const fs = require("fs");

const db = {
  login: JSON.parse(fs.readFileSync("login.json", "utf-8")),
  myProduct: JSON.parse(fs.readFileSync("myProduct.json", "utf-8")),
  sadee: JSON.parse(fs.readFileSync("sadee.json", "utf-8")),
  accessories: JSON.parse(fs.readFileSync("accessories.json", "utf-8"))
};

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
console.log("✅ db.json created successfully!");
