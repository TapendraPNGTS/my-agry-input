export const HttpMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Patch: "PATCH",
  Delete: "DELETE",
};

const ApiRoutes = {
  Auth: {
    Login: {
      Endpoint: "/login",
      Method: HttpMethod.Post,
    },
    SendOTP: {
      Endpoint: "/sendOTP",
      Method: HttpMethod.Post,
    },
    VerifyOTP: {
      Endpoint: "/verifyOTP",
      Method: HttpMethod.Post,
    },
    ForgetOTP: {
      Endpoint: "/forgetOTP",
      Method: HttpMethod.Post,
    },
    VerifyResetOtp: {
      Endpoint: "/verifyReSetOTP",
      Method: HttpMethod.Post,
    },
    ForgetPassword: {
      Endpoint: "/forgetPassword",
      Method: HttpMethod.Post,
    },
    FirebaseToken: {
      Endpoint: "/firebaseToken",
      Method: HttpMethod.Post,
    },
    GetNotification: {
      Endpoint: "/getNotification",
      Method: HttpMethod.Post,
    },
    ForgetReSendResetOTP: {
      Endpoint : "/reSendResetOTP",
      Method: HttpMethod.Post,
    },
    SignInReSendOTP:{
      Endpoint :"/reSendOTP",
      Method: HttpMethod.Post,
    }
  },
  User: {
    UpdateUser: {
      Endpoint: "/userUpdate",
      Method: HttpMethod.Post,
    },
    userChangesUpdate: {
      Endpoint: "/userChangesUpdate",
      Method: HttpMethod.Post,
    },
    UserProfile: {
      Endpoint: "/getUserDetail",
      Method: HttpMethod.Post,
    },
    getcontact: {
      Endpoint: "/contactus",
      Method: HttpMethod.Post,
    },
    getPreRegistration: {
      Endpoint: "/preRegistration",
      Method: HttpMethod.Post,
    },
    
  },
  Categories: {
    All: {
      Endpoint: "/getCategory",
      Method: HttpMethod.Post,
    },
    GetSubCategory: {
      Endpoint: "/getSubCategory",
      Method: HttpMethod.Post,
    },
    GetCategoryAndSubCategory: {
      Endpoint: "/getCategoryAndSubCategory",
      Method: HttpMethod.Post,
    },
    getSubCategoryProduct: {
      Endpoint: "/getSubCategoryProduct",
      Method: HttpMethod.Post,
    },
  },
  Product: {
    All: {
      Endpoint: "/getAllProduct",
      Method: HttpMethod.Post,
    },
    AddReview: {
      Endpoint: "/addReview",
      Method: HttpMethod.Post,
    },
    GetReview: {
      Endpoint: "/getReview",
      Method: HttpMethod.Post,
    },
    ProductById: {
      Endpoint: "/getProductById",
      Method: HttpMethod.Post,
    },
    ProductByCategoryId: {
      Endpoint: "/getCategoryProduct",
      Method: HttpMethod.Post,
    },
    GetProduct: {
      Endpoint: "/getProduct",
      Method: HttpMethod.Post,
    },
    TopProduct: {
      Endpoint: "/getAllHomeProduct",
      Method: HttpMethod.Post,
    },
    getAllProductFilter: {
      Endpoint: "/getAllProductFilter",
      Method: HttpMethod.Post,
    },
   
  },
  Services : {
    servicePurchase : {
      Endpoint: "/servicePurchase",
      Method: HttpMethod.Post,
    }
    
    ,
    GetServiceCategory : {
      Endpoint: "/getServiceCategory",
      Method: HttpMethod.Post,
    },
    GetServiceCategoryById : {
      Endpoint: "/getServiceById",
      Method: HttpMethod.Post,
    },
    getServiceType : {
      Endpoint: "/getServiceType",
      Method: HttpMethod.Post,
    },
    getServicePackage : {
      Endpoint: "/getServicePackage",
      Method: HttpMethod.Post,
    },
    EnquiryService: {
      Endpoint: "/serviceEnquiry",
      Method: HttpMethod.Post,
    },
    getFieldByUserId: {
      Endpoint: "/getFieldByUserId",
      Method: HttpMethod.Post,
    },
    editFields: {
      Endpoint: "/editFields",
      Method: HttpMethod.Post,
    },
    getField: {
      Endpoint: "/getField",
      Method: HttpMethod.Post,
    },
  },
  Order: {
    OrderHistory: {
      Endpoint: "/getOrderHistory",
      Method: HttpMethod.Post,
    },
    PurchaseHistory: {
      Endpoint: "/getpaymentHistory",
      Method: HttpMethod.Post,
    },
    ServiceOrderHistory: {
      Endpoint: "/getServiceOrderHistory",
      Method: HttpMethod.Post,
    },
    OrderDetail: {
      Endpoint: "/getOrderDetail",
      Method: HttpMethod.Post,
    },
  },
  Wishlist: {
    All: {
      Endpoint: "/getWishlist",
      Method: HttpMethod.Post,
    },
    AddWishlist: {
      Endpoint: "/addWishlist",
      Method: HttpMethod.Post,
    },
    RemoveWishlist: {
      Endpoint: "/removeWishlist",
      Method: HttpMethod.Post,
    },
  },
  Address: {
    All: {
      Endpoint: "/getAllAddress",
      Method: HttpMethod.Post,
    },
    AddressById: {
      Endpoint: "/getAddressById",
      Method: HttpMethod.Post,
    },
    AddAddress: {
      Endpoint: "/addAddress",
      Method: HttpMethod.Post,
    },
    EditAddress: {
      Endpoint: "/editAddress",
      Method: HttpMethod.Post,
    },
    RemoveAddress: {
      Endpoint: "/deleteAddress",
      Method: HttpMethod.Post,
    },
  },
  Other: {
    GetState: {
      Endpoint: "/getState",
      Method: HttpMethod.Post,
    },
    GetDivisionFranchise: {
      Endpoint: "/getDivisionFranchise",
      Method: HttpMethod.Post,
    },
    GetDistrict: {
      Endpoint: "/getCity",
      Method: HttpMethod.Post,
    },
    GetFranchise: {
      Endpoint: "/getFranchise",
      Method: HttpMethod.Post,
    },
    GetAllFranchise: {
      Endpoint: "/getFranchiseAll",
      Method: HttpMethod.Post,
    },
    GetStateIncharge: {
      Endpoint: "/getStateFranchise",
      Method: HttpMethod.Post,
    },
    GetDistrictIncharge: {
      Endpoint: "/getDistrictFranchise",
      Method: HttpMethod.Post,
    },
    GetBlockIncharge: {
      Endpoint: "/getBlock",
      Method: HttpMethod.Post,
    },
    GetClusterIncharge: {
      Endpoint: "/getCluster",
      Method: HttpMethod.Post,
    },
    AddFrenchise1: {
      Endpoint: "addFrenchise1",
      Method: HttpMethod.Post,
    },
    AddFrenchise2: {
      Endpoint: "addFrenchise2",
      Method: HttpMethod.Post,
    },
    AddFrenchise3: {
      Endpoint: "addFrenchise3",
      Method: HttpMethod.Post,
    },
    Addbanner: {
      Endpoint: "getBanner",
      Method: HttpMethod.Post,
    },
  },
  Cart: {
    AddCart: {
      Endpoint: "/addAllCart",
      Method: HttpMethod.Post,
    },
  },
  Payment: {
    COD: {
      Endpoint: "/userProductCOD",
      Method: HttpMethod.Post,
    },
    PhonePe: {
      Endpoint: "/payment",
      Method: HttpMethod.Post,
    },
  },
  Weather: {
    WeatherAdvisory: {
      Endpoint: "/getWheatherNotification",
      Method: HttpMethod.Post,
    },
    CropAdvisory: {
      Endpoint: "/getPersonlisedNotification",
      Method: HttpMethod.Post,
    },
    FertigationNotification: {
      Endpoint: "/getFertigationNotification",
      Method: HttpMethod.Post,
    },
    PesticideNotification: {
      Endpoint: "/getPesticideNotification",
      Method: HttpMethod.Post,
    },
    DiseaseAlert: {
      Endpoint: "/getDiseaseNotification",
      Method: HttpMethod.Post,
    },
    ImportantInformation: {
      Endpoint: "/getImportantNotification",
      Method: HttpMethod.Post,
    },
    GetProfileData: {
      Endpoint: "/getProfile",
      Method: HttpMethod.Post,
    },
    
    weatherReadStatus: {
      Endpoint: "/weatherRead",
      Method: HttpMethod.Post,
    },
    diseaseReadStatus: {
      Endpoint: "/diseaseRead",
      Method: HttpMethod.Post,
    },
    fertigationReadStatus: {
      Endpoint: "/fertigationRead",
      Method: HttpMethod.Post,
    },
    importanceReadStatus: {
      Endpoint: "/importanceRead",
      Method: HttpMethod.Post,
    },
    personlisedReadStatus: {
      Endpoint: "/personlisedRead",
      Method: HttpMethod.Post,
    },
    pesticideReadStatus: {
      Endpoint: "/pesticideRead",
      Method: HttpMethod.Post,
    },
    notificationReadStatus: {
      Endpoint: "/notificationRead",
      Method: HttpMethod.Post,
    },

    //add field 

    addFields: {
      Endpoint: "/addFields",
      Method: HttpMethod.Post,
    },
    
  },
  Chat : {
    SendChat: {
      Endpoint: "/sendChatMessage",
      Method: HttpMethod.Post,
    },
    ChatHistory: {
      Endpoint: "/chatHistory",
      Method: HttpMethod.Post,
    },
  }
};

export default ApiRoutes;
