import Request from '../request';

type Period = 'day' | 'week' | 'month' | 'year' | '1min' | '5min' | '15min' | '30min' | '60min';
type Language = 'zh_CN' | 'zh_TW' | 'en_US';

interface ITimeLineParams {
  symbols: string[];
  include_hour_trading?: boolean;
  begin_time?: number;
  lang?: Language;
}

interface IQuoteRealTimeParams {
  symbols: string[];
  lang?: Language;
}

interface IKLineParams {
  symbols: string[];
  period: Period;
  right?: 'br' | 'nr';
  begin_time?: number;
  end_time?: number;
  limit?: number;
  lang?: Language;
}

class Stock extends Request {
  /**
   * 获取实时行情
   *
   * @param {IQuoteRealTimeParams} params
   * @returns
   * @memberof Stock
   */
  async getQuoteRealTime(params: IQuoteRealTimeParams) {
    return await super.request('quote_real_time', params);
  }

  /**
   * 获取K线数据
   *
   * @param {IKLineParams} params
   * @returns
   * @memberof Stock
   */
  async getKLine(params: IKLineParams) {
    return await super.request('kline', params);
  }

  /**
   * 获取分时数据
   *
   * @param {ITimeLineParams} params
   * @returns
   * @memberof Stock
   */
  async getTimeLine(params: ITimeLineParams) {
    return await super.request('timeline', params);
  }
}

export default Stock;
