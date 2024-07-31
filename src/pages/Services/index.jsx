import React, { useRef, useState, useEffect, useCallback } from "react";
import { Heading, Text, Box, Button, Img, Flex, HStack, Image, Grid, GridItem, Skeleton, Card } from "@chakra-ui/react";
import "./services.css";
import ServiceApi from "../../apis/services.api";
import { discountPercentage} from "../../utils/common.util";
import numeral from "numeral";

import services_img from "../../assets/images/services_img.svg";
import { useNavigate } from "react-router-dom";
import wishlistBgImg from "../../assets/images/wishlist-bg-img.svg";

const Services = () => {

  const [isLoading, setIsLoading] = useState(true);
 
  const [serverCategory, SetserverCategory] = useState([]);

  const servicesApi = new ServiceApi();
  const GetServiceCategory = useCallback(async () => {
    try {
      const GetServiceCategoryResponse = await servicesApi.GetServiceCategory();
      if (GetServiceCategoryResponse && GetServiceCategoryResponse.data.data) {
        SetserverCategory(GetServiceCategoryResponse.data.data)
      }
      setIsLoading(false);
    } catch (error) { }
  });

  const navigate = useNavigate()
  useEffect(() => {
    GetServiceCategory()
  }, []);
  
  return (
    <Box mb={5}>
      <Box>
      <Image width={'100%'} height={'60%'} src={wishlistBgImg} />
      </Box>

{isLoading ? (
  <>
  <Box mt={5} p={5} >
  <Skeleton height={'30px'} width={'300px'}/>
  <Grid mt={4} templateColumns={{base:'repeat(2, 1fr)', md:'repeat(3, 1fr)', lg:'repeat(6, 1fr)'}} gap={6}>
    

  <GridItem >
    <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
  <GridItem >
  <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
  <GridItem >
  <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
  <GridItem >
  <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
   
 
</Grid>
  </Box>
  <Box mt={5} p={5}>
  <Skeleton height={'30px'} width={'300px'}/>
  <Grid mt={4} templateColumns={{base:'repeat(2, 1fr)', md:'repeat(3, 1fr)', lg:'repeat(6, 1fr)'}} gap={6}>
    

  <GridItem >
  <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
  <GridItem >
  <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
  <GridItem >
  <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
  <GridItem >
  <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
   
 
</Grid>
  </Box>
  <Box mt={5} p={5}>
  <Skeleton height={'30px'} width={'300px'}/>
  <Grid mt={4} templateColumns={{base:'repeat(2, 1fr)', md:'repeat(3, 1fr)', lg:'repeat(6, 1fr)'}} gap={6}>
    

  <GridItem >
  <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
  <GridItem >
  <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
  <GridItem >
  <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
  <GridItem >
  <Card>
    <Skeleton height={'300px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    <Skeleton mt={2} height={'30px'} width={'100%'}/>
    </Card>
  </GridItem>
   
 
</Grid>
  </Box>
  </>
) :<>
      {
        serverCategory && serverCategory.map((item, index) => {
         
          return (
            <>

              <div key={index} className="layout-container section-margin">
                <Heading fontSize={'28px'} fontWeight={700} textAlign={'left'} color="black" pt={5} mb={2}>
                  {item.name}
                </Heading>
                <Flex width={'100%'} justifyContent={'space-between'}
                  flexDirection={{ base: "column-reverse", }}
                >
                  <Grid
                    gap={{ base: 2, md: 3, lg: 3 }}
                    width={{ base: "100%", md: "100%", lg: "100%" }}
                    mr={{ base: 0, md: 4 }}
                    mt={{ base: 5, md: 4 }}
                    templateColumns={{base:'repeat(2, 1fr)', md:'repeat(3, 1fr)', lg:'repeat(6, 1fr)'}}
                  >
                    {item && item.service.map((service, index) => {
                      
                      return (
                        <>
                          <GridItem key={index} display={{ base: "flex", md: "flex", lg: "flex" }}>
                            <Flex
                              direction={"column"}
                              flex={1}
                              minWidth={{ base: "100px", sm: "100px" }}
                              maxWidth={{ base: "100%", md: "100%" }}
                              shadow={'2xl'}
                              boxShadow={'none'}
                              h={{ base: "fit-content", md: "fit-content" }}
                              cursor={`pointer`}
                              border={'1px solid #E1E7EB'}
                              key={index}
                              rounded={'sm'}
                              transition="0.6s"
                              bg={'white'}
                              _hover={{ transform: "scale(1.03)", border: "1px solid #f1f1f9 " }}
                              // h={'20px'}
                              borderRadius={'10px'}
                              width='100%'
                              m={{ base: "auto", md: 0 }}
                              onClick={() => {
                                {
                                  service.type === "book" ? navigate(`/${"services-detail"}/${service.serviceId}`) : service.type === "query" ? navigate(`/${"services-detail"}/${service.serviceId}`) :
                                    navigate('#')
                                }
                              }}
                            >
                              <Flex
                                justifyContent={"center"}
                                alignItems={"center"}
                                width={"100%"}
                                height={{ base: "100px", md: "150px" }}
                                // bg={"gray.100"}
                                roundedTopLeft={"sm"}
                                roundedTopRight={"sm"}
                                position={"relative"}
                              >
                                 {parseFloat(discountPercentage(service.discountPrice, service.price).toFixed(0)) > 0 ?
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
                   {`${discountPercentage(service.discountPrice, service.price).toFixed(0)}% OFF`}
                  </Text>
                </Box>:""}
                                <Image
                                  maxHeight={{ base: "100px", md: "150px" }}
                                  maxWidth={"200px"}
                                  margin={"auto"}
                                  width={'100%'}
                                  src={`${service.coverImage}`}
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
                                <Flex direction={'column'} alignItems={"top"} justifyContent={"space-between"}>
                                  <Text mt={2} height={'60px'} fontSize={{ base: "15px", md: "20px" }} width={{ base: '100%', md: '100%' }} fontWeight={600} marginEnd={0} noOfLines={2}>
                                    {service.name}  </Text>
                                  <HStack
                                    textAlign={'center'} >
                                      {service.price === 0 ? "" :
                                    <Text fontSize={'20px'} fontWeight={600} color="#19884A">
                                                     ₹{numeral(service.discountPrice).format("00,00")}

                                    </Text>
                                    }
                                    {service.price === 0 ? "" : 
                                      <Text fontSize={{ base: "12px", md: "16px" }} color={'grey'} fontWeight={600} as='s' marginStart={2}>
                                                     ₹{numeral(service.price).format("00,00")}

                                      </Text>
                                    }

                                  </HStack>
                                </Flex>
                                <Button
                                  background={service.type === "book" ? "#19884A" : service.type === "coming" ? "red" : "#006C1E"}
                                  color={'white'}
                                  isDisabled={service.type === "coming"}
                                  w={'full'}
                                  fontSize={'13px'}
                                  h={{ base: '33px', md: "40px" }}
                                  rounded={"sm"}
                                  m={'auto'}
                                  _hover={{ bgColor: "#" }}
                                >
                                  <Img mr={2} src={services_img} />
                                  {service.type === "book" ? "Book Now" : service.type === "query" ? "Query Now" : "Comming Soon "}
                                </Button>
                              </Flex>
                            </Flex>
                          </GridItem>
                        </>

                      )
                    }
                    )}
                  </Grid>

                </Flex>
              </div>
              
            </>
          )
        })
      }
      </>
    }
     
    </Box>
    
  );
};

export default Services;
