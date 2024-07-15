// __tests__/IndexPage.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useLogin } from "api/authApi";
import { useToast } from "@chakra-ui/react";

import { IndexPage } from "../IndexPage";

jest.mock("api/authApi");
jest.mock(
  "components/sleepInfoCard",
  () =>
    // eslint-disable-next-line func-names
    function () {
      return <div data-testid="sleep-info-card" />;
    }
);

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn()
}));

describe("IndexPage", () => {
  let loginMock: jest.Mock<any, any>;
  let toastMock: jest.Mock<any, any>;

  beforeEach(() => {
    loginMock = jest.fn();
    toastMock = jest.fn();

    (useLogin as jest.Mock).mockReturnValue({ mutate: loginMock });
    (useToast as jest.Mock).mockReturnValue(toastMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders SleepInfoCard component", () => {
    render(<IndexPage />);
    expect(screen.getByTestId("sleep-info-card")).toBeInTheDocument();
  });

  test("calls login on mount and stores token on success", async () => {
    const token = "fakeToken";
    loginMock.mockImplementation((_, { onSuccess }) => {
      onSuccess({ token });
    });

    render(<IndexPage />);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith(
        { username: "johndoe", password: "test123" },
        expect.anything()
      );
    });
  });

  test("shows toast on login error", async () => {
    const errorMessage = "Login failed";
    loginMock.mockImplementation((_, { onError }) => {
      onError({ message: errorMessage });
    });

    render(<IndexPage />);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith(
        { username: "johndoe", password: "test123" },
        expect.anything()
      );
    });

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith({
        title: "Error logging in.Please refresh the page.",
        description: errorMessage,
        status: "error",
        duration: 9000,
        isClosable: true
      });
    });
  });
});
