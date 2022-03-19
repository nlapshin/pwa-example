import { Express, Request, Response } from "express";
import { translate } from 'free-translate'

export class Translate {
  constructor(private readonly server: Express) {}
  
  public register() {
    this.routes()
  }

  private routes() {
    this.server.post('/translate', async (req: Request, res: Response) => {
      const { body } = req
      const { text } = body

      const ru = await translate(text, { from: 'en', to: 'ru' })

      res.status(200).json({
        ru
      })
    })
  }
}
