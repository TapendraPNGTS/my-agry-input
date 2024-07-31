import React from "react";
import logo from "../../../assets/images/GraminShaktiLogo.svg";
import "./footer.css";
import { Flex, Image, Text, IconButton, HStack, Box } from "@chakra-ui/react";
import { Suitecase, GiftIcon, GiftThin, HelpIcon } from "../../../utils/Icons";
import Footer1 from "../../../assets/images/my-agri-input-logo.svg";
import footerbg from "../../../assets/images/footer-bgImg.svg";
import { Link } from "react-router-dom";
import homeIcon from "../../../assets/images/home-footer-icon.svg";
import emailIcon from "../../../assets/images/email-footer-icon.svg";
import phoneIcon from "../../../assets/images/footer-phone-icon.svg";
import instaIcon from "../../../assets/images/instagram-icon.svg";
import twitterIcon from "../../../assets/images/twitter-icon.svg";
import fbIcon from "../../../assets/images/fb-icon.svg";
import linkdlnIcon from "../../../assets/images/linkdln-icon.svg";
import footerBgImgForMobile from "../../../assets/images/footer-bg-mobileView-img.svg";

const index = () => {
  return (
    <>
      {/* footer here */}
      {/* <Divider color="Black.500" orientation="horizontal" size="xs" padding={`0.3`} bgColor={`gray`} justifyContent={`center`} borderRadius={`5`} width={`90%`} margin={`10`} /> */}
      <Flex
        // mt={'4'}
        className="footer"
        wrap={`wrap`}
        // direction={`column`}
        bg={`#dbdfe2`}
        padding={`10`}
        bgImage={{base:footerBgImgForMobile,md:footerbg}}
        // color="white"
        bgRepeat={'no-repeat'}
        bgPosition={'bottom'}
      >
        <Flex
          direction={`row`}
          wrap={{base:"wrap", md:"nowrap"}}
          justifyContent={`space-between`}
          alignItems={`center`}
          width={`100%`}
          height={`100%`}
          // bg={`gray.100`}
          position={`relative`}
          //   paddingTop={`5`}
          fontFamily={`sans-serif`}
          gap={{base:5, md: 10, lg: 10 }}
        >
          <Flex
            flex={`2`}
            textAlign={`left`}
            display={`block`}
            justifyContent={`center`}
            alignItems={`left`}
            lineHeight={`1.5`}
            width={`100%`}
            // height={`200px`}
            // bg={`gray.100`}
            roundedTopLeft={`xl`}
            roundedTopRight={`xl`}
            position={`relative`}
            // paddingLeft={`10`}
            maxWidth={{base:"100%", md: "120px", lg: "300px" }}
            minWidth={{base:"100%", md: "120px", lg: "300px" }}
          >
            <Flex pt={0} justifyContent={{base:'left', md:'left',lg:"center"}} alignItems={{base:'left', md:'left', lg:'center'}} direction={'column'}>
              <Link to={`/`}>
                <Image width={{base:'50%', md:'100%'}} height={{base:'120px', md:'150px', lg:"200px"}} src={Footer1} alt="Dan Abramov" />
              </Link>
              <Flex width={'50%'} justifyContent={'space-between'} mt={'10px'}>
                <Image src={instaIcon} />
                <Image src={twitterIcon} />
                <Image src={fbIcon} />
                <Image src={linkdlnIcon} />
              </Flex>
            </Flex>
          </Flex>
          <Flex
            gap={{base:5 ,md: 2, lg: 10 }}
            justifyContent={"space-between"}
            wrap={"wrap"}
            width={{ base: "100%", md: "100%", lg: "70%" }}
            flexDirection={{base:'column', md:'row'}}
          >
            <Flex
              flex={`2`}
              textAlign={`left`}
              display={`block`}
              justifyContent={`center`}
              alignItems={`left`}
              lineHeight={`1.5`}
              minWidth={`max-content`}
              //   height={`200px`}
              // bg={`gray.100`}
              roundedTopLeft={`xl`}
              roundedTopRight={`xl`}
              position={`relative`}
            //   paddingLeft={`10`}
            //   paddingTop={`5`}
            >
              <Text width={'fit-content'} fontSize={{ base: '18px', md: '18px', lg: '20px' }} fontWeight={`500`} pb={2}>
                OUR POLICIES
              <Text border={'1px solid #FFA500'} width={'100%'} ></Text>
              </Text>
              <Link to="privacy-policy" >
                <li className="footer-link-items">
                  Privacy Policy
                </li>
              </Link>
              <Link to="shiping-policy">
                <li className="footer-link-items">
                  Shipping Policy
                </li>
              </Link>
              <Link to="cancellation-policy" >
                <li className="footer-link-items">
                  Cancellation Policy
                </li>
              </Link>
              <Link to="return-policy">
                <li className="footer-link-items">
                  Return Policy
                </li>
              </Link>
              <Link to="Term-Condition">
                <li className="footer-link-items">
                  Terms and Condition
                </li>
              </Link>
              <Link to="/franchise">
                <li className="footer-link-items">
                  Become a Franchise
                </li>
              </Link>
            </Flex>
            <Flex
              flex={`2`}
              display={`block`}
              textAlign={`left`}
              justifyContent={`center`}
              alignItems={`left`}
              lineHeight={`1.5`}
              minWidth={`max-content`}
              //   height={`200px`}
              // bg={`gray.100`}
              roundedTopLeft={`xl`}
              roundedTopRight={`xl`}
              position={`relative`}
            //   paddingLeft={`10`}
            //   paddingTop={`5`}
            >
              <Text width={'fit-content'} fontSize={{ base: '18px', md: '18px', lg: '20px' }} fontWeight={`500`} pb={2}>
                USEFUL LINKS
                <Text border={'1px solid #FFA500'} width={'100%'} ></Text>
              </Text>
              <Link to='/about-us'>
                <li className="footer-link-items">
                  About us
                </li>
              </Link>
              <Link to='/contact-us'>
                <li className="footer-link-items">
                  Contact us
                </li>
              </Link>
              <Link to='/faqs'>
                <li className="footer-link-items">
                  FAQ
                </li>
              </Link>
              <Link to='/register'>
                <li className="footer-link-items">
                  Register
                </li>
              </Link>
            </Flex>
            <Flex
              flex={`2`}
              display={`block`}
              textAlign={`left`}
              justifyContent={`center`}
              alignItems={`left`}
              lineHeight={`1.5`}
              minWidth={`max-content`}
              // bg={`gray.100`}
              roundedTopLeft={`xl`}
              roundedTopRight={`xl`}
              position={`relative`}
            >
              <Text width={'fit-content'} fontSize={{ base: '18px', md: '18px', lg: '20px' }} fontWeight={`500`} pb={2}>
                COMPANY  DETAILS
                <Text border={'1px solid #FFA500'} width={'100%'} ></Text>
              </Text>

              {/* <Link to='/'> */}
                <Flex>
                  <Image src={homeIcon} />
                  <Text ml={3} className="footer-link-items">
                  34, Ground Floor, Progressive Point,<br/> Raipur (C.G.)
                  </Text>
                </Flex>
              {/* </Link> */}
              <Link to="mailto:contact@graminshakti.com">                 
                <Flex>
                  <Image src={emailIcon} />
                  <Text ml={3} className="footer-link-items">
                  contact@graminshakti.com
                  </Text>
                </Flex>
              </Link>
              <Link to="tel:7880130147">
                <Flex>
                  <Image src={phoneIcon} />
                  <Text ml={3} className="footer-link-items">
                  +91 7880130147
                  </Text>
                </Flex>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Text bgColor={'white'} p={'10px'} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={'18px'} color="black" fontWeight={500}><span style={{ fontSize: "26px", fontWeight: "800px" , marginRight:"6px"}}>©</span> 2024 All Right Reserved</Text>
    </>
  );
};

export default index;
