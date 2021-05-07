import { HomeController } from 'UserInterface/Controller';

import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Module({
	imports: [],
	controllers: [HomeController],
})
class AppModule {}

(async () => {
	const app = await NestFactory.create(AppModule);
	await app.listen(3000);
})();
