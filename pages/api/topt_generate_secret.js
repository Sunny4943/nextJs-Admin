const SpeakEasy = require("speakeasy");
const crypto = require('crypto');
var base32 = require("convert-base32")
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    try {
        // const userId = req.body.UserCode
        const barcode = req.body.UserCode
        const secret = base32.decode(barcode)
        // const temp_secret = SpeakEasy.generateSecret()
        //  db.push(path, { userid, temp_secret })
        // we only need the base32 
        res.json({ "secret": secret })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error generating the secret', err: error })
    }

}



function GetOTP(privateKey, iteration, numOfDigits) {
    const counter = Buffer.alloc(8);
    counter.writeBigInt64BE(BigInt(iteration));

    if (isLittleEndian()) {
        counter.reverse();
    }

    const hmacSha1 = crypto.createHmac('sha1', privateKey);
    const hmacResult = hmacSha1.update(counter).digest();
    const offset = hmacResult[hmacResult.length - 1] & 0xf;
    const binCode = ((hmacResult[offset] & 0x7f) << 24)
        | ((hmacResult[offset + 1] & 0xff) << 16)
        | ((hmacResult[offset + 2] & 0xff) << 8)
        | (hmacResult[offset + 3] & 0xff);
    const password = binCode % Math.pow(10, numOfDigits);
    return password.toString().padStart(numOfDigits, '0');
}

function isLittleEndian() {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256;
}
function GetTOTP(privateKey, numOfDigits, interval) {
    var epoch = new Date('1970-01-01T00:00:00Z');
    var counter = Math.floor((Date.now() - epoch) / 1000 / interval);
    return GetOTP(privateKey, counter, numOfDigits);
}
