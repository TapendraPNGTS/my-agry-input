import React from "react";
import "./wishlist.css";
import CategoryLayout from "../../components/layout/CategoryLayout";
import SettingsMenu from "../../components/shared/SettingsMenu";
import Back from "../../assets/setting-image/setback.svg";
import {Box, Flex, Grid, GridItem,Image} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ProductCard from "../../components/Itemcard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useCallback } from "react";
import WishlistApi from "../../apis/wishlist.api"
import { updateAllWishlist } from "../../redux/redux-slice/wishlist.slice";
import wishlistBgImg from "../../assets/images/wishlist-bg-img.svg";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import productNotFound from "../../assets/images/product-not-found.svg";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";

const Wishlist = () => {
  const isAuth = useAuthenticated();
  const [menu, setMenu] = useState(false);
  const wishlists = useSelector((state) => state.wishlist.Wishlist);

  const dispatch = useDispatch();

  const wishlistApi = new WishlistApi()

  const getWishlist = useCallback(async()=>{
    const wishlistResponse = await wishlistApi.getAllWishlist();
    if(wishlistResponse && wishlistResponse.data.data){
      dispatch(updateAllWishlist(wishlistResponse.data.data));
    }
  })
  useEffect(()=>{
    if (isAuth) {
    getWishlist()
    }
  },[])

  return (
    <>
    <div>
      <Image width={'100%'} height={'auto'} src={wishlistBgImg}/>
    </div>
      <div className="settings--page--container">
        <CategoryLayout
          left={<NavigationMenu setMenu={setMenu} menu={menu} />}
          right={
            <WishlistCards setMenu={setMenu} menu={menu} products={wishlists} />
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

const WishlistCards = ({ menu, setMenu, products }) => {
  return (
    <div className="wishlist--container">
      <div className="wishlist--header">
        <h2>
          {" "}
          <span className="pro--ham--icon" onClick={() => setMenu(true)}>
            <HamburgerIcon />
          </span>{" "}
          My Wishlist
        </h2>
      </div>
      {products && products.length === 0 ? 
    <Flex justifyContent={'center'}>
      <Image src={productNotFound} />
    </Flex>  
    :
      <div >
        <Grid 
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg:"repeat(4, 1fr)" }}
        gap={3}
        mt={5}
        >
         
          {products.map((product, index) => (
          <GridItem key={index} >
            <ProductCard
              widthmin={"100%"}
              widthmax={"100%"}
              // scroll={scroll}
              products={[product]} // Displaying one card at a time
              
            />
          </GridItem>
        ))}

        </Grid>
      </div>
}
    </div>
  );
};

export default Wishlist;
