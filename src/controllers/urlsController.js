import client from "../db/db.js";
import newUrlSchema from "../schemas/newUrlSchema.js";
import { nanoid } from 'nanoid';

async function newShortUrl(req, res){

    const url = res.locals.body;
    const userId = res.locals.userId;

    const { error } = newUrlSchema.validate(url);

    if (error) {
        res.status(422).send(error);
        return;
    }

    const shortUrl = nanoid(8);

    await client.query(`INSERT INTO links (url, "shortUrl", "userId", "createdAt") VALUES ($1, $2, $3, $4)`, [url.url, shortUrl, userId, new Date()]);

    res.status(201).send({ shortUrl })

}

async function urlsById(req, res){
    
        const { id } = req.params;

        if (typeof id !== "number") {
            res.status(422).send("Id deve ser um número!");
            return;
        }
    
        const url = await client.query(`SELECT * FROM links WHERE id = $1`, [id]);
    
        if (url.rows.length === 0) {
            res.status(404).send("Url não encontrada!");
            return;
        }

        const response = {
            id,
            shortUrl: url.rows[0].shortUrl,
            url: url.rows[0].url
        }
    
        res.status(200).send(response);
}

async function openUrl(req, res){
        
        const { shortUrl } = req.params;
    
        const url = await client.query(`SELECT * FROM links WHERE "shortUrl" = $1`, [shortUrl]);
    
        if (url.rows.length === 0) {
            res.status(404).send("Url não encontrada!");
            return;
        }
    
        res.redirect(url.rows[0].url);
}

export {  newShortUrl, urlsById, openUrl };