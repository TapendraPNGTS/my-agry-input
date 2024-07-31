import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class Cart extends HttpClient {
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

  paymentCodConfig = ApiRoutes.Payment.COD;
  paymentPhoneConfig = ApiRoutes.Payment.PhonePe;
  

  paymentCod = async (reqBody) => {
    return this.instance({
      method: this.paymentCodConfig.Method,
      url: this.paymentCodConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  paymentPhonePe = async (reqBody) => {
    return this.instance({
      method: this.paymentPhoneConfig.Method,
      url: this.paymentPhoneConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  
}

export default Cart;