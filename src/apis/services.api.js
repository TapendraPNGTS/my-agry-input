import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class Services extends HttpClient {
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
      console.log(config);
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
  getServicesPurchaseConfig = ApiRoutes.Services.servicePurchase;
  GetServiceTypeConfig = ApiRoutes.Services.getServiceType;
  GetServiceCategoryConfig = ApiRoutes.Services.GetServiceCategory;
  GetServiceCategoryByIdConfig = ApiRoutes.Services.GetServiceCategoryById;
  getServicePackageConfig = ApiRoutes.Services.getServicePackage;
  getServiceEnquiryCatConfig = ApiRoutes.Services.EnquiryService;
  getFieldByUserIdConfig = ApiRoutes.Services.getFieldByUserId;
  editFieldsConfig = ApiRoutes.Services.editFields;
  getFieldConfig = ApiRoutes.Services.getField;

  getservicePurchase = async (reqBody) => {
    return this.instance({
      method: this.getServicesPurchaseConfig.Method,
      url: this.getServicesPurchaseConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getServiceType = async (reqBody) => {
    return this.instance({
      method: this.GetServiceTypeConfig.Method,
      url: this.GetServiceTypeConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getServiceEnquiry = async (reqBody) => {
    return this.instance({
      method: this.getServiceEnquiryCatConfig.Method,
      url: this.getServiceEnquiryCatConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  GetServiceCategory = async (reqBody) => {
    return this.instance({
      method: this.GetServiceCategoryConfig.Method,
      url: this.GetServiceCategoryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  GetServiceCategoryById = async (reqBody) => {
    return this.instance({
      method: this.GetServiceCategoryByIdConfig.Method,
      url: this.GetServiceCategoryByIdConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  GetServicePackage = async (reqBody) => {
    return this.instance({
      method: this.getServicePackageConfig.Method,
      url: this.getServicePackageConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getFields = async (reqBody) => {
    return this.instance({
      method: this.getFieldByUserIdConfig.Method,
      url: this.getFieldByUserIdConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  editFields = async (reqBody) => {
    return this.instance({
      method: this.editFieldsConfig.Method,
      url: this.editFieldsConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getFieldData = async (reqBody) => {
    return this.instance({
      method: this.getFieldConfig.Method,
      url: this.getFieldConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

 
}

export default Services;
