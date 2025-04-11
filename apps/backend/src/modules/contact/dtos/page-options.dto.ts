import { NumberFieldOptional } from "decorators";

export class PageOptionsDto {
    @NumberFieldOptional()
    page: number;

    @NumberFieldOptional()
    limit: number;

    constructor(page: number, limit: number) {
        this.page = page;
        this.limit = limit;
    }
}