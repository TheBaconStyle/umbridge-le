import { DataSource } from 'typeorm'
import { config } from 'dotenv'

config()

if (!process.env.DB_URL) throw new Error('no DB_URL in .env file')
if (!process.env.DB_ENTITIES) throw new Error('no DB_ENTITIES in .env file')
if (!process.env.DB_MIGRATIONS) throw new Error('no DB_MIGRATIONS in .env file')

export const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: process.env.DB_URL,
  entities: [process.env.DB_ENTITIES],
  migrations: [process.env.DB_MIGRATIONS],
})
