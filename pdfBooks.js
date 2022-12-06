const express = require("express");
const router = express.Router();

const axios = require("axios");
const cheerio = require("cheerio");

const mongoose = require("mongoose");
var Books = require("mongodb").Books;

const bookModel = require("./models/book");

let hein = [];
let array = [];
let coverImage;
let title;
let pageCount;
let publishAdt;
let fileSize;
let dataId;
let downloadCount;
let downloadLink;
// let author;

const url = "https://www.pdfdrive.com/category/15/p5";

axios(url).then((response) => {
  let html = response.data;
  const $ = cheerio.load(html);
  $(".col-sm", html).each(function () {
    coverImage = $(this).find("img").attr("src");
    dataId = $(this).children(".file-left").find("a").attr("data-id");
    title = $(this).find("h2").text();
    pageCount = $(this).find(".fi-pagecount").text().split(" ")[0];
    publishAdt = $(this).find(".fi-year").text();
    fileSize = $(this).find(".fi-size").text();
    downloadCount = $(this).find(".fi-hit").text();

    // detail page
    const EndUrl = $(this).find(".file-left").children().attr("href");
    const page = "https://www.pdfdrive.com" + EndUrl;
    axios(page).then((response) => {
      let detailHtml = response.data;
      const $$ = cheerio.load(detailHtml);

      //   $$(".ebook-right", detailHtml).each(function () {
      //     author = $(this)
      //       .children(".ebook-right-inner")
      //       .find(".ebook-author")
      //       .find("a")
      //       //   .attr("itemprop")
      //       .text();
      //     console.log(author);
      //   });

      $$(".ebook-main", detailHtml).each(function () {
        let author = $(this)
          .children(".ebook-right")
          .children(".ebook-right-inner")
          .find(".ebook-author")
          .find("a")
          //   .attr("itemprop")
          .text();
        let tags = $(this)
          .children(".ebook-right")
          .children(".ebook-right-inner")
          .find(".ebook-tags")
          // .find("a")
          .text();
        console.log(tags);

        let downloadLinkH = $(this)
          .find("#previewButtonMain")
          .attr("data-preview")
          .split("=")[2];
        let downloadLinkId = $(this)
          .find("#previewButtonMain")
          .attr("data-preview")
          .split("=")[1]
          .split("&")[0];
        downloadLink = {
          tags: tags.split("  "),
          author: author ? author : "",
          link: `https://www.pdfdrive.com/download.pdf?id=${downloadLinkId}&h=${downloadLinkH}&u=cache&ext=pdf`,
          dataId: downloadLinkId,
        };
        array.push(downloadLink);
      });
    });

    hein.push({
      title,
      dataId,
      pageCount,
      publishAdt,
      fileSize,
      downloadCount,
      coverImage,
      category: "Politics & Laws",
    });

    // author && hein.push(author);
  });
});

const app = express();
const PORT = process.env.PORT || 5000;

const CONNNECTION_URL =
  "mongodb+srv://ZawHtet:zawhtet150mongodb@cluster0.fpdqu.mongodb.net/Books?retryWrites=true&w=majority";

mongoose
  .connect(CONNNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));

let newData = [];

app.get("/", async (req, res) => {
  let data;
  let newbook;
  hein.map((book, index) => {
    array.map((downlink, index) => {
      //   console.log(book.dataId, downlink.dataId);
      if (book.dataId === downlink.dataId) {
        newbook = { ...book, ...downlink };

        newData.push(newbook);
        // console.log(newData);
      }
    });
  });

  newData.map(async (book) => {
    // data = new bookModel({ ...book });
    try {
      // await data.save();

      res.status(200).json(newData);
    } catch (error) {
      console.log(error);
    }
  });

  // res.send({ count: hein.length, data: newData });
});

// export const createPost = async (req, res) => {
//   const post = req.body;

//   const newPostMessage = new PostMessage({
//     ...post,
//     creator: req.userId,
//     createdAt: new Date().toISOString(),
//   });

//   try {
//     await newPostMessage.save();

//     res.status(200).json(newPostMessage);
//   } catch (error) {
//     res.status(409).json({ msg: error });
//   }
// };

// app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));

// const express = require("express");
// const router = express.Router();

// const axios = require("axios");
// const cheerio = require("cheerio");

// // const pdfBookModel = require("../models/pdfbook");

// let hein = [];
// let array = [];
// let coverImage;
// let title;
// let pageCount;
// let publishAdt;
// let fileSize;
// let dataId;
// let downloadCount;
// let downloadLink;

// const url = "https://www.pdfdrive.com/category/5/p4";

// axios(url).then((response) => {
//   let html = response.data;
//   const $ = cheerio.load(html);
//   $(".col-sm", html).each(function () {
//     coverImage = $(this).find("img").attr("src");
//     dataId = $(this).children(".file-left").find("a").attr("data-id");
//     title = $(this).find("h2").text();
//     pageCount = $(this).find(".fi-pagecount").text().split(" ")[0];
//     publishAdt = $(this).find(".fi-year").text();
//     fileSize = $(this).find(".fi-size").text();
//     downloadCount = $(this).find(".fi-hit").text();

//     // detail page
//     const EndUrl = $(this).find(".file-left").children().attr("href");
//     const page = "https://www.pdfdrive.com" + EndUrl;
//     axios(page).then((response) => {
//       let detailHtml = response.data;
//       const $$ = cheerio.load(detailHtml);

//       $$(".ebook-buttons", detailHtml).each(function () {
//         let downloadLinkH = $(this)
//           .find("#previewButtonMain")
//           .attr("data-preview")
//           .split("=")[2];
//         let downloadLinkId = $(this)
//           .find("#previewButtonMain")
//           .attr("data-preview")
//           .split("=")[1]
//           .split("&")[0];
//         downloadLink = {
//           link: `https://www.pdfdrive.com/download.pdf?id=${downloadLinkId}&h=${downloadLinkH}&u=cache&ext=pdf`,
//           dataId: downloadLinkId,
//         };
//         array.push(downloadLink);
//       });
//     });

//     hein.push({
//       title,
//       dataId,
//       pageCount,
//       publishAdt,
//       fileSize,
//       downloadCount,
//       coverImage,
//       category: "Technology",
//     });
//   });
// });

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   let newData = [];
//   hein.map((book, index) => {
//     array.map((downlink, index) => {
//       //   console.log(book.dataId, downlink.dataId);
//       if (book.dataId === downlink.dataId) {
//         const newbook = { ...book, ...downlink };
//         newData.push(newbook);
//         console.log(newData);
//       }
//     });
//   });

//   res.send({ count: hein.length, data: newData });
// });
// app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
