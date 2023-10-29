import { act, render, screen, container } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogIn from "./LogIn";
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "@testing-library/jest-dom";
import { AuthProvider } from "../context/AuthProvider";
// import useAxiosPrivate from "../hooks/__mocks__/useAxiosPrivate";

// jest.mock("axios", () => ({
//   post: jest.fn(),
//   get: jest.fn(),
// }));
// const mockedAxios = axios;

// mockedAxios.post.mockResolvedValue(55);

// ............................................
jest.mock("axios", () => ({
  __esModule: true,
  default: {
    post: () => ({
      data: {
        userid: "123",
        accesstoken: "12hd5ryr6",
      },
    }),
  },
}));
jest.mock("../hooks/useAxiosPrivate", () => ({
  __esModule: true,
  default: () =>
    Promise.resolve({
      Authorization: {
        FName: "Test Name",
        LName: "Test Last Name",
      },
    }),
}));

expect(useAxiosPrivate);

beforeEach(() => {
  render(
    <AuthProvider>
      <LogIn />
    </AuthProvider>
  );
  //   console.log("render");
});

const clickLogin = () => {
  act(() => {
    userEvent.click(screen.getByRole("button", { name: /login/i }));
  });
};

describe("first", () => {
  it("login form comes up when the login button is clicked", async () => {
    clickLogin();
    expect(await screen.getByTestId("loginform")).toBeInTheDocument();
  });

  it("check user input funtionalities for email and password", () => {
    clickLogin();

    act(() => {
      userEvent.type(screen.getByTestId("emailinput"), "ayo@gmail");
    });
    expect(screen.getByTestId("emailinput").value).toBe("ayo@gmail");

    act(() => {
      userEvent.type(screen.getByTestId("passinput"), "ayodeji");
    });
    expect(screen.getByTestId("passinput").value).toBe("ayodeji");
    // checking toggles
    act(() => {
      userEvent.click(
        screen.getByRole("checkbox", { name: /trust this device\?/i })
      );
    });

    expect(
      screen.getByRole("checkbox", { name: /trust this device\?/i }).checked
    ).toBe(true);
  });

  // it("send data to backend", () => {
  //   clickLogin();
  //   act(() => {
  //     userEvent.type(screen.getByTestId("emailinput"), "ayo@gmail");
  //     userEvent.type(screen.getByTestId("passinput"), "ayodeji");
  //     userEvent.click(screen.getByRole("button", { name: /submit/i }));
  //   });
  // });

  it("toggle persist should mark as checked", () => {});
});
