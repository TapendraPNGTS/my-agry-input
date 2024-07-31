import React, { useEffect } from "react";
import "./notification.css";
import CategoryLayout from "../../components/layout/CategoryLayout";
import SettingsMenu from "../../components/shared/SettingsMenu";
import Back from "../../assets/setting-image/setback.svg";
import orderBgImg from "../../assets/images/order-bg-img.svg";

import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Box, Button, Card, Flex, Image, Text } from "@chakra-ui/react";
import { formatDate } from "../../utils/common.util";
import notificationImg from "../../assets/images/notification-not-found-img.svg";
import NotificationApi from "../../apis/auth/auth.api";
import NotificationReadApi from "../../apis/advisory.api";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";

const Coupons = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <Box>
        <Image src={orderBgImg} width={"100%"} height={"auto"} />
      </Box>
      <div className="settings--page--container">
        <CategoryLayout
          left={<NavigationMenu setMenu={setMenu} menu={menu} />}
          right={<CouponContainer setMenu={setMenu} menu={menu} />}
          navOpen={menu}
        />
      </div>
    </>
  );
};

const NavigationMenu = ({ setMenu, menu }) => {
  return (
    <>
      <Flex justifyContent={'right'} pr={3}>
        {menu ? (
          <img
            style={{ cursor: "pointer" }}
            src={cancelIcon}
            width={'20px'}
            alt=""
            onClick={() => setMenu(false)}
          />
        ) : null}
      </Flex>
      <div className="navigation--menu--container">
        <h2>
          {menu ? (
            <img
              style={{ cursor: "pointer" }}
              src={Back}
              alt=""
              onClick={() => setMenu(false)}
            />
          ) : null}
          Settings
        </h2>
        <div className="navigation--items">
          <SettingsMenu />
        </div>
      </div>
    </>
  );
};

const CouponContainer = ({ menu, setMenu }) => {
  const notificationApi = new NotificationApi();
  const notificationReadApi = new NotificationReadApi();
  const [notificationData, setNotificationData] = useState([]);
  // const [notificationReadStatus, setNotificationReadStatus] = useState(false);
  // const [allRead, setAllRead] = useState(false);

  const getNotificationData = async () => {
    try {
      const notification = await notificationApi.getNotification();
      if (notification || notification.data.data) {
        setNotificationData(notification.data.data);
        
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  };

  const getNotificationReadStatus = async () =>{
    try{
      const notificationStatus = await notificationReadApi.getNotificationReadStatus();
      if(notificationStatus || notificationStatus.data.data){
        console.log("notificationStatus.data.data",notificationStatus.data.data)
      }}
      catch(error){
      console.log(error);
      toast.error("something went wrong");
      throw error;
      }
    }

  const getData = async () =>{
    try{
      const profileData = await notificationReadApi.getProfileData();
      if(profileData || profileData.data.data){
        console.log("profileData.data.data",profileData.data.data)

      }}
      catch(error){
      console.log(error);
      toast.error("something went wrong");
      throw error;
      }
    }

  // const markReadNotificationHandler = async () => {
  //   try{
  //     const notificationStatus = await notificationReadApi.getNotificationReadStatus();
  //     if(notificationStatus && notificationStatus.data.code == 200){
  //       // console.log("notificationStatus.data.data",notificationStatus.data.data)
  //       getNotificationData();
  //     }else{
  //     toast.error("something went wrong");
  //     }
  //   }
  //     catch(error){
  //     console.log(error);
  //     toast.error("something went wrong");
  //     throw error;
  //     }
  // };

  useEffect(() => {
    getNotificationData();
    getNotificationReadStatus();
    getData();
  }, [])

  // function formatTime(time) {
  //   return new Date(time).toLocaleString("en-us", {
  //     hour: "numeric",
  //     minute: "numeric",
  //   });
  // }

  function formatTimeDifference(time) {
    const now = new Date();
    const notificationTime = new Date(time);
    const timeDiff = now - notificationTime;

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours < 24) {
      if (hours >= 1) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
      } else {
        return 'just now';
      }
    } else if (hours < 48) {
      return 'yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(notificationTime);
    }
  }



  return (
    <div className="coupon--container">
      <div className="edit--p--header">
        <Flex width={'100%'} >
          {" "}
          <span className="pro--ham--icon" onClick={() => setMenu(true)}>
            <HamburgerIcon />
          </span>{" "}
          <Text background={"#19884A"} width={"100%"} color={"white"} p={"8px 15px"} mb={2} fontSize={{ base: "16px", md: "18px" }}>ALL NOTIFICATION</Text>

        </Flex>
      </div>
      {/* <Flex justifyContent={'right'} mb={2} mt={2}>
        {notificationData && notificationData.length === 0 ? "" :
         <Button
         fontSize={'15px'}
         onClick={markReadNotificationHandler}
         _hover={'none'}
         _active={'none'}
         bgColor={allRead ? 'grey' : '#19884A'}
         color={'white'}
       >
         {allRead ? 'All Read' : 'Mark All Read'}
       </Button>
       
        }
      </Flex> */}
      <div className="coupon--content">
        {notificationData && notificationData.length === 0 ?
          <Flex justifyContent={'center'} width={'100%'} alignItems={'center'} mt={5}>
            <Image width={'100%'} height={{ base: "200px", md: '500px', lg: '500px' }} src={notificationImg} />
          </Flex>
          : <>
            {notificationData.map((data, index) => {
              return (
                <Card key={index} p={4} width={'100%'} mt={2}>
                  <Flex>
                    {/* <Text fontSize={'12px'}>{formatDate(data.createdAt)}</Text> */}
                    <Text fontSize={'12px'}>{formatTimeDifference(data.createdAt)}</Text>
                  </Flex>
                  <Text pt={2} fontSize={'15px'} color={'black'}>
  {data.message}
</Text>
                </Card>
              )
            })}
          </>
        }
      </div>
    </div>
  );
};

export default Coupons;
