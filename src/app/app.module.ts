import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TempModule } from './temp/temp.module';
import { ErrorsModule } from './errors/errors.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
    }),
    TempModule,
    ErrorsModule,
    MetricsModule,
  ],
})
export class AppModule {}
