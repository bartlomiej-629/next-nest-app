import { AbstractDto } from "common/dto/abstract.dto";
import { ClassFieldOptional, NumberFieldOptional } from "decorators";
import { Type } from "class-transformer";

export class PageDto<T extends AbstractDto> {
    @ClassFieldOptional(() => AbstractDto)
    @Type(() => AbstractDto) // Class-transformer decorator to handle the transformation
    items?: T[];

    @NumberFieldOptional()
    total?: number;

    @NumberFieldOptional()
    page?: number;

    @NumberFieldOptional()
    limit?: number;

    constructor(items: T[], options: { page: number; limit: number; total?: number }) {
        this.items = items;
        this.page = options.page;
        this.limit = options.limit;
        this.total = options.total ?? items.length;
    }
}
