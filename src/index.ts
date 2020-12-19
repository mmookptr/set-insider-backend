import express from "express"
import "reflect-metadata"
import {
  createConnection,
  ConnectionOptions,
  getConnectionOptions,
} from "typeorm"
import { SETInsiderApplication } from "./SETInsiderApplication"
import { createRouter } from "./router"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

async function getOptions(): Promise<ConnectionOptions> {
  let connectionOptions: ConnectionOptions
  connectionOptions = {
    type: "postgres",
    synchronize: true,
    logging: false,
    entities: ["dist/entity/*.*"],
  }

  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL })
  } else {
    // gets your default configuration
    // you could get a specific config by name getConnectionOptions('production')
    // or getConnectionOptions(process.env.NODE_ENV)
    connectionOptions = await getConnectionOptions()
  }

  return connectionOptions
}

createConnection()
  .then((connection) => {
    const app = express()
    const port = 3001
    const setInsiderApplication = new SETInsiderApplication()
    const router = createRouter(setInsiderApplication)

    app.use(cors())
    app.use(express.json())
    app.use(router)

    app.listen(port, () =>
      console.log(`SET Insider Application Backend is on port ${port}!`)
    )
  })
  .catch((error) => console.log("fail to connect db due to" + error))
