import { DataSource } from 'typeorm'
import { config } from 'dotenv'

config()

if (!process.env.DB_HOST) throw new Error('no DB_HOST in .env file')
if (!process.env.DB_PORT)
  throw new Error('no DB_PORT or invalid DB_PORT in .env file')
if (!process.env.DB_ENTITIES) throw new Error('no DB_HOST in .env file')
if (!process.env.DB_MIGRATIONS) throw new Error('no DB_HOST in .env file')

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [process.env.DB_ENTITIES],
  migrations: [process.env.DB_MIGRATIONS],
  synchronize: process.env.DB_SYNC === 'true',
})
