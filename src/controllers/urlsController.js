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

    if (isNaN(Number(id))) {
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

    const url = await client.query(`UPDATE links SET "timesClicked" = "timesClicked" + 1 WHERE "shortUrl" = $1 RETURNING *`, [shortUrl]);

    if (url.rows.length === 0) {
        res.status(404).send("Url não encontrada!");
        return;
    }
    
    res.redirect(url.rows[0].url);
}

async function deleteById(req, res){
        
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(422).send("Id deve ser um número!");
        return;
    }

    const url = await client.query(`SELECT * FROM links WHERE id = $1`, [id]);

    if (url.rows.length === 0) {
        res.status(404).send("Url não encontrada!");
        return;
    }

    if (url.rows[0].userId !== res.locals.userId) {
        res.status(401).send("A url não pertence ao usuário!");
        return;
    }

    await client.query(`DELETE FROM links WHERE id = $1`, [id]);

    res.sendStatus(204);
}

export {  newShortUrl, urlsById, openUrl, deleteById };