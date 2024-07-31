import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class Wishlist extends HttpClient {
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

  getWishlistConfig = ApiRoutes.Wishlist.All;
  addWishlistConfig = ApiRoutes.Wishlist.AddWishlist;
  removeWishlistConfig = ApiRoutes.Wishlist.RemoveWishlist;
  
  getAllWishlist = async (reqBody) => {
    return this.instance({
      method: this.getWishlistConfig.Method,
      url: this.getWishlistConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  addWishlist = async (reqBody) => {
    return this.instance({
      method: this.addWishlistConfig.Method,
      url: this.addWishlistConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  removeWishlist = async (reqBody) => {
    return this.instance({
      method: this.removeWishlistConfig.Method,
      url: this.removeWishlistConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  
}

export default Wishlist;