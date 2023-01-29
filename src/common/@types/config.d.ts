import { DataSourceOptions } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

type ConfigType = {
  port: number;
  typeorm: DataSourceOptions &
    MongoConnectionOptions & { autoLoadEntities: boolean };
  session: { name: string; secret: string; salt: string; cookieMaxAge: number };
};

declare module 'config' {
  declare const config: ConfigType;

  export default config;
}
