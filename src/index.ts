import express from "express"
import "reflect-metadata"
import { createConnection } from "typeorm"
import { SETInsiderApplication } from "./SETInsiderApplication"
import { createRouter } from "./router"
import cors from "cors"

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
