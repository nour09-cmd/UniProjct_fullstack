"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DBPostgresSqlConnection {
    constructor() {
        // PostgreSQL URI aus der .env-Datei
        this.dbUri = process.env.DB_URIPOSTGRESQL || "";
        if (!this.dbUri || !this.dbUri.startsWith("postgresql://")) {
            console.error('Invalid PostgreSQL URI. Must start with "postgresql://".');
            process.exit(1);
        }
        // Pool für die Datenbankverbindung
        this.pool = new pg_1.Pool({
            connectionString: this.dbUri,
        });
    }
    // Verbindet mit der Datenbank
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield this.pool.connect();
                console.log("Database Connected: PostgreSQL");
                client.release();
            }
            catch (err) {
                console.error(`Database Error: ${err.message}`);
                process.exit(1);
            }
        });
    }
    // Führt SQL-Abfragen aus
    query(text, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                return yield client.query(text, params);
            }
            finally {
                client.release();
            }
        });
    }
    // Methode zum Initialisieren der Datenbank (Tabellen erstellen)
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Mit der Datenbank verbinden
                yield this.connect();
                // Tabelle 'adressen' erstellen
                yield this.query(`
        CREATE TABLE IF NOT EXISTS adressen (
          id SERIAL PRIMARY KEY,
          strasse VARCHAR(100) NOT NULL,
          ort VARCHAR(100) NOT NULL,
          plz INT NOT NULL
        );
      `);
                console.log("Tabelle 'adressen' wurde erfolgreich erstellt!");
                // Tabelle 'users' erstellen
                yield this.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          vorname VARCHAR(100) NOT NULL,
          nachname VARCHAR(100) NOT NULL,
          email VARCHAR(150) UNIQUE NOT NULL,
          handynummer VARCHAR(15),
          geburtsdatum DATE NOT NULL,
          adresse_id INT REFERENCES adressen(id) ON DELETE SET NULL
        );
      `);
                console.log("Tabelle 'users' wurde erfolgreich erstellt!");
            }
            catch (err) {
                console.error("Fehler beim Initialisieren der Tabellen:", err);
                process.exit(1);
            }
        });
    }
}
exports.default = DBPostgresSqlConnection;
//# sourceMappingURL=dbConnect_Postgres.js.map