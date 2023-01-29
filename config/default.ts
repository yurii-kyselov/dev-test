import { ConfigType } from 'config';
import { DeepNullable } from 'ts-essentials';
import { join } from 'path';

const config: DeepNullable<ConfigType> = {
  port: 3000,
  typeorm: {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    username: 'medatus',
    password: 'medatus',
    logging: true,
    synchronize: true,
    migrationsRun: true,
    entities: [join(__dirname, '**', '*.entity.ts')],
    migrations: ['./dist/src/migrations/*{.ts,.js}'],
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoLoadEntities: true,
  },
  session: {
    name: 'session',
    secret: '1c999d3f46778dec67623f63524e3e7e2acb05a344ceda367f1c7b93437af7aa',
    salt: 'mq9hDxBVDbspDR6n',
    cookieMaxAge: 24 * 60 * 60,
  },
};

export default config;
