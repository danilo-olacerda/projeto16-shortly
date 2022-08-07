import client from "../db/db.js";

async function validateSignin(req, res, next) {

    const token = req.headers.authorization?.replace("Bearer ", "");

    const isValid = await client.query(`SELECT * FROM sessions WHERE token = $1`, [token]);

    if (isValid.rows.length === 0) {
        res.status(401).send("Token invalido!");
        return;
    }

    res.locals.userId = isValid.rows[0].userId;
    res.locals.body = req.body;

    next();
}

export default validateSignin;