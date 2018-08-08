const osmosis = require("osmosis");
const fs = require("fs");

// Define source data
const source = fs.readFileSync("source.html");

let resultData = [];

function writeJSON(data) {
  const jsonify = JSON.stringify(data, null, 4);
  fs.writeFile("data.json", jsonify, err => err ? console.error(err) : console.log("Data saved to data.json file"));
}

osmosis
  .parse(source)
  .find(".sweeties_container article")
  .success("button.liked") // Filter by my liked sweeties (Optional)
  .set({
    name: "a.sweetie__name",
    desc: "div#content",
    link: ".sweetie__links a@href",
    tags: ["div.sweetie__tags a"]
  })
  .data(data => resultData.push(data))
  .done(() => writeJSON(resultData));