const SpeakEasy = require("speakeasy");
/*export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    try {
        // const userId = req.body.UserCode
        const secret = req.body.otp_secret
        let token = SpeakEasy.totp({
            secret: secret,
            encoding: "base32",
        });
        let remaining = 30 - Math.floor((new Date().getTime() / 1000.0) % 30);
        res.json({ token, remaining })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error generating the secret' })
    }

}*/
const crypto = require('crypto');
var base32 = require("convert-base32")
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    try {
        // var barcode = req.body.UserCode
        const barcode = req.body.BarCode
        const privateKey1 = Array.from(base32.decode(barcode))
        const privateKey = new ArrayBuffer(DecodeBase32(barcode))
        var otp = GetTOTP(privateKey, 6, 30)
        res.json({ otp: otp, privateKey: privateKey, privateKey1: privateKey1 })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error generating the secret' })
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
function* DecodeBase32(encodedString) {
    let numOfBit = 0;
    let decoded = 0;
    for (let base32Char of encodedString.toUpperCase()) {
        let base32Val = 0;
        if (base32Char >= 'A' && base32Char <= 'Z') {
            base32Val = base32Char.charCodeAt(0) - 65;
        } else if (base32Char >= '2' && base32Char <= '7') {
            base32Val = base32Char.charCodeAt(0) - 24;
        }
        let bitMask = 0x10;
        for (let i = 0; i < 5; ++i) {
            decoded |= (base32Val & bitMask) !== 0 ? 1 : 0;
            if (++numOfBit === 8) {
                return decoded;
                numOfBit = 0;
                decoded = 0;
            }
            decoded <<= 1;
            bitMask >>= 1;
        }
    }
}
