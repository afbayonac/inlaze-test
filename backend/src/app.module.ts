import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

const db = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});
@Module({
  imports: [db, UserModule, AuthModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
