import React from "react";
import { Flex, Image, IconButton, Button, Text, Box, HStack, Grid, GridItem } from "@chakra-ui/react";
import { HeartIcon, HeartFillIcon } from "../../utils/Icons";
import { Rating, Star } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import WishlistApi from "../../apis/wishlist.api";
import toast from "react-hot-toast";
import CardSkeleton from "../Skeleton/CardSkeleton";

import { updateCart } from "../../redux/redux-slice/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { discountPercentage, findProduct } from "../../utils/common.util";
import { useCallback } from "react";
import { updateAllWishlist } from "../../redux/redux-slice/wishlist.slice";
import addToCart from "../../assets/images/add-to-cart-img-product-cards.svg";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";

const Itemcard = ({ scroll, products, isLoading, widthmin, widthmax }) => {
  const isAuth = useAuthenticated();
  const dispatch = useDispatch()
  const wishlistApi = new WishlistApi();
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#0d9934",
    inactiveFillColor: "#abb1ac",
  };
  const wishlistData = useSelector((state) => state.wishlist.Wishlist);

  const removeWishlist = useCallback(async (productId) => {
    const removeWishlistResponse = await wishlistApi.removeWishlist({
      productId
    });
    if (removeWishlistResponse && removeWishlistResponse.data) {
      getWishlist();
    }
  });
  const handleAddToCart = (product) => {
    const data = {
      ProductID: product.ProductID,
      CoverImage: product.CoverImage,
      Price: product.DiscountPrice,
      CategoryID: product.CategoryID,
      Name: product.Name,
      Quantity: 1,
      GST: product.Gst,
    };
    dispatch(updateCart(data));
    toast.success("Product added successfully");
  };
  const addWishlist = async (productId) => {
    try {
      const product = await wishlistApi.addWishlist({
        productId,
      });

      if (product && product.data) {
       
        if(isAuth){
        toast.success("Added to wishlist");
        getWishlist()
        }else{
          toast.error("please login first!");
        }
       
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  };

  const getWishlist = async () => {
    try {
      const getWishlistResponse = await wishlistApi.getAllWishlist();
      if (getWishlistResponse && getWishlistResponse.data.data) {
        dispatch(updateAllWishlist(getWishlistResponse.data.data));
      }
    } catch (error) { }
  };
  return (
    <>
      {(isLoading) ? <CardSkeleton /> :
        <>
          {products && products.map((row, index) => {
           
            return (
              <Flex
                direction={"column"}
                flex={1}
                minWidth={{ base: widthmin, sm: widthmax }}
                maxWidth={{ base: "100%", md: "100%" }}
                shadow={'2xl'}
                boxShadow={'none'}
                cursor={`pointer`}
                border={'1px solid #f1f1f1'}
                key={index}
                rounded={'sm'}
                transition="0.6s"
                bg={'white'}
                _hover={{ transform: "scale(1.03)", border: "1px solid #f1f1f9 " }}
                // h={'20px'}
                borderRadius={'10px'}
                width='100%'
                m={{ base: "auto", md: 0 }}
                position={"relative"}
              >


<Link to={`/product-detail/${row.ProductID}`}>
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"100%"}
                  height={{ base: "100px", md: "120px" }}
                  // bg={"gray.100"}
                  roundedTopLeft={"sm"}
                  roundedTopRight={"sm"}
                  position={"relative"}
                  

                // key={index}
                >
                  {discountPercentage(row.DiscountPrice, row.Price).toFixed(0) === '0' ? "" :
                  <Box
                    position={"absolute"}
                    top={0}
                    left={0}
                    bg={"red.400"}
                    aria-label="wishlist"
                    roundedBottomRight={10}
                    roundedTopLeft={'sm'}
                    padding={{ base: "0", md: "1" }}
                  >
                    <Text fontSize={"12px"} fontWeight={600} marginRight={2} marginLeft={2} color={'white'}>
                      {discountPercentage(row.DiscountPrice, row.Price).toFixed(0)} % Off
                    </Text>
                  </Box>
                  }
                  <Link to={`/product-detail/${row.ProductID}`}>
                    <Image
                      maxHeight={{ base: "100px", md: "100px" }}
                      maxWidth={"200px"}
                      margin={"auto"}
                      zIndex={-1}
                      src={`${row.CoverImage}`}
                    />
                  </Link>
                </Flex>
                </Link>
                  <IconButton
                    position={"absolute"}
                    top={{ base: "1px", md: '3' }}
                    right={{ base: "1px", md: '3' }}
                    bg={"white"}
                    // zIndex={9999999}

                    aria-label="wishlist"
                    icon={
                      findProduct(row.ProductID, wishlistData) ? (
                        <HeartFillIcon />
                      ) : (
                        <HeartIcon />
                      )
                    }
                    rounded={"full"}
                    onClick={(e) => {
                      if (findProduct(row.ProductID, wishlistData)) {
                        removeWishlist(row.ProductID);
                      } else {
                        addWishlist(row.ProductID);
                      }
                    }}
                  />
               
                <Flex
                  marginTop={0}
                  direction={"column"}
                  gap={1}
                  paddingX={{ base: 3, md: 4 }}
                  paddingY={1}
                  alignItems={{ base: "start", md: "start" }}
                  paddingBottom={6}
                  roundedBottomRight={"xl"}
                  roundedBottomLeft={"xl"}
                // shadow={"lg"}\
                >
                  <Link to={`/product-detail/${row.ProductID}`}>
                    <Flex direction={'column'} alignItems={"top"} justifyContent={"space-between"}>
                      <Text fontSize={{ base: "15px", md: "16px" }} width={{ base: '100%', md: 160 }} fontWeight={600} marginEnd={1} noOfLines={1}>
                        {row.Name}
                      </Text>
                      <Flex

                      >
                        <Rating

                          value={row.AvgRating}
                          readOnly={true}
                          isDisabled={true}
                          itemStyles={myStyles}
                          style={{
                            maxWidth: "80px",
                            marginRight: ".5rem",

                          }}

                        />
                        <Text fontSize={"16px"}> ({row.ReviewTotal})</Text>
                      </Flex>
                      <HStack
                        textAlign={'center'} >

                        <Text fontSize={'16px'} fontWeight={600} color="#006837">
                          ₹ {row.DiscountPrice}
                        </Text>

                        <Text fontSize={{ base: "12px", md: "16px" }} color={'grey'} fontWeight={600} as='s' marginStart={2}>
                          ₹ {row.Price}
                        </Text>
                      </HStack>

                      <Text textColor={'red.600'} fontSize={{ base: "8px", md: "10px" }} fontWeight={600}>
                        You Saved it ₹  {Math.abs(row.DiscountPrice - row.Price).toFixed(0)}
                      </Text>
                    </Flex>


                  </Link>

                  <Flex
                    justifyContent={"left"}
                    // m={'auto'}
                    gap={1}
                    // marginTop={1}
                    // wrap={"wrap"}
                    alignItems={'center'}
                    mb={'-2'}

                  >
                    {row.Quantity === 0 ? (<>
                      <Image background={'#006837'} p={'6px'} borderRadius={2} src={addToCart} />

                    </>):(<>
                    
                    <Box onClick={(e) => {
                      handleAddToCart(row);
                    }}>
                      <Image background={'#006837'} p={'6px'} borderRadius={2} src={addToCart} />
                    </Box>
                    </>)}
                    {/* <Button
                      variant="outline"
                      color="#2A7EBA"
                      flex={1}
                      w={'fit-content'}
                      rounded={"full"}
                      
                      display={{ base: "none", md: "flex" }}
                    >
                      Add to Cart
                    </Button> */}
                    {/* <Link to={`/product-detail/${row.ProductID}`}>
                      <Button
                        background="#2A7EBA"
                        color={'white'}
                        h={{ base: '33px', md: "40px" }}
                        w={{ base: "128px", md: "full" }}
                        rounded={"full"}
                        m={'auto'}
                      >
                        Buy Now
                      </Button>
                    </Link> */}
                    {row.Quantity === 0 ? (<>
                      <Text color="red" fontSize={'16px'} fontWeight={'bold'}>Out of stock</Text>

                    </>):(<>
                      <Text color="#006837" fontSize={'16px'} fontWeight={'bold'}>In stock</Text>

                    </>)}
                  </Flex>

                </Flex>
              </Flex>
            );
          })}
        </>
      }
    </>
  );
};

export default Itemcard;
