import { DeepPartial } from 'ts-essentials';
import { ConfigType } from 'config';

const config: DeepPartial<ConfigType> = {
  port: 3001,
};

export default config;
