import * as moment from 'moment';
import * as rp from 'request-promise';
import * as crypto from 'crypto';
import { ITiger } from './index';
import { paramsToString } from './utils';

const serverUrl = 'https://openapi.itiger.com/gateway';

class Request {
  tigerId: string;
  privateKey: string;
  publicKey: string;
  constructor(opts: ITiger) {
    const { tigerId, privateKey, publicKey } = opts;
    this.tigerId = tigerId;
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  protected async request(method: string, content: any) {
    const params: any = {
      method,
      tiger_id: this.tigerId,
      charset: 'UTF-8',
      sign_type: 'RSA',
      version: '2.0',
      biz_content: JSON.stringify(content),
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    params.sign = this.signWithRSA(paramsToString(params));
    const res = await rp.post(serverUrl, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: params,
      json: true,
    });
    if (res.code === 0 && this.verifyWithRSA(params.timestamp, res.sign)) {
      return res;
    }
    return res;
  }

  private signWithRSA(content: string) {
    const sign = crypto.createSign('SHA1');
    sign.update(Buffer.from(content));
    return sign.sign({ key: this.privateKey }).toString('base64');
  }

  private verifyWithRSA(content: any, signature: string) {
    const verify = crypto.createVerify('SHA1');
    verify.update(content);
    // 验证的公钥需要移除换行
    return verify.verify(this.publicKey, signature, 'base64');
  }
}

export default Request;
