import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class Advisory extends HttpClient {
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

    weatherAdvisoryConfig = ApiRoutes.Weather.WeatherAdvisory;
    cropAdvisoryConfig = ApiRoutes.Weather.CropAdvisory;
    fertigationConfig = ApiRoutes.Weather.FertigationNotification;
    pesticideConfig = ApiRoutes.Weather.PesticideNotification;
    deseaseConfig = ApiRoutes.Weather.DiseaseAlert;
    importantInformationConfig = ApiRoutes.Weather.ImportantInformation;
    getProfileConfig = ApiRoutes.Weather.GetProfileData;

    //fo fields

    getfieldConfig = ApiRoutes.Weather.addFields;

    //read unread
    fertigationReadStatusConfig = ApiRoutes.Weather.fertigationReadStatus;
    personlisedReadStatusConfig = ApiRoutes.Weather.personlisedReadStatus;
    weatherReadStatusConfig = ApiRoutes.Weather.weatherReadStatus;
    diseaseReadStatusConfig = ApiRoutes.Weather.diseaseReadStatus;
    importanceReadStatusConfig = ApiRoutes.Weather.importanceReadStatus;
    pesticideReadStatusConfig = ApiRoutes.Weather.pesticideReadStatus;
    notificationReadStatusConfig = ApiRoutes.Weather.notificationReadStatus;
  
  getWeatherData = async (reqBody) => {
    return this.instance({
      method: this.weatherAdvisoryConfig.Method,
      url: this.weatherAdvisoryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getCropData = async (reqBody) => {
    return this.instance({
      method: this.cropAdvisoryConfig.Method,
      url: this.cropAdvisoryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getFertigationData = async (reqBody) => {
    return this.instance({
      method: this.fertigationConfig.Method,
      url: this.fertigationConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getPesticideData = async (reqBody) => {
    return this.instance({
      method: this.pesticideConfig.Method,
      url: this.pesticideConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getDeseaseData = async (reqBody) => {
    return this.instance({
      method: this.deseaseConfig.Method,
      url: this.deseaseConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getImpInformationData = async (reqBody) => {
    return this.instance({
      method: this.importantInformationConfig.Method,
      url: this.importantInformationConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getProfileData = async (reqBody) => {
    return this.instance({
      method: this.getProfileConfig.Method,
      url: this.getProfileConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getFertigationReadStatus = async (reqBody) => {
    return this.instance({
      method: this.fertigationReadStatusConfig.Method,
      url: this.fertigationReadStatusConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  
  getCropDataReadStatus = async (reqBody) =>{
    return this.instance({
      method: this.personlisedReadStatusConfig.Method,
      url: this.personlisedReadStatusConfig.Endpoint,
      headers: {},
      data: reqBody,
    })
  }
  getPesticideReadStatus = async (reqBody) =>{
    return this.instance({
      method: this.pesticideReadStatusConfig.Method,
      url: this.pesticideReadStatusConfig.Endpoint,
      headers: {},
      data: reqBody,
    })
  }

  getWeatherReadStatus = async (reqBody) =>{
    return this.instance({
      method: this.weatherReadStatusConfig.Method,
      url: this.weatherReadStatusConfig.Endpoint,
      headers: {},
      data: reqBody,
    })
  }
  getDiseaseReadStatus = async (reqBody) =>{
    return this.instance({
      method: this.diseaseReadStatusConfig.Method,
      url: this.diseaseReadStatusConfig.Endpoint,
      headers: {},
      data: reqBody,
    })
  }
  getImportantReadStatus = async (reqBody) =>{
    return this.instance({
      method: this.importanceReadStatusConfig.Method,
      url: this.importanceReadStatusConfig.Endpoint,
      headers: {},
      data: reqBody,
    })
  }
  getNotificationReadStatus = async (reqBody) =>{
    return this.instance({
      method: this.notificationReadStatusConfig.Method,
      url: this.notificationReadStatusConfig.Endpoint,
      headers: {},
      data: reqBody,
    })
  }

 addFieldsData = async (reqBody) =>{
    return this.instance({
      method: this.getfieldConfig.Method,
      url: this.getfieldConfig.Endpoint,
      headers: {},
      data: reqBody,
    })
  }

 
  
}

export default Advisory;