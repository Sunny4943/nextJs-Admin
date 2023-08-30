
var Symbol = [];
var Client = [];
var AllClient = [];
var clientDetails = [];
var tempSymolArray = [];
var completedList = [];
var completedRowClickList = [];
var responseRegister = 0
var updClnt = 0
var responseLogin = []
var pendingList = [];
var options = {
    day: "2-digit",
    year: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
}
export async function fetchTokenDB(rowId, tabValue, tempcontractdetails, Symbol, Expiry, Strike, CP) {
    var tokenArray = []
    var Expiry1 = ""
    const tempContractArray = tempcontractdetails
    if (tabValue === 1) {
        if (rowId === 1) {
            tempContractArray.filter((value) => {
                if (value['INSTTYPE'] === "EQUITY" && value['SYMBOL'] === Symbol) {
                    tokenArray[0] = "Token1CM_FO";
                    tokenArray[1] = value['Token'];
                }
            })
        }
        else if (rowId === 2) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt']) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "FUTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry) {
                            tokenArray[0] = "Token2CM_FO";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "FUTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry) {
                            tokenArray[0] = "Token2CM_FO";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })

        }
    }
    else if (tabValue === 2) {
        if (rowId === 1) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt']) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "FUTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry) {
                            tokenArray[0] = "Token1SPREAD";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "FUTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry) {
                            tokenArray[0] = "Token1SPREAD";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })

        }
        else if (rowId === 2) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt']) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "FUTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry) {
                            tokenArray[0] = "Token2SPREAD";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "FUTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry) {
                            tokenArray[0] = "Token2SPREAD";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
    }
    else if (tabValue === 3) {
        if (rowId === 1) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1CONREV";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1CONREV";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })

        }
        else if (rowId === 2) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2CONREV";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2CONREV";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
        else if (rowId === 3) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt']) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "FUTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry) {
                            tokenArray[0] = "Token3CONREV";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "FUTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry) {
                            tokenArray[0] = "Token3CONREV";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
    }
    else if (tabValue === 4) {
        if (rowId === 1) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1BOX";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1BOX";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })

        }
        else if (rowId === 2) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2BOX";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2BOX";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
        else if (rowId === 3) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token3BOX";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token3BOX";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
        else if (rowId === 4) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token4BOX";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token4BOX";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
    }
    else if (tabValue === 5) {
        if (rowId === 1) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1BFLY";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1BFLY";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })

        }
        else if (rowId === 2) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2BFLY";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2BFLY";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
        else if (rowId === 3) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token3BFLY";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token3BFLY";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
    }
    else if (tabValue === 6) {
        if (rowId === 1) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1STRDL";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1STRDL";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })

        }
        else if (rowId === 2) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2STRDL";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2STRDL";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
    }
    else if (tabValue === 7) {
        if (rowId === 1) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1STRNGL";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1STRNGL";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })

        }
        else if (rowId === 2) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2STRNGL";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2STRNGL";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
    }
    else if (tabValue === 8) {
        if (rowId === 1) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1CONDOR";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token1CONDOR";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })

        }
        else if (rowId === 2) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2CONDOR";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token2CONDOR";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
        else if (rowId === 3) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token3CONDOR";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token3CONDOR";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
        else if (rowId === 4) {
            tempContractArray.filter((value) => {
                if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                    var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                    Expiry1 = date
                    if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                        if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token4CONDOR";
                            tokenArray[1] = value['Token'];
                        }
                    }
                    else {
                        if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                            tokenArray[0] = "Token4CONDOR";
                            tokenArray[1] = value['Token'];
                        }
                    }
                }
            })
        }
    }
    else if (tabValue === 9) {
        tempContractArray.filter((value) => {
            if (value['EXPIRYDt'] && parseInt(value['STRIKE']) > 0) {
                var date = new Date(value['EXPIRYDt']).toLocaleDateString('en-GB');
                Expiry1 = date
                if (Symbol === "BANKNIFTY" || Symbol === "FINNIFTY" || Symbol === "MIDCPNIFTY" || Symbol === "NIFTY") {
                    if (value['INSTTYPE'] === "OPTIDX" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                        tokenArray[0] = "Token" + rowId + "Genric";
                        tokenArray[1] = value['Token'];
                    }
                }
                else {
                    if (value['INSTTYPE'] === "OPTSTK" && value['SYMBOL'] === Symbol && Expiry1 === Expiry && (parseInt(value['STRIKE']) / 100) === parseInt(Strike) && value['PUTCALL'] === CP) {
                        tokenArray[0] = "Token" + rowId + "Genric";
                        tokenArray[1] = value['Token'];
                    }
                }
            }
        })
    }
    return tokenArray;
}

export async function fetchSymbolDB() {
    Symbol = [];
    fetch('/api/ctcl_strategyquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: "SELECT DISTINCT SYMBOL FROM TEMPCONTRACT ORDER BY SYMBOL", type: "select" }),
    })
        .then((result) => result.json()) // here
        .then((result) => {
            //console.log(result)

            for (var x in result['data']) {
                //console.log("Symbol : " + result['data'][x]['SYMBOL'])
                Symbol[x] = result['data'][x]['SYMBOL'];
            }
            tempSymolArray[0] = Symbol;

        });

    fetch('/api/ctcl_strategyquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: "SELECT *  FROM TEMPCONTRACT Where Exchange='NSE'", type: "select" }),
    })
        .then((result) => result.json()) // here
        .then((result) => {
            const tempArray = result['data'];
            tempSymolArray[1] = tempArray;
        });
    return tempSymolArray;
}
export async function updatePassword(userID, newPwd) {
    let strQuery = ""
    // strQuery = "select  distinct Userid as ClientCode, UserName as ClientName from CTCL_API.dbo.UserInfo";
    strQuery = "update CTCL_API.dbo.UserInfo set Password='" + newPwd + "' where Userid='" + userID + "'"
    console.log(strQuery)
    updClnt = await fetch('/api/ctcl_apiquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: strQuery, type: "update" }),
    }).then((result) => result.json()) // here
        .then((result) => {
            console.log(result['data'])
            const tempArray = result['data'];
            console.log(result['data'])
            return tempArray;

        }).catch((error) => {
            //completedList[1] = false
            //console.log(error)
        });
    // console.log(updClnt)
    return updClnt;
}
export async function updateClientProfile(userID, userName, contact, city, apiKey, secretKey, barCode) {
    let strQuery = ""
    // strQuery = "select  distinct Userid as ClientCode, UserName as ClientName from CTCL_API.dbo.UserInfo";
    strQuery = "update CTCL_API.dbo.UserInfo set UserName='" + userName + "',Contact='" + contact + "',City='" + city + "',ApiKey='" + apiKey + "',SecretKey='" + secretKey + "',BarCode='" + barCode + "' where Userid='" + userID + "'"
    console.log(strQuery)
    updClnt = await fetch('/api/ctcl_apiquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: strQuery, type: "update" }),
    }).then((result) => result.json()) // here
        .then((result) => {
            console.log(result['data'])
            const tempArray = result['data'];
            console.log(result['data'])
            return tempArray;

        }).catch((error) => {
            //completedList[1] = false
            //console.log(error)
        });
    // console.log(updClnt)
    return updClnt;
}
export async function updateClientSubscription(userID, expiry) {
    let strQuery = ""
    // strQuery = "select  distinct Userid as ClientCode, UserName as ClientName from CTCL_API.dbo.UserInfo";
    strQuery = "update CTCL_API.dbo.UserInfo set SubscriptionExpiry='" + expiry + "',Subscribed=1  where Userid='" + userID + "'"
    console.log(strQuery)
    updClnt = await fetch('/api/ctcl_apiquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: strQuery, type: "update" }),
    }).then((result) => result.json()) // here
        .then((result) => {
            console.log(result['data'])
            const tempArray = result['data'];
            console.log(result['data'])
            return tempArray;

        }).catch((error) => {
            //completedList[1] = false
            //console.log(error)
        });
    // console.log(updClnt)
    return updClnt;
}
export async function fethClientDetails(userID) {
    let strQuery = ""
    // strQuery = "select  distinct Userid as ClientCode, UserName as ClientName from CTCL_API.dbo.UserInfo";
    strQuery = "select * from CTCL_API.dbo.UserInfo where Role=2 and Userid='" + userID + "'"
    console.log(strQuery)
    clientDetails = await fetch('/api/ctcl_apiquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: strQuery, type: "select" }),
    }).then((result) => result.json()) // here
        .then((result) => {
            //console.log(result['data'])
            const tempArray = result['data'];
            // console.log(result['data'])
            return tempArray;

        }).catch((error) => {
            //completedList[1] = false
            //console.log(error)
        });
    console.log(clientDetails)
    return clientDetails;
}
export async function fetchALLCLient() {
    //select  distinct ClientCode, ClientName from ClientMaster
    let strQuery = ""
    // strQuery = "select  distinct Userid as ClientCode, UserName as ClientName from CTCL_API.dbo.UserInfo";
    strQuery = "select * from CTCL_API.dbo.UserInfo where Role=2 order by Userid"
    AllClient = await fetch('/api/ctcl_apiquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: strQuery, type: "select" }),
    }).then((result) => result.json()) // here
        .then((result) => {
            console.log(result['data'])
            const tempArray = result['data'];
            console.log(result['data'])
            return tempArray;

        }).catch((error) => {
            //completedList[1] = false
            //console.log(error)
        });
    console.log(AllClient)
    return AllClient;
}
export async function fetchClientList() {
    //select  distinct ClientCode, ClientName from ClientMaster
    let strQuery = ""
    strQuery = "select  distinct Userid as ClientCode, UserName as ClientName from CTCL_API.dbo.UserInfo where Role=2";
    Client = await fetch('/api/ctcl_apiquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: strQuery, type: "select" }),
    }).then((result) => result.json()) // here
        .then((result) => {
            console.log(result['data'])
            const tempArray = result['data'];
            console.log(result['data'])
            return tempArray;

        }).catch((error) => {
            //completedList[1] = false
            //console.log(error)
        });
    console.log(Client)
    return Client;
}
export async function fetchCompletedList(fromDate, toDate, Client) {
    //alert("hello")
    let tempQuery = ""
    var fromDate1 = new Date(fromDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    var toDate1 = new Date(toDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    let strClient = Client
    if (strClient.match("ALL")) {
        // tempQuery = "select a.ClientID,a.StrategyCode,((isnull(a.SellQty,0))-(isnull(a.BuyQty,0)))Quantity,((isnull(a.SellQty,0)*Round(isnull(a.SellPrice/100,0),2))-(isnull(a.BuyQty,0)*Round(isnull(a.BuyPrice/100,0),2))) as Net,isnull(a.SellQty,0)as SellQty,Round(isNull(a.SellPrice/100,0),2) as SellPrice,isnull(a.BuyQty,0) as BuyQty,Round(isnull(a.BuyPrice/100,0),2) as BuyPrice,a.LTP  from (select (select distinct ClientCode from ScriptTrans where StrategyCode=ord.Settler) as ClientID,rtrim(ord.Settler) as StrategyCode,SUM(case when tc.BuySellIndicator=2 then tc.FillQuantity*(1)  end)as SellQty,avg(case when tc.BuySellIndicator=2 then tc.FillPrice*(1)  end)as SellPrice, SUM(case when tc.BuySellIndicator=1 then tc.FillQuantity*(1)  end)as BuyQty,avg(case when tc.BuySellIndicator=1 then tc.FillPrice*(1)  end)as BuyPrice ,Max(ord.LTPAtTriggerTime) as LTP from TRADE_CONFIRM as tc left join Orders as ord on tc.Token = ord.Token where cast(tc.InsertTime as DATE) >= '" + fromDate1 + "' and cast(tc.InsertTime as DATE) <= '" + toDate1 + "' group by ord.Settler  ) as a  order by a.StrategyCode"
        //tempQuery = "select max(a.ClientID) as ClientID,a.StrategyCode,(sum(isnull(a.SellQty,0))-sum(isnull(a.BuyQty,0))) as Quantity,sum((isnull(a.SellQty,0)*Round(isnull(a.SellPrice/100,0),2))-(isnull(a.BuyQty,0)*Round(isnull(a.BuyPrice/100,0),2))) as Net,sum(isnull(a.SellQty,0)) as SellQty,Avg(Round(isNull(a.SellPrice/100,0),2)) as SellPrice,Sum(isnull(a.BuyQty,0)) as BuyQty,Avg(Round(isnull(a.BuyPrice/100,0),2)) as BuyPrice,avg(a.LTP) as LTP  from (select (select distinct ClientCode from clientDBNSE_Self.dbo.ScriptTrans where StrategyCode=ord.Settler) as ClientID,rtrim(ord.Settler) as StrategyCode,SUM(case when tc.BuySellIndicator=2 then tc.FillQuantity*(1)  end)as SellQty,avg(case when tc.BuySellIndicator=2 then tc.FillPrice*(1)  end)as SellPrice, SUM(case when tc.BuySellIndicator=1 then tc.FillQuantity*(1)  end)as BuyQty,avg(case when tc.BuySellIndicator=1 then tc.FillPrice*(1)  end)as BuyPrice ,Max(ord.LTPAtTriggerTime) as LTP from clientDBNSE_Self.dbo.TRADE_CONFIRM as tc left join clientDBNSE_Self.dbo.Orders as ord on tc.Token = ord.Token where cast(tc.InsertTime as DATE) >= '" + fromDate1 + "' and cast(tc.InsertTime as DATE) <= '" + toDate1 + "'  group by ord.Settler ,ord.Symbol ) as a  group by a.StrategyCode order by a.StrategyCode";
        tempQuery = "select max(a.ClientID) as ClientID,a.StrategyCode,(sum(isnull(a.SellQty,0))-sum(isnull(a.BuyQty,0))) as Quantity,sum((isnull(a.SellQty,0)*Round(isnull(a.SellPrice/100,0),2))-(isnull(a.BuyQty,0)*Round(isnull(a.BuyPrice/100,0),2))) as Net,sum(isnull(a.SellQty,0)) as SellQty,Avg(Round(isNull(a.SellPrice/100,0),2)) as SellPrice,Sum(isnull(a.BuyQty,0)) as BuyQty,Avg(Round(isnull(a.BuyPrice/100,0),2)) as BuyPrice,avg(a.LTP) as LTP,a.StrategyName from (select max(RTRIM(tc.AccountNumber)) as ClientID,(select distinct Logic from clientDBNSE_Self.dbo.StrategyMast where StrategyCode=RTRIM(ord.Settler) ) as StrategyName,rtrim(ord.Settler) as StrategyCode,SUM(case when tc.BuySellIndicator=2 then tc.FillQuantity*(1)  end)as SellQty,avg(case when tc.BuySellIndicator=2 then tc.FillPrice*(1)  end)as SellPrice, SUM(case when tc.BuySellIndicator=1 then tc.FillQuantity*(1)  end)as BuyQty,avg(case when tc.BuySellIndicator=1 then tc.FillPrice*(1)  end)as BuyPrice ,Max(ord.LTPAtTriggerTime) as LTP from clientDBNSE_Self.dbo.TRADE_CONFIRM as tc left join clientDBNSE_Self.dbo.Orders as ord on tc.Token = ord.Token where cast(tc.InsertTime as DATE) >= '" + fromDate1 + "' and cast(tc.InsertTime as DATE) <= '" + toDate1 + "'  group by ord.Settler ,ord.Symbol ) as a  group by a.StrategyCode,a.StrategyName  order by a.StrategyCode"
    }

    else {
        //tempQuery = "select a.ClientID,a.StrategyCode,((isnull(a.SellQty,0))-(isnull(a.BuyQty,0)))Quantity,((isnull(a.SellQty,0)*Round(isnull(a.SellPrice/100,0),2))-(isnull(a.BuyQty,0)*Round(isnull(a.BuyPrice/100,0),2))) as Net,isnull(a.SellQty,0)as SellQty,Round(isNull(a.SellPrice/100,0),2) as SellPrice,isnull(a.BuyQty,0) as BuyQty,Round(isnull(a.BuyPrice/100,0),2) as BuyPrice ,a.LTP from (select (select distinct ClientCode from ScriptTrans where StrategyCode=ord.Settler) as ClientID,rtrim(ord.Settler) as StrategyCode,SUM(case when tc.BuySellIndicator=2 then tc.FillQuantity*(1)  end)as SellQty,avg(case when tc.BuySellIndicator=2 then tc.FillPrice*(1)  end)as SellPrice, SUM(case when tc.BuySellIndicator=1 then tc.FillQuantity*(1)  end)as BuyQty,avg(case when tc.BuySellIndicator=1 then tc.FillPrice*(1)  end)as BuyPrice ,Max(ord.LTPAtTriggerTime) as LTP from TRADE_CONFIRM as tc left join Orders as ord on tc.Token = ord.Token where cast(tc.InsertTime as DATE) >= '" + fromDate1 + "' and cast(tc.InsertTime as DATE) <= '" + toDate1 + "' group by ord.Settler  ) as a where a.ClientId='" + Client + "' order by a.StrategyCode"
        //tempQuery = "select max(a.ClientID) as ClientID,a.StrategyCode,(sum(isnull(a.SellQty,0))-sum(isnull(a.BuyQty,0))) as Quantity,sum((isnull(a.SellQty,0)*Round(isnull(a.SellPrice/100,0),2))-(isnull(a.BuyQty,0)*Round(isnull(a.BuyPrice/100,0),2))) as Net,sum(isnull(a.SellQty,0)) as SellQty,Avg(Round(isNull(a.SellPrice/100,0),2)) as SellPrice,Sum(isnull(a.BuyQty,0)) as BuyQty,Avg(Round(isnull(a.BuyPrice/100,0),2)) as BuyPrice,avg(a.LTP) as LTP  from (select (select distinct ClientCode from clientDBNSE_Self.dbo.ScriptTrans where StrategyCode=ord.Settler) as ClientID,rtrim(ord.Settler) as StrategyCode,SUM(case when tc.BuySellIndicator=2 then tc.FillQuantity*(1)  end)as SellQty,avg(case when tc.BuySellIndicator=2 then tc.FillPrice*(1)  end)as SellPrice, SUM(case when tc.BuySellIndicator=1 then tc.FillQuantity*(1)  end)as BuyQty,avg(case when tc.BuySellIndicator=1 then tc.FillPrice*(1)  end)as BuyPrice ,Max(ord.LTPAtTriggerTime) as LTP from clientDBNSE_Self.dbo.TRADE_CONFIRM as tc left join clientDBNSE_Self.dbo.Orders as ord on tc.Token = ord.Token where cast(tc.InsertTime as DATE) >= '" + fromDate1 + "' and cast(tc.InsertTime as DATE) <= '" + toDate1 + "'  group by ord.Settler ,ord.Symbol ) as a  where a.ClientId='" + Client + "' group by a.StrategyCode order by a.StrategyCode";
        tempQuery = "select max(a.ClientID) as ClientID,a.StrategyCode,(sum(isnull(a.SellQty,0))-sum(isnull(a.BuyQty,0))) as Quantity,sum((isnull(a.SellQty,0)*Round(isnull(a.SellPrice/100,0),2))-(isnull(a.BuyQty,0)*Round(isnull(a.BuyPrice/100,0),2))) as Net,sum(isnull(a.SellQty,0)) as SellQty,Avg(Round(isNull(a.SellPrice/100,0),2)) as SellPrice,Sum(isnull(a.BuyQty,0)) as BuyQty,Avg(Round(isnull(a.BuyPrice/100,0),2)) as BuyPrice,avg(a.LTP) as LTP,a.StrategyName from (select max(RTRIM(tc.AccountNumber)) as ClientID,(select distinct Logic from clientDBNSE_Self.dbo.StrategyMast where StrategyCode=RTRIM(ord.Settler) ) as StrategyName,rtrim(ord.Settler) as StrategyCode,SUM(case when tc.BuySellIndicator=2 then tc.FillQuantity*(1)  end)as SellQty,avg(case when tc.BuySellIndicator=2 then tc.FillPrice*(1)  end)as SellPrice, SUM(case when tc.BuySellIndicator=1 then tc.FillQuantity*(1)  end)as BuyQty,avg(case when tc.BuySellIndicator=1 then tc.FillPrice*(1)  end)as BuyPrice ,Max(ord.LTPAtTriggerTime) as LTP from clientDBNSE_Self.dbo.TRADE_CONFIRM as tc left join clientDBNSE_Self.dbo.Orders as ord on tc.Token = ord.Token where cast(tc.InsertTime as DATE) >= '" + fromDate1 + "' and cast(tc.InsertTime as DATE) <= '" + toDate1 + "'  group by ord.Settler ,ord.Symbol ) as a  where a.ClientId='" + Client + "' group by a.StrategyCode,a.StrategyName order by a.StrategyCode"
    }
    console.log(tempQuery) // completedList = await fetch('/api/ctcl_strategyquery', {
    completedList = await fetch('/api/ctcl_strategyquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: tempQuery, type: "select" }),
    })
        .then((result) => result.json()) // here
        .then((result) => {
            const tempArray = result['data'];
            if (tempArray) {
                for (var i = 0; i < tempArray.length; i++) {
                    if (tempArray[i]['Net']) {
                        tempArray[i]['Net'] = parseFloat(tempArray[i]['Net']).toFixed(2)
                    }
                    if (parseInt(tempArray[i]['Quantity']) < 0) {
                        tempArray[i]['Quantity'] = parseInt(tempArray[i]['Quantity']) * (-1)
                    }
                    else if (parseInt(tempArray[i]['Quantity']) >= 0) {
                        tempArray[i]['Quantity'] = parseInt(tempArray[i]['Quantity']) * (1)
                    }

                }

            }
            return tempArray;

        }).catch((error) => {
            //completedList[1] = false
        });
    console.log(completedList)
    return completedList;
}
export async function fetchOnCompletedRowClick(strategy) {
    const lang = navigator.language || navigator.languages[0];
    let tempQuery = ""
    // tempQuery = "select rtrim(ord.Symbol) as Instrument,max(Ord.TriggerTime) as EntryTime,Sum(trd.FillQuantity) as EntryQty,max(ord.NewOrdPrice) as EntryPrice,max(Ord.LastModified) as ExitTime,Sum(trd.FillQuantity) as ExitQty,max(ord.LTPAtTriggerTime) as ExitPrice,max(ord.TriggerType)as TradeType,MAX(ord.OrderStatus) as Status,SUM(case when trd.BuySellIndicator=1 then trd.FillQuantity*(1) else trd.FillQuantity*(-1) end)as Net from Orders as ord left Join TRADE_CONFIRM as Trd on Ord.Token=trd.Token where Settler='" + strategy + "' Group By ord.Symbol";
    // tempQuery = "select a.Instrument,a.EntryTime,isnull(a.EntryQty,0) as EntryQty,Round(isNull(a.EntryPrice/100,0),2) as EntryPrice,a.ExitTime,isnull(a.ExitQty,0) as ExitQty,Round(isNull(a.ExitPrice/100,0),2) as ExitPrice,a.TradeType,a.Status,((isnull(a.EntryQty,0)*Round(isnull(a.EntryPrice/100,0),2))-(isnull(a.ExitQty,0)*Round(isnull(a.ExitPrice/100,0),2))) as Net from (select  rtrim(max(ord.Symbol)) as Instrument,max(case when tc.BuySellIndicator=2 then tc.InsertTime end) as EntryTime,SUM(case when tc.BuySellIndicator=2 then tc.FillQuantity*(1)  end) as EntryQty,avg(case when tc.BuySellIndicator=2 then tc.FillPrice*(1)  end)as EntryPrice,max(case when tc.BuySellIndicator=1 then tc.InsertTime end) as ExitTime, SUM(case when tc.BuySellIndicator=1 then tc.FillQuantity*(1)  end)as ExitQty,avg(case when tc.BuySellIndicator=1 then tc.FillPrice*(1)  end)as ExitPrice,max(ord.TriggerType)as TradeType,MAX(ord.OrderStatus) as Status from clientDBNSE_Self.dbo.TRADE_CONFIRM as tc left join clientDBNSE_Self.dbo.Orders as ord on tc.Token = ord.Token where ord.Settler='" + strategy + "' group by ord.Settler,ord.symbol) as a"
    tempQuery = "select a.Instrument,CONVERT(varchar(50),CAST(a.EntryTime AS datetime),120) as EntryTime,isnull(a.EntryQty,0) as EntryQty,Round(isNull(a.EntryPrice/100,0),2) as EntryPrice,CONVERT(varchar(50),CAST(a.ExitTime AS datetime),120) as ExitTime,isnull(a.ExitQty,0) as ExitQty,Round(isNull(a.ExitPrice/100,0),2) as ExitPrice,a.TradeType,a.Status,((isnull(a.EntryQty,0)*Round(isnull(a.EntryPrice/100,0),2))-(isnull(a.ExitQty,0)*Round(isnull(a.ExitPrice/100,0),2))) as Net from (select  (select distinct rtrim(SHORTNAME) from clientDBNSE_Self.dbo.TEMPCONTRACT where Token=(ord.Token) ) as Instrument,max(case when tc.BuySellIndicator=2 then tc.InsertTime end) as EntryTime,SUM(case when tc.BuySellIndicator=2 then tc.FillQuantity*(1)  end) as EntryQty,avg(case when tc.BuySellIndicator=2 then tc.FillPrice*(1)  end)as EntryPrice,max(case when tc.BuySellIndicator=1 then tc.InsertTime end) as ExitTime, SUM(case when tc.BuySellIndicator=1 then tc.FillQuantity*(1)  end)as ExitQty,avg(case when tc.BuySellIndicator=1 then tc.FillPrice*(1)  end)as ExitPrice,max(ord.TriggerType)as TradeType,MAX(ord.OrderStatus) as Status from clientDBNSE_Self.dbo.TRADE_CONFIRM as tc left join clientDBNSE_Self.dbo.Orders as ord on tc.Token = ord.Token where ord.Settler='" + strategy + "' group by ord.Settler,ord.symbol,ord.Token) as a"
    // completedList = await fetch('/api/ctcl_strategyquery', {
    completedRowClickList = await fetch('/api/ctcl_strategyquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: tempQuery, type: "select" }),
    })
        .then((result) => result.json()) // here
        .then((result) => {
            const tempArray = result['data'];
            console.log(result['data'])
            if (tempArray) {
                for (var i = 0; i < tempArray.length; i++) {
                    if (tempArray[i]['EntryPrice']) {
                        tempArray[i]['EntryPrice'] = parseFloat(tempArray[i]['EntryPrice']).toFixed(2);
                    }
                    if (tempArray[i]['ExitPrice']) {
                        tempArray[i]['ExitPrice'] = parseFloat(tempArray[i]['ExitPrice']).toFixed(2);
                    }
                    if (tempArray[i]['Net']) {
                        tempArray[i]['Net'] = parseFloat(tempArray[i]['Net']).toFixed(2);
                    }
                    if (tempArray[i]['EntryTime']) {
                        const entryTime = new Date(tempArray[i]['EntryTime'])
                        tempArray[i]['EntryTime'] = entryTime.toLocaleString(lang, options)
                        //tempArray[i]['EntryTime'] = entryTime.toLocaleString("en-GB", options)
                        // tempArray[i]['EntryTime'] = new Date(tempArray[i]['EntryTime']).toLocaleString("en-GB", options);
                        //console.log(tempArray[i]['EntryTime'])
                    }
                    if (tempArray[i]['ExitTime']) {
                        const entryTime = new Date(tempArray[i]['ExitTime'])
                        tempArray[i]['ExitTime'] = entryTime.toLocaleString(lang, options)
                        // tempArray[i]['ExitTime'] = new Date(tempArray[i]['ExitTime']).toLocaleString(lang, options);
                    }
                }

            }
            return tempArray;

        }).catch((error) => {
            //completedList[1] = false
        });
    // console.log(completedList)
    return completedRowClickList;
}

export async function userRegister(userName, contact, city, userId, pwd, Apikey, SecretKey, BarCode) {
    var countUser = 0;
    let tempQuery = ""
    tempQuery = "select Count(*) as countUser from CTCL_API.dbo.UserInfo  where UserId='" + userId + "'";

    await fetch('/api/ctcl_apiquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: "select isnull(MAX(UserCode),0) as maxUser from CTCL_API.dbo.UserInfo", type: "select" }),
    }).then((response) => response.json())
        .then((response) => {
            //console.log(response['data'][0]['maxUser'])
            countUser = response['data'][0]['maxUser']
        }).catch((err) => {
            console.log(err)
        })
    //console.log(tempQuery)
    await fetch('/api/ctcl_apiquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: tempQuery, type: "select" }),
    }).then((result) => result.json()) // here
        .then((result) => {

            if (parseInt(result['data'][0]['countUser'])) {
                console.log(result)
                responseRegister = 1
            }
            else if (parseInt(result['data'][0]['countUser']) === 0) {
                var insertDateTime = new Date().toLocaleString('af-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                var SubsciptionExpiry = new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString('af-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                tempQuery = "Insert Into CTCL_API.dbo.UserInfo(Userid,Password,ApiKey,SecretKey,Stopped,UserCode,Barcode,insertDateTime,SubscriptionExpiry,Subscribed,UserName,Contact,City,Role) values('" + userId + "','" + pwd + "','" + Apikey + "','" + SecretKey + "','0'," + (countUser + 1) + ",'" + BarCode + "','" + insertDateTime + "','" + SubsciptionExpiry + "',0,'" + userName + "'," + contact + ",'" + city + "',2)";
                console.log(tempQuery)
                return fetch('/api/ctcl_apiquery', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: tempQuery, type: "insert" }),
                }).then((result1) => result1.json())
                    .then((result1) => {
                        // console.log(result1['data'])
                        if (parseInt(result1["data"]) === 1) {
                            responseRegister = 2
                        }
                        //responseRegister = 2

                    }).catch((error) => {
                        responseRegister = 3
                    })
            }


        }).catch((error) => {
            console.log(error)
            responseRegister = 4
        });
    console.log(responseRegister)
    return responseRegister;
}
export async function userLogin(userId, pwd) {
    let tempQuery = ""
    tempQuery = "select UserName,UserID,Password,SubscriptionExpiry,Subscribed from CTCL_API.dbo.UserInfo where UserId='" + userId + "'";

    console.log(tempQuery)
    await fetch('/api/ctcl_apiquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: tempQuery, type: "select" }),
    }).then((result) => result.json()) // here
        .then((result) => {

            if (result['data'][0]) {
                //console.log(result)
                if (result['data'][0]['Password'] === pwd) {
                    responseLogin[0] = 1
                    responseLogin[1] = result['data'][0]
                }
                else {
                    responseLogin[0] = 2
                }

            }
            else {
                responseLogin[0] = 3
            }


        }).catch((error) => {
            console.log(error)
            responseLogin[0] = 4
        });
    console.log(responseLogin)
    return responseLogin;
}

async function fetchPendingList(fromDate, toDate, Client) {

}
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return 10;
}
export default { fetchCompletedList, fetchPendingList, wait, fetchOnCompletedRowClick, userRegister, userLogin, fetchALLCLient, fethClientDetails, updateClientSubscription }