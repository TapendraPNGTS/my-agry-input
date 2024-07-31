import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;

class Categories extends HttpClient {
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


  getAllCategoriesConfig = ApiRoutes.Categories.All;
  getSubCategoryConfig = ApiRoutes.Categories.GetSubCategory;
  getCategoryAndSubCategoryConfig = ApiRoutes.Categories.GetCategoryAndSubCategory;
  getSubCategoryProducsConfig = ApiRoutes.Categories.getSubCategoryProduct;
 
  getAllCategories= async (reqBody) => {
    return this.instance({
      method: this.getAllCategoriesConfig.Method,
      url: this.getAllCategoriesConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getSubCategory= async (reqBody) => {
    return this.instance({
      method: this.getSubCategoryConfig.Method,
      url: this.getSubCategoryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getCategoryAndSubCategory= async (reqBody) => {
    return this.instance({
      method: this.getCategoryAndSubCategoryConfig.Method,
      url: this.getCategoryAndSubCategoryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getSubCategoryProducts= async (reqBody) => {
    return this.instance({
      method: this.getSubCategoryProducsConfig.Method,
      url: this.getSubCategoryProducsConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  
}

export default Categories;