import React from "react";
import "../WishList/wishlist.css";
import CategoryLayout from "../../components/layout/CategoryLayout";
import SettingsMenu from "../../components/shared/SettingsMenu";
import Back from "../../assets/setting-image/setback.svg";
import {Grid, GridItem,Image,Text, Flex, Skeleton} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState, useEffect} from "react";
import wishlistBgImg from "../../assets/images/wishlist-bg-img.svg";
import CropAdvisoryApi from "../../apis/advisory.api";
import WeatherCard from "../WeatherAdvisory/weatherCard";
import dataNotFound from "../../assets/images/no-data-found-img.svg";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";

const CropAdvisory = () => {
  const [menu, setMenu] = useState(false);
  

  return (
    <>
    <div>
      <Image width={'100%'} height={'auto'} src={wishlistBgImg}/>
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

  const [cropData, setCropData] = useState([]);
  const cropAdvisoryApi = new CropAdvisoryApi();
  const [isLoading, setIsLoading] = useState(true);

  const getCropData = async () => {
    try {
      const getCropAdvisory = await cropAdvisoryApi.getCropData({

      });
      if (
        getCropAdvisory &&
        getCropAdvisory.data.code === 200 &&
        getCropAdvisory.data.status === "success"
      ) {
        setCropData(getCropAdvisory.data.data);
        // console.log("getCropAdvisory", getCropAdvisory.data.data)
      }
    } catch (error) {
      console.error(error);

      return error;
    } finally {
    setIsLoading(false); 
  }
  };

  const getCropStatus = async () =>{
    try{
      const cropStatus = await cropAdvisoryApi.getCropDataReadStatus();
      if(cropStatus || cropStatus.data.data){
        // console.log("cropStatus.data.data",cropStatus.data.data)
       
      }}
      catch(error){
      console.log(error);
      toast.error("something went wrong");
      throw error;
      }
    }

    const getData = async () =>{
      try{
        const profileData = await cropAdvisoryApi.getProfileData();
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
    getCropData();
    getCropStatus();
    getData();
  }, []);

  
  return (
    <div className="wishlist--container">
      <div className="wishlist--header">
        <Flex width={'100%'} flexDirection={'column'}>
        <Flex width={'100%'}>
          {" "}
          <span className="pro--ham--icon" onClick={() => setMenu(true)}>
            <HamburgerIcon />
          </span>{" "}
          
          <Text bgColor={'#19884A'} width={'100%'} color={'white'} textTransform={'uppercase'} fontSize={'16px'} p={'10px 20px'}>Crop Advisory </Text>
</Flex>
          <div >
          
          {isLoading ? (
            
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(3, 1fr)" }}
              gap={{ base: "2", md: "4", lg: "6" }}
              mt={5}
            >
              {[...Array(5).keys()].map((index) => (
                <GridItem key={index}>
                  <Skeleton height="200px" />
                  <Skeleton height="20px" mt={2}/>
                  <Skeleton height="20px" mt={2}/>
                </GridItem>
              ))}
            </Grid>
          ) :
          cropData.length === 0 ? 
          <Flex justifyContent={'center'}>
              <Image mt={8} src={dataNotFound}/> 
          </Flex>
            :
          <Grid templateColumns={{base:'repeat(2, 1fr)', md:'repeat(3, 1fr)', lg:'repeat(3, 1fr)'}} gap={{base:"2",md:'4', lg:'6'}} mt={5}>
        {cropData.map((data) => {
          return (
            <GridItem key={data.id}>
             
              <WeatherCard
               body={data.body}
                 imgH={'180px'}
                images={data.image}
                carouselHeight={'180px'}
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

export default CropAdvisory;
