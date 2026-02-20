import mysql2 from 'mysql2/promise';

export const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bki_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})