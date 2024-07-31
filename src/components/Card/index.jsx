import React, { useState } from "react";
import "./Card.css";
import { Flex, Box, Image, Heading, Button, Text } from "@chakra-ui/react";

import { ChevronRightIcon, ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, updateCart } from "../../redux/redux-slice/cart.slice";
import numeral from "numeral"
const index = (onClose) => {
  const dispatch = useDispatch();
  const removeItem = (ProductID, Price, Quantity) => {
    dispatch(removeCart({ ProductID, Price, Quantity }));
  };
  const Cart = useSelector((state) => state.cart.Cart);
  const TotalPrice = useSelector((state) => state.cart.TotalPrice);
  // console.log(Cart, "Cart");

  return (
    <>
      <div className="custom-scrollbar">
        {Cart.map((row, index) => {
          return (
            <>
              {" "}
              <Flex
              key={index}
                alignItems={"center"}
                minWidth={"300px"}
                mt={2}
                // maxWidth={"320px"}
                gap={3}
                paddingX={4}
                paddingY={4}
                bg={"transparent"}
                rounded={"md"}
                wrap={"wrap"}
                flex={1}
                
              >
                <Box height={"64px"} width={"64px"}>
                  <Image
                    height={"100%"}
                    width={"100%"}
                    objectFit={"cover"}
                    //   rounded={"full"}
                    src={row.CoverImage}
                    alt="test"
                  />
                </Box>

                <Flex direction={"column"} gap={1} alignItems={"start"}>
                  <Flex direction={"row"}>
                    <Heading
                      fontFamily={``}
                      size={"sm"}
                      as="b"
                      fontWeight={600}
                    >
                      {row.Name}
                    </Heading>

                    <CloseIcon
                      fontSize={`10px`}
                      ml={12}
                      onClick={(e) => {
                        removeItem(row.ProductID, row.Price, row.Quantity, row.GST);
                      }}
                    />
                  </Flex>
                  <Flex direction={"row"}>
                    <Text fontFamily={``} fontSize={"sm"}>
                      ₹{numeral(row.Price).format("00,00")}
                    </Text>
                    <Flex
                      direction={`row`}
                      ml={8}
                      mt={3}
                      alignItems={`end`}
                      gap={2}
                    >
                      <Flex
                        align="center"
                        bg={`transparent`}
                        border={"1px solid #E2E8F0"}
                        rounded={`full`}
                        roundtraed={`full`}
                        width={`100px`}
                        height={`30px`}
                      >
                        <Button
                          flex={`1`}
                          bg={`transparent`}
                          onClick={() => {
                            if (row.Quantity > 1) {
                              dispatch(
                                updateCart({
                                  ProductID: row.ProductID,
                                  Price: row.Price,
                                  Quantity: row.Quantity - 1,
                                  GST: row.GST
                                })
                              );
                            }
                            else {
                              removeItem(
                                row.ProductID, row.Price, row.Quantity, row.GST
                                )
                            }
                          }}
                          rounded={`full`}
                        >
                          -
                        </Button>
                        <Text mx="2">{row.Quantity}</Text>
                        <Button
                          flex={`1`}
                          bg={`transparent`}
                          onClick={() => {
                            dispatch(
                              updateCart({
                                ProductID: row.ProductID,
                                Price: row.Price,
                                Quantity: row.Quantity + 1,
                                GST: row.GST
                              })
                            );
                          }}
                          rounded={`full`}
                        >
                          +
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                marginTop={`2`}
                marginBottom={`2`}
                borderBottom={`1.5px solid #E2E8F0`}
              />
            </>
          );
        })}
        {/* Your existing code here */}
      </div>
      <Flex
        marginTop={`2`}
        marginBottom={`2`}
        borderBottom={`1.5px solid #E2E8F0`}
      />
      <Flex>
        <Heading size={"sm"} as="b" pl={2} fontWeight={700} fontFamily={``}>
          Sub Total
        </Heading>

        <Heading
          size={"sm"}
          as="b"
          marginLeft={`auto`}
          pl={2}
          fontFamily={``}
          fontWeight={600}
        >
          ₹{numeral(TotalPrice).format("00,00")}
        </Heading>
      </Flex>
      <Heading pl={2} fontWeight={300} fontSize={`14px`} fontFamily={``}>
        Extra charge may apply
      </Heading>
      <Link to="/checkout">
        <Button
          P={`5`}
          onClick={onClose}
          mt={2}
          width={`100%`}
          fontFamily={``}
          colorScheme="whatsapp"
          size="lg"
        >
          CHECKOUT
        </Button>
      </Link>
      <Link to="/viewCart">
      <Button
          P={`5`}
          onClick={onClose}
          mt={3}
          width={`100%`}
          fontFamily={``}
         color="#19884A"
          size="lg"
          bg={'none'}
          border={'1px solid #19884A'}
          mb={2}
        >
          View Cart
        </Button>
        </Link>
    </>
  );
};

export default index;
