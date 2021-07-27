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

export type GetAllFeedbacksResponse = {
  __typename?: "GetAllFeedbacksResponse";
  items: Array<Feedback>;
  totalCount: Scalars["Int"];
};

export type GetUsersArgs = {
  searchBy?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
  paginationToken?: Maybe<Scalars["String"]>;
};

export type GetUsersResponse = {
  __typename?: "GetUsersResponse";
  items: Array<User>;
  paginationToken?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  sendFeedback: Feedback;
};

export type MutationSendFeedbackArgs = {
  feedback: FeedbackInput;
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

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  enabled: Scalars["Boolean"];
  verified: Scalars["Boolean"];
  updatedAt: Scalars["String"];
};
