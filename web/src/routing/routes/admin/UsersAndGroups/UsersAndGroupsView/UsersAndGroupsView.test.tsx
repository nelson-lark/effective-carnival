/* eslint-disable react/react-in-jsx-scope */
import { ApolloError, LazyQueryResult, MutationResult } from "@apollo/client";
import { mockUseLazyQuery, mockUseMutation } from "@utils/testing";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SnackProvider from "@features/Snack/SnackProvider";
import UsersAndGroupsView from "./UsersAndGroupsView";

const mockedUser = {
  email: "test+1@example.com",
  enabled: false,
  id: "1",
  phoneNumber: "+485556668898",
  updatedAt: "2021-08-02T18:08:50.288Z",
  verified: false,
};

const mockedGetUsersResponse = {
  data: {
    users: {
      items: [
        {
          ...mockedUser,
        },
        {
          ...mockedUser,
          email: "test+2@example.com",
          id: "2",
        },
        {
          ...mockedUser,
          email: "test+3@example.com",
          id: "3",
        },
      ],
    },
  },
};

const refetchQueries = [
  {
    query: undefined,
    variables: {
      args: {
        filterBy: {
          enabled: true,
        },
        limit: 10,
        paginationToken: undefined,
      },
    },
  },
  {
    query: undefined,
    variables: {
      args: {
        filterBy: {
          enabled: false,
        },
        limit: 10,
        paginationToken: undefined,
      },
    },
  },
];

describe("UsersAndGroupsView", () => {
  const setup = (
    returnQueryValue: Partial<LazyQueryResult<unknown, unknown>> = {},
    returnMutationValue: Partial<MutationResult<unknown>> = {}
  ) => {
    const querySpy = jest.fn();
    const mutationSpy = jest.fn();
    mockUseLazyQuery.mockReturnValue([querySpy, returnQueryValue]);
    mockUseMutation.mockReturnValue([mutationSpy, returnMutationValue]);
    render(
      <SnackProvider>
        <UsersAndGroupsView />
      </SnackProvider>
    );
    return { querySpy, mutationSpy };
  };

  it("should make initial query", () => {
    const { querySpy } = setup();
    expect(querySpy).toHaveBeenCalled();
  });

  it("should display thead and 3 users", () => {
    setup(mockedGetUsersResponse);
    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length).toBe(4);
  });

  it("should able to search by email", () => {
    const { querySpy } = setup(mockedGetUsersResponse);
    const input = screen.getByPlaceholderText("Search for value");
    const searchButton = screen.getByTestId("search-button");
    fireEvent.change(input, { target: { value: "test+1@example.com" } });
    fireEvent.click(searchButton);
    expect(querySpy).toHaveBeenCalledWith({
      variables: {
        args: {
          limit: 10,
          searchBy: "test+1@example.com",
          paginationToken: undefined,
        },
      },
    });
  });

  it("should make update enable call", async () => {
    const { mutationSpy } = setup(mockedGetUsersResponse);
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    const enableButton = screen.getByRole("button", { name: "Enable" });
    expect(enableButton).not.toBeDisabled();
    await waitFor(() => fireEvent.click(enableButton));
    expect(mutationSpy).toBeCalledWith({
      variables: {
        statusInput: {
          enabled: true,
          id: "1",
        },
      },
      refetchQueries,
    });
  });

  it("should make update disable call", async () => {
    const { mutationSpy } = setup(mockedGetUsersResponse);
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);
    const disableButton = screen.getByRole("button", { name: "Disable" });
    expect(disableButton).not.toBeDisabled();
    await waitFor(() => fireEvent.click(disableButton));
    expect(mutationSpy).toHaveBeenLastCalledWith({
      variables: {
        statusInput: {
          enabled: false,
          id: "2",
        },
      },
      refetchQueries,
    });
  });

  it("should display error", () => {
    setup({}, { error: {} as ApolloError });
    expect(
      screen.getByText("Something went wrong. Please try again.")
    ).toBeInTheDocument();
  });
});
