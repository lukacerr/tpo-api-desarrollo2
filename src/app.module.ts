import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VecinoModule } from './vecino/vecino.module';
import { ConfigModule } from '@nestjs/config';
import { Barrio } from './vecino/entities/barrio.entity';
import { Vecino } from './vecino/entities/vecino.entity';
import { ComercioModule } from './comercio/comercio.module';
import { Rubro } from './comercio/entities/rubro.entity';
import { Categoria } from './comercio/entities/categoria.entity';
import { Comercio } from './comercio/entities/comercio.entity';
import { Sitio } from './comercio/entities/sitio.entity';
import { ReclamoModule } from './reclamo/reclamo.module';
import { PersonalModule } from './personal/personal.module';
import { DenunciaModule } from './denuncia/denuncia.module';
import { Reclamo } from './reclamo/entities/reclamo.entity';
import { Desperfecto } from './reclamo/entities/desperfecto.entity';
import { MovimientoReclamo } from './reclamo/entities/movimiento-reclamo.entity';
import { Personal } from './personal/entities/personal.entity';
import { Denuncia } from './denuncia/entities/denuncia.entity';
import { MovimientoDenuncia } from './denuncia/entities/movimiento-denuncia.entity';
import { Oferta } from './comercio/entities/oferta.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: 'HRWRLJKWERBFJKLWEBRNJWBJ234K32',
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      logger: 'advanced-console',
      host: process.env.API_DB_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Barrio,
        Vecino,
        Reclamo,
        Desperfecto,
        MovimientoReclamo,
        Personal,
        Denuncia,
        MovimientoDenuncia,
        Categoria,
        Comercio,
        Oferta,
        Rubro,
        Sitio,
      ],
      synchronize: true,
    }),
    // * API MODULES
    VecinoModule,
    ComercioModule,
    ReclamoModule,
    PersonalModule,
    DenunciaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
