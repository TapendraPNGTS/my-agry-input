import React, { useRef, useEffect, useCallback } from "react";
import {
  Heading,
  Text,
  Box,
  Button,
  Image,
  Flex,
  IconButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Stack,
  StackDivider,
  HStack,
  Grid,
  GridItem,
  Icon,
  Textarea,
  Checkbox
} from "@chakra-ui/react";
import parse from "react-html-parser";
import { Link } from 'react-router-dom'

import { ChevronRightIcon, ChevronLeftIcon, StarIcon } from "@chakra-ui/icons";
import { HeartIcon, HeartFillIcon } from "../../utils/Icons";

import "./product.css";
import Itemcard from "../../components/Itemcard";
import { Rating, Star } from "@smastrom/react-rating";
import { useState } from "react";
import { TruckIcon, CalendarEventIcon } from "../../utils/Icons";
import ProductApi from "../../apis/product.api";
import WishlistApi from "../../apis/wishlist.api";
import { updateAllWishlist } from "../../redux/redux-slice/wishlist.slice";

import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import parser from "react-html-parser";
import numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import { resetCart, updateCart } from "../../redux/redux-slice/cart.slice";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../../components/shared/ReviewCard";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import { discountPercentage, userReviewAlready, findProduct } from "../../utils/common.util";
import { updateAllProduct } from "../../redux/redux-slice/product.slice";
import delivery from "../../assets/images/delivery-icon.svg";
import returnIcon from "../../assets/images/return-icon.svg";
import noReview from "../../assets/images/no-review-img.svg";

const Product = () => {
  const isAuth = useAuthenticated();
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollCards = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  const wishlistApi = new WishlistApi();
  const wishlistData = useSelector((state) => state.wishlist.Wishlist);

  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#0d9934",
    inactiveFillColor: "#abb1ac",
  };
  const [quantity, setQuantity] = useState(1);
  const [isWriteReview, setisWriteReview] = useState(false);
  const [description, setDescription] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const incrementQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const decrementQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };
  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };
  const [data, setData] = useState([]);
  const [variants, setVariants] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectImage] = useState(0);
  const products = useSelector((state) => state.products.Products);
  const productApi = new ProductApi();
  const params = useParams();
  const [activeTab, setActiveTab] = useState('features');
  const [rating, setRating] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [descriptionLines, setDescriptionLines] = useState([]);
  const [displayButton, setDisplayButton] = useState(false);
  const [showFullFeatures, setShowFullFeatures] = useState(false);

  // console.log('data review', data);

  const getProductDetails = useCallback(async () => {
    try {
      const productDetailsResponse = await productApi.getProductById({
        productId: params.id,
      });

      if (
        productDetailsResponse &&
        productDetailsResponse?.data?.code === 200
      ) {
        getProductByCategoryId(productDetailsResponse.data.data?.CategoryID);
        setData(productDetailsResponse.data.data);
        setImages(productDetailsResponse.data.data.Images);
        setVariants(productDetailsResponse.data.data.Variants);
      } else {
        return toast.error(`Something went wrong!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  });

  const getProductByCategoryId = useCallback(async (categoryId) => {
    try {
      const productDetailsResponse = await productApi.getProductByCategoryId({
        categoryId,
      });

      if (
        productDetailsResponse &&
        productDetailsResponse?.data?.code === 200
      ) {
      } else {
        return toast.error(`Something went wrong!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  });


  const getProduct = useCallback(async () => {
    try {
      const allproduct = await productApi.getAllProduct();
      if (allproduct || allproduct.data.data) {
        dispatch(updateAllProduct(allproduct.data.data));
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  });
  const getProductReview = useCallback(async () => {
    try {
      const review = await productApi.getReview({
        productId: params.id,
      });
      if (review.data.data) {
        setReviewList(review.data.data);
        // console.log(reviewList);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  });

  const removeWishlist = useCallback(async (productId) => {
    const removeWishlistResponse = await wishlistApi.removeWishlist({
      productId
    });
    if (removeWishlistResponse && removeWishlistResponse.data) {
      getWishlist();
    }
  });
  const getWishlist = async () => {
    try {
      const getWishlistResponse = await wishlistApi.getAllWishlist();
      if (getWishlistResponse && getWishlistResponse.data.data) {
        dispatch(updateAllWishlist(getWishlistResponse.data.data));
      }
    } catch (error) { }
  };
  const addWishlist = async (productId) => {
    try {
      const product = await wishlistApi.addWishlist({
        productId,
      });
      if (product && product.data) {
        if (isAuth) {
          toast.success("Added to wishlist");
          getWishlist()
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (rating > 0) {
      try {
        const postResponse = await productApi.addReview({
          productId: params.id,
          description: description,
          star: rating,
        });
        if (
          postResponse &&
          postResponse.data.code === 200 &&
          postResponse.data.status === "success"
        ) {
          setisWriteReview(false);
          getProductReview();
          getProductDetails();
          return toast.success(postResponse.data.message);
        } else {
          return toast.error(postResponse.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
        return error;
      }
    }
  };
  useEffect(() => {
    getProductDetails();
    getProductReview();
    getProduct()
  }, [params.id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const parser2 = (htmlString) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const paragraphs = Array.from(doc.querySelectorAll('p'));
      const textContent = paragraphs.map(p => p.textContent).join('\n');

      return textContent;
    } catch (error) {
      console.error('Error parsing HTML:', error);
      return '';
    }
  };

  useEffect(() => {
    if (data.Description) {
      try {
        const parsedDescription = parser2(data.Description);

        // console.log('Parsed Description:', parsedDescription);

        if (typeof parsedDescription === 'string') {
          const lines = parsedDescription.split('\n');
          setDescriptionLines(showFullDescription ? lines : lines.slice(0, 4));

          const shouldDisplayButton = lines.length > 4;

          setDisplayButton(shouldDisplayButton);

        } else {

          throw new Error('Parser did not return a string');
        }
      } catch (error) {
        console.error(error);

        setDescriptionLines([]);
      }
    }
  }, [data.Description, showFullDescription]);




  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  }

  const featureContents = data.Feature || '';

  const featureLines = featureContents.split('<li>');

  const initialDisplayLines = 5;
  const displayLines = showFullFeatures ? featureLines.length : initialDisplayLines;


  return (
    <div>
      <div className="home-parent">
        <div className="layout-container">
          <Breadcrumb
            paddingTop={`5`}
            fontWeight="medium"
            fontSize="md"
            color={`grey`}
            mt={5}
          >
            <BreadcrumbItem>
              <Link to={'/'}>
                <BreadcrumbLink >Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem color={`black`}>
              <BreadcrumbLink>Product</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={true} color={`black`}>
              <BreadcrumbLink>{data.Name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div className="layout-container home-shop-brand">
          {/* Divide container into 2 parts */}
          <Flex wrap={"wrap"} gap={6} marginTop={6}>
            <Flex
              direction={{ base: 'column', md: 'row-reverse' }}
              flex={1}
              minWidth={`300px`}
              cursor={`pointer`}
              position={{ base: 'static', md: 'sticky' }}
              top={0}
              height={{ base: "100%", md: '410px', lg: '400px' }}
            >
              <Flex
                justifyContent={`center`}
                alignItems={`center`}
                width={`100%`}
                height={`400px`}
                bg={`white`}
                roundedTopLeft={`xl`}
                roundedTopRight={`xl`}
                position={`relative`}
              // key={i}
              >
                {
                  discountPercentage(data.DiscountPrice, data.Price).toFixed(0) === '0' ? '' :
                    <>
                      <Box
                        position={"absolute"}
                        top={0}
                        left={0}
                        bg={"red.400"}
                        aria-label="wishlist"
                        roundedBottomRight={10}
                        padding={1}
                      >
                        <Text
                          fontSize={"15px"}
                          fontWeight={600}
                          marginRight={2}
                          marginLeft={2}
                          color={"white"}
                        >


                          {discountPercentage(data.DiscountPrice, data.Price).toFixed(0)}% Off

                        </Text>
                      </Box>
                    </>
                }

                <Image
                  maxHeight={`400px`}
                  maxWidth={`100%`}
                  // margin={`auto`}
                  // width={'100%'}

                  src={images[selectedImage]}
                />

                <IconButton
                  position={"absolute"}
                  top={{ base: "1px", md: '3' }}
                  right={{ base: "1px", md: '3' }}
                  bg={"white"}
                  aria-label="wishlist"
                  icon={
                    findProduct(data.ProductID, wishlistData) ? (
                      <HeartFillIcon />
                    ) : (
                      <HeartIcon />
                    )
                  }
                  rounded={"full"}
                  onClick={(e) => {
                    if (findProduct(data.ProductID, wishlistData)) {
                      removeWishlist(data.ProductID);
                    } else {
                      addWishlist(data.ProductID);
                    }
                  }}
                />

              </Flex>
              {/* );
                })} */}


              <Flex
                marginTop={{ base: 3, md: 0 }}
                direction={{ base: "row", md: 'column' }}
                gap={2}
                // paddingY={2}
                // paddingBottom={6}
                roundedBottomRight={`xl`}
                roundedBottomLeft={`xl`}
                justifyContent={{ base: "center", md: 'start' }}
                h={{ base: '20', md: 'auto' }}
                mr={{ base: 0, md: 2 }}
              >
                <Grid templateColumns={{ base: "repeat(4, 1fr)", md: "repeat(1, 1fr)" }}>
                  {images.map((row, index) => {
                    return (
                      <GridItem
                        key={`image-${index}`}
                        className="slpo-container"
                        onClick={() => setSelectImage(index)}
                      >
                        <Image src={row} height={'auto'} width={{ base: "30", md: '50' }} maxHeight={'70px !important'} alt="" />
                      </GridItem>
                    );
                  })}
                </Grid>
              </Flex>
            </Flex>
            <Flex direction={`column`} flex={1} padding={`2`}>
              <Flex>
                <Text fontSize={`24px`} fontWeight={600}>
                  {data.Name}
                </Text>
              </Flex>
              <Flex marginTop={`2`}>
                <Text fontSize={`24px`} fontWeight={`bolder`}>

                  ₹{numeral(data.DiscountPrice).format("00,00")}
                </Text>
                <Text
                  fontSize={`24px`}
                  fontWeight={`bolder`}

                  color={"#AAAAAA"}
                  as="s"
                  ml={4}
                >
                  ₹{numeral(data.Price).format("00,00")}
                </Text>
              </Flex>
              {/* Review Section */}
              <div>
                <Flex direction={"column"}>
                  <Flex direction={"column"} justifyContent={"space-between"}>
                    <Flex direction={"row"} justifyContent={"space-between"}>



                    </Flex>

                    <Flex marginTop={2} marginBottom={2}>
                      <Flex marginTop={`2`} alignItems={"center"}>
                       
                        <Flex direction={"row"}>
                          <Rating
                            value={data.AvgRating}
                            style={{
                              maxWidth: "120px",

                            }}
                            itemStyles={myStyles}
                            readOnly
                          />
                          <Text fontSize={`16px`} ml={3} fontWeight={500} textDecoration={'underline'}>
                            {data.ReviewTotal} reviews
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>

                </Flex>
              </div>
              <Flex marginTop={`2`}>
                {/* <Text fontSize={`14px`} fontWeight={`400`} >
                  {parser(data.Description)}
                </Text> */}

                <Text fontSize={`14px`} fontWeight={`400`}>
                  {descriptionLines.map((line, index) => (
                    <span key={index}>{line}<br /></span>
                  ))}
                  <Text width={'100%'} color="#19884A" fontWeight={'bold'}>
                    {displayButton && (
                      <button onClick={toggleDescription} >
                        {showFullDescription ? 'Read Less.' : 'Read More.'}
                      </button>
                    )}
                  </Text>
                </Text>


              </Flex>


              <Flex
                marginTop={`2`}
                marginBottom={`2`}
                alignItems={`center`}
                gap={5}
              >


                {/* add to cart */}
                {data.Quantity === 0 ?
                  <Button
                    _hover={'#4bcb84a8'}
                    variant="outline"
                    color="white"
                    bgColor={'#4bcb84a8'}
                    // flex={1}
                    rounded={"md"}
                    // width={`25%`}
                    padding={'12px 30px'}
                    disabled
                    cursor={'not-allowed'}
                  >
                    Add to Cart
                  </Button> :
                  <Button
                    _hover={'#19884A'}
                    variant="outline"
                    color="white"
                    bgColor={'#19884A'}
                    // flex={1}
                    rounded={"md"}
                    // width={`25%`}
                    padding={'12px 30px'}
                    onClick={() => {
                      // alert(data.DiscountPrice)

                      dispatch(
                        updateCart({
                          ProductID: data.ProductID,
                          CoverImage: data.CoverImage,
                          Name: data.Name,
                          Price: data.DiscountPrice,
                          Quantity: quantity,
                          GST: data.Gst || 0,
                        })
                      );
                      toast.success("Cart updated successfully")
                    }
                    }
                  >
                    Add to Cart
                  </Button>
                }
              </Flex>
              <Flex direction={`row`} alignItems={`center`} gap={2}>
                {data.Quantity === 0 ? <Text color={'red'}>Out off stock</Text> :
                  <Text fontSize={`14px`} fontWeight={`small`}>
                    Only{" "}
                    <Text as="span" color="red.500">
                      {data.Quantity} Left
                    </Text>{" "}
                    in stock
                  </Text>
                }
              </Flex>

              {data.Quantity === 0 ?
                <Button
                  marginTop={4}
                  fontSize={'18px'}
                  background="#d4d4d485"
                  color={"black"}
                  // flex={1}
                  rounded={"md"}
                  width={`100%`}
                  padding={'25px'}
                  disabled
                  cursor={'not-allowed'}
                >
                  Buy Now
                </Button> :
                <Link to={`/checkout`}>
                  <Button
                    marginTop={4}
                    fontSize={'18px'}
                    background="#D4D4D4"
                    color={"black"}
                    // flex={1}
                    rounded={"md"}
                    width={`100%`}
                    padding={'25px'}
                    onClick={() => {
                      dispatch(resetCart());
                      dispatch(
                        updateCart({
                          ProductID: data.ProductID,
                          CoverImage: data.CoverImage,
                          Name: data.Name,
                          Price: data.DiscountPrice,
                          Quantity: quantity,
                          GST: data.Gst || 0,
                        })
                      );
                      navigate("/checkout");
                    }}
                  >
                    Buy Now
                  </Button>
                </Link>
              }
              <Flex paddingTop={`5`}>

                <Stack spacing="4">

                  <Flex alignItems={'center'}>

                    <Image src={delivery} />

                    <Box ml={4}>
                      <Heading size="sm">Free Delivery</Heading>
                      <Text
                        // paddingLeft="48px"
                        marginTop={`1`}
                        fontSize="xs"
                      >
                        Enter your pincode to check availability.
                      </Text>
                    </Box>
                  </Flex>

                  <Flex alignItems={'center'} >
                    {/* <HStack spacing="2" alignItems={'center'}> */}
                    {/* Another icon and text */}
                    {/* <IconButton
                              bg={"white"}
                              aria-label="wishlist"
                              icon={<CalendarEventIcon />}
                              rounded={"full"}
                            /> */}
                    <Image src={returnIcon} />
                    {/* </HStack> */}
                    <Box ml={4}>
                      <Heading size="sm">Return Delivery</Heading>
                      <Text
                        // paddingLeft="48px"
                        marginTop={`1`}
                        fontSize="xs"
                      >
                        Free 30days return policy.
                      </Text>
                    </Box>
                  </Flex>
                  {/* </div> */}
                </Stack>
                {/* </CardBody> */}
                {/* </Card> */}
              </Flex>
            </Flex>
          </Flex>
        </div>



        <Box border={'1px solid #F0F0F0'}
          width={'95%'}
          m={'auto'}
          bgColor={'white'}
          mt={5}
          mb={8}
          h={'auto'}

        >
          <Flex borderBottom={'1px solid #F0F0F0'} >
            <Button style={{
              backgroundColor: activeTab === 'features' ? '#19884A' : 'white',
              color: activeTab === 'features' ? 'white' : 'black'
            }}
              p={'5px 35px'}
              rounded={'sm'}
              fontWeight={'md'}
              onClick={() => handleTabClick('features')}
              isActive={activeTab === 'features'}>FEATURES</Button>

            <Button style={{
              backgroundColor: activeTab === 'reviews' ? '#19884A' : 'white',
              color: activeTab === 'reviews' ? 'white' : 'black'
            }}
              p={'5px 40px'}
              fontWeight={'md'}
              rounded={'sm'}
              onClick={() => handleTabClick('reviews')}
              isActive={activeTab === 'reviews'}>REVIEWS</Button>
          </Flex>
          <Box p={{ base: '20px 10px', md: '30px 50px' }}>
            {activeTab === 'features' && (

              <div>

                <Text fontSize={'15px'} fontWeight={400} dangerouslySetInnerHTML={{ __html: featureLines.slice(0, displayLines).join('<li>') }} />

                <Box width={'100%'} >
                  {featureLines.length > initialDisplayLines && (
                    <button style={{ color: "#19884A" }} onClick={() => setShowFullFeatures(!showFullFeatures)}>
                      {showFullFeatures ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </Box>
              </div>
            )}
            {activeTab === 'reviews' && (

              <div>

                <Box>
                  <Flex  >
                    <Flex direction={"row"} alignItems={'center'}>
                      <Rating
                        value={data.AvgRating}
                        style={{
                          maxWidth: "110px",
                        }}
                        itemStyles={myStyles}
                        readOnly
                      />
                      <Text fontSize={{ base: '14px', md: '16px' }} ml={{ base: 1, md: 3 }} fontWeight={500} textDecoration={'underline'}>
                        {data.ReviewTotal} reviews
                      </Text>
                    </Flex>
                    {(userReviewAlready(reviewList) && isAuth) ? (
                      <Button
                        color="#2A7EBA"
                        fontSize={{ base: '14px', md: "16px" }}
                        size={'sm'}
                        ml={{ base: 2, md: 3 }}
                        onClick={(e) => {
                          setisWriteReview(isWriteReview ? false : true);
                        }}
                      >
                        Write a Review
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Flex>
                  <Box width={'100%'} mt={4}>
                    {isWriteReview ? (
                      <Box>
                        <div className="sp--review-bg">
                          <div className="sp--total--rating">
                            <div>
                              <b>⪼ Please Submit Your Feedback Here ⪻ </b>
                              <HStack spacing={1} marginTop={2}>
                                {Array(5)
                                  .fill()
                                  .map((_, index) => (
                                    <Icon
                                      key={`sp--review${index}`}
                                      as={StarIcon}
                                      w={5}
                                      h={5}
                                      color={index < rating ? "yellow.400" : "gray.400"}
                                      cursor="pointer"
                                      onClick={() => handleRatingClick(index + 1)}
                                    />
                                  ))}
                              </HStack>
                            </div>
                          </div>
                          <div className="write--review">
                            <Textarea
                              placeholder="Write a review"
                              color={"gray.500"}
                              resize={"none"}
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                            />
                            <Button
                              colorScheme={rating <= 0 ? "blackAlpha" : "green"}
                              onClick={handleSubmit}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </Box>
                    ) : (
                      <>
                        {reviewList.length === 0 ?
                          <Flex justifyContent={'center'}>
                            <Image src={noReview} />
                          </Flex>
                          : ""
                        }
                      </>
                    )}

                    <Box mt={4} width={'100%'}>
                      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={2}>
                        {reviewList.map((row, index) => {
                          return (
                            <GridItem
                              key={`review-${index}`}
                              // colSpan={2}
                              boxShadow={"20px"}
                              bg={"#f5f5f5"}
                              borderRadius={"10px"}
                            >
                              <ReviewCard data={row} />
                            </GridItem>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Box>



                </Box>
              </div>
            )}
          </Box>
          <Box>

          </Box>
        </Box>



        <div className="layout-container section-margin">
          <Flex justifyContent={"space-between"}>
            <Heading fontSize={'24px'} fontWeight={700} textAlign={'center'}>
              Similar Product
            </Heading>
            <Flex gap={2}>
              <IconButton
                colorScheme="gray"
                aria-label="wishlist"
                icon={<ChevronLeftIcon />}
                rounded={"full"}
                onClick={() => scrollCards(-300)}
              />
              <IconButton
                colorScheme="gray"
                aria-label="wishlist"
                icon={<ChevronRightIcon />}
                rounded={"full"}
                onClick={() => scrollCards(300)}
              />
            </Flex>
          </Flex>
          <div className="content-scrolls" ref={scrollRef}>
            <Itemcard
              widthmin={'160px'}
              widthmax={"220px"}
              scroll={scrollRef}
              products={products}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
