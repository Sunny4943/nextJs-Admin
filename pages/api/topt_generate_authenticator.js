/*const SpeakEasy = require("speakeasy");
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    try {
        // const userId = req.body.UserCode
        const secret = req.body.otp_secret
        const token = req.body.otp_token
        const verified = SpeakEasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: token,
            window: 2
        });

        if (verified) {
            // Update the temporary secret to a permanent secret
            // db.push(path, { id: userId, secret: user.temp_secret });
            res.json({ verified: true })
        } else {
            res.json({ verified: false })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error generating the secret' })
    }

}*/
import { hotp, authenticator, totp } from 'otplib';
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    try {
        const barcode = req.body.BarCode
        const authenticator_otp = authenticator.generate(barcode)
        res.json({ authenticator_otp })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error generating the secret' })
    }
}

