// pages/api/login.ts
import { withIronSession } from "next-iron-session";
async function handler(req, res) {
    // get user from database then:
    // console.log(req.session.)
    //let queryString = req.query;
    if ((String(req.query.user) !== "") && (req.query.user)) {
        req.session.set("user", {
            user: req.query.user,
            admin: req.query.admin,
        });
        await req.session.save();
        // return res.send("Logged in");
        return res.json(true);
    }
    else {
        return res.json(false);
    }
}
export default withIronSession(handler, {
    // password: "complex_password_at_least_32_characters_long",
    password: "77e8ad3fcd06b471b0c0f1a3e4f9bd30a7708c1f",
    cookieName: "userID_Token_cookie",
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        //expires:
        sameSite: "lax",
        // The next line makes sure browser will expire cookies before seals are considered expired by the server. It also allows for clock difference of 60 seconds maximum between server and clients.
        // maxAge: 300,

        path: "/",
    },
});
