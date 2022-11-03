import axios from "axios";
import * as cheerio from "cheerio";
const URL = "https://www.iban.com/exchange-rates";

const fechData = async (url) => {
  console.log("Crawling ...");
  const resp = await axios(url).catch((err) => console.log(err));
  if (resp.status !== 200) {
    console.log("Fetch error");
    return;
  }
  return resp;
};


fechData(URL).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  const rows = $(".table.table-bordered.table-hover.downloads tbody tr");
  const json = new Object();
  rows.each((_, elm) => {
    const arr = $(elm).find("td").text().split("\t");
    if (arr.length !== 2) {
      console.error(`Invalid row: ${arr}`)
      return
    }
    const currency = arr[0].trim()
    const content = arr[1].split(/[^A-Z]*(^\D+)/)
    json[currency] = new Object()
    json[currency]["name"] = content[1]
    json[currency]["rate"] = content[2]
  });
  return json
});




// make some changes on dev2
// keep making some changes on dev1
// make some changes on dev1
// make another change on dev2