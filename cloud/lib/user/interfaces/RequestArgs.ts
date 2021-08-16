export interface GetUsersArgs {
  limit: number;
  paginationToken?: string;
  searchBy?: string;
  filterBy?: {
    verified?: boolean;
    enabled?: boolean;
  };
}
