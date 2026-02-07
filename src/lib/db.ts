import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'
import 'dotenv/config'
// Create the connection pool using your env variable
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// Initialize the adapter
const adapter = new PrismaPg(pool)

// Pass the adapter to the client
export const prismaClient = new PrismaClient({ adapter })