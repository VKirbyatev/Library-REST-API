import { Module } from '@nestjs/common';
import { ApiConfigService } from './config.service';

@Module({
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class ApiConfigModule {}
