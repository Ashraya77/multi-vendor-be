import { ConfigService } from '@nestjs/config';

export const getJwtConfig = (ConfigService: ConfigService) => ({
  accessSecret: 'at-secret',
  refreshSecret: 'rt-secret',
});
