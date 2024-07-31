import {
  Box, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Card
} from "@chakra-ui/react";
import CartApi from "../../apis/cart.api";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, resetCart, updateCart } from "../../redux/redux-slice/cart.slice";
import deleteIcon from "../../assets/images/delete-icon.svg";
import rightArrow from "../../assets/images/right-arrow.svg";
import addIcon from "../../assets/images/add-cart-icon.svg";
import deliveryIcon from "../../assets/images/delivery-icon.svg";
import refundImg from "../../assets/images/refund-img.svg";
import supportImg from "../../assets/images/support-img.svg";
import addIcon1 from "../../assets/images/add-icon.svg";
import emptyCart from '../../assets/images/emptyCart.svg'
import numeral from "numeral";
import { Link } from "react-router-dom";
import { openLoginForm } from "../../redux/redux-slice/viewCart.slice";

const ViewCart = () => {
  const cartApi = new CartApi();
  const dispatch = useDispatch();

  const Cart = useSelector((state) => state.cart.Cart);
  const totalPrice = useSelector((state) => state.cart.TotalPrice);

  const removeItem = (ProductID, Price, Quantity) => {
    dispatch(removeCart({ ProductID, Price, Quantity }));
  };

  const handleCheckoutClick = () => {
    
    dispatch(openLoginForm());
    
  };

  // console.log("carts", Cart.length);
  return (
    <div className="home-parent">
      <div className="layout-container ">
        <Box mt={10}>
          <Flex gap={4} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
              <Heading fontSize={'32px'}>Your cart</Heading>
              <Text fontSize={{base:"15px", md:"16px", lg:"16px"}}>You have {Cart.length} item in your cart</Text>
            </Box>
          <Box >
            <Link to='/'>
          <Button fontWeight={500} fontSize={'16px'} bgColor={{base:"white", md:'#19884A', lg:'#19884A'}} color={{base:"#19884A", md:"white", lg:"white"}} p={{base:'0', md:'15px 25px', lg:'15px 25px'}} 
          _hover={'none'}
          _active={'none'}
          rounded={'4px'}>
            <Image display={{base:'none', md:'flex'}} src={addIcon} mr={3} />
            <Image  display={{base:'flex', md:'none',lg:'none'}} src={addIcon1} mr={1} />
            Add More</Button>
            </Link>
          </Box>
          </Flex>

          <Card mt={5}>
            {/* table */}

            <TableContainer>
              <Table variant='simple'>

                <Thead >
                  <Tr >
                    <Th color="black" fontWeight={'800'} textAlign={'left'}>Product</Th>
                    <Th color="black" fontWeight={'800'} textAlign={'center'}>Price</Th>
                    <Th color="black" fontWeight={'800'} textAlign={'center'}>Qty</Th>
                    <Th color="black" fontWeight={'800'} textAlign={'center'}>Remove</Th>

                  </Tr>
                </Thead>
                {Cart && Cart.length > 0 ? <>
                <Tbody>
                  {Cart && Cart.map((row) => {
                    return (
                      <Tr key={row.ProductID}>
                        <Td width={'35%'}>
                          <Flex alignItems={'center'}>
                            <Card p={2}>
                              <Image
                                height={"80px"}
                                width={"80px"}
                                objectFit={"cover"}
                                maxWidth="none" // Prevents scaling down on smaller screens
                                src={row.CoverImage}
                                alt="test"
                              />
                            </Card>
                            <Text
                              fontSize={`16px`}
                              fontWeight={`600`}
                              ml={4}
                            >
                              {row.Name}
                            </Text>
                          </Flex>
                        </Td>

                        <Td fontSize={`16px`} fontWeight={`500`}>
                          <Text textAlign={'center'}>₹ {row.Price}</Text>
                        </Td>
                        <Td fontSize={`18px`} fontWeight={`500`}>
                         <Text display={'flex'} justifyContent={'center'}>
                          <Flex
                            align="center"
                            bg={`transparent`}
                            border={"1px solid #E2E8F0"}
                            rounded={'sm'}
                            width={`120px`}
                            height={`40px`}
                          >
                            <Button
                              flex={`1`}
                              borderRight={"1px solid #E2E8F0"}
                              bg={`transparent`}
                              fontSize={'24px'}
                              rounded={'0'}
                              onClick={() => {
                                
                                if (row.Quantity > 1) {
                                  dispatch(
                                    updateCart({
                                      ProductID: row.ProductID,
                                      Price: row.Price,
                                      Quantity: row.Quantity - 1,
                                    })
                                  );
                                }
                                else {
                                  removeItem(
                                    row.ProductID,
                                    row.Price,
                                    row.Quantity
                                  )
                                }
                              }}

                            >
                              -
                            </Button>
                            <Text p={2} width={40} textAlign={'center'}>{row.Quantity}</Text>
                            <Button
                              flex={`1`}
                              bg={`transparent`}
                              rounded={'0'}
                              borderLeft={"1px solid #E2E8F0"}
                              fontSize={'18px'}
                              onClick={() =>
                                dispatch(
                                  updateCart({
                                    ProductID: row.ProductID,
                                    Price: row.Price,
                                    Quantity: row.Quantity + 1,
                                  })
                                )
                              }

                            >
                              +
                            </Button>
                          </Flex>
                          </Text>
                        </Td>
                        <Td fontSize={`18px`} fontWeight={`500`} >
                          <Flex justifyContent={'center'}>
                          <Image cursor={'pointer'} src={deleteIcon} alt="delete" 
                            onClick={(e) => [
                              removeItem(
                                row.ProductID,
                                row.Price,
                                row.Quantity
                              ),
                            ]} />
                            </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                  </>
                  :
                  <TableCaption >
                    
                    <Box  width={'100%'} h={'auto'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Image  w={'md'} m={'auto'} src={emptyCart} />
          </Box>
          
                  </TableCaption>
}
              </Table>
            </TableContainer>
            {Cart && Cart.length > 0 ? <>
            <Flex justifyContent={'space-between'} p={'10px 30px'} bg={'#E4E7E9'} m={5}>
              <Text fontSize={'18px'} fontWeight={'700'} color="black">Sub Total</Text>
              <Text fontSize={'18px'} fontWeight={'800'} color="black"> ₹{numeral(totalPrice).format("00,00")}</Text>
            </Flex>
           
            <Box width={'100%'} textAlign={'center'} m={"20px 0px 50px"}>
              <Link to="/checkout">
                <Button fontWeight={500} fontSize={'15px'} 
                bgColor={'#19884A'} color="white" p={'18px 30px'}
                 rounded={'4px'}
                 onClick={handleCheckoutClick}
                 _hover={'none'}
                 _active={'none'}
                >
                  CHECKOUT NOW  
                  <Image ml={3} src={rightArrow} alt="arrow" /></Button>
              </Link>
            </Box>
            </>: ""}
          </Card>
        </Box>

        <Flex gap={{ base: 5, md: 0, lg: 0 }} alignItems={'center'} justifyContent={'space-between'} width={'100%'} mt={10} flexDirection={{ base: 'column', md: 'row', lg: 'row' }}>
          <Flex gap={3} alignItems={'center'} flexDirection={'column'} textAlign={'center'} width={{ base: '80%', md: '32%', lg: '35%' }}>
            <Image width={'100px'} h={'auto'} src={deliveryIcon} />
            <Heading fontSize={'24px'}>FREE SHIPPING</Heading>
            <Text width={{ base: '100%', md: '80%', lg: '50%' }}>It seems like you're looking for information or assistance related to free shipping.</Text>
          </Flex>
          <Flex gap={3} alignItems={'center'} flexDirection={'column'} textAlign={'center'} width={{ base: '80%', md: '32%', lg: '32%' }}>
            <Image src={refundImg} />
            <Heading fontSize={'24px'}>100% REFUND</Heading>
            <Text width={{ base: '100%', md: '80%', lg: '50%' }}>It appears that you're interested in information related to a 100% refund.</Text>
          </Flex>
          <Flex gap={3} alignItems={'center'} flexDirection={'column'} textAlign={'center'} width={{ base: '80%', md: '33%', lg: '33%' }}>
            <Image src={supportImg} />
            <Heading fontSize={'24px'}>SUPPORT 24/7</Heading>
            <Text width={{ base: '100%', md: '80%', lg: '50%' }}>It seems like you're indicating a need for 24/7 customer support.</Text>
          </Flex>
        </Flex>
      </div>
    </div>
  )
}
export default ViewCart;