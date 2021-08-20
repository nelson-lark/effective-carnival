/* eslint-disable react/react-in-jsx-scope */
import { LazyQueryResult, MutationResult } from "@apollo/client";
import { mockUseLazyQuery, mockUseMutation } from "@utils/testing";
import { render, screen, fireEvent } from "@testing-library/react";
import UsersAndGroups from "./UsersAndGroups";

describe("UsersAndGroups", () => {
  const setup = (
    returnQueryValue: Partial<LazyQueryResult<unknown, unknown>> = {},
    returnMutationValue: Partial<MutationResult<unknown>> = {}
  ) => {
    const querySpy = jest.fn();
    const mutationSpy = jest.fn();
    mockUseLazyQuery.mockReturnValue([querySpy, returnQueryValue]);
    mockUseMutation.mockReturnValue([mutationSpy, returnMutationValue]);
    render(<UsersAndGroups />);
    return { querySpy, mutationSpy };
  };
  it("should display users tab as active", () => {
    setup();
    const usersTab = screen.getByText(/users/i);
    const groupsTab = screen.getByText(/groups/i);
    expect(usersTab.parentElement).toHaveClass("Mui-selected");
    fireEvent.click(groupsTab);
    expect(usersTab.parentElement).not.toHaveClass("Mui-selected");
    expect(groupsTab.parentElement).toHaveClass("Mui-selected");
  });
});
