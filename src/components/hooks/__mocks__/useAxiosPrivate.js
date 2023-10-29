import axios from "axios"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const axiosPrivate = jest.genMockFromModule('axios')
jest.mock("../../hooks/useAxiosPrivate", () => ({
    __esModule: true,
    default: () =>
      Promise.resolve({
        post: jest.fn().mockReturnValue(Promise.resolve([])),
        get: jest.fn().mockReturnValue(Promise.resolve([])),
        getList :jest.fn(()=>"hey"),
        axiosPrivate :{
          get:jest.fn(()=>"hey")
        }
      }),
  }));
// this is the key to fix the axios.create() undefined error!
axiosPrivate.create = jest.fn(() => axiosPrivate)

export default axiosPrivate