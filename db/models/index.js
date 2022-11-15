"use strict";
import Sequelize from "sequelize";
import fs from "fs";
import path from "path";
import config from "../../config/database.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);
const db = {};

let sequelize;
if (config[process.env.NODE_ENV].use_env_variable) {
  sequelize = new Sequelize(
    process.env[config[process.env.NODE_ENV].use_env_variable],
    config[process.env.NODE_ENV]
  );
} else {
  sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      dialect: config.development.dialect,
      port: config.development.port,
      host: config.development.host,
    }
  );
}

const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );

await Promise.all(
  files.map(async (file) => {
    const module = await import(path.join(__dirname, file));
    const model = module.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  })
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
