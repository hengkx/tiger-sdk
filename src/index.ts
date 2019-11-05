import * as moment from 'moment-timezone';
import Stock from './quote/stock';
import Option, { IOptionKLineParams } from './quote/option';

export interface ITiger {
  tigerId: string;
  privateKey: string;
  publicKey: string;
}

interface IQuoteRealTimeParams {
  symbols: string[];
}

class Tiger {
  stock: Stock;
  option: Option;
  constructor(opts: ITiger) {
    this.stock = new Stock(opts);
    this.option = new Option(opts);
  }

  async getQuoteRealTime({ symbols }: IQuoteRealTimeParams) {
    const stockSymbols: string[] = [];
    const optionSymbols: string[] = [];
    const optionParams: IOptionKLineParams[] = [];
    const today = moment().format('YYYY-MM-DD');

    const beginTime = moment.tz(moment(today).add(-15, 'd'), 'America/New_York').valueOf();
    const endTime = moment.tz(today, 'America/New_York').valueOf();
    symbols.forEach(item => {
      const arr = item.split(' ');
      if (arr.length === 4) {
        optionParams.push({
          symbol: arr[0],
          expiry: moment.tz(arr[1], 'America/New_York').valueOf(),
          strike: arr[2] as any,
          right: arr[3] as any,
          begin_time: beginTime,
          end_time: endTime,
        });
        optionSymbols.push(item);
      } else {
        stockSymbols.push(item);
      }
    });
    const result: any = {};
    if (stockSymbols.length > 0) {
      const res = await this.stock.getQuoteRealTime({ symbols: stockSymbols });
      if (res.code === 0) {
        res.data.forEach((item: any) => {
          result[item.symbol] = item;
        });
      }
    }

    if (optionParams.length > 0) {
      const res = await this.option.getOptionKLine(optionParams);
      if (res.code === 0) {
        res.data.forEach((item: any, index: number) => {
          if (item.items.length > 0) {
            result[optionSymbols[index]] = item.items[item.items.length - 1];
          }
        });
      }
    }
    return result;
  }
}

export default Tiger;
