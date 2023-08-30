var sql = require("mssql");
var dbConfig = {
    user: "sa",
    password: "",
    // server: "192.168.1.31",//192.168.1.31
    // server: "192.168.1.121",
    server: "192.168.1.164",
    port: 1433,
    // database: "clientDBNSE1",
    //database: "CLIENTDBNSECM",
    databaes: "CTCL_API",
    options: {
        "encrypt": false
    }
};
var dbConfig1 = {
    user: "sa",
    password: "",
    // server: "192.168.1.31",//192.168.1.31
    // server: "192.168.1.121",
    server: "192.168.1.240",
    port: 1433,
    // database: "clientDBNSE1",
    //database: "CLIENTDBNSECM",
    databaes: "CTCL_ZERODHA",
    options: {
        "encrypt": false
    }
};

export const config = {
    api: {
        responseLimit: false,
    },
}
var responseTokenArray = []
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    try {
        const broker = req.body.Broker
        const userID = req.body.UserID
        const accessToken = req.body.accessToken
        const reqToken = req.body.requestToken
        const tDate = new Date(req.body.loginDate).toLocaleDateString('en-GB');
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const curDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        /* let conn1 = await sql.connect(dbConfig)
         var selQuery = "select Count(*) as Count from CTCL_API.dbo.tbl_Login_Token where UserId='" + userID + "'";
         let selectResponse = await conn1.request()
             .query(selQuery)
         //console.log(selectResponse)
         if (parseInt(selectResponse.recordset[0]["Count"]) > 0) {
             var updateQuery = "update CTCL_API.dbo.tbl_Login_Token set AccessToken='" + accessToken + "', RequestToken='" + reqToken + "',TDate='" + tDate + "',Broker='" + broker + "',insertTime='" + curDate + "' where UserId='" + userID + "'";
             let updateResponse = await conn1.request()
                 .query(updateQuery).then(function (resp, err) {
                     if (err) {
                         return res.status(200).json({ data: err, })
                     }
                     else {
                         if (parseInt(resp.rowsAffected[0]) > 0) {
                             return res.status(200).json({ data: 2, msg: "Updated SucessFully...." })
                         } else {
                             return res.status(200).json({ data: "No record found...." })
                         }
                     }
 
                 }).catch(function (err) {
                     conn1.close();
                     return res.status(200).json({ data: err, })
                 }).finally(function () {
                     if (conn1) conn1.close();
                     // resolve();
                 });
         }
         else {
             //var insertQuery = "update CTCL_API.dbo.tbl_Login_Token set AccessToken='" + accessToken + "', RequestToken='" + reqToken + "',TDate='" + tDate + "',Broker='" + broker + "',insertTime='" + curDate + "' where UserId='" + userID + "'";
             var insertQuery = "Insert into CTCL_API.dbo.tbl_Login_Token (UserId,TDate,AccessToken,RequestToken,Broker,insertTime) Values('" + userID + "','" + tDate + "','" + accessToken + "','" + reqToken + "','" + broker + "','" + curDate + "')"
             let insertResponse = await conn1.request()
                 .query(insertQuery).then(function (resp, err) {
                     if (err) {
                         return res.status(200).json({ data: err, })
                     }
                     else {
                         if (parseInt(resp.rowsAffected[0]) > 0) {
                             return res.status(200).json({ data: 2, msg: "Inserted SucessFully...." })
                         } else {
                             return res.status(200).json({ data: "No record found...." })
                         }
                     }
 
                 }).catch(function (err) {
                     conn1.close();
                     return res.status(200).json({ data: err, })
                 }).finally(function () {
                     if (conn1) conn1.close();
                     // resolve();
                 });
         }*/
        // console.log("render")
        responseTokenArray[0] = "";
        responseTokenArray[1] = "";
        const response = await UpdateTokenToDBConnection(dbConfig, broker, userID, accessToken, reqToken, tDate, curDate, "CTCL_API", res, 0)
        const response1 = await UpdateTokenToDBConnection(dbConfig1, broker, userID, accessToken, reqToken, tDate, curDate, "CTCL_ZERODHA", res, 1)
        return res.status(200).json(response1)

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error generating the secret' })
    }
}
async function UpdateTokenToDBConnection(Config, broker, userID, accessToken, reqToken, tDate, curDate, dbName, res, index) {
    let conn1 = await sql.connect(Config)
    var selQuery = "select Count(*) as Count,max(TDate) as Tdate from " + dbName + ".dbo.tbl_Login_Token where UserId='" + userID + "'";
    let selectResponse = await conn1.request()
        .query(selQuery)

    if ((new Date(tDate).toLocaleDateString('en-GB')) >= (new Date().toLocaleDateString('en-GB'))) {
        if (parseInt(selectResponse.recordset[0]["Count"]) > 0) {
            var updateQuery = "update " + dbName + ".dbo.tbl_Login_Token set AccessToken='" + accessToken + "', RequestToken='" + reqToken + "',TDate='" + tDate + "',Broker='" + broker + "',insertTime='" + curDate + "' where UserId='" + userID + "'";
            let updateResponse = await conn1.request()
                .query(updateQuery).then(function (resp, err) {
                    if (err) {
                        //return res.status(200).json({ data: err, })
                        responseTokenArray[index] = { data: err, }
                    }
                    else {
                        if (parseInt(resp.rowsAffected[0]) > 0) {
                            // return res.status(200).json({ data: 2, msg: "Updated SucessFully...." })
                            responseTokenArray[index] = { data: 2, msg: "Updated SucessFully...." }
                        } else {
                            // return res.status(200).json({ data: "No record found...." })
                            responseTokenArray[index] = { data: "No record found...." }
                        }
                    }

                }).catch(function (err) {
                    conn1.close();
                    //return res.status(200).json({ data: err, })
                    responseTokenArray[index] = { data: err, }
                }).finally(function () {
                    if (conn1) conn1.close();
                    // resolve();
                });
        }
        else {
            //var insertQuery = "update CTCL_API.dbo.tbl_Login_Token set AccessToken='" + accessToken + "', RequestToken='" + reqToken + "',TDate='" + tDate + "',Broker='" + broker + "',insertTime='" + curDate + "' where UserId='" + userID + "'";
            var insertQuery = "Insert into " + dbName + ".dbo.tbl_Login_Token (UserId,TDate,AccessToken,RequestToken,Broker,insertTime) Values('" + userID + "','" + tDate + "','" + accessToken + "','" + reqToken + "','" + broker + "','" + curDate + "')"
            let insertResponse = await conn1.request()
                .query(insertQuery).then(function (resp, err) {
                    if (err) {
                        // return res.status(200).json({ data: err, })
                        responseTokenArray[index] = { data: err, }
                    }
                    else {
                        if (parseInt(resp.rowsAffected[0]) > 0) {
                            // return res.status(200).json({ data: 2, msg: "Inserted SucessFully...." })
                            responseTokenArray[index] = { data: 2, msg: "Updated SucessFully...." }
                        } else {
                            responseTokenArray[index] = { data: "No record found...." }
                            // return res.status(200).json({ data: "No record found...." })
                        }
                    }

                }).catch(function (err) {
                    conn1.close();
                    // return res.status(200).json({ data: err, })
                    responseTokenArray[index] = { data: err, }
                }).finally(function () {
                    if (conn1) conn1.close();
                    // resolve();
                });
        }
    }
    else {
        responseTokenArray[index] = { data: 3, msg: "Please Register again token  is expired..." }
    }
    return responseTokenArray;
}
