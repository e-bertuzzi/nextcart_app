import { Controller } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Controller('user')
export class ConsumerController {
  constructor(private userService: ConsumerService) {}
}
