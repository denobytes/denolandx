import { parse as argparse } from "https://deno.land/std@0.181.0/flags/mod.ts";
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const args = argparse(Deno.args, {
  boolean: [
    // instructions for this script
    "help",

    // output json
    "j",
    "json",

    // output popular
    "popular",
  ],
  string: [],
});

const commandName = `denolandx`;

const usageMessage = `
Usage: ${commandName} [OPTIONS] [SEARCH MODULES]
a cli tool for finding more info on deno.land/x modules

Options:
  --help              Show this help message

  -j, --json          Output as json
  --popular           Get 100 popular modules

  Examples:
  ${commandName} deno
  ${commandName} -j deno
  ${commandName} --popular
`;

// parse args
const help = args.help;
let outputJSON = args.json || args.j;
let outputPopular = args.popular;
let searchterm = args._.at(0);
let entries = [];

if (help) {
  console.log(usageMessage);
  Deno.exit();
}

if (outputPopular) {
  for (let pagenum in [1, 2, 3, 4, 5, 6]) {
    // get
    let res = await fetch(`https://deno.land/x?page=${pagenum}}`);
    let resText = await res.text();

    // parse
    const doc = new DOMParser().parseFromString(resText, "text/html")!;
    let qEntries = await doc.querySelectorAll("li");

    // process
    for (const qq of qEntries) {
      let qt = qq.querySelector("div").querySelector("div");
      let qd = qq.querySelector("div.col-span-2");
      let entry = { "name": qt.textContent, "description": qd.textContent };
      entries.push(entry);
    }
  }
} else {
  // get
  let res = await fetch(`https://deno.land/x?query=${searchterm}`);
  let resText = await res.text();

  // parse
  const doc = new DOMParser().parseFromString(resText, "text/html")!;
  let qEntries = await doc.querySelectorAll("li");

  // process
  for (const qq of qEntries) {
    let qt = qq.querySelector("div").querySelector("div");
    let qd = qq.querySelector("div.col-span-2");
    let entry = { "name": qt.textContent, "description": qd.textContent };
    entries.push(entry);
  }
}

// output
if (outputJSON) {
  console.log(JSON.stringify(entries, true, "  "));
} else {
  for (const qq of entries) {
    console.log("-------------------");
    console.log(qq.name + "\n\t" + qq.description);
  }
}
