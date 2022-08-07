import client from "../db/db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

async function register(_, res){

    const newUser = res.locals.newUser;

    await client.query(`INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, $4)`, [newUser.name, newUser.email, newUser.password, new Date()]);

    res.sendStatus(201);
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
            
        const oldSession = await client.query(`UPDATE sessions SET token = $1, "createdAt" = $2 WHERE "userId" = $3`, [token, new Date(),userId]);

        if (oldSession.rowCount === 0) {
            await client.query(`INSERT INTO sessions ("userId", token, "createdAt") VALUES ($1, $2, $3)`, [userId, token, new Date()]);
        }
        
        res.status(200).send({ token: `Bearer ${token}` });
}

export { register, login };