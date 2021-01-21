import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: "veloso's market api",
      codeBy: 'r. duarte',
    };
  }
}
