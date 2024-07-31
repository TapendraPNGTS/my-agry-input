import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class Order extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
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

  getOrderHistoryConfing = ApiRoutes.Order.OrderHistory
  getPurchaseHistoryConfing = ApiRoutes.Order.PurchaseHistory
  getServiceOrderHistoryConfig = ApiRoutes.Order.ServiceOrderHistory
  getOrderDetailConfig = ApiRoutes.Order.OrderDetail

  getOrderHistory = async (reqBody) => {
    return this.instance({
      method: this.getOrderHistoryConfing.Method,
      url: this.getOrderHistoryConfing.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getPurchaseHistory = async (reqBody) => {
    return this.instance({
      method: this.getPurchaseHistoryConfing.Method,
      url: this.getPurchaseHistoryConfing.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getServiceOrderHistory = async (reqBody) => {
    return this.instance({
      method: this.getServiceOrderHistoryConfig.Method,
      url: this.getServiceOrderHistoryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getOrderDetail = async (reqBody) => {
    return this.instance({
      method: this.getOrderDetailConfig.Method,
      url: this.getOrderDetailConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

}

export default Order;