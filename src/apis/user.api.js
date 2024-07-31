import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;


class User extends HttpClient {
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

  
  getUserProfileConfig = ApiRoutes.User.UserProfile;
  UpdateUserConfig = ApiRoutes.User.UpdateUser;
  userChangesUpdateConfig = ApiRoutes.User.userChangesUpdate;
  contactusConfig = ApiRoutes.User.getcontact;
  getPreRegistrationConfig = ApiRoutes.User.getPreRegistration;

  getUserProfile = async (data) => {
    return this.instance({
      method: this.getUserProfileConfig.Method,
      url: this.getUserProfileConfig.Endpoint,
      headers: {},
      data: data,
    });
  };

  updateUser = async (data) => {
    return this.instance({
      method: this.UpdateUserConfig.Method,
      url: this.UpdateUserConfig.Endpoint,
      headers: {},
      data: data,
    });
  };

  userChangesUpdate = async (data) => {
    return this.instance({
      method: this.userChangesUpdateConfig.Method,
      url: this.userChangesUpdateConfig.Endpoint,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
  };
  getcontact = async (data) => {
    return this.instance({
      method: this.contactusConfig.Method,
      url: this.contactusConfig.Endpoint,
      headers: {},
      data: data,
    });
  };

  preRegistration = async (data) => {
    return this.instance({
      method: this.getPreRegistrationConfig.Method,
      url: this.getPreRegistrationConfig.Endpoint,
      headers: {},
      data: data,
    });
  };
 
}

export default User;