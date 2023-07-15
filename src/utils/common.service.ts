import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  completeDigits(code: number): string {
    const result =
      code <= 9
        ? `000${code}`
        : code <= 99
        ? `00${code}`
        : code <= 999
        ? `0${code}`
        : code <= 9999
        ? `${code}`
        : '0';
    return result;
  }
}
