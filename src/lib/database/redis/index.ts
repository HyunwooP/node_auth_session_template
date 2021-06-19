import * as redis from "redis";
import { redisConfig } from "../config";
import env from "../../../config";
import { promisify } from "util";

class Redis {
  private client: redis.RedisClient;

  /**
   * 레디스 연결
   * @returns {void}
   */
  async connectRedis() {
    const option: any = {
      ...redisConfig[env.node],
    };
    try {
      this.client = await redis.createClient(option);
    } catch (e) {
      console.log(`connectRedis Connect Failed!! ${e}`);
    }
  }

  /**
   * key를 통해 Token을 받아온다.
   * @param {string} key
   * @returns {string} token
   */
  get(key: string) {
    const _get = promisify(this.client.get).bind(this.client);
    return _get(key);
  }

  /**
   * key - value Token Insert
   * @param {string} key
   * @param {string} value
   * @returns {void}
   */
  set(key: string, value: string) {
    this.client.set(key, value);
  }

  /**
   * key를 통해 Token을 삭제한다.
   * @param {string} key
   * @param {string} value
   * @returns {void}
   */
  remove(key: string) {
    this.client.del(key);
  }
}

export default new Redis();
