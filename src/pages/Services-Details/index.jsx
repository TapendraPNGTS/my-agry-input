import React, { useRef, useEffect, useCallback } from "react";
import {
  Text,
  Box,
  Button,
  Image,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useDisclosure,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText
} from "@chakra-ui/react";
import { Link } from 'react-router-dom'

import "./product.css";
import { useState } from "react";
import ServiceApi from "../../apis/services.api";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import parser from "react-html-parser";
import numeral from "numeral";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import { discountPercentage} from "../../utils/common.util";
import BookServicesForm from "../../components/EnquiryModal/BookServices";
import { EnquireForm } from "../../components/EnquiryModal/EnquiryForm";
const Product = () => {
  const isAuth = useAuthenticated();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectImage] = useState(0);
  const [serviceID, SetserviceID] = useState(0);

  const [showFullDescription, setShowFullDescription] = useState(false);
const [showFullFeatures, setShowFullFeatures] = useState(false);
 
  const params = useParams();
  // const [showFullDescription, setShowFullDescription] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const servicesApi = new ServiceApi();

  const getServiceDetailsById = async () => {
    try {

      const GetServiceResponse = await servicesApi.GetServiceCategoryById({
        serviceId: params.id
      });
     
      if (GetServiceResponse && GetServiceResponse.data.data) {
        setData(GetServiceResponse.data.data)
        SetserviceID(GetServiceResponse.data.data.serviceId)
        setImages(GetServiceResponse.data.data.images)
        setIsLoading(false);
      }

      else {
        // console.log('gege');
        toast.error("some went wrong123");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  console.log('data',data);
  
  useEffect(() => {
    getServiceDetailsById();
  }, []);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  const toggleFeatures = () => {
    setShowFullFeatures(!showFullFeatures);
  };

  return (
    <div>
          {isLoading ? 
(
  <>
  
   <Flex gap={6} marginTop={6} width={'100%'}>
          <Box width={'100%'} p={5}>
            <Skeleton height={'300px'} width={'100%'}/>
          </Box>
            <Box padding={`5`} width={'100%'}>
            <Skeleton height={'20px'} width={'100px'}/>
            <Skeleton mt={3} height={'20px'} width={'200px'}/>
            <SkeletonText mt={2} noOfLines={10} spacing='2' skeletonHeight='2' width={'100%'}/>
            <Skeleton mt={3} height={'40px'} width={'100%'}/>
          </Box>
          </Flex>
          <Box mt={5} width={'100%'} p={5} mb={5}>
            <Skeleton mt={4} h={'30px'} width={'200px'}/>
            <SkeletonText  mt={2} noOfLines={10} spacing='2' skeletonHeight='2' width={'100%'}/>
          </Box>
  </>
):
       (
         <>
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
              <BreadcrumbLink>Service</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={true} color={`black`}>
              <BreadcrumbLink>{data.Name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

    
         <div className="layout-container home-shop-brand">
         
          <Flex wrap={"wrap"} gap={6} marginTop={6}>
            <Flex
             direction={{base:'column', md:'row-reverse'}}
             flex={1}
             minWidth={`300px`}
             cursor={`pointer`}
             position={{base:'static',md:'sticky'}}
             top={0}
             height={{base:"100%", md:'410px',lg:'400px'}}

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
              
              >
                 {
  discountPercentage(data.discountPrice, data.price).toFixed(0) === '0' ? '' :
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
                   
 
    {discountPercentage(data.discountPrice, data.price).toFixed(0)}% Off
 
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
              </Flex>
             

              <Flex
                marginTop={{base:3, md:0}}
                direction={{base:"row", md:'column'}}
                gap={2}
                roundedBottomRight={`xl`}
                roundedBottomLeft={`xl`}
                justifyContent={{base:"center", md:'start'}}
                h={{base:'20', md:'auto'}}
                mr={{base:0, md:2}}
              >
                  <Grid templateColumns={{base:"repeat(4, 1fr)", md:"repeat(1, 1fr)"}}>
                {images.map((row, index) => {
                  return (
                    <GridItem
                      key={`image-${index}`}
                      className="slpo-container"
                      onClick={() => setSelectImage(index)}
                    >
                      <Image src={row} width={{base:"30",md:'50'}} maxHeight={'70px !important'} alt="" />
                    </GridItem>
                  );
                })}
                </Grid>
              </Flex>
            </Flex>
            <Flex direction={`column`} flex={1} padding={`2`}>
              <Flex>
                <Text fontSize={`24px`} fontWeight={600}>
                  {data.name}
                </Text>
              </Flex>
              <Flex marginTop={`2`} gap={1} textAlign={'center'} alignItems={'center'}>
                Per Acre:
                <Text fontSize={`24px`} fontWeight={`bolder`}>
                ₹{numeral(data.discountPrice).format("00,00")}
                </Text>
                

                  <Text
                    fontSize={`24px`}
                    fontWeight={`bolder`}
                    color={"#AAAAAA"}
                    as="s"
                    ml={4}
                  >
                   ₹{numeral(data.price).format("00,00")}
                  </Text>
               
              </Flex>
              {data.discount ?
                <Text textColor={'red'} fontWeight={'semibold'}>

                  You get {discountPercentage(data.discountPrice, data.price).toFixed(0)}% Off
                </Text> : <></>}
             

              <Flex marginTop={`2`}>
              {/* <Text fontSize={`14px`} fontWeight={`400`} noOfLines={showFullFeatures ? 0 : 8}>
  {parser(data.features)}
  <Button onClick={toggleFeatures}>
    {showFullFeatures ? "Read Less" : "Read More"}
  </Button>
</Text> */}
<div>
  <Text pl={{base:4,md:6}} fontSize={`14px`} fontWeight={`400`}>
    {showFullFeatures
      ? parser(data.features)
      : parser(data.features.substring(0, 250) + (data.features.length > 250 ? '...' : ''))}
  </Text>
  {data.features.length > 250 && (
    <Text pl={{base:4,md:6}} mt={2} cursor={'pointer'} color={'#19884A'} onClick={toggleFeatures}>
      {showFullFeatures ? 'Read Less' : 'Read More'}
    </Text>
  )}
</div>
              </Flex>
              <Flex
                marginTop={`2`}
                marginBottom={`2`}
                alignItems={`center`}
                gap={5}
              >
              </Flex>
              {data.type === "book" && (
                <BookServicesForm serviceName={data.name} onOpen={onOpen} Basicprice={data.price} onClose={onClose} isOpen={isOpen} serviceId={params.id} servicesType={data.serviceType} serviceGst={data.gst} />
              )}
              {data.type === "query" && (
                <EnquireForm onOpen={onOpen} serviceName={data.serviceId} onClose={onClose} isOpen={isOpen} servicesType={data.serviceType} />

              )}

              <Button
                marginTop={4}
                fontSize={'18px'}
                background="#D4D4D4"
                color={"black"}
                rounded={"md"}
                width={`100%`}
                padding={'25px'}
                onClick={() => {
                  if (isAuth) {
                    onOpen()
                  } else {
                    navigate('/')
                    toast.error('Please Login First')
                  }
                }}
              >
               {data.type === "query" ? "Query Now" : "Book Now" }
              </Button>
              {data.type === "query" ? ""
:
              
              <Box mt={2} textColor={'red'}>
                NOTE :-
                <Text fontSize={'15px'} fontStyle={'initial'}>Charges may apply after choosing the service type and package.  GST charges may apply at a rate of {data.gst === 0 ? "" : data.gst}%.</Text>
              </Box>
}
            </Flex>
          </Flex>
        </div>
        <Box border={'1px solid #F0F0F0'}
          width={'95%'}
          m={'auto'}
          bgColor={'white'}
          mt={{base:"5",md:'10'}}
          mb={8}
          h={'auto'}
        >
          <Flex borderBottom={'1px solid #F0F0F0'} >
            <Button style={{
              backgroundColor: '#19884A',
              color: 'white'
            }}
              p={'5px 35px'}
              rounded={'sm'}
              fontWeight={'md'}
            >Description</Button>
          </Flex>

          <Box>
          {/* <Text pl={6} m={2} fontSize={`14px`} fontWeight={`400`} noOfLines={showFullDescription ? 0 : 4}>
  {parser(data.description)}
  <Button onClick={toggleDescription}>
    {showFullDescription ? "Read Less" : "Read More"}
  </Button>
</Text> */}

  <Text pl={{base:2,md:6}} mt={2}  fontSize={`14px`} fontWeight={`400`}>
    {showFullDescription
      ? parser(data.description)
      : parser(data.description.substring(0, 300) + (data.description.length > 300 ? '...' : ''))}
  </Text>
  {data.description.length > 300 && (
    <Text pl={{base:2,md:6}}  cursor={'pointer'} color={'#19884A'} onClick={toggleDescription}>
      {showFullDescription ? 'Read Less' : 'Read More'}
    </Text>
  )}

          </Box>
        </Box>

      </div>
        </>
        )
          }
    </div>
  );
};

export default Product;
