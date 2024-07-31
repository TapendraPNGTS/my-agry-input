import Lottie from "lottie-react";

import "./About.css";

import irrigation from "../../assets/images/irrigation.svg";
import greenhouse from "../../assets/images/greenhouse.svg";
import pestControl from "../../assets/images/pest-control.svg";
import clientImg from "../../assets/images/carousel-img2.svg";
import clientImg2 from "../../assets/images/carousel-img1.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import leftIcon from "../../assets/images/left-icon-carousel.svg";
import rightIcon from "../../assets/images/right-icon-carousel.svg";

import {
  Button,
  Text,
  Flex,
  Box,
  Heading,
  Image
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import aboutBgImg from "../../assets/images/Agriculture-Matters.png";
import nurturingImg from "../../assets/images/Agriculture-Nurturing.png";
import calltoaction from "../../assets/images/call-to-action.png";


const Rating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar key={index} color={index < rating ? '#FFD700' : '#B4B4B4'} />
  ));

  return <Flex >{stars}</Flex>;
};

const AboutUS = () => {

  return (
    <>

      <>
        <Box
          bgImage={aboutBgImg}
          height={{ base: "25vh", md: "30vh", lg: "77vh" }}
          bgSize="cover"
          bgPosition="center"
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
        >

        </Box>


      </>
      <Box className="layout-container">
        <Box>
          <Heading textAlign={'center'} mt={8}>About Us</Heading>
          <Text lineHeight={6} mt={5}>
            Gramin Shakti is an excellent combination bringing together, the cumulative experience of 23+ years in Agronomy, greenhouses, fertigation systems & consultancy, with automation experience of 5+ years in Industrial Process Automation, Industrial IoT (IIoT) & Software technologies.
            <br />
            <br />
            Gramin Shakti having IoT & Cloud-based Automatic Irrigation Fertigation Systems for farmers as the brand product name “ Flow-Dac”. Our system helps farmers to achieve the best quality and productivity improvement combined with optimal use of resources.
            <br />
            <br />
            We are proud to be part of the “Make in India” mission, manufacturing the complete solution in India. The initiative has great potential to bring a new wave of Green-revolution in India to connect technology with soil.
            <br />
            <br />
            The agricultural sector has always been the lifeline of India’s economic structure. For a better agricultural economy in the country, the development of this sector with modern machinery and the latest scientific techniques is required which will also help the farmers in the longer run.
            <br /><br />
            Our aim is to bring the latest technology to Indian farmers with the help of advanced technology. This initiative has great potential to bring Green-revolution in India and connect technology to the soil.
          </Text>
        </Box>

        <Flex width={'100%'} alignItems={'center'} flexDirection={{ base: "column", md: "row" }} pt={3}>
          <Box width={{ base: "100%", md: '60%' }} pr={{ base: "0", md: "6" }} pt={{ base: "5", md: "5", }}>
            <Heading fontSize={{ base: "24px", md: "24px", lg: "36px" }}>Our Passion for Agriculture Nurturing  Growth and Sustaining the Future</Heading>
            <Text mt={{ base: "3", md: "2", lg: "8" }} lineHeight={7} pr={{ base: "0", md: "1", lg: "4" }} mb={{ base: "4", md: "0" }} fontSize={{ base: "16px", md: "14px", lg: "16px" }}>
              At Gramin Shakti, our commitment to agriculture goes beyond farming – it's a deep-seated passion that drives us to cultivate not just crops, but sustainable growth and a resilient future. With a steadfast dedication to innovation, responsible practices, and the well-being of our planet, we sow the seeds of progress and reap a harvest of lasting impact.
              <br /><br />
              Through cutting-edge techniques and a profound understanding of the land, we nurture the growth of crops that feed communities and fuel prosperity. Our commitment extends to sustainable practices that prioritize environmental stewardship, ensuring the vitality of our fields for generations to come.
            </Text>
          </Box>
          <Box width={{ base: "100%", md: "40%" }}>
            <Image width={'100%'} height={'auto'} src={nurturingImg} />
          </Box>
        </Flex>

        <Flex justifyContent={'space-between'} mt={'12'} flexDirection={{ base: "column", md: "row" }} gap={5}>
          <Flex flexDirection={'column'} gap={3} alignItems={'center'}>
            <Image src={irrigation} />
            <Text fontSize={{ base: "18px", md: '24px' }} fontWeight={'bold'}>Irrigation</Text>
            <Text textAlign={'center'} width={{ base: "100%", md: '50%' }}>we make you
              by any kind of irrigation
              you want.</Text>
          </Flex>
          <Flex flexDirection={'column'} alignItems={'center'} gap={3}>
            <Image src={greenhouse} />
            <Text fontSize={{ base: "18px", md: '24px' }} fontWeight={'bold'}>Greenhouse</Text>
            <Text textAlign={'center'} width={{ base: "100%", md: '80%' }}>We can make you
              greenhouse filed.</Text>
          </Flex>
          <Flex flexDirection={'column'} alignItems={'center'} gap={3}>
            <Image src={pestControl} />
            <Text fontSize={{ base: "18px", md: '24px' }} fontWeight={'bold'}>Pest Control</Text>
            <Text textAlign={'center'} width={{ base: "100%", md: '50%' }}>
              Pest control from
              filed to increase
              your productivity
            </Text>
          </Flex>
        </Flex>

      </Box>
      <Box bgImage={calltoaction} mt={"5"} width={'100%'} height={{ base: "100%", md: '100%', lg: "500px" }} bgSize={'cover'} bgPosition={'center'} bgRepeat={'no-repeat'}>
        <Box p={{ base: "50px", md: '80px', lg: "90px" }}>
          <Heading color="white" fontSize={{ base: "18px", md: '40px', lg: "55px" }}   >Sustainable Farming Meets <br /> Technology : Building a Greener <br /> Future</Heading>
          <Link to='/contact-us'>
            <Button background={'none'} mt={{ base: "30px", md: '60px' }} border={'1px solid white'} color="white" _hover={'none'} _active={'none'}>Contact Us</Button>
          </Link>
        </Box>
      </Box>

      <Box>
        <Heading textAlign={"center"} pt={"5"}>Testimonials</Heading>
        <Text fontSize={'16px'} textAlign={"center"} width={{ base: "100%", md: "600px" }} m={"auto"} pt={"3"} pb={"5"}>
          Life-changing results for our clients!
        </Text>
        <Box mb={5}>
          <Carousel
            autoPlay={true}
            emulateTouch={true}
            interval={8000}
            showArrows={true}
            showIndicators={false}
            showThumbs={false}
            stopOnHover={true}
            showStatus={false}
            infiniteLoop={true}
            width={'100%'}

            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <Button type="button" onClick={onClickHandler} title={label}
                  left={{ base: "0%", md: '8%' }}
                  p={0}
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: '50%',

                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transform: 'translateY(-50%)',
                  }}>
                  <Image src={leftIcon} />
                </Button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <Button type="button" onClick={onClickHandler} title={label}
                  right={{ base: "0%", md: '8%' }}
                  p={0}
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: '50%',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transform: 'translateY(-50%)',
                  }}>
                  <Image src={rightIcon} />
                </Button>
              )
            }
          >

            <Box background={'#dbdfe2'} p={{ base: '30px 20px', md: '30px 40px', lg: '50px 80px' }} borderRadius={"12px"} width={{ base: '70%', md: '65%' }} m={'auto'}>
              <Flex width={'100%'} justifyContent={"space-between"} alignItems={"center"} flexDirection={{ base: "column", md: "row" }}>
                <Box width={{ base: "100%", md: "20%" }}>
                  <Image width={"100%"} height={'auto'} src={clientImg2} />
                </Box>
                <Box width={{ base: "100%", md: "70%" }} mt={{ base: "2", md: "0" }} textAlign={'left'}>

                  <Heading fontSize={{ base: "16px", md: '20px', lg: "24px" }}>Suresh Yadav</Heading>
                  {/* <Text fontSize={'12px'} pt={{base:"3", md:"1", lg:"3"}}>Farmer</Text> */}
                  <Box width={'20%'} pt={2}>

                    <Rating rating={4} />
                  </Box>
                  <Text width={'100%'} pt={"3"} fontSize={{ base: "12px", md: '14px', lg: "15px" }}>
                    They took the time to understand my needs and preferences, offering personalized recommendations and guidance throughout the process.              </Text>
                </Box>
              </Flex>
            </Box>
            <Box background={'#dbdfe2'} p={{ base: '30px 20px', md: '30px 40px', lg: '50px 80px' }} borderRadius={"12px"} width={{ base: '70%', md: '65%' }} m={'auto'}>
              <Flex width={'100%'} justifyContent={"space-between"} alignItems={"center"} flexDirection={{ base: "column", md: "row" }}>
                <Box width={{ base: "100%", md: "20%" }}>
                  <Image width={"100%"} height={'auto'} src={clientImg} />
                </Box>
                <Box width={{ base: "100%", md: "70%" }} mt={{ base: "2", md: "0" }} textAlign={'left'}>

                  <Heading fontSize={{ base: "16px", md: '20px', lg: "24px" }}>Ram Singh Thakur</Heading>
                  {/* <Text fontSize={'12px'} pt={{base:"3", md:"1", lg:"3"}}>Software Developer</Text> */}
                  <Box width={'20%'} pt={2}>
                    <Rating rating={5} />

                  </Box>
                  <Text width={'100%'} pt={"3"} fontSize={{ base: "12px", md: '14px', lg: "15px" }}>
                    Good Service and Best Products available this app. I am very happy with the products supplied by graminshakti . True value for money.
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Carousel>
        </Box>
      </Box>
    </>
  );
};

export default AboutUS;