import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2'; // Import manual drivernya

const sequelize = new Sequelize('bki_app', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: mysql2, // PENTING: Paksa pakai mysql2 agar tidak cari pg-hstore
  logging: false,
  define: {
    timestamps: false, // Sesuai file SQL kamu yang tidak punya createdAt/updatedAt
    freezeTableName: true
  }
});

export default sequelize;