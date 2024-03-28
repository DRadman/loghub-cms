export interface Pageable {
    page: number;
    size: number;
    sort: string[];
}

export class PageableDefault implements Pageable{
    size: number = 10;
    page: number = 0;
    sort: string[] = [];
}