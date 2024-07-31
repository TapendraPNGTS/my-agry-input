import React from "react";
import "./op.css";
import CheckIcon from "../../assets/CheckCircle.svg";
import { Text, Flex, Button } from "@chakra-ui/react";
import { ArrowForwardIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/redux-slice/cart.slice";


const OrderPlaced = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  useEffect(()=>{
dispatch(resetCart())
  },[])
  return (
    <div className="op--container">
      <div className="op--content">
        <img src={CheckIcon} alt="" />
        <Text fontSize={"xl"} fontWeight={600}>
          Your order is successfully placed
        </Text>
        {/* <Text fontSize={"md"} color={"grey"} marginBottom={4}>
          Pellentesque sed lectus nec tortor tristique accumsan quis dictum
          risus. Donec volutpat mollis nulla non facilisis.
        </Text> */}
        <Text marginBottom={4}>
          Your order id is: <span style={{ fontWeight: "600" }}>{params.id}</span>
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

export default OrderPlaced;
