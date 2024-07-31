import React from "react";
import { Flex, Image, IconButton, Button, Img, Text, Box, HStack, Grid, GridItem } from "@chakra-ui/react";
import { HeartIcon, HeartFillIcon } from "../../utils/Icons";
import { Rating, Star } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import WishlistApi from "../../apis/wishlist.api";
import toast from "react-hot-toast";
import CardSkeleton from "../Skeleton/CardSkeleton";
import services_img from '../../assets/images/services_img.svg'
import { updateCart } from "../../redux/redux-slice/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { discountPercentage, findProduct } from "../../utils/common.util";
import { useCallback } from "react";
import { updateAllWishlist } from "../../redux/redux-slice/wishlist.slice";
import addToCart from "../../assets/images/add-to-cart-img-product-cards.svg";

const Itemcard = ({ scroll, products, isLoading, widthmin, widthmax }) => {
  const dispatch = useDispatch()
  const wishlistApi = new WishlistApi();
 
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
      Price: product.FrenchisePrice,
      CategoryID: product.CategoryID,
      Name: product.Name,
      Quantity: 1,
      GST: product.Gst,
      DiscountPrice: product.DiscountPrice,
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
        toast.success("Added to wishlist");
        getWishlist()
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
              >



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
                  {/* <Box
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
                  </Box> */}
                  <Link to={`/product-detail/${row.ProductID}`}>
                    <Image
                      maxHeight={{ base: "100px", md: "100px" }}
                      maxWidth={"200px"}
                      margin={"auto"}
                      src={`${row.CoverImage}`}
                    />
                  </Link>
                  <IconButton
                    position={"absolute"}
                    top={{ base: "1px", md: '3' }}
                    right={{ base: "1px", md: '3' }}
                    bg={"white"}
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
                </Flex>

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
                      <Text mt={2} fontSize={{ base: "15px", md: "20px" }} width={{ base: '100%', md: 160 }} fontWeight={600} marginEnd={1} noOfLines={1}>
                        {row.Name}
                      </Text>
                      <Flex
                      >
                      </Flex>
                      <HStack
                        textAlign={'center'} >
                        <Text fontSize={'20px'} fontWeight={600} color="#19884A">
                          ₹ {row.DiscountPrice}
                        </Text>

                        <Text fontSize={{ base: "12px", md: "16px" }} color={'grey'} fontWeight={600} as='s' marginStart={2}>
                          ₹ {row.Price}
                        </Text>
                      </HStack>
                    </Flex>
                  </Link>
                  <Button
                    background="#19884A"
                    color={'white'}
                    w={'full'}
                    fontSize={'13px'}
                    h={{ base: '33px', md: "40px" }}
                    // w={{ base: "128px", md: "full" }}
                    rounded={"sm"}
                    m={'auto'}
                    _hover={{ bgColor: "#19883A" }}
                  >
                    <Img mr={2} src={services_img} />
                    Book Now
                  </Button>
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
