import client from "../db/db.js";
import loginSchema from "../schemas/loginSchema.js";

async function validateSignup(req, res, next) {

    const  user = req.body;

    const { error } = loginSchema.validate(user);

    if (error) {
        res.status(422).send(error);
        return;
    }

    const { email } = user;
    
    const userExists = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
    
    if (!userExists.rows[0]) {
        res.status(401).send("Email ou senha inválidos!");
        return;
    }

    res.locals.user = user;
    res.locals.userExists = userExists.rows[0];
    
    next();
}

export default validateSignup;