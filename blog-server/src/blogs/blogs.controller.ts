import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('blogs')
@UseGuards(JwtAuthGuard)
export class BlogsController {
  constructor(private service: BlogsService) {}

  @Get('')
  findAllBlogs() {
    return this.service.findAll();
  }

  @Post('')
  createBlog(@Body() body: CreateBlogDto) {
    const { title, content } = body;
    return this.service.create(title, content);
  }

  @Put('/:id')
  updateBlog(@Param('id') id: string, @Body() body: UpdateBlogDto) {
    const { title, content } = body;
    return this.service.update(Number(id), title, content);
  }

  @Get('/:id')
  findOneBlog(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Delete('/:id')
  deleteOneBlog(@Param('id') id: string) {
    return this.service.deleteOne(Number(id));
  }
}
