import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { load } from "cheerio";
import { describe, expect, it } from "vitest";

function readBuiltHomePage() {
  const html = readFileSync(resolve(process.cwd(), "dist/index.html"), "utf8");
  return load(html);
}

describe("built home page", () => {
  it("renders the main sections in the expected order", () => {
    const $ = readBuiltHomePage();

    expect($("section[id]").map((_, element) => $(element).attr("id")).get()).toEqual([
      "intro",
      "about",
      "experience",
      "testimonies",
      "contact",
    ]);
  });

  it("renders navigation, resume, and social links", () => {
    const $ = readBuiltHomePage();

    expect($("header nav a").map((_, element) => $(element).attr("href")).get()).toEqual([
      "#intro",
      "#about",
      "#experience",
      "#testimonies",
      "#contact",
      "/src/assets/Resume.pdf",
    ]);
    expect($("header nav a[download]").length).toBe(1);
    expect($('a[href="https://github.com/CharlieGarcia"]').text()).toContain("Github");
    expect($('a[href="https://www.linkedin.com/in/charlie-garcía/"]').text()).toContain("LinkedIn");
    expect($('a[href="mailto:ing.charlie.garcia@gmail.com"]').text()).toContain("Email");
  });

  it("renders accessible contact controls and hidden treadmill duplicates", () => {
    const $ = readBuiltHomePage();

    expect($("label[for='email-address-icon']").text()).toContain("Your Email");
    expect($("#email-address-icon").length).toBe(1);
    expect($("label[for='message']").text()).toContain("Your message");
    expect($("#message").length).toBe(1);
    expect($("button[type='submit']").text()).toContain("Submit");
    expect($(".treadmill-item[aria-hidden='true']").length).toBe(5);
  });
});
