import { GetUsersArgs } from "@generated/types";

export enum SearchAttr {
  Email = "searchBy",
  Enabled = "enabled",
  Confirmed = "verified",
}

export enum SelectValue {
  All = "all",
  Enabled = "enabled",
  Disabled = "disabled",
}

export enum Tab {
  Users = "users",
  Groups = "groups",
}

export interface UsersAndGroupsState {
  tab: Tab;
  selected: Record<string, boolean>;
  updateInProgress: boolean;
  searchValue: string;
  searchAttr: SearchAttr;
}

export const defaultLimit = 10;

const initialState: UsersAndGroupsState = {
  tab: Tab.Users,
  selected: {},
  updateInProgress: false,
  searchValue: "",
  searchAttr: SearchAttr.Email,
};

export const parseQueryArgs = ({
  paginationToken,
  searchAttr,
  searchValue,
}: {
  paginationToken?: string;
  searchAttr?: SearchAttr;
  searchValue?: string | SelectValue;
}): GetUsersArgs => {
  const args: Partial<GetUsersArgs> = {};
  if (searchAttr === SearchAttr.Email) {
    args.searchBy = searchValue;
  }
  if (searchAttr !== SearchAttr.Email && searchValue !== SelectValue.All) {
    args.filterBy = {
      ...(searchAttr === SearchAttr.Enabled
        ? { enabled: searchValue === SelectValue.Enabled }
        : {}),
      ...(searchAttr === SearchAttr.Confirmed
        ? { verified: searchValue === SelectValue.Enabled }
        : {}),
    };
  }

  return { ...args, limit: defaultLimit, paginationToken };
};

export default initialState;
