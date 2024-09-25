import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [UserModule, AuthModule,
    ConfigModule.forRoot({ isGlobal: true }), ,
    AdminModule,
    DatabaseModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
