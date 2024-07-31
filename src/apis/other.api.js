import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;

class Other extends HttpClient {
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

  getStateConfig = ApiRoutes.Other.GetState;
  getDivisionFranchise = ApiRoutes.Other.GetDivisionFranchise;
  getDistrictConfig = ApiRoutes.Other.GetDistrict;
  getStateInchargeConfig = ApiRoutes.Other.GetStateIncharge;
  getDistrictInchargeConfig = ApiRoutes.Other.GetDistrictIncharge;
  getBlockInchargeConfig = ApiRoutes.Other.GetBlockIncharge;
  getClusterInchargeConfig = ApiRoutes.Other.GetClusterIncharge;
  getFranchiseConfig = ApiRoutes.Other.GetFranchise;
  getFranchiseAllConfig = ApiRoutes.Other.GetAllFranchise;
  addFrenchise1Config = ApiRoutes.Other.AddFrenchise1;
  addFrenchise2Config = ApiRoutes.Other.AddFrenchise2;
  addFrenchise3Config = ApiRoutes.Other.AddFrenchise3;
  addbannerConfig = ApiRoutes.Other.Addbanner;

  getState = async (data) => {
    return this.instance({
      method: this.getStateConfig.Method,
      url: this.getStateConfig.Endpoint,
      headers: {},
      data: data,
    });
  };
  getDivision = async (data) => {
    return this.instance({
      method: this.getDivisionFranchise.Method,
      url: this.getDivisionFranchise.Endpoint,
      headers: {},
      data: data,
    });
  };
  getDistrict = async (data) => {
    return this.instance({
      method: this.getDistrictConfig.Method,
      url: this.getDistrictConfig.Endpoint,
      headers: {},
      data: data,
    });
  };

  getStateIncharge = async (data) => {
    return this.instance({
      method: this.getStateInchargeConfig.Method,
      url: this.getStateInchargeConfig.Endpoint,
      headers: {},
      data: data,
    });
  };

  getDistrictIncharge = async (data) => {
    return this.instance({
      method: this.getDistrictInchargeConfig.Method,
      url: this.getDistrictInchargeConfig.Endpoint,
      headers: {},
      data: data,
    });
  };

  getBlockIncharge = async (data) => {
    return this.instance({
      method: this.getBlockInchargeConfig.Method,
      url: this.getBlockInchargeConfig.Endpoint,
      headers: {},
      data: data,
    });
  };

  getClusterIncharge = async (data) => {
    return this.instance({
      method: this.getClusterInchargeConfig.Method,
      url: this.getClusterInchargeConfig.Endpoint,
      headers: {},
      data: data,
    });
  };

  getFranchise = async (data) => {
    return this.instance({
      method: this.getFranchiseConfig.Method,
      url: this.getFranchiseConfig.Endpoint,
      headers: {},
      data: data,
    });
  };

  getAllFranchise = async (data) => {
    return this.instance({
      method: this.getFranchiseAllConfig.Method,
      url: this.getFranchiseAllConfig.Endpoint,
      headers: {},
      data: data,
    });
  };


  addFrenchise1 = async (data) => {
    return this.instance({
      method: this.addFrenchise1Config.Method,
      url: this.addFrenchise1Config.Endpoint,
      headers: {},
      data: data,
    });
  };
  addFrenchise2 = async (data) => {
    return this.instance({
      method: this.addFrenchise2Config.Method,
      url: this.addFrenchise2Config.Endpoint,
      headers: {},
      data: data,
    });
  };

  addFrenchise3 = async (data) => {
    return this.instance({
      method: this.addFrenchise3Config.Method,
      url: this.addFrenchise3Config.Endpoint,
      headers: {},
      data: data,
    });
  };
  addbanner = async (data) => {
    return this.instance({
      method: this.addbannerConfig.Method,
      url: this.addbannerConfig.Endpoint,
      headers: {},
      data: data,
    })
  };
}

export default Other;