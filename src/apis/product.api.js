import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class Product extends HttpClient {
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

  getProductConfig = ApiRoutes.Product.All;
  getAllHomeProductConfig = ApiRoutes.Product.TopProduct;
  getProductDetailsConfing = ApiRoutes.Product.ProductById;
  getProductByCategoryIdConfig = ApiRoutes.Product.ProductByCategoryId;
  getProductByIdConfig = ApiRoutes.Product.ProductById;
  getProductCatConfig = ApiRoutes.Product.GetProduct;
  addReviewConfig = ApiRoutes.Product.AddReview;
  getReviewConfig = ApiRoutes.Product.GetReview;
  getRangeProductConfig = ApiRoutes.Product.getAllProductFilter;

  getAllProduct = async (reqBody) => {
    return this.instance({
      method: this.getProductConfig.Method,
      url: this.getProductConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  addReview = async (reqBody) => {
    return this.instance({
      method: this.addReviewConfig.Method,
      url: this.addReviewConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getReview = async (reqBody) => {
    return this.instance({
      method: this.getReviewConfig.Method,
      url: this.getReviewConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getProductDetails = async (reqBody) => {
    return this.instance({
      method: this.getProductDetailsConfing.Method,
      url: this.getProductDetailsConfing.Endpoint,
      headers: {},
      data: reqBody,
    });
  };


  getAllHomeProduct = async (reqBody) => {
    return this.instance({
      method: this.getAllHomeProductConfig.Method,
      url: this.getAllHomeProductConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getProductByCategoryId = async (reqBody) => {
    return this.instance({
      method: this.getProductByCategoryIdConfig.Method,
      url: this.getProductByCategoryIdConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getProductById = async (reqBody) => {
    return this.instance({
      method: this.getProductByIdConfig.Method,
      url: this.getProductByIdConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getProduct = async (reqBody) => {
    return this.instance({
      method: this.getProductCatConfig.Method,
      url: this.getProductCatConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getAllRangeProductFilter = async (reqBody) => {
    return this.instance({
      method: this.getRangeProductConfig.Method,
      url: this.getRangeProductConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
}

export default Product;
