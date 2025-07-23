import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto, UpdateActivityDto } from '@nextcart/dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Activity')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @ApiOperation({ summary: 'Get all activities' })
  @ApiResponse({ status: 200, description: 'List of activities returned successfully.' })
  async findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get activity by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the activity' })
  @ApiResponse({ status: 200, description: 'Activity found.' })
  @ApiResponse({ status: 404, description: 'Activity not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activityService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new activity' })
  @ApiBody({ type: CreateActivityDto })
  @ApiResponse({ status: 201, description: 'Activity created successfully.' })
  async create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update activity by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateActivityDto })
  @ApiResponse({ status: 200, description: 'Activity updated successfully.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete activity by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Activity deleted successfully.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.activityService.remove(id);
  }
}
