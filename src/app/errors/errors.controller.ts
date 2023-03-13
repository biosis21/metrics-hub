import { Controller, Delete, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { FindAllErrorsResponseDto } from './dto/find-all.dto';

import { ErrorsService } from './errors.service';

@Controller('errors')
export class ErrorsController {
  @Inject(ErrorsService)
  private readonly errorsService: ErrorsService;

  @Get()
  @ApiOperation({ summary: 'Get incorrectly formatted records' })
  @ApiResponse({
    status: 200,
    description: 'List of all errors',
    type: FindAllErrorsResponseDto,
  })
  async findAll(): Promise<FindAllErrorsResponseDto> {
    const errors = await this.errorsService.getAllErrors();
    return {
      errors: Object.values(errors),
    };
  }

  @Delete()
  @ApiOperation({ summary: 'Clean all incorrectly formatted records' })
  @ApiResponse({
    status: 200,
    description: 'Clear all errors',
  })
  async clearAll(): Promise<void> {
    await this.errorsService.clearAll();
  }
}
