import React, { useEffect, useState } from "react";
import "./settingsmenu.css";
import { useLocation, Link } from "react-router-dom";
import ActiveEdit from "../../../assets/setting-image/Editgreen-6f047b17.svg";
import Edit from "../../../assets/setting-image/Edit-eb4d0b65.svg";

import Notifications from "../../../assets/setting-image/Notifications-78534b26.svg";
import ActiveNotifications from "../../../assets/setting-image/ActiveNotifications-bd0fbbcc.svg";

import Order from "../../../assets/setting-image/orderset-7a88063e.svg";
import ActiveOrder from "../../../assets/setting-image/ActiveOrder-7fca6239.svg";

import Wishlist from "../../../assets/setting-image/Settingset-7d823aec.svg";
import ActiveWishlist from "../../../assets/setting-image/ActiveSettings-e94be139.svg";

import Purchase from "../../../assets/setting-image/purchase-history.svg";
import ActivePurchase from "../../../assets/setting-image/purchase-history-active.svg";

import ActiveAddress from "../../../assets/setting-image/address-active.svg";
import Address from "../../../assets/setting-image/address.svg";

import weather from "../../../assets/images/weather-icon.svg";
import ActiveWeather from "../../../assets/images/active-weather.svg";


import cropIcon from "../../../assets/images/crop-icon.svg";
import ActiveCropIcon from "../../../assets/images/active-crop.svg";


import pesticide from "../../../assets/images/pesticide-icon.svg";
import ActivePesticide from "../../../assets/images/active-pesticide.svg";


import fertilization from "../../../assets/images/fertilization-icon.svg";
import ActiveFertilization from "../../../assets/images/active-fertilization.svg";

import disease from "../../../assets/images/disease-icon.svg";
import ActiveDisease from "../../../assets/images/active-disease.svg";

import information from "../../../assets/images/information.svg";
import ActiveInformation from "../../../assets/images/active-information.svg";

import fieldIcon from "../../../assets/images/field-icon.svg";
import ActiveField from "../../../assets/images/active-field.svg";

import ProfileDataApi from "../../../apis/advisory.api";
import toast from "react-hot-toast";
import { Text } from "@chakra-ui/react";

const SettingsMenu = () => {
  const location = useLocation();
const profileDataApi = new ProfileDataApi();
const [advisoryData, setAdvisoryData] = useState([]);

  const getData = async () =>{
    try{
      const profileData = await profileDataApi.getProfileData();
      if(profileData || profileData.data.data){
        // console.log("profileData.data.data",profileData.data.data)
        setAdvisoryData(profileData.data.data);
      }}
      catch(error){
      console.log(error);
      toast.error("something went wrong");
      throw error;
      }
    }
  
  
  useEffect(()=>{
    getData();
  },[])
  
  return (
    <div className="settings--menu--container">
      <ul className="settings--link--list">
        <Link to={"/settings/edit"}>
          <li className="settings--li">
            <img
              src={location.pathname.includes("edit") ? ActiveEdit : Edit}
              alt="edit"
            />{" "}
            <p
              className={` ${
                location.pathname.includes("edit") ? "active" : ""
              }`}
            >
              Edit Profile

            </p>
          </li>
        </Link>

        <Link to={"/settings/notifications"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("notifications")
                  ? ActiveNotifications
                  : Notifications
              }
              alt="notifications"
            />{" "}
            <p
             className={` ${
                location.pathname.includes("notifications") ? "active" : ""
              }`}>Notification
{
  advisoryData.notification && advisoryData.notification > 0 ? (
    <span className="notification-count" >
      {advisoryData.notification}
    </span>
  ) : (
    ""
  )
}
              </p>
          </li>
        </Link>

        <Link to={"/settings/orders"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("orders") ? ActiveOrder : Order
              }
              alt="orders"
            />{" "}
            <p  className={` ${
                location.pathname.includes("orders") ? "active" : ""
              }`}>My Orders</p>
          </li>
        </Link>

        <Link to={"/settings/wishlist"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("wishlist")
                  ? ActiveWishlist
                  : Wishlist
              }
              alt="wishlist"
            />{" "}
            <p  className={` ${
                location.pathname.includes("wishlist") ? "active" : ""
              }`}>My Wishlist</p>
          </li>
        </Link>

        <Link to={"/settings/purchase-history"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("purchase-history") ? ActivePurchase : Purchase
              }
              alt="purchase-history"
            />{" "}
            <p  className={` ${
                location.pathname.includes("purchase-history") ? "active" : ""
              }`}>Purchase History</p>
          </li>
        </Link>
        <Link to={"/settings/address"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("address") ? ActiveAddress : Address
              }
              alt="address"
            />{" "}
            <p  className={` ${
                location.pathname.includes("address") ? "active" : ""
              }`}>Address</p>
          </li>
        </Link>
        <Link to={"/settings/weather-advisory"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("weather-advisory") ? ActiveWeather : weather
              }
              alt="Weather"
            />{" "}
            <p  className={` ${
                location.pathname.includes("weather-advisory") ? "active" : ""
              }`}>Weather Advisory 
              
{
  advisoryData.weather && advisoryData.weather > 0 ? (
    <span className="notification-count" >
      {advisoryData.weather}
    </span>
  ) : (
    ""
  )
}
              </p>
          </li>
        </Link>
        <Link to={"/settings/crop-advisory"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("crop-advisory") ? ActiveCropIcon : cropIcon
              }
              alt="Crop"
            />{" "}
            <p  className={` ${
                location.pathname.includes("crop-advisory") ? "active" : ""
              }`}>Crop Advisory 
              {/* <span style={{paddingLeft:"15px", color:"red"}}>{advisoryData.personlised}</span> */}
             
                       {
  advisoryData.personlised && advisoryData.personlised > 0 ? (
    <span className="notification-count" >
      {advisoryData.personlised}
    </span>
  ) : (
    ""
  )
}
              </p>
          </li>
        </Link>
        <Link to={"/settings/fertigation"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("fertigation") ? ActivePesticide : fertilization
              }
              alt="Fertigation"
            />{" "}
            <p  className={` ${
                location.pathname.includes("fertigation") ? "active" : ""
              }`}>Fertigation Schedule 
             {
  advisoryData.fertigation && advisoryData.fertigation > 0 ? (
    <span className="notification-count" >
      {advisoryData.fertigation}
    </span>
  ) : (
    ""
  )
}
              </p>
          </li>
        </Link>
        <Link to={"/settings/pesticide"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("pesticide") ? ActiveFertilization : pesticide
              }
              alt="Pesticide"
            />{" "}
            <p  className={` ${
                location.pathname.includes("pesticide") ? "active" : ""
              }`}>Pesticide Schedule 
              {/* <span style={{paddingLeft:"15px", color:"red"}}>{advisoryData.pesticide}</span> */}
              {
  advisoryData.pesticide && advisoryData.pesticide > 0 ? (
    <span className="notification-count" >
      {advisoryData.pesticide}
    </span>
  ) : (
    ""
  )
}
              </p>
          </li>
        </Link>
        <Link to={"/settings/disease"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("disease") ? ActiveDisease : disease
              }
              alt="Disease"
            />{" "}
            <p  className={` ${
                location.pathname.includes("disease") ? "active" : ""
              }`}>Disease Alerts
                            {/* <span style={{paddingLeft:"15px", color:"red"}}>{advisoryData.disease}</span> */}
                            {
  advisoryData.disease && advisoryData.disease > 0 ? (
    <span className="notification-count" >
      {advisoryData.disease}
    </span>
  ) : (
    ""
  )
}
              </p>
          </li>
        </Link>
        <Link to={"/settings/important-information"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("important-information") ? ActiveInformation : information
              }
              alt="Information"
            />{" "}
            <p  className={` ${
                location.pathname.includes("important-information") ? "active" : ""
              }`}>Important Information
                            {/* <span style={{paddingLeft:"15px", color:"red"}}>{advisoryData.important}</span> */}
                            {
  advisoryData.important && advisoryData.important > 0 ? (
    <span className="notification-count" >
      {advisoryData.important}
    </span>
  ) : (
    ""
  )
}
              </p>
          </li>
        </Link>
         <Link to={"/settings/fields"}>
          <li className="settings--li">
            <img
              src={
                location.pathname.includes("fields") ? fieldIcon : ActiveField
              }
              alt="fields"
            />{" "}
            <p  className={` ${
                location.pathname.includes("fields") ? "active" : ""
              }`}>Add Fields</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SettingsMenu;
