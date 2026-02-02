import { ConfigService } from '@nestjs/config';

export const getJwtConfig = (ConfigService: ConfigService) => ({
  accessSecret: ConfigService.get<string>('JWT_ACCESS_SECRET'),
  refreshSecret: ConfigService.get<string>('rt-secret'),
});
