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

export type Mutation = {
  __typename?: "Mutation";
  sendFeedback?: Maybe<Feedback>;
};

export type MutationSendFeedbackArgs = {
  feedback: FeedbackInput;
};

export type Query = {
  __typename?: "Query";
  getAllFeedbacks: Array<Feedback>;
};
