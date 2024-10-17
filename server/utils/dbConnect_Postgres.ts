import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

class DBPostgresSqlConnection {
  private dbUri: string;
  private pool: Pool;

  constructor() {
    this.dbUri = process.env.DB_URIPOSTGRESQL || "";

    if (!this.dbUri || !this.dbUri.startsWith("postgresql://")) {
      console.error('Invalid PostgreSQL URI. Must start with "postgresql://".');
      process.exit(1);
    }

    this.pool = new Pool({
      connectionString: this.dbUri,
    });
  }

  public async connect(): Promise<void> {
    try {
      const client = await this.pool.connect();
      console.log("Database Connected: PostgreSQL");
      client.release();
    } catch (err) {
      console.error(`Database Error: ${(err as Error).message}`);
      process.exit(1);
    }
  }

  public async query(text: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      return await client.query(text, params);
    } finally {
      client.release();
    }
  }
}

export default DBPostgresSqlConnection;
