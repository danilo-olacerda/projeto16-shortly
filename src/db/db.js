import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config();

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log(process.env.DATABASE_URL);

export default client;