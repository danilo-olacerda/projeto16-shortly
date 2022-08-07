import client from "../db/db.js";

async function getUserInfo(_, res){
        
        const { userId } = res.locals;
        
        const user = await client.query(`SELECT * FROM users WHERE id = $1`, [userId]);
        
        if (user.rows.length === 0) {
            res.status(404).send("Usuário não encontrado!");
            return;
        }

        const userUrls = await client.query(`SELECT id, "shortUrl", url, "timesClicked" AS "visitCount" FROM links WHERE "userId" = $1`, [userId]);

        let count = 0;

        for (let i = 0; i < userUrls.rows.length; i++) {
            count += userUrls.rows[i].visitCount;
        }
        
        const response = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            visitCount: count,
            shortenedUrls: userUrls.rows
        }
        
        res.status(200).send(response);
}

async function getUsersRank(_, res){

    const users = await client.query(`SELECT users.id, name, COUNT(links.id) AS "linksCount", COALESCE(SUM(links."timesClicked"), 0) AS "visitCount" FROM users LEFT JOIN links ON users.id = links."userId" GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10`);
    
    res.status(200).send(users.rows);
}

export { getUserInfo, getUsersRank };