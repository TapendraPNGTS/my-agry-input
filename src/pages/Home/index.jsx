import React, { useRef, useState, useEffect, useCallback } from "react";
import { Heading, Text, Box, Img, Flex, Image, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import "./home.css";
import Brandcard from "../../components/Brandcard/index ";
import Itemcard from "../../components/Itemcard";
import ProductApi from "../../apis/product.api";
import { useDispatch, useSelector } from "react-redux";
import { updateAllProduct } from "../../redux/redux-slice/product.slice";
import { updateAllWishlist } from "../../redux/redux-slice/wishlist.slice";
import WishlistApi from "../../apis/wishlist.api";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import Other from "../../apis/other.api";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import growthIcon from "../../assets/images/growth-icon.svg";
import foodIcon from "../../assets/images/food-icon.svg";
import OrganicCrop from "../../assets/images/organinic-crop-icon.svg";
import freshCropIcon from "../../assets/images/fresh-cromp-img.svg";
import ecoIcon from "../../assets/images/eco-friendly-icon.svg";
import arrivalSmall from "../../assets/images/mobile-arrival-img.svg";
import viewIcon from "../../assets/images/view-all-icon.svg";
// import leftIcon from "../../assets/images/left-icon-carousel.svg";
// import rightIcon from "../../assets/images/right-icon-carousel.svg";
import { Link } from "react-router-dom";
import productBgImg from "../../assets/images/home-product-bg-img.png";
import modernAgricultureImg1 from "../../assets/images/cameron-witney-min.png";
import cultivateImg1 from "../../assets/images/cultivation-Img1.png";
import culivateImg2 from "../../assets/images/cultivating-Img2.png";
import culticateImg3 from "../../assets/images/cultivating-img3.png";
// import registerBanner from "../../assets/images/register-banner.svg";
import serviceGarden from "../../assets/images/service-gardner.png";

const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useAuthenticated();
  const wishlistApi = new WishlistApi();
  const otherApi = new Other();

  const [isLoading, setIsLoading] = useState(true);
  const [newProduct, setNewProducts] = useState([]);
  const [bestDeal, setBestDeal] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  // const products = useSelector((state) => state.products.Products);
  const scrollRef = useRef(null);
  const scrollRef1 = useRef(null);

  const scrollRef4 = useRef(null);
  // const scrollCards = (scrollOffset) => {
  //   scrollRef4.current.scrollLeft += scrollOffset;
  // };

  const productApi = new ProductApi();
  const getProduct = useCallback(async () => {
    try {
      const product = await productApi.getAllHomeProduct();
      const allproduct = await productApi.getAllProduct();

      if (product || product.data.data) {
        setNewProducts(product.data.isNew);
        setBestDeal(product.data.isBestDeal);
        setBestSeller(product.data.isBestSeller);
        setIsLoading(false);
      }

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

  const getWishlist = useCallback(async () => {
    try {
      const getWishlistResponse = await wishlistApi.getAllWishlist();
      if (getWishlistResponse && getWishlistResponse.data.data) {
        dispatch(updateAllWishlist(getWishlistResponse.data.data));
      }
    } catch (error) { }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getBannerResponse = await otherApi.addbanner();
        if (getBannerResponse && getBannerResponse.data && getBannerResponse.data.data) {
          setBannerData(getBannerResponse.data.data);

          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    getProduct();
    // getBanner();
    if (isAuth) {
      getWishlist();
    }
  }, []);
  useEffect(() => {
    console.log("isLoading:", isLoading);
    // ... rest of the code
  }, [isLoading]);
  return (
    <Box>

      <Box mt={'-5pc !important'}>
        {isLoading ? (
          <>
            <Skeleton height={{ base: "30vh", md: '80vh' }} width={'100%'} />
          </>
        ) : (
          <>
            <Carousel
              autoPlay={true}
              dynamicHeight={true}
              emulateTouch={true}
              interval={8000}
              showArrows={true}
              showIndicators={false}
              showThumbs={false}
              stopOnHover={false}
              showStatus={false}
              infiniteLoop={true}

            >
              <Link to="/register">

                <Img h={{ base: "80%", md: "100%", lg: "90vh" }} marginTop={{ base: "60px", md: "0" }} src={serviceGarden}>
                </Img>
              </Link>
              {bannerData.map((e, i) => {
                return (
                  <>

                    <Img h={{ base: "80%", md: "100%", lg: "90vh" }} marginTop={{ base: "60px", md: "0" }} key={i} src={e.Image}>
                    </Img>
                  </>
                )
              })}
            </Carousel>
          </>
        )}
      </Box>
      {/* </Box> */}

      <div className="layout-container home-shop-brand section-margin" >
        <Heading fontSize={'28px'} fontWeight={700} textAlign={'center'} color="black" pt={2}>
          Choose By Category
        </Heading>
        {/* <Text width={"40%"} m={'auto'} textAlign={'center'} fontSize={'15px'} pt={2} pb={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</Text> */}
        <Flex wrap={"wrap"}

          gap={1} marginTop={4} position={'relative'}>
          {/* <Flex width={'100%'} justifyContent={'space-between'} position={'absolute'} alignItems={'center'} top={10} right={0} left={0}> */}
          {/* <Image src={leftIcon} onClick={() => scrollCards(-300)} /> */}
          {/* <Image src={rightIcon} onClick={() => scrollCards(300)} /> */}
          {/* </Flex> */}
          <div className="content-scroll" ref={scrollRef4}>

            <Brandcard
              scroll={scrollRef4}
            />
          </div>
        </Flex>
      </div>

      {newProduct && newProduct.length > 0 ? (
        <>
          <div className="layout-container section-margin">

            <Heading fontSize={'28px'} fontWeight={700} textAlign={'center'} color="black" pt={5} pb={5}>
              New Arrivals
            </Heading>

            <Flex width={'100%'} justifyContent={'space-between'} flexDirection={{ base: "column", md: "row" }}>
              <Box width={{ base: "100%", md: "100%", lg: '30%' }}>
                <Image width={'100%'} height={'auto'} maxHeight={{ base: "none", md: '720px', lg: '520px' }} display={{ base: "none", md: "flex" }} src={productBgImg} />
                <Image width={'100%'} height={'auto'} display={{ base: "flex", md: "none" }} src={arrivalSmall} borderRadius={'md'} />
              </Box>

              <Grid
                gap={{ base: 2, md: 3, lg: 3 }}
                width={{ base: "100%", md: "100%", lg: "70%" }}
                ml={{ base: 0, md: 4 }}
                mt={{ base: 5, md: 0 }}
                className="new-arrival"
              >
                {newProduct.slice(0, 4).map((product, index) => (
                  <GridItem key={index} display={{ base: "none", md: "none", lg: "flex" }}>
                    <Itemcard
                      widthmin={"100px"}
                      widthmax={"100px"}
                      products={[product]}
                      isLoading={isLoading}
                    />
                  </GridItem>
                ))}

                <GridItem colSpan={2} display={{ base: "none", md: "none", lg: "flex" }} width={'100%'}>
                  <Flex gap={3} width={'100%'} justifyContent={'space-between'}>
                    <Box width={'100%'}>
                      <Itemcard
                        widthmin={"100px"}
                        widthmax={"100px"}
                        products={[newProduct[2]]}
                        isLoading={isLoading}
                      />
                    </Box>
                    <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} background={'white'}>
                      <Link to='/our-products?type=new-arrivals'>
                        <Text display={'flex'} fontWeight={'600'} width={'100%'} height={'200px'} fontSize={'16px'} alignItems={'center'}>
                          View All <Image ml={3} src={viewIcon} />
                        </Text>
                      </Link>
                    </Box>
                  </Flex>
                </GridItem>

                {newProduct.slice(0, 2).map((product, index) => (
                  <GridItem key={index} display={{ base: "flex", md: "flex", lg: "none" }} width={'100%'}>
                    <Box width={'100%'}>
                      <Itemcard
                        widthmin={"100px"}
                        widthmax={"100px"}
                        products={[product]}
                        isLoading={isLoading}
                      />
                    </Box>
                  </GridItem>
                ))}
                <GridItem colSpan={2} display={{ base: "flex", md: "flex", lg: "none" }} width={'100%'}>
                  <Flex gap={3} width={'100%'} justifyContent={'space-between'}>
                    <Box width={'100%'}>
                      <Itemcard
                        widthmin={"100px"}
                        widthmax={"100px"}
                        products={[newProduct[2]]}
                        isLoading={isLoading}
                      />
                    </Box>
                    <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} background={'white'}>
                      <Link to='/our-products?type=new-arrivals'>
                        <Text display={'flex'} fontWeight={'600'} fontSize={'16px'} alignItems={'center'}>
                          View All <Image ml={3} src={viewIcon} />
                        </Text>
                      </Link>
                    </Box>
                  </Flex>
                </GridItem>
              </Grid>
            </Flex>
          </div>
        </>
      ) : (
        <>
          <div className="layout-container">
            <div className="content-scroll" ref={scrollRef}>
              <Itemcard
                scroll={scrollRef}
                products={newProduct}
                isLoading={isLoading}
              />
            </div>
          </div>
        </>
      )}

      {/* MODERN AGRICULTURE content  */}

      {isLoading ? (<>
        <Box mt={5} display={{ base: "none", md: "flex" }}>
          <Flex alignItems={'center'} gap={5}>
            <Skeleton height={'500px'} width={'100%'} />
            <Skeleton height={'500px'} width={'100%'} />
          </Flex>
        </Box>
      </>) : (
        <>
          <Box mt={5} display={{ base: "none", md: "flex" }} bgColor={'transparent'} width={'100%'} style={{
            backdropFilter: 'blur(1px)', /* Apply blur to the background */
            backgroundColor: 'rgba(230, 230, 230, 0.5)', /* Semi-transparent white background */
          }}>
            <Flex alignItems={'center'} bgColor={'transparent'}>
              <Box width={'100%'}>
                <Image src={modernAgricultureImg1} />
              </Box>
              <Box bgColor={'transparent'} width={'100%'} p={{ base: "0", md: "20px", lg: "25px 45px" }}>
                <Text fontSize={{ base: "16px", md: "12px", lg: '16px' }}>MODERN AGRICULTURE</Text>
                <Heading fontSize={{ base: "16px", md: "16px", lg: '28px' }} fontWeight={'bold'} pt={{ md: 1, lg: 3 }} pb={{ md: 0, lg: 5 }}>Providing High Quality <br />
                  Products</Heading>
                <Flex justifyContent={'space-between'} width={'100%'} mt={2} alignItems={'center'}>
                  <Box width={'20%'}><Image width={'80%'} src={growthIcon} /></Box>
                  <Box width={'80%'}>
                    <Heading fontSize={{ base: "16px", md: "16px", lg: '24px' }}>Our Agriculture Growth</Heading>
                    <Text fontSize={{ base: "16px", md: "12px", lg: '15px' }}>Empowering Futures: Cultivating Sustainable Agricultural Growth for Prosperity and Resilience</Text>
                  </Box>
                </Flex>
                <Flex justifyContent={'space-between'} width={'100%'} mt={5} alignItems={'center'}>
                  <Box width={'20%'}><Image width={'80%'} src={foodIcon} /></Box>
                  <Box width={'80%'}>
                    <Heading fontSize={{ base: "16px", md: "16px", lg: '24px' }}>Making Healthy Foods</Heading>
                    <Text fontSize={{ base: "16px", md: "12px", lg: '15px' }}>Nourishing Lives: Promoting Access to Healthy Foods for Wellness and Well-being</Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </>
      )}



      {/* best deal product */}

      {bestDeal && bestDeal.length > 0 ? (
        <>
          <div className="layout-container section-margin">

            <Heading fontSize={'28px'} fontWeight={700} textAlign={'center'} color="black" pt={5} mb={6}>
              Best Deal
            </Heading>


            <Flex width={'100%'} justifyContent={'space-between'} flexDirection={{ base: "column-reverse", md: "row" }}>

              <Grid
                gap={{ base: 2, md: 3, lg: 3 }}
                width={{ base: "100%", md: "100%", lg: "70%" }}
                mr={{ base: 0, md: 4 }}
                mt={{ base: 5, md: 0 }}
                className="new-arrival"
              >
                {bestDeal.slice(0, 4).map((product, index) => (
                  <GridItem key={index} display={{ base: "none", md: "none", lg: "flex" }}>
                    <Itemcard
                      widthmin={"100px"}
                      widthmax={"100px"}
                      products={[product]}
                      isLoading={isLoading}
                    />
                  </GridItem>
                ))}

                <GridItem colSpan={2} display={{ base: "none", md: "none", lg: "flex" }} width={'100%'}>
                  <Flex gap={3} width={'100%'} justifyContent={'space-between'}>
                    <Box width={'100%'}>
                      <Itemcard
                        widthmin={"100px"}
                        widthmax={"100px"}
                        products={[bestDeal[2]]}
                        isLoading={isLoading}
                      />
                    </Box>
                    <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} background={'white'}>
                      <Link to='/our-products?type=best-deals'>
                        <Text display={'flex'} fontWeight={'600'} width={'100%'} height={'200px'} fontSize={'16px'} alignItems={'center'}>
                          View All <Image ml={3} src={viewIcon} />
                        </Text>
                      </Link>
                    </Box>
                  </Flex>
                </GridItem>

                {bestDeal.slice(0, 2).map((product, index) => (
                  <GridItem key={index} display={{ base: "flex", md: "flex", lg: "none" }} width={'100%'}>
                    <Box width={'100%'}>
                      <Itemcard
                        widthmin={"100px"}
                        widthmax={"100px"}
                        products={[product]}
                        isLoading={isLoading}
                      />
                    </Box>
                  </GridItem>
                ))}
                <GridItem colSpan={2} display={{ base: "flex", md: "flex", lg: "none" }} width={'100%'}>
                  <Flex gap={3} width={'100%'} justifyContent={'space-between'}>
                    <Box width={'100%'}>
                      <Itemcard
                        widthmin={"100px"}
                        widthmax={"100px"}
                        products={[newProduct[2]]}
                        isLoading={isLoading}
                      />
                    </Box>
                    <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} background={'white'}>
                      <Link to='/our-products?type=best-deals'>
                        <Text display={'flex'} fontWeight={'600'} fontSize={'16px'} alignItems={'center'}>
                          View All <Image ml={3} src={viewIcon} />
                        </Text>
                      </Link>
                    </Box>
                  </Flex>
                </GridItem>
              </Grid>

              <Box width={{ base: "100%", md: "100%", lg: '30%' }}>
                <Image width={'100%'} height={'auto'} maxHeight={'520px'} display={{ base: "none", md: "flex" }} src={productBgImg} />
                <Image width={'100%'} height={'auto'} display={{ base: "flex", md: "none" }} src={arrivalSmall} borderRadius={'md'} />
              </Box>
            </Flex>
          </div>
        </>
      ) : (
        <>
          <div className="layout-container">
            <div className="content-scroll" ref={scrollRef1}>
              <Itemcard
                scroll={scrollRef1}
                products={bestDeal}
                isLoading={isLoading}
              />
            </div>
          </div>
        </>
      )}


      {/* Growing crops and Cultivating land */}
      {isLoading ? (<>
        <Box mt={5} display={{ base: "none", md: "flex" }}>
          <Flex alignItems={'center'} gap={5}>
            <Skeleton height={'500px'} width={'100%'} />
            <Skeleton height={'500px'} width={'100%'} />
          </Flex>
        </Box>
      </>) : (
        <>
          <Box bgColor={'transparent'} mt={5} mb={5} display={{ base: "none", md: "flex" }} style={{
            backdropFilter: 'blur(1px)', /* Apply blur to the background */
            backgroundColor: 'rgba(230, 230, 230, 0.5)', /* Semi-transparent white background */
          }}>
            <Flex width={'100%'} alignItems={'center'}>
              <Box p={{ base: 0, md: '20px 25px', lg: '50px' }} width={'60%'}>
                <Heading fontSize={{ base: '16px', md: '18px', lg: '28px' }} fontWeight={'bold'} pt={{ base: 0, md: 0, lg: 3 }} pb={{ base: 0, md: 0, lg: 5 }}>
                  Growing crops and <br /> Cultivating land
                </Heading>
                <Text fontSize={{ base: '15px', md: '13px', lg: '15px' }} pb={3} pt={{ base: 0, md: 2, lg: 4 }}>Sowing Prosperity, Harvesting Sustainability: The Art of Growing <br /> Crops and Cultivating Land for a Thriving Future</Text>
                <Flex width={{ base: "100%", md: "90%", lg: '70%' }} justifyContent={'space-between'} mt={{ base: 2, md: 2, lg: 5 }}>
                  <Flex justifyContent={'space-between'} alignItems={'center'} gap={{ base: 0, md: 2, lg: 4 }}>
                    <Image src={OrganicCrop} />
                    <Text fontSize={{ base: '16px', md: '18px', lg: '18px' }} fontWeight={'500'} >All Organic</Text>
                  </Flex>
                  <Flex justifyContent={'space-between'} alignItems={'center'} gap={{ base: 0, md: 2, lg: 4 }}>
                    <Image src={freshCropIcon} />
                    <Text fontSize={'18px'} fontWeight={'500'} >Always Fresh</Text>
                  </Flex>
                </Flex>
                <Flex alignItems={'center'} gap={{ base: 0, md: 2, lg: 4 }} mt={{ base: 0, md: 2, lg: 5 }}>
                  <Image src={ecoIcon} />
                  <Text fontSize={'18px'} fontWeight={'500'} >Eco Friendly</Text></Flex>
              </Box>
              <Box width={'40%'}>
                <Image src={cultivateImg1} />
                <Flex width={'100%'} justifyContent={'space-between'} pt={5}>
                  <Image width={'48%'} src={culivateImg2} borderRadius={10} />
                  <Image width={'48%'} src={culticateImg3} borderRadius={10} />
                </Flex>
              </Box>
            </Flex>
          </Box>
        </>
      )}
      {bestSeller && bestSeller.length > 0 ? (
        <>
          <Box mb={'40px'}>
            <div className="layout-container section-margin">

              <Heading fontSize={'28px'} fontWeight={700} textAlign={'center'} color="black" pt={5} mb={8}>
                Best Selling Products
              </Heading>

              <Flex width={'100%'} justifyContent={'space-between'} flexDirection={{ base: "column", md: "row" }}>
                <Box width={{ base: "100%", md: "100%", lg: '30%' }}>
                  <Image width={'100%'} height={'auto'} maxHeight={'520px'} display={{ base: "none", md: "flex" }} src={productBgImg} />
                  <Image width={'100%'} height={'auto'} display={{ base: "flex", md: "none" }} src={arrivalSmall} borderRadius={'md'} />
                </Box>

                <Grid
                  gap={{ base: 2, md: 3, lg: 3 }}
                  width={{ base: "100%", md: "100%", lg: "70%" }}
                  ml={{ base: 0, md: 4 }}
                  mt={{ base: 5, md: 0 }}
                  className="new-arrival"
                >
                  {bestSeller.slice(0, 4).map((product, index) => (
                    <GridItem key={index} display={{ base: "none", md: "none", lg: "flex" }}>
                      <Itemcard
                        widthmin={"100px"}
                        widthmax={"100px"}
                        products={[product]}
                        isLoading={isLoading}
                      />
                    </GridItem>
                  ))}

                  <GridItem colSpan={2} display={{ base: "none", md: "none", lg: "flex" }} width={'100%'}>
                    <Flex gap={3} width={'100%'} justifyContent={'space-between'}>
                      <Box width={'100%'}>
                        <Itemcard
                          widthmin={"100px"}
                          widthmax={"100px"}
                          products={[bestSeller[2]]}
                          isLoading={isLoading}
                        />
                      </Box>
                      <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} background={'white'}>
                        <Link to='/our-products?type=best-sell'>
                          <Text display={'flex'} fontWeight={'600'} width={'100%'} height={'200px'} fontSize={'16px'} alignItems={'center'}>
                            View All <Image ml={3} src={viewIcon} />
                          </Text>
                        </Link>
                      </Box>
                    </Flex>
                  </GridItem>

                  {bestSeller.slice(0, 2).map((product, index) => (
                    <GridItem key={index} display={{ base: "flex", md: "flex", lg: "none" }} width={'100%'}>
                      <Box width={'100%'}>
                        <Itemcard
                          widthmin={"100px"}
                          widthmax={"100px"}
                          products={[product]}
                          isLoading={isLoading}
                        />
                      </Box>
                    </GridItem>
                  ))}
                  <GridItem colSpan={2} display={{ base: "flex", md: "flex", lg: "none" }} width={'100%'}>
                    <Flex gap={3} width={'100%'} justifyContent={'space-between'}>
                      <Box width={'100%'}>
                        <Itemcard
                          widthmin={"100px"}
                          widthmax={"100px"}
                          products={[newProduct[2]]}
                          isLoading={isLoading}
                        />
                      </Box>
                      <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} background={'white'}>
                        <Link to='/our-products?type=best-sell'>
                          <Text display={'flex'} fontWeight={'600'} fontSize={'16px'} alignItems={'center'}>
                            View All <Image ml={3} src={viewIcon} />
                          </Text>
                        </Link>
                      </Box>
                    </Flex>
                  </GridItem>
                </Grid>
              </Flex>
            </div>
          </Box>
        </>
      ) : (
        <>
          <div className="layout-container">
            <div className="content-scroll" ref={scrollRef}>
              <Itemcard
                scroll={scrollRef}
                products={bestSeller}
                isLoading={isLoading}
              />
            </div>
          </div>
        </>
      )}
    </Box>
  );
};

export default Home;
