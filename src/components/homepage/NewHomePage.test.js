import {
  act,
  render,
  screen,
  container,
  waitFor,
} from "@testing-library/react";
import AuthContext, { AuthProvider } from "../context/AuthProvider";
import NewHomePage from "../homepage/NewHomePage";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "axios";
// import axiosPrivate from "../../__mocks__/axiosPrivate";
import { axiosPrivate } from "../api/Api";
// import axiosPrivate from "../hooks/__mocks__/useAxiosPrivate";


jest.mock("../api/Api", () => {
  return {
    create: jest.fn( )
   
    
    }})

// jest.mock("../hooks/useAxiosPrivate", () => {
  
//   return {
//     __esModule: true,
//     axiosPrivate:{
//       post:jest.fn({task:"rice", taskname:"cook rice"}),
//       get:jest.fn({task:"rice", taskname:"cook rice"}),
//   },
//       interceptors: {
//           request: { use: jest.fn(), eject: jest.fn() },
//           response: { use: jest.fn(), eject: jest.fn() },
//       },
//   };
// });


// axiosPrivate.get.mockImplementation(() => {
//   return {
//     data: "this is some data"
//   };
// });

// jest.mock("axios", () => ({
//   post: jest.fn(),
//   get: jest.fn(),
// }));
// const mockedAxios = axios;

// mockedAxios.get.mockResolvedValue({
//   data: [
//     {
//       userId: 1,
//       id: 1,
//       task: 'My First Album'
//     },
//   ]
// });

// mockedAxios.post.mockResolvedValue(55);


// jest.mock("axios", () => ({
//   __esModule: true,
//   default: {
//     get: () => ({
//       data: {
//         task: "cook rice",
//         todotask: "cook rice for 10min",
//       },
//     }),
//     post: () => ({
//       data: {
//         task: "cook rice",
//         todotask: "cook rice for 10min",
//       },
//     }),
//   },
// }));

//................................................
// jest.mock("axios", () => ({
//     post: jest.fn(),
//     get: jest.fn(),

//   }));
//   const mockedAxios = axios;

//   mockedAxios.post.mockResolvedValue({});



// const getList = jest.fn(()=>"hey")


// jest.mock("../hooks/useAxiosPrivate")
//....................................................
jest.mock("../hooks/useAxiosPrivate", () => ({
  __esModule: true,
  // axiosPrivate :{
  //   get:jest.fn({data:{task:"rice", taskname:"cook rice"}}),
  //   post:jest.fn({data:{task:"rice", taskname:"cook rice"}})
  // },
  default: {
   
      // post: jest.fn().mockReturnValue(Promise.resolve({data:"hi"})),
      // get: jest.fn().mockReturnValue(Promise.resolve({data:"hi"})),
      // getList :jest.fn(()=>"hey"),
      axiosPrivate :{
        get:jest.fn(()=>Promise.resolve({data:{task:"rice", taskname:"cook rice"}})),
        post:jest.fn(()=>Promise.resolve({data:{task:"rice", taskname:"cook rice"}}))
      }
    }
}));

// jest.mock("../hooks/useAxiosPrivate", () => ({
//   __esModule: true,
//   axiosPrivate :{
//     get:jest.fn({data:{task:"rice", taskname:"cook rice"}}),
//     post:jest.fn({data:{task:"rice", taskname:"cook rice"}})
//   },
//   default: () =>
//     Promise.resolve({
//       // post: jest.fn().mockReturnValue(Promise.resolve({data:"hi"})),
//       // get: jest.fn().mockReturnValue(Promise.resolve({data:"hi"})),
//       // getList :jest.fn(()=>"hey"),
//       axiosPrivate :{
//         get:jest.fn({data:{task:"rice", taskname:"cook rice"}}),
//         post:jest.fn({data:{task:"rice", taskname:"cook rice"}})
//       }
//     }),
// }));

// const axiosPrivate = useAxiosPrivate();
// axiosPrivate.post= jest.fn(
//   () => ({
//           data: {
//             task: "cook rice",
//             todotask: "cook rice for 10min",
//           },
//         }),
// )
// axiosPrivate.get= jest.fn()
// axiosPrivate.post.mockImplementationOnce(() =>
// Promise.resolve({ data:"hey" }),
// )
// axiosPrivate.get.mockImplementationOnce(() =>
// Promise.resolve({ data:"hey" }),
// )


//.....................................
// jest.mock("../api/Api", () => ({
//   __esModule: true,
//   default: () =>
//     Promise.resolve({
//       post: jest.fn(),
//       get: jest.fn(),
//       Authorization: {
//         isloggedin: "true",
//         LName: "Test Last Name",
//       },
//     }),
// }));
//.......................................................................



beforeEach(() => {
  // auth,setAuth,persist, setPersist,setIsLoggedIn,isLoggedIn
  render(
    <AuthContext.Provider
      value={{
        isLoggedIn: true,
        auth: { userid: "123", accesstoken: "54dfgr54f" },
      }}
    >
      <Router>
        <NewHomePage />
      </Router>
    </AuthContext.Provider>
  );

  signIn();
});

const signIn = () => {
  act(() => {
    userEvent.click(screen.getByRole("button", { name: /login/i }));
  });

  act(() => {
    userEvent.type(screen.getByTestId("emailinput"), "ayo@gmail");
    userEvent.type(screen.getByTestId("passinput"), "ayodeji");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
  });
};

describe("testing the todo list page", () => {
  it("user todo page should be accessible", () => {
    // todo form should show up
    expect(screen.getByRole("textbox", { name: /task/i })).toBeInTheDocument();
    // todo lists should show up
    expect(screen.getByTestId("todolists")).toBeInTheDocument();
  });
  it("todo should be empty", () => {
    // todo form should be empty
    expect(screen.getByRole("textbox", { name: /task/i }).value).toBe("");
    expect(screen.getByRole("textbox", { name: /todo/i }).value).toBe("");
  });
  it("todo should take input", async () => {
    // todo form should show up
    const file = new File(['hello'], 'hello.png', {type: 'image/png'})
    act(() => {
      userEvent.type(
        screen.getByRole("textbox", { name: /task/i }),
        "cook beans"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: /todo/i }),
        "cook beans for 5min"
      );
      userEvent.upload(
        screen.getByTestId('fileUpload'),file
      );
    });
    expect(screen.getByRole("textbox", { name: /task/i }).value).toBe(
      "cook beans"
    );
    expect(screen.getByRole("textbox", { name: /todo/i }).value).toBe(
      "cook beans for 5min"
    );
    expect(screen.getByTestId('fileUpload').files[0]).toStrictEqual(file)
    expect(screen.getByTestId('fileUpload').files.item(0)).toStrictEqual(file)
    expect(screen.getByTestId('fileUpload').files).toHaveLength(1)
    expect(screen.getByTestId('fileUpload').files.item(0).name).toBe(
      'hello.png'
    );

    act(() => {
      userEvent.click(screen.getByRole("button", { name: /post todo/i }));
    });

    // expect(container?.querySelector('#root > div > div > section:nth-child(3) > div > div:nth-child(1) > div > div:nth-child(1)')).toBeInTheDocument();
    // await waitFor(() =>
    //   expect(screen.getByRole("heading", { name: /task: cook beans/i }))
    // );
  });
});
