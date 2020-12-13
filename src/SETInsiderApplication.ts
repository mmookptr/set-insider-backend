import { EntityTarget, getConnection, Repository } from "typeorm"
import { Stock } from "./models/Stock"
import { Price } from "./models/Price"
import { SocialMediaNews } from "./models/SocialMediaNews"
import { OfficialNews } from "./models/OfficialNews"
import { Request, Response } from "express"

type Symbol = string

class SETInsiderApplication {
  constructor() {
    this.getStockSymbols = this.getStockSymbols.bind(this)
    this.getStockPricesBySymbol = this.getStockPricesBySymbol.bind(this)
    this.getStockSocialMediaNewsBySymbol = this.getStockSocialMediaNewsBySymbol.bind(
      this
    )
    this.getStockOfficialNewsBySymbol = this.getStockOfficialNewsBySymbol.bind(
      this
    )
  }

  public async getStockSymbols(req: Request, res: Response) {
    const stocks = await this.getAllStocks()
    const stockSymbols = stocks.map((stock) => stock.symbol)

    res.send({ result: stockSymbols })
  }

  public async getStockPricesBySymbol(req: Request, res: Response) {
    const symbol = (req as any).query.symbol
    const stock = await this.getStockBySymbol(symbol)
    const prices = await this.getPricesByStock(stock)

    res.send({ result: prices })
  }

  public async getStockOfficialNewsBySymbol(req: Request, res: Response) {
    const symbol = (req as any).query.symbol
    const stock = await this.getStockBySymbol(symbol)
    const officialNews = await this.getOfficialNewsByStock(stock)

    res.send({ result: officialNews })
  }

  public async getStockSocialMediaNewsBySymbol(req: Request, res: Response) {
    const symbol = (req as any).query.symbol
    const stock = await this.getStockBySymbol(symbol)
    const news = await this.getSocialMediaNewsByStock(stock)

    res.send({ result: news })
  }

  private async getAllStocks(): Promise<Stock[]> {
    return await this.getDataWithGivenFilter({}, Stock)
  }

  private async getStockBySymbol(symbol: Symbol): Promise<Stock> {
    const stock = await this.getOneData({ symbol: symbol }, Stock)

    if (!stock) throw new Error(`no stock with symbol: ${symbol}`)

    return stock
  }

  private async getPricesByStock(stock: Stock): Promise<Price[]> {
    return await this.getDataWithGivenFilter({ stock }, Price)
  }

  private async getOfficialNewsByStock(stock: Stock): Promise<OfficialNews[]> {
    return await this.getDataWithGivenFilter({ stock }, OfficialNews)
  }

  private async getSocialMediaNewsByStock(
    stock: Stock
  ): Promise<SocialMediaNews[]> {
    return await this.getDataWithGivenFilter({ stock }, SocialMediaNews)
  }

  private async getOneData<T>(
    filter: any,
    entity: EntityTarget<T>
  ): Promise<T | undefined> {
    const repository: Repository<T> = this.getRepositoryForEntity(entity)

    return await repository.findOne({ where: filter })
  }

  private async getDataWithGivenFilter<T>(
    filter: any,
    entity: EntityTarget<T>
  ): Promise<T[]> {
    const repository: Repository<T> = this.getRepositoryForEntity(entity)

    return await repository.find({ where: filter })
  }

  private getRepositoryForEntity<T>(entity: EntityTarget<T>): Repository<T> {
    const connection = getConnection()
    const repository = connection.getRepository(entity)

    return repository
  }
}

export { SETInsiderApplication }
