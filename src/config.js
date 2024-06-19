import { config } from "dotenv";
config();

export const dbName = process.env.dbName || "InventarioGD";
export const MONGODB_URI = 
process.env.MONGODB_URI || `mongodb://localhost:27017/${ dbName }`;
export const PORT = process.env.PORT || 4000;

export const SECRET = "D1f@r3S3cr3tK3y";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "supervisor@grupodifare.com";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "Difare";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "T3cn0l0g1@";