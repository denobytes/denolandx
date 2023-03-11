import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

// get
let searchterm = Deno.args[0];
let res = await fetch(`https://deno.land/x?query=${searchterm}`);
let resText = await res.text();

// parse
const doc = new DOMParser().parseFromString(resText, "text/html")!;
let qEntries = await doc.querySelectorAll("li");

// process
for (const qq of qEntries) {
  // titles
  let qt = qq.querySelector("div").querySelector("div");
  // description
  let qd = qq.querySelector("div.col-span-2");
  // print
  console.log("-------------------");
  console.log(qt.textContent + "\n\t" + qd.textContent);
}
