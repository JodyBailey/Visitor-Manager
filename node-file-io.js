const fs = require("fs");

class Visitor {
  fullName;
  age;
  visitDate;
  visitTime;
  comments;
  assistantName;

  constructor(fullName, age, visitDate, visitTime, comments, assistantName) {
    this.fullName = fullName;
    this.age = age;
    this.visitDate = visitDate;
    this.visitTime = visitTime;
    this.comments = comments;
    this.assistantName = assistantName;
  }

  save() {
    fs.writeFile(jsonFileName(this.fullName), JSON.stringify(this), (err) => {
      if (err) throw err;
    });
  }
}

const jsonFileName = (fullName) => {
  return `visitor_${fullName
    .split(" ")
    .map((name) => name.toLowerCase())
    .join("_")}.json`;
};

const load = (fullName) => {
  if (typeof fullName !== "string") throw "incorrect Input";

  const fileName = jsonFileName(fullName);

  fs.readFile(`./${fileName}`, "utf-8", (err, jsonString) => {
    if (err) throw err;
    console.log(JSON.parse(jsonString));
  });
};

let john = new Visitor(
  "John Smith",
  21,
  "23 Feb 2022",
  "16:54",
  "Amazing stuff I tell you",
  "Alexa Barbara"
);

let alex = new Visitor(
  "Alex Cooper",
  32,
  "2 January 2022",
  "12:22",
  "Pretty Average",
  "Alexa Barbara"
);

john.save();
alex.save();
load("John Smith");
load("Alex Cooper");
