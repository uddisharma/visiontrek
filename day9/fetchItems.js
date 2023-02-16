const { pool } = require("./database");

module.exports = {
  checkUserStatus: (ani, serviceName, callback) => {
    var userStatus = `select count(1) as CNT from tbl_subscription where ani='${ani}' and service_type='${serviceName}'`;

    // console.log("User query ", userStatus);

    //checking user current Status on service

    pool.query(`${userStatus}`, [], (errSub, resultSub) => {
      if (errSub) throw errSub;
      //   console.log("resultSub ", ani, resultSub[0].CNT);

      let ifUserExist = resultSub[0].CNT > 0 ? "ACTIVE" : "INACTIVE";

      //   console.log("ifUserExist ", ifUserExist, ani, serviceName);
      callback("", ifUserExist);

      //   console.log("onlYDate ", onlYDate);
    });
  },
  checkBilledStatus: (ani, processDatetime, callback) => {
    var billingAmount = `select sum(deducted_amount) as success from tbl_billing_success where ani='${ani}' and date(process_datetime)> '${processDatetime}' and type_event='REN' order by 1`;

    // console.log("billingAmount ", billingAmount);
    pool.query(`${billingAmount}`, (errEsuccess, succcessResult) => {
      if (errEsuccess) throw errEsuccess;
      //   console.log(
      //     "succcessResult ",
      //     ani,
      //     succcessResult[0].success == null ? 0 : succcessResult[0].success
      //   );
      return callback(
        "",
        succcessResult[0].success == null ? 0 : succcessResult[0].success
      );
    });
  },
};
