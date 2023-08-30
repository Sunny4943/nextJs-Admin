const zerodhaLogin = require("zerodha-auto-login")

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    try {
        const apiKey = req.body.ApiKey
        const SecretKey = req.body.SecretKey
        const ClientId = req.body.ClntID
        const ClientPassword = req.body.Clntpwd
        const topt = req.body.Totp

        var login = await zerodhaLogin(apiKey, SecretKey, ClientId, ClientPassword, topt)
        // sleep(30000)
        if (login) {
            res.json({ login })
        }
        else {
            // sleep(25000)
            res.json({ login })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error generating the secret' })
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}