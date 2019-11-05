import Request from '../request';

/**
 * 获取期权链参数
 */
interface IOptionChainParams {
  /**
   * 股票代码，上限为：30
   */
  symbol: string;
  /**
   * 期权过期日（毫秒，当天0点，不为空），字符串转换为时间戳时以美国NewYork时间为准
   */
  expiry: number;
}

export interface IOptionKLineParams {
  symbol: string;
  right: 'CALL' | 'PUT';
  expiry: number;
  strike: number;
  begin_time: number;
  end_time: number;
}

class Option extends Request {
  /**
   * 获取期权链
   *
   * @param {Array<IOptionChainParams>} prams
   * @returns
   * @memberof Option
   */
  async getOptionChain(prams: Array<IOptionChainParams>) {
    return await super.request('option_chain', prams);
  }

  /**
   * 获取期权K线
   *
   * @param {Array<IOptionKLineParams>} params
   * @returns
   * @memberof Option
   */
  async getOptionKLine(params: Array<IOptionKLineParams>) {
    return await super.request('option_kline', params);
  }
}

export default Option;
