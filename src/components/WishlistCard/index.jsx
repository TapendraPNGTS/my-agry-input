import React, { useCallback, useEffect } from "react";
import { Flex, Image, IconButton, Button, Text } from "@chakra-ui/react";
import { HeartIcon } from "../../utils/Icons";
import { Rating, Star } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductApi from "../../apis/product.api";
import { updateAllProduct } from "../../redux/redux-slice/product.slice";
import toast from "react-hot-toast";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";

const Itemcard = ({ scroll }) => {
  const isAuth = useAuthenticated();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.Products);
  const productApi = new ProductApi();
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#0d9934",
    inactiveFillColor: "#abb1ac",
  };
  const getProduct = useCallback(async () => {
    try {
      const product = await productApi.getAllProduct();
      if (product || product.data.data) {
        dispatch(updateAllProduct(product.data.data));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  });
  const addWishlist = async (productId) => {
    try {
      const product = await productApi.addWishlist({
        productId,
      });
      if (product || product.data.data) {
        if(isAuth){
        toast.success("Added to wishlist");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {products.map((row, index) => {
        return (
          <Flex
            direction={"column"}
            flex={1}
            minWidth={"300px"}
            shadow={"sm"}
            cursor={`pointer`}
          >
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
              height={"300px"}
              bg={"gray.100"}
              roundedTopLeft={"xl"}
              roundedTopRight={"xl"}
              position={"relative"}
              // key={index}
            >
              <Link to="/product-detail">
                <Image
                  maxHeight={"200px"}
                  maxWidth={"200px"}
                  margin={"auto"}
                  src={`${row.CoverImage}`}
                />
              </Link>
              <IconButton
                position={"absolute"}
                top={3}
                right={3}
                bg={"white"}
                aria-label="wishlist"
                icon={<HeartIcon />}
                rounded={"full"}
                onClick={() => {
                  addWishlist(row.ProductID);
                }}
              />
            </Flex>

            <Flex
              marginTop={3}
              direction={"column"}
              gap={2}
              paddingX={4}
              paddingY={2}
              paddingBottom={6}
              roundedBottomRight={"xl"}
              roundedBottomLeft={"xl"}
              shadow={"lg"}
            >
              <Link to="/product-detail">
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Text fontSize={"18px"} fontWeight={600}>
                    {row.Name}
                  </Text>
                  <Text fontSize={"18px"} fontWeight={600}>
                    ₹ {row.Price}
                  </Text>
                </Flex>
                <Text fontSize={"14px"}>
                  Organic Cotton, fairtrade certified
                </Text>
                <Flex>
                  <Rating
                    value={row.AvgRating}
                    readOnly={true}
                    isDisabled={true}
                    itemStyles={myStyles}
                    style={{
                      maxWidth: "100px",
                      marginRight: ".5rem",
                    }}
                  />
                  {row.AvgRating}
                </Flex>
              </Link>

              <Flex
                justifyContent={"space-between"}
                gap={3}
                marginTop={4}
                wrap={"wrap"}
              >
                <Button
                  variant="outline"
                  colorScheme="green"
                  flex={1}
                  rounded={"full"}
                >
                  Add to Cart
                </Button>
                <Link to={`/checkout`}>
                  <Button colorScheme="green" flex={1} rounded={"full"}>
                    Buy Now
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </>
  );
};

export default Itemcard;
