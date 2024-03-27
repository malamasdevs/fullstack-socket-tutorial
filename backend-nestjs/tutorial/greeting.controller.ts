// greeting.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { GreetingService } from './greeting.service';

@Controller('greeting')
export class GreetingController {
  constructor(private readonly greetingService: GreetingService) {}

  @Get(':name')
  greet(@Param('name') name: string): string {
    return this.greetingService.getGreeting(name);
  }
}
