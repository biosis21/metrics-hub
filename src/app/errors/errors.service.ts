import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

const STORE_ERROR_KEY = 'errors';
const STORE_RECORD_TTL = 5 * 60 * 1000; // 5 minutes

@Injectable()
export class ErrorsService {
  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  async storeError(str: string) {
    const key = `${STORE_ERROR_KEY}-${Date.now()}`;
    return await this.cacheManager.set(key, str, STORE_RECORD_TTL);
  }

  async getAllErrors() {
    const keys = await this.cacheManager.store.keys();

    const allData: { [key: string]: string } = {};

    for (const key of keys) {
      allData[key] = await this.cacheManager.get(key);
    }

    return allData;
  }

  async clearAll() {
    return await this.cacheManager.reset();
  }
}
