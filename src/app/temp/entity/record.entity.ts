import { ApiProperty } from '@nestjs/swagger';

export class Record {
  @ApiProperty({
    example: "365951380:1640995229697:'Temperature':58.48256793121914",
    description: 'Metrics raw data',
  })
  data: string;
}
