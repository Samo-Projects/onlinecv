import { Controller, Get } from '@nestjs/common';

@Controller()
class HomeController {
	@Get('/')
	getHello(): string {
		return 'COUCOU';
	}
}

export default HomeController;
