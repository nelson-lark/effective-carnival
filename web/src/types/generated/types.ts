export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDateTime: any;
};

export type Feedback = {
  __typename?: "Feedback";
  PK: Scalars["ID"];
  SK: Scalars["ID"];
  username: Scalars["String"];
  time: Scalars["AWSDateTime"];
  description: Scalars["String"];
};

export type FeedbackInput = {
  description: Scalars["String"];
};

export type FilterBy = {
  verified?: Maybe<Scalars["Boolean"]>;
  enabled?: Maybe<Scalars["Boolean"]>;
};

export type GetAllFeedbacksResponse = {
  __typename?: "GetAllFeedbacksResponse";
  items: Array<Feedback>;
  totalCount: Scalars["Int"];
};

export type GetUsersArgs = {
  searchBy?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
  paginationToken?: Maybe<Scalars["String"]>;
  filterBy?: Maybe<FilterBy>;
};

export type GetUsersResponse = {
  __typename?: "GetUsersResponse";
  items: Array<User>;
  paginationToken?: Maybe<Scalars["String"]>;
  estimatedNumberOfUsers?: Maybe<Scalars["Int"]>;
};

export enum GroupName {
  Admin = "admin",
}

export type Mutation = {
  __typename?: "Mutation";
  sendFeedback: Feedback;
  updateUser: User;
  setUserStatus: User;
};

export type MutationSendFeedbackArgs = {
  feedback: FeedbackInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput?: Maybe<UpdateUserInput>;
};

export type MutationSetUserStatusArgs = {
  statusInput?: Maybe<StatusInput>;
};

export type PaginationInput = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  getAllFeedbacks: GetAllFeedbacksResponse;
  getUsers: GetUsersResponse;
};

export type QueryGetAllFeedbacksArgs = {
  paginationInput: PaginationInput;
};

export type QueryGetUsersArgs = {
  getUsersArgs?: Maybe<GetUsersArgs>;
};

export type StatusInput = {
  id: Scalars["ID"];
  enabled: Scalars["Boolean"];
};

export type UpdateUserInput = {
  id: Scalars["ID"];
  email?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  phoneNumber: Scalars["String"];
  enabled: Scalars["Boolean"];
  verified: Scalars["Boolean"];
  updatedAt: Scalars["String"];
};
