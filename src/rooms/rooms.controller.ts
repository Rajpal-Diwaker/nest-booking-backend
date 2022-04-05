import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/auth/user.entity';
import { CreateRoomDTO } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { UpdateRoomDTO } from './dto/update-room-status.dto';
import { Room } from './rooms.entity';
import { RoomsService } from './rooms.service';

@Controller('rooms')
@UseGuards(AuthGuard(), RolesGuard)
export class RoomsController {
  private logger = new Logger('TaskController');
  constructor(private roomService: RoomsService) {}

  @Get()
  getRooms(@Query() filterDto: GetRoomsFilterDto): Promise<Room[]> {
    return this.roomService.getRooms(filterDto);
  }

  @Get('/:id')
  getRoomById(@Param('id') id: string): Promise<Room> {
    return this.roomService.getRoomById(id);
  }

  @Post()
  @SetMetadata('roles', ['admin'])
  createRoom(@Body() createRoomDTO: CreateRoomDTO): Promise<Room> {
    return this.roomService.createRoom(createRoomDTO);
  }

  @Patch('/:id/status')
  updateRoomStatusById(
    @Param('id') id: string,
    @Body() updateRoomStatusDTO: UpdateRoomDTO,
    @GetUser() user: User,
  ): Promise<Room> {
    const { status } = updateRoomStatusDTO;
    return this.roomService.updateRoomStatusById(id, status, user);
  }
}
