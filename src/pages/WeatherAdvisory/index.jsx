import React from "react";
import "../WishList/wishlist.css";
import CategoryLayout from "../../components/layout/CategoryLayout";
import SettingsMenu from "../../components/shared/SettingsMenu";
import Back from "../../assets/setting-image/setback.svg";
import {Flex, Grid, GridItem,Image,Skeleton,Text} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState, useEffect} from "react";
import wishlistBgImg from "../../assets/images/wishlist-bg-img.svg";
import WeatherCard from "./weatherCard";
import WeatherApi from  "../../apis/advisory.api";
import bgImage from "../../assets/images/weatherCard-bg-img.svg";
import dataNotFound from "../../assets/images/no-data-found-img.svg";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";
 
const WeatherAdvisory = () => {
  const [menu, setMenu] = useState(false);
  const [isLoding, setIsLoading] = useState(true);

  useEffect(()=>{
setIsLoading(false);
  },[2000])

  return (
    <>
    <div>
      {isLoding === true ?
    <Skeleton height={'70vh'} width={'100%'}/>  :
   
      <Image width={'100%'} height={'100%'} src={wishlistBgImg}/>
}
    </div>
      <div className="settings--page--container">
        <CategoryLayout
          left={<NavigationMenu setMenu={setMenu} menu={menu} />}
          right={
            <WishlistCards setMenu={setMenu} menu={menu}  />
          }
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

const WishlistCards = ({  setMenu }) => {
  const [weatherData, setWeatherData] = useState([]);
  const weatherApi = new WeatherApi();
  const [isLoading, setIsLoading] = useState(true);

  const getWetherData = async () => {
    try {
      const getWether = await weatherApi.getWeatherData({

      });
      if (
        getWether &&
        getWether.data.code === 200 &&
        getWether.data.status === "success"
      ) {
        setWeatherData(getWether.data.data);
        // console.log("weatherDATA", getWether.data.data)
      }
    } catch (error) {
      console.error(error);

      return error;
    }finally {
      setIsLoading(false); 
    }
  };

  const getWeatherReadStatus = async () =>{
    try{
      const weatehrStatus = await weatherApi.getWeatherReadStatus();
      if(weatehrStatus || weatehrStatus.data.data){
        // console.log("weatehrStatus.data.data",weatehrStatus.data.data)
       
      }}
      catch(error){
      console.log(error);
      toast.error("something went wrong");
      throw error;
      }
    }

    const getData = async () =>{
      try{
        const profileData = await weatherApi.getProfileData();
        if(profileData || profileData.data.data){
          // console.log("profileData.data.data",profileData.data.data)
          
        }}
        catch(error){
        console.log(error);
        toast.error("something went wrong");
        throw error;
        }
      }

  useEffect(() => {
    getWetherData();
    getWeatherReadStatus();
    getData();
  }, []);

  function formatDate(date) {
    return new Date(date).toLocaleString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="wishlist--container">
      <div className="wishlist--header">
        <Flex width={'100%'} flexDirection={'column'}>
        <Flex width={'100%'}>
          {" "}
          <span className="pro--ham--icon" onClick={() => setMenu(true)}>
            <HamburgerIcon />
          </span>{" "}
          
          <Text bgColor={'#19884A'} width={'100%'} color={'white'} textTransform={'uppercase'} fontSize={'16px'} p={'10px 20px'}> Weather Advisory </Text>
         </Flex>
          <div >
          {isLoading ? (
            
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(3, 1fr)" }}
              gap={{ base: "2", md: "4", lg: "6" }}
              mt={5}
            >
              {[...Array(6).keys()].map((index) => (
                <GridItem key={index}>
                  <Skeleton height="250px" />
                  <Skeleton height="20px" mt={2}/>
                  <Skeleton height="20px" mt={2}/>
                  <Skeleton height="20px" mt={2}/>
                  <Skeleton height="20px" mt={2}/>
                </GridItem>
              ))}
            </Grid>
          ) :
            weatherData && weatherData.length === 0 ? 
          <Flex justifyContent={'center'}>
              <Image mt={8} src={dataNotFound}/> 
          </Flex>
            :
         
            <Grid templateColumns={{base:'repeat(2, 1fr)', md:'repeat(3, 1fr)', lg:'repeat(3, 1fr)'}} gap={{base:"2",md:'4', lg:'6'}} mt={5}>
        {weatherData.map((data) => {
          return (
            <GridItem key={data.id}>
             
              <WeatherCard 
               temperture={data.body.temperture}
               date={formatDate(data.scheduleDate)}
                rainfall={data.body.rainfall}
                humidity={data.body.humidity}
                wind={data.body.wind}
                severe={data.body.severe}
                images={data.image}
                Rainfall="Rainfall :"
                Humidity="Humidity :"
                Wind= "Wind :"
                Severe= "Severe :"
                imgH={'130px'}
                cardp={{base:'10px', md:'20px'}}
                bgImage={bgImage}
                carouselHeight={{base:'100px', md:'130px'}}
              />

            </GridItem>
          )
        })}
</Grid>
}

      </div>
        </Flex>
      </div>
    </div>
  );
};

export default WeatherAdvisory;
