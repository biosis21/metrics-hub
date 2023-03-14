import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Welcome page' })
  getHello(): string {
    return 'Welcome to Metrics Hub API!';
  }
}
