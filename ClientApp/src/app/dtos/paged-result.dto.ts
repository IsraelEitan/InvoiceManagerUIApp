export class PagedResult<T> {
  data!: T[];
  totalCount!: number;
  pageNumber!: number;
  pageSize!: number;
}
