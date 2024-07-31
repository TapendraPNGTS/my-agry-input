import React, { useEffect, useState } from "react";
import "./cop.css";
import CheckIcon from "../../../assets/CheckCircle.svg";
import { Text, Flex, Button } from "@chakra-ui/react";
import { ArrowForwardIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";


const OrderSuccessfulPlaced = () => {
  const navigate = useNavigate()
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
      setCurrentDateTime(new Date());
    
  }, []);
 
  return (
    <div className="op--container" style={{background:"white"}}>
      <div className="op--content">
        <img src={CheckIcon} alt="" />
        <Text fontSize={"xl"} fontWeight={600}>
          Your order is successfully placed
        </Text>
        <Text fontSize={"md"} fontWeight={400}>
          {currentDateTime.toLocaleString()}
        </Text>
        <Flex
          alignItems={"center"}
          gap={4}
          flexWrap={"wrap"}
          width={"100%"}
          justifyContent={"center"}
        >
          <Button
            colorScheme={`#2A7EBA`}
            background={"#2A7EBA"}
            color={"#fff"}
            width={["100%", "100%", "200px"]}
            fontSize={"14px"}
            alignItems={"center"}
            gap={1}
            paddingX={7}
            onClick={(e)=>{
              navigate("/")
            }}
          >
            Go to Dashboard <HamburgerIcon boxSize={6} />
          </Button>
          <Button
            alignItems={"center"}
            gap={1}
            colorScheme={`#2A7EBA`}
            color={`#2A7EBA`}
            fontSize={"14px"}
            variant="outline"
            width={["100%", "100%", "200px"]}
            paddingX={7}
            onClick={(e)=>{
              navigate("/settings/orders")
            }}
          >
            View Order <ArrowForwardIcon boxSize={6} />
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default OrderSuccessfulPlaced;
