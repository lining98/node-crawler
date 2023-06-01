// 引入模块
const https = require("https");
const cheerio = require("cheerio");
const fs = require("fs");

https.get("https://movie.douban.com/top250", function (res) {
  let html = "";
  res.on("data", function (chunk) {
    // console.log(chunk+'');
    // 得到数据流，通过字符串得到html结构
    html += chunk;
  });

  res.on("end", function () {
    //   创建一个空数组，把数据以对象的形式存放在数组中
    let allFiles = [];

    // 获取html中的数据
    const $ = cheerio.load(html);
    $("li .item").each(function () {
      const title = $(".title", this).text();
      const star = $(".info .bd .rating_num", this).text();
      const pic = $(".pic img", this).attr("src");

      allFiles.push({
        title: title,
        star: star,
        pic: pic,
      });
    });
    //  console.log(allFiles);

    // 将数据写入文件中
    fs.writeFile(
      "./files.json",
      JSON.stringify(allFiles),
      function (err, data) {
        if (err) {
          throw arr;
        }
        console.log("文件保存成功");
      }
    );
  });
});
