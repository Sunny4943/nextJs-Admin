var sql = require("mssql");
var dbConfig = {
    user: "sa",
    password: "",
    server: "192.168.1.240",//192.168.1.31
    port: 1433,
    //database: "GlbLocal",
    database: "CTCL_STRATEGY_DROPCOPY",
    options: {
        "encrypt": false
    }
};


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const queryString = req.body['query'];

    // const result = await ExcuteQuery('select * from Tempcontract');
    if (req.body['type'] === "select" && queryString.includes("select")) {
        var dbConn = await sql.connect(dbConfig);
        if (dbConn) {
            sql.query(req.body['query']).then(function (resp) {

                res.status(200).json({ data: resp.recordset, })

                res.status(200).json({ data: resp, })


                //console.log(resp);
                dbConn.close();
                //dbConn.close();
            }).catch(function (err) {
                res.status(200).json({ data: err, })
                dbConn.close();
            });
        }
    }
    else if (req.body['type'] === "insert" && queryString.includes("insert")) {
        var dbConn = await sql.connect(dbConfig);
        if (dbConn) {
            sql.query(req.body['query']).then(function (resp, err) {
                if (err) {
                    res.status(200).json({ data: err, })
                }
                else {
                    if (parseInt(resp.rowsAffected[0]) > 0) {
                        res.status(200).json({ data: 1, msg: "Row Inserted SucessFully..." })
                    }
                    else {
                        res.status(200).json({ data: "No record found...." })
                    }
                }

                //console.log(resp);
                dbConn.close();
                //dbConn.close();
            }).catch(function (err) {
                res.status(200).json({ data: err, })
                dbConn.close();
            });
        }
        // res.status(200).json({ data: req.body['query'] })

    }
    else if (req.body['type'] === "update" && queryString.includes("update")) {
        var dbConn = await sql.connect(dbConfig);
        if (dbConn) {
            sql.query(req.body['query']).then(function (resp, err) {
                if (err) {
                    res.status(200).json({ data: err, })
                }
                else {
                    if (parseInt(resp.rowsAffected[0]) > 0) {
                        res.status(200).json({ data: 2, msg: "Updated SucessFully...." })
                    } else {
                        res.status(200).json({ data: "No record found...." })
                    }
                }

                //console.log(resp);
                dbConn.close();
                //dbConn.close();
            }).catch(function (err) {
                res.status(200).json({ data: err, })
                dbConn.close();
            });
        }
        // res.status(200
        // res.status(200).json({ data: req.body['query'] })

    }
    else if (req.body['type'] === "delete" && queryString.includes("delete")) {
        var dbConn = await sql.connect(dbConfig);
        if (dbConn) {
            sql.query(req.body['query']).then(function (resp, err) {
                if (err) {
                    res.status(200).json({ data: err, })
                }
                else {
                    if (parseInt(resp.rowsAffected[0]) > 0) {
                        res.status(200).json({ data: 3, msg: "Deleted SucessFully...." })
                    } else {
                        res.status(200).json({ data: "No record found...." })
                    }
                }

                //console.log(resp);
                dbConn.close();
                //dbConn.close();
            }).catch(function (err) {
                res.status(200).json({ data: err, })
                dbConn.close();
            });
        }
        // res.status(200
        // res.status(200).json({ data: req.body['query'] })

    }
    else {
        res.status(200).json({ data: "Check Query And Type....." });
    }

    // res.status(200).json({ data: result })
}