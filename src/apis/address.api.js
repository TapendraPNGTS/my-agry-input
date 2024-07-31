import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class Address extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${getTokenLocal()}`;
      config.headers["authkey"] = import.meta.env.VITE_AUTH_KEY;
      return config;
    });
  };

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (response) => {
        return Promise.resolve(response);
      }
    );
  };

  getAddressConfig = ApiRoutes.Address.All;
  getAddressByIdConfig = ApiRoutes.Address.AddressById;
  addAddressConfig = ApiRoutes.Address.AddAddress;
  editAddressConfig = ApiRoutes.Address.EditAddress;
  removeAddressConfig = ApiRoutes.Address.RemoveAddress;
  
  getAllAddress = async (reqBody) => {
    return this.instance({
      method: this.getAddressConfig.Method,
      url: this.getAddressConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getAddressById = async (reqBody) => {
    return this.instance({
      method: this.getAddressByIdConfig.Method,
      url: this.getAddressByIdConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  addAddress = async (reqBody) => {
    return this.instance({
      method: this.addAddressConfig.Method,
      url: this.addAddressConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  editAddress = async (reqBody) => {
    return this.instance({
      method: this.editAddressConfig.Method,
      url: this.editAddressConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  removeAddress = async (reqBody) => {
    return this.instance({
      method: this.removeAddressConfig.Method,
      url: this.removeAddressConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  
}

export default Address;