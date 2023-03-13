import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorsService } from 'src/app/errors/errors.service';
import { MetricsService } from '../metrics/metrics.service';
import {
  CreateRecordDto,
  CreateRecordResponseDto,
} from './dto/create-record.dto';
import { Record } from './entity/record.entity';

const TEMPERATURE_MAX = 90;

@Controller('temp')
export class TempController {
  @Inject(MetricsService)
  private readonly metricsService: MetricsService;

  @Inject(ErrorsService)
  private readonly errorsService: ErrorsService;

  @Post()
  @ApiOperation({ summary: 'Create record' })
  @ApiBody({
    description: 'Record entity',
    type: Record,
  })
  @ApiResponse({
    status: 201,
    description: 'The record created',
    type: CreateRecordResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'The record is not valid',
  })
  async createRecord(
    @Body() body: CreateRecordDto,
  ): Promise<CreateRecordResponseDto> {
    const data = this.metricsService.parseAndValidateData(body.data);

    if (data.status === 'failed') {
      await this.errorsService.storeError(data.input);
      throw new BadRequestException();
    }

    if (data.metrics.temperature > TEMPERATURE_MAX) {
      return {
        overtemp: true,
        device_id: data.metrics.deviceId,
        formatted_time: data.formattedTime,
      };
    }

    return {
      overtemp: false,
    };
  }
}
