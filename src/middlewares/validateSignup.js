import bcrypt from 'bcrypt';
import client from "../db/db.js";
import userSchema from "../schemas/newUserSchema.js";

async function validateSignin(req, res, next) {

    const  newUser = req.body;

    const { error } = userSchema.validate(newUser);

    if (error) {
        res.status(422).send(error);
        return;
    }

    if (newUser.password !== newUser.confirmPassword) {
        res.status(422).send("As senha devem ser iguais!");
        return;
    }

    const emailAlreadyExists = await client.query(`SELECT * FROM users WHERE email = $1`, [newUser.email]);

    if (emailAlreadyExists.rows.length > 0) {
        res.status(409).send("Email já cadastrado");
        return;
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);
    delete newUser.confirmPassword;

    res.locals.newUser = newUser;

    next();
}

export default validateSignin;