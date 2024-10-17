import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export class DatabaseConnection {
  private dbUri: string;

  constructor() {
    this.dbUri = process.env.DB_URIMONGODB || "";
    if (!this.dbUri) {
      console.error("Database URI not found in environment variables");
      process.exit(1);
    }
  }

  public async connect(): Promise<void> {
    try {
      const conn = await mongoose.connect(this.dbUri);
      console.log(`Database Connected: ${conn.connection.host}`);
    } catch (err) {
      console.error(`Database Error: ${(err as Error).message}`);
      process.exit(1);
    }
  }
}

export default DatabaseConnection;
