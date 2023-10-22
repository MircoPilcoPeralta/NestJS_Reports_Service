import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';


@Module({
  imports: [    TypeOrmModule.forRoot({
    type: 'mongodb',
    url:
      'mongodb+srv://usuario:Hh8OtkYV0iptmbnN@cluster0.qzjrnxl.mongodb.net/SisDeteccionBD?retryWrites=true&w=majority',
    entities: [join(__dirname, '**', '*.schema.{ts,js}')],
    synchronize: true,
    useNewUrlParser: true,
    logging: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

