const request = require("request");
// const axios = require("axios");
const cheerio = require("cheerio");
// const fs = require("fs");
// const writeStream = fs.createWriteStream("post.csv");
// import axios from "axios";
// const cheerio = require("cheerio");
// import { cheerio } from "cheerio";

// Write Headers
// writeStream.write(`Title,Link,Date \n`);

request(
  "https://www.tripadvisor.com/CheapFlightsSearchResults-g298184-a_airport0.XSP-a_airport1.TYO-a_cos.0-a_date0.20220801-a_date1.20220808-a_formImp.89871f74__2D__3ee2__2D__44f2__2D__bf80__2D__55acfb06bb7a__2E__6984-a_nearby0.no-a_nearby1.no-a_nonstop.no-a_pax0.a-a_travelers.1-Tokyo_Tokyo_Prefecture_Kanto.html",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const heading = $(".xQJFT b");
      console.log(heading.html());
      // console.log(html);
      // $(".post-preview").each((i, el) => {
      //   const title = $(el).find(".post-title").text().replace(/\s\s+/g, "");
      //   const link = $(el).find("a").attr("href");
      //   const date = $(el).find(".post-date").text().replace(/,/, "");

      //   // Write Row To CSV
      //   writeStream.write(`${title}, ${link}, ${date} \n`);
      // });

      // console.log("Scraping Done...");
    }
  }
);
