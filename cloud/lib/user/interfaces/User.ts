export interface User {
  id: string;
  email: string;
  enabled: boolean;
  verified: boolean;
  phoneNumber: string;
  updatedAt: string | Date;
  groupName?: string;
}

export type UpdateUserInput = Partial<Pick<User, "email" | "phoneNumber">> & {
  id: string;
};

export type StatusInput = Pick<User, "id" | "enabled">;
