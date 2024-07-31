import React from "react";
import Profile from "../../../../src/assets/images/logo.svg";
import {
  Card,
  Flex,
  HStack,
  IconButton,
  Heading,
  Avatar,
  Button,
  Box,
  Image,
  Text,
  Link,
  Icon,
  createIcon,
  Spacer,
} from "@chakra-ui/react";
import {
  FolderTransferIcon,
  UserIcon,
  LogoutIcon,
  
} from "../../../utils/Icons/index";


const index = () => {
  return (
    <>
      <Card
        minWidth={{ base: "270px", md: "300px" }}
        p={`20px`}
        maxWidth={`400px`}
        boxShadow="xl" 
      >
        <Flex>
          {/* <Image width="" height="" padding=""  rounded={`full`}> */}
          <HStack pt={`15px`} pb={`10px`}>
            <Avatar src="https://bit.ly/broken-link" />
            <Flex direction={`column`} pl={`10px`} width={`full`}>
              <Heading
                fontSize={`16px`}
                fontWeight={`400`}
                fontFamily={``}
                color={` #4C5056
                `}
              >
                {" "}
                Hello{" "}
              </Heading>
              <Heading
                fontSize={`20px`}
                fontWeight={`500`}
                fontFamily={``}
                color={` #4C5056
                              `}
              >
                Mike Edward
              </Heading>
            </Flex>
          </HStack>
        </Flex>
        <Flex
          borderBottom={`1.5px solid #a19c9c`}
          marginTop={`2`}
          marginLeft={`1`}
          marginRight={`1`}
        />

        <HStack pt={`15px`} pb={`15px`}>
          <IconButton
            color={`green`}
            background={`transparent`}
            icon={<UserIcon />}
          />
          <Heading
            fontSize={`20px`}
            fontWeight={`500`}
            fontFamily={``}
            color={` #4C5056 `}
            pl={`15px`}
          >
            Account Settings
          </Heading>
        </HStack>
        <Link >
        <Heading
          fontSize={`16px`}
          fontWeight={`400`}
          fontFamily={``}
          pl={`65px`}
          pt={`15px`}
          >
          Profile Information
        </Heading>
          </Link>
          <Link>
        <Heading
          fontSize={`16px`}
          fontWeight={`400`}
          fontFamily={``}
          pl={`65px`}
          pt={`25px`}
          pb={`25px`}
          textDecoration={`none`}
          >
          Manage Addresses
        </Heading>
          </Link>
        <Flex
          borderBottom={`1.5px solid #a19c9c`}
          marginTop={`3`}
          marginLeft={`1`}
          marginRight={`1`}
        />

        <HStack pt={`15px`} pb={`15px`}>
          <IconButton
            color={`green`}
            background={`transparent`}
            icon={<UserIcon />}
          />
          <Heading
            fontSize={`20px`}
            fontWeight={`500`}
            fontFamily={``}
            color={` #4C5056 `}
            pl={`15px`}
          >
            My Stuff
          </Heading>
        </HStack>
        <Link>
        <Heading
          fontSize={`16px`}
          fontWeight={`400`}
          fontFamily={``}
          pl={`65px`}
          pt={`10px`}
          >
          My Coupons
        </Heading>
          </Link>
          <Link>
        <Heading
          fontSize={`16px`}
          fontWeight={`400`}
          fontFamily={``}
          pl={`65px`}
          pt={`25px`}
        >
          My Reviews & Rating
        </Heading>
        </Link>
        <Link>
        <Heading
          fontSize={`16px`}
          fontWeight={`400`}
          fontFamily={``}
          pl={`65px`}
          pt={`25px`}
        >
          All Notifications
        </Heading>
        </Link>
        <Link>
        <Heading
          fontSize={`16px`}
          fontWeight={`400`}
          fontFamily={``}
          pl={`65px`}
          pt={`25px`}
        >
          My Wishlist
        </Heading>
        </Link>
        <Link>
        <Heading
          fontSize={`16px`}
          fontWeight={`400`}
          fontFamily={``}
          pl={`65px`}
          pt={`25px`}
          >
          My Orders
        </Heading>
          </Link>
        {/* <br /> */}
        {/* <br /> */}
        <br />
        <br />
        <Button
          w={"85%"}
          bg={`green`}
          alignContent={`center`}
          fontSize={"20px"}
          alignSelf={`center`}
          color={`#fff`}
          rightIcon={<LogoutIcon />}
        >
          {/* <Heading fontSize={`20px`} color={`#fff`}> */}
            Log Out
          {/* </Heading> */}
        </Button>
        {/* <IconButton
          color={`green`}
          bgColor={`transparent`}
          Icon={<LogoutIcon />}
        /> */}
      </Card>
    </>
  );
};

export default index;
