import 'dotenv/config'

export interface IConfig {
  port: number;
  yandexAPIToken: string;
}

export default {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  yandexAPIToken: process.env.YANDEX_API_TOKEN || ''
}
