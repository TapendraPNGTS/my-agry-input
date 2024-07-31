import Cookies from "js-cookie";
import { getUserLocal } from "./localStorage.util";
// const dispatch = useDispatch();

export const logout = (history) => {
  const cookies = Object.keys(Cookies.get());

  cookies.forEach((cookie) => {
    Cookies.remove(cookie);
  });

  return history("/");
};
export const formatDate = (date)=> {
  return new Date(date).toLocaleString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const formatTime = (date)=> {
  return new Date(date).toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
export const checkOnlyAlphabets = (inputStr) => {
  const pattern = /^[A-Za-z\s.'-]+$/;
  return pattern.test(inputStr);
};

export const findProduct = (productId, wishlist) => {
  const data = wishlist.some((d) => {
    return d.ProductID == productId;
  });
  return data;
};

export const findCategoryName = (categoryId, categoryData) => {
  const data = categoryData.find((d) => {
    return d.CategoryID == categoryId;
  });
  
  return data?.Name;
};

export const findCategory = (categoryId, categoryData) => {
  return (categoryData.CategoryID == categoryId) ? true : false;
};


export const discountPercentage = (sellingPrice , marketPrice) => {
    const perDis = ((( marketPrice - sellingPrice) / marketPrice) * 100)
    if(perDis > 0) return perDis
    return 0;
}


export const userReviewAlready = (review) => {
  const userData = getUserLocal()
  console.log(userData);
  if(userData){
    const data = review.find((d) => {
      return d.UserID === userData.UserID;
    });
      return !data;
  }else{
    return null;
  }


};