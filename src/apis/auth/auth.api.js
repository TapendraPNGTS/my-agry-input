import { getTokenLocal } from "../../utils/localStorage.util";
import ApiRoutes from "../../configs/endpoints.config";
import HttpClient from "../index.api";
const baseURL = import.meta.env.VITE_API_URL;

class Auth extends HttpClient {
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

  loginConfig = ApiRoutes.Auth.Login;
  sendOTPConfig = ApiRoutes.Auth.SendOTP;
  reSendOTPConfig = ApiRoutes.Auth.ReSendOTP;
  verifyOTPConfig = ApiRoutes.Auth.VerifyOTP;
  forgetOTPConfing = ApiRoutes.Auth.ForgetOTP
  reSendResetConfing = ApiRoutes.Auth.ReSendResetOTP
  verifyResetConfing = ApiRoutes.Auth.VerifyResetOTP
  forgetPasswordConfing = ApiRoutes.Auth.ForgetPassword
  ForgetOTPConfig = ApiRoutes.Auth.ForgetOTP
  VerifyResetOTPConfig = ApiRoutes.Auth.VerifyResetOtp
  ForgetPasswordConfig = ApiRoutes.Auth.ForgetPassword

  sendMessageConfig = ApiRoutes.Chat.SendChat
  chatHistoryConfig = ApiRoutes.Chat.ChatHistory

  firebaseTokenConfig = ApiRoutes.Auth.FirebaseToken

  getNotificationConfig = ApiRoutes.Auth.GetNotification

  getForgetResetOtpConfig = ApiRoutes.Auth.ForgetReSendResetOTP
  getSignInReSendOTPConfig = ApiRoutes.Auth.SignInReSendOTP

  login = async (reqBody) => {
    return this.instance({
      method: this.loginConfig.Method,
      url: this.loginConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  sendOTP = async (reqBody) => {
    return this.instance({
      method: this.sendOTPConfig.Method,
      url: this.sendOTPConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  verifyOTP = async (reqBody) => {
    return this.instance({
      method: this.verifyOTPConfig.Method,
      url: this.verifyOTPConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  ForgetOTP = async (reqBody) => {
    return this.instance({
      method: this.ForgetOTPConfig.Method,
      url: this.ForgetOTPConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  VerifyResetOTP = async (reqBody) => {
    return this.instance({
      method: this.VerifyResetOTPConfig.Method,
      url: this.VerifyResetOTPConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  ForgetPassword = async (reqBody) => {
    return this.instance({
      method: this.ForgetPasswordConfig.Method,
      url: this.ForgetPasswordConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };


  //for chat component
  
  sendChat = async (reqBody) => {
    return this.instance({
      method: this.sendMessageConfig.Method,
      url: this.sendMessageConfig.Endpoint,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: reqBody,
    });
  };

  chatHistory = async (reqBody) => {
    return this.instance({
      method: this.chatHistoryConfig.Method,
      url: this.chatHistoryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  firebaseToken = async (reqBody) => {
    return this.instance({
      method: this.firebaseTokenConfig.Method,
      url: this.firebaseTokenConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  
  getNotification = async (reqBody) => {
    return this.instance({
      method: this.getNotificationConfig.Method,
      url: this.getNotificationConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getforgetReSendOTP = async (reqBody) => {
    return this.instance({
      method: this.getForgetResetOtpConfig.Method,
      url: this.getForgetResetOtpConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getSignInReSendOTP = async (reqBody) => {
    return this.instance({
      method: this.getSignInReSendOTPConfig.Method,
      url: this.getSignInReSendOTPConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  
}

export default Auth;