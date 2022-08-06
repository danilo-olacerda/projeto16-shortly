import client from "../db/db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

async function register(_, res){

    const newUser = res.locals.newUser;

    await client.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [newUser.name, newUser.email, newUser.password]);

    res.send(201);
}

async function login(_, res){
    
        const { password } = res.locals.user;
        const hash = res.locals.userExists.password;
        const userId = res.locals.userExists.id;

        const isValid = await bcrypt.compare(password, hash);
    
        if (!isValid) {
            res.status(401).send("Email ou senha inválidos!");
            return;
        }

        const token = uuid();

        await client.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [userId, token]);
        
        res.status(200).send({ token });
}

export { register, login };