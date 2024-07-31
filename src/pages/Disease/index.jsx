import React from "react";
import "../WishList/wishlist.css";
import CategoryLayout from "../../components/layout/CategoryLayout";
import SettingsMenu from "../../components/shared/SettingsMenu";
import Back from "../../assets/setting-image/setback.svg";
import {Grid, GridItem,Image, Text,Flex, Skeleton} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState, useEffect} from "react";
import wishlistBgImg from "../../assets/images/wishlist-bg-img.svg";
import DiseaseApi from "../../apis/advisory.api";
import WeatherCard from "../WeatherAdvisory/weatherCard";
import dataNotFound from "../../assets/images/no-data-found-img.svg";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";

const Disease = () => {
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

  const [diseaseData, setDiseaseData] = useState([]);
  const diseaseApi = new DiseaseApi();
  const [isLoading, setIsLoading] = useState(true);


  const getDiseaseData = async () => {
    try {
      const getDiseaseAdvisory = await diseaseApi.getDeseaseData({

      });
      if (
        getDiseaseAdvisory &&
        getDiseaseAdvisory.data.code === 200 &&
        getDiseaseAdvisory.data.status === "success"
      ) {
        setDiseaseData(getDiseaseAdvisory.data.data);
        // console.log("getCropAdvisory", getDiseaseAdvisory.data.data)
      }
    } catch (error) {
      console.error(error);

      return error;
    }finally{
      setIsLoading(false);
    }
  };

  const getDiseaseReadStatus = async () =>{
    try{
      const diseaseStatus = await diseaseApi.getDiseaseReadStatus();
      if(diseaseStatus || diseaseStatus.data.data){
        // console.log("diseaseStatus.data.data",diseaseStatus.data.data)
       
      }}
      catch(error){
      console.log(error);
      toast.error("something went wrong");
      throw error;
      }
    }

    const getData = async () =>{
      try{
        const profileData = await diseaseApi.getProfileData();
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
    getDiseaseData();
    getDiseaseReadStatus();
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
          
          <Text bgColor={'#19884A'} width={'100%'} color={'white'} textTransform={'uppercase'} fontSize={'16px'} p={'10px 20px'}>Disease</Text>
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
                 
                </GridItem>
              ))}
            </Grid>
          ) :
          diseaseData.length === 0 ? 
          <Flex justifyContent={'center'}>
              <Image mt={8} src={dataNotFound}/> 
          </Flex>
            :
          <Grid templateColumns={{base:'repeat(2, 1fr)', md:'repeat(3, 1fr)', lg:'repeat(3, 1fr)'}} gap={{base:"2",md:'4', lg:'6'}} mt={5}>
        {diseaseData.map((data) => {
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

export default Disease;
