import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { selectAll } from "css-select";
import render from "dom-serializer";
import { parseDocument } from "htmlparser2";
import TurndownService from "turndown";
import cacache from "cacache";

import "dotenv/config";

// AoC
const baseUrl = new URL(`https://adventofcode.com/`);

const sessionToken = process.env.AOC_SESSION_TOKEN;
const contact = process.env.AOC_CONTACT;

const opts = sessionToken
  ? {
      headers: {
        cookie: `session=${sessionToken}`,
        "user-agent": `https://github.com/titonobre/adventofcode by ${contact}`,
      },
    }
  : {};

// HTML to Markdown

TurndownService.prototype.escape = (value) => value;

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  preformattedCode: true,
});

turndownService.addRule("strikethrough", {
  filter: ["title"],
  replacement: function (content) {
    return "# " + content;
  },
});

const markdownReplacements = [
  [/`_(.*)_`/gi, "_`$1`_"], // italic code
];

// Cache

const cachePath = resolve(dirname(fileURLToPath(import.meta.url)), ".cache");

const cacheTtl = 1000 * 60 * 60; // one hour

// Aux Functions

async function fetchContents(url) {
  const cacheKey = url.href;

  const cachedDataInfo = await cacache.get.info(cachePath, cacheKey);

  const cacheValid =
    !!cachedDataInfo && Date.now() - cachedDataInfo.time < cacheTtl;

  if (cacheValid) {
    try {
      const cachedData = await cacache.get(cachePath, cacheKey);

      if (cachedData) {
        return cachedData.data.toString("utf-8");
      }
    } catch (e) {
      // no cache available
    }
  }

  console.log("Fetching " + url);

  const response = await fetch(url, opts);

  const text = await response.text();

  await cacache.put(cachePath, cacheKey, text);

  return text;
}

async function fetchReadme(year, day) {
  const url = new URL(`/${year}/day/${day}`, baseUrl);

  const html = await fetchContents(url);

  const document = parseDocument(html);

  const contents = selectAll(`title, article`, document);

  const markdown = turndownService.turndown(render(contents));

  return markdownReplacements.reduce(
    (source, replacement) => source.replace(...replacement),
    markdown
  );
}

async function fetchExample(year, day) {
  const url = new URL(`/${year}/day/${day}`, baseUrl);

  const html = await fetchContents(url);

  const document = parseDocument(html);

  const elements = selectAll(`article > pre > code`, document);

  return elements.at(0)?.children[0].nodeValue ?? "";
}

async function fetchAnswers(year, day) {
  const url = new URL(`/${year}/day/${day}`, baseUrl);

  const html = await fetchContents(url);

  const document = parseDocument(html);

  const elements = selectAll(
    `p:contains('Your puzzle answer was') > code`,
    document
  );

  const answers = elements.map((el) => el.children[0].nodeValue);

  return answers.join("\n") + "\n";
}

async function fetchInput(year, day) {
  const url = new URL(`/${year}/day/${day}/input`, baseUrl);

  return await fetchContents(url);
}

function padDay(text) {
  return text.padStart(2, "0");
}

export default async function (plop) {
  plop.setHelper("padDay", padDay);

  plop.setGenerator("solution", {
    description: "solution to advent of code puzzle",
    prompts: [
      {
        type: "input",
        name: "year",
        message: "year",
        default: new Date().getFullYear(),
        validate: (value) => /^\d{4}$/.test(value),
      },
      {
        type: "input",
        name: "day",
        message: "day",
        validate: (value) => /^\d{1,2}$/.test(value),
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{year}}/{{padDay day}}/readme.md",
        force: true,
        transform: async (_, { year, day }) => fetchReadme(year, day),
      },
      {
        type: "add",
        path: "{{year}}/{{padDay day}}/example.txt",
        force: true,
        transform: async (_, { year, day }) => fetchExample(year, day),
      },
      {
        type: "add",
        path: "{{year}}/{{padDay day}}/input.txt",
        force: true,
        transform: async (_, { year, day }) => fetchInput(year, day),
      },
      {
        type: "add",
        path: "{{year}}/{{padDay day}}/answers.txt",
        force: true,
        transform: async (_, { year, day }) => fetchAnswers(year, day),
      },
      {
        type: "add",
        path: "{{year}}/{{padDay day}}/index.js",
        templateFile: "0000/00/index.js",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "{{year}}/{{padDay day}}/solution.js",
        templateFile: "0000/00/solution.js",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "{{year}}/{{padDay day}}/test.js",
        templateFile: "0000/00/test.js",
        skipIfExists: true,
        transform: async (template, { year, day }) => template.replace("0000/00", `${year}/${padDay(day)}`),
      },
    ],
  });
}
