"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Adresse_1 = require("../models/Adresse");
const User_1 = require("../models/User");
const conifg_1 = require("./conifg");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: conifg_1.DB_URIPOSTGRESQL,
    synchronize: true,
    logging: false,
    entities: [Adresse_1.Adresse, User_1.User],
});
//# sourceMappingURL=data-source.js.map