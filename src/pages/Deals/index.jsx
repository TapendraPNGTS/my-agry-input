import React from "react";
import {
  Flex,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import Img4 from "../../assets/Layer2.png";

const index = () => {
  return (
    <>
      <div className="home-hero-content ">
        <div className="layout-container">
          <Heading fontSize={{ base: "42px", md: "64px" }} color={"green"}>
            Shopping And <br /> Department Store.
          </Heading>
          <Text
            fontSize={{ base: "16px", md: "18px" }}
            marginTop={"1rem"}
            marginBottom={"40px"}
          >
            Shopping is a bit if a relaxing hobby for me, which <br /> is
            sometimes troubling for bank balance.
          </Text>
          <Button
            size={"lg"}
            width={"150px"}
            colorScheme="green"
            className="btn-primary"
            rounded={"full"}
          >
            Learn More
          </Button>
        </div>
      </div>
      <Flex> 
      <img src={Img4} width="full" height="full" alt="Image not Found" />
    </Flex>
    </>
  );
};

export default index;
