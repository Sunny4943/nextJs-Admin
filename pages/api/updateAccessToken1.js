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

export const config = {
    api: {
        responseLimit: false,
    },
}

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


        //const ClientPassword = req.body.Clntpwd
        var dbConn = await sql.connect(dbConfig);
        if (dbConn) {
            var strQuery = "update CTCL_API.dbo.tbl_Login_Token set AccessToken='" + accessToken + "', RequestToken='" + reqToken + "',TDate='" + tDate + "',Broker='" + broker + "',insertTime='" + curDate + "' where UserId='" + userID + "'";
            //sql.pool.
            sql.query(strQuery).then(function (resp, err) {
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

                //console.log(resp);
                dbConn.close();
                //dbConn.close();
            }).catch(function (err) {
                dbConn.close();
                return res.status(200).json({ data: err, })
            }).finally(function () {
                if (dbConn) dbConn.close();
                // resolve();
            });
        }



    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error generating the secret' })
    }
}

