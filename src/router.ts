import { Router } from "express"
import { SETInsiderApplication } from "./SETInsiderApplication"

function createRouter(setInsiderApplication: SETInsiderApplication) {
  const router = Router()

  router.get("/", (req, res) => res.send("Hello"))

  router.get("/stock/symbol", setInsiderApplication.getStockSymbols)

  router.get("/stock/price", setInsiderApplication.getStockPricesBySymbol)

  router.get(
    "/stock/official-news",
    setInsiderApplication.getStockOfficialNewsBySymbol
  )

  router.get("/stock/socialmedia-news", setInsiderApplication.getStockNewsBySymbol)

  return router
}

export { createRouter }
