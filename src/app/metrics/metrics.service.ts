import { Injectable } from '@nestjs/common';

type ParsingStatus = 'success' | 'failed';

interface MetricData {
  deviceId: number;
  temperature: number;
}

interface ParseRowDataOutput {
  status: ParsingStatus;
  metrics: MetricData | null;
  input: string;
  formattedTime: string;
}

@Injectable()
export class MetricsService {
  private getFormattedTime(): string {
    return new Date().toISOString().replace('T', ' ').replace(/\..+/, ''); // `%Y/%m/%d %H:%M:%S`
  }

  parseAndValidateDeviceID(str: string): number {
    if (String(str) === '') {
      throw new Error('[ParseError]: Incorrect Device ID value format');
    }

    const n = +String(str);

    if (n > 0 && n <= 0x7fffffff && !isNaN(n)) {
      return n;
    }

    throw new Error('[ParseError]: Device ID is not valid');
  }

  parseAndValidateEpochMS(str: string): number {
    if (String(str) === '') {
      throw new Error('[ParseError]: Incorrect Epoch MS value format');
    }

    const n = +String(str);

    if (n > 0 && !isNaN(n)) {
      return n;
    }

    throw new Error('[ParseError]: Epoch MS is no valid');
  }

  parseAndValidateTemperatureKey(str: string): string {
    if (String(str) === '') {
      throw new Error('[ParseError]: Incorrect temperature key format');
    }

    const key = String(str).replace(/'/g, '');

    if (key === 'Temperature') {
      return key;
    }

    throw new Error('[ParseError]: Temperature key is no valid');
  }

  parseAndValidateTemperature(str: string): number {
    if (String(str) === '') {
      throw new Error('[ParseError]: Incorrect temperature value format');
    }

    const n = +String(str);

    if (isNaN(n)) {
      throw new Error('[ParseError]: Temperature is no valid');
    }

    return n;
  }

  parseAndValidateData(input: string): ParseRowDataOutput {
    try {
      const values = String(input)
        .split(':')
        .map((str) => str.trim());

      if (values.length !== 4) {
        throw new Error('[ParseError]: Incorrect incoming data format');
      }

      const deviceId = this.parseAndValidateDeviceID(values[0]);
      const temperature = this.parseAndValidateTemperature(values[3]);

      this.parseAndValidateEpochMS(values[1]);
      this.parseAndValidateTemperatureKey(values[2]);

      return {
        status: 'success',
        metrics: {
          temperature,
          deviceId,
        },
        input,
        formattedTime: this.getFormattedTime(),
      };
    } catch (err) {
      return {
        status: 'failed',
        metrics: null,
        input,
        formattedTime: this.getFormattedTime(),
      };
    }
  }
}
