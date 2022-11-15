import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogsService {
  constructor(@InjectRepository(Blog) private repo: Repository<Blog>) {}

  async create(title: string, content: string) {
    const post = await this.repo.create({ title, content });

    return this.repo.save(post);
  }

  async update(id: number, updatedTitle?: string, updatedContent?: string) {
    const post = await this.findOne(id);

    post.title = updatedTitle || post.title;
    post.content = updatedContent || post.content;

    return this.repo.save(post);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Can not find post with id: ${id}`);
    }
    return post;
  }

  async deleteOne(id: number) {
    const post = await this.findOne(id);

    return this.repo.delete(post);
  }

  test() {
    console.log('test');
  }
}
