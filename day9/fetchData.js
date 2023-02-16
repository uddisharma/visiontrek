const { poolPromotion } = require("./database");
const fs = require("fs");

const { checkUserStatus, checkBilledStatus } = require("./fetchItems");

require("dotenv").config({ path: "./.env" });
let publisherName = "angelmediandoto";
// let month = 12;
// let year = 2022;

let month = 10;
let year = 2022;

fs.appendFile(
  `${publisherName}-${year}-${month}.txt`,
  `date#serviceName#currentStatus#MSISDN#Amountpaid\n`,
  (err) => {
    // In case of a error throw err.
    if (err) throw err;
  }
);

const promise1 = new Promise((resolve, reject) => {
  let querySelect = `
    SELECT ani,DATE,partner,servicename FROM tbl_partner_callback WHERE  month(date)=${month} and year(date)=${year} AND partner='${publisherName}' AND partnercallbackUrl IS NOT NULL and clientName='ndoto'`;
  poolPromotion.query(`${querySelect}`, [], (err, result) => {
    if (err) throw err;
    resolve(result);
  });
});

promise1.then((promotionData) => {
  console.log(promotionData.length);
  // Expected output: "Success!"

  promotionData.map((item) => {
    let serviceName =
      item.servicename === "faith-first"
        ? "Faith"
        : item.servicename === "boss_moves"
        ? "Business"
        : item.servicename === "beauty"
        ? "beauty"
        : item.servicename === "loltv"
        ? "LOL TV"
        : item.servicename === "women_of_honour"
        ? "WOH"
        : item.servicename === "luxury"
        ? "luxury"
        : item.servicename === "ndoto-stream"
        ? "Ndoto Stream"
        : "INVALID SERVICE";
    // console.log(" serviceName ", serviceName);
    if (serviceName === "INVALID SERVICE") {
      console.log("GOT INVALID SERVICE SO CHECK PLS", item);
      setTimeout(() => {
        console.log("Invalid service ", item);
      }, 5000);
    }
    // to get Date to compare user subccess in billing
    let onlYDate = item.DATE.toISOString().substring(0, 10);

    checkUserStatus(item.ani, serviceName, (errSub, resultSub) => {
      if (errSub) throw errSub;
      //   console.log("resultSub ===> ", resultSub, serviceName, item.ani);
      checkBilledStatus(item.ani, onlYDate, (errSuccess, resultSuccess) => {
        if (errSuccess) throw errSuccess;

        console.log("resultSuccess==>", item.ani, resultSuccess);

        fs.appendFile(
          `${publisherName}-${year}-${month}.txt`,
          `${onlYDate}#${serviceName}#${resultSub}#${item.ani}#${resultSuccess}\n`,
          (err) => {
            // In case of a error throw err.
            if (err) throw err;
          }
        );
      });
    });
  });
});
