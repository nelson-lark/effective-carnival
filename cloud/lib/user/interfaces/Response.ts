import { User } from "./User";

export interface GetUsersResponse {
  items: User[];
  paginationToken?: string;
  estimatedNumberOfUsers?: number;
}
