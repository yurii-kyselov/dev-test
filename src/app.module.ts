import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserModule } from './modules/user/user.module';
import config from 'config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): DataSourceOptions => config.typeorm,
      dataSourceFactory: async (dataSourceConfig) =>
        await new DataSource(dataSourceConfig).initialize(),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
