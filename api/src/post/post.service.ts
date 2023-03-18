import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
    constructor() {}

    findAll() {
        return 'This action returns all post';
    }

    findOne(id: number) {
        return `This action returns a #${id} post`;
    }
    
    create() {
        return 'This action adds a new post';
    }

    update(id: number) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}


