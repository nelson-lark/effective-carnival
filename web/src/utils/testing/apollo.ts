export const mockUseQuery = jest.fn();
export const mockUseMutation = jest.fn();
export const mockUseLazyQuery = jest.fn();

jest.mock("@apollo/client", () => ({
  ...jest.requireActual<Record<string, never>>("@apollo/client"),
  gql: () => {},
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
  useLazyQuery: (...args: unknown[]) => mockUseLazyQuery(...args),
  useMutation: (...args: unknown[]) => mockUseMutation(...args) ?? [],
}));
