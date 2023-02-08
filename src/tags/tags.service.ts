import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './tags.model';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>
    ){}

    async findAll(): Promise<Tag[]>{
        const res = await this.tagRepository.find()
        return res
    }

    async findOne(id: number): Promise<Tag>{
        const res = await this.tagRepository.findOneBy({ id })
        return res
    }

    async remove(id: number): Promise<string>{
        await this.tagRepository.delete(id)
        return 'Успешно'
    }

    async createTag(dto: CreateTagDto): Promise<Tag> {
        const res = await this.tagRepository.save(dto)
        return res
    }

    async findAllQuestion(id: number): Promise<Tag[]>{
        return await this.tagRepository.find({relations: {questions: true}, where: {id}})
    }

    async editTag(id: number, dto: CreateTagDto): Promise<string>{
        await this.tagRepository.update(id, dto)
        return 'Успешно'
    } 
}
