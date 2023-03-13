import { Module } from '@nestjs/common';

import { ErrorsModule } from 'src/app/errors/errors.module';
import { MetricsModule } from '../metrics/metrics.module';
import { TempController } from './temp.controller';

@Module({
  imports: [MetricsModule, ErrorsModule],
  controllers: [TempController],
})
export class TempModule {}
