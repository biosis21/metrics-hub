export class CreateRecordDto {
  readonly data: string;
}

export class CreateRecordResponseDto {
  readonly overtemp: boolean;
  readonly device_id?: number;
  readonly formatted_time?: string;
}
