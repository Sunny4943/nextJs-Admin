
var Symbol = [];
var tempSymolArray = [];
var completedList = [];
var pendingList = [];
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
//grid-template-columns: repeat(auto-fit, minmax(90px, auto)[col-middle] minmax(90px, auto) [col-end]);
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
export async function fetchCompletedList(fromDate, toDate, Client) {
    let tempQuery = ""
    var fromDate1 = new Date(fromDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    var toDate1 = new Date(toDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    let strClient = Client
    if (strClient.match("ALL")) {
        tempQuery = "select st.ClientCode as ClientID,st.StrategyCode, Max(FillQuantity) as Quantity,SUM(case when BuySellIndicator=1 then FillQuantity*(1) else FillQuantity*(-1) end)as Net from TRADE_CONFIRM as tc left join ScriptTrans as st on tc.Token = st.Token where cast(tc.InsertTime as DATE) >= '" + fromDate1 + "' and cast(tc.InsertTime as DATE) <= '" + toDate1 + "' group by st.StrategyCode,st.ClientCode order by st.ClientCode,st.StrategyCode";
    }
    else {
        console.log("Not Found....");

    }
    // completedList = await fetch('/api/ctcl_strategyquery', {
    completedList = await fetch('https://a761-103-221-76-177.ngrok-free.app/api/ctcl_strategyquery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: tempQuery, type: "select" }),
    })
        .then((result) => result.json()) // here
        .then((result) => {
            const tempArray = result['data'];
            return tempArray;

        }).catch((error) => {
            //completedList[1] = false
        });
    console.log(completedList)
    return completedList;
}
async function fetchPendingList(fromDate, toDate, Client) {

}
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return 10;
}
export default { fetchCompletedList, fetchPendingList, wait }