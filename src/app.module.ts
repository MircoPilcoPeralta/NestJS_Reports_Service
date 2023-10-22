import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './Report/Report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/Auth.module';
import { UserModule } from './User/User.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://usuario:Hh8OtkYV0iptmbnN@cluster0.qzjrnxl.mongodb.net/SisDeteccionBD?retryWrites=true&w=majority',
      entities: [join(__dirname, '**', '*.schema.{ts,js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    ReportModule,
    AuthModule,
    UserModule
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

