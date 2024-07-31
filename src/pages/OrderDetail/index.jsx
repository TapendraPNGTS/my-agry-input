import { Box, Card, Flex, Heading, Image, Skeleton, Text } from "@chakra-ui/react";
import { BiLeftArrow, BiLeftArrowAlt } from "react-icons/bi";
import OrderApi from "../../apis/order.api";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaFileInvoice } from "react-icons/fa";
import { ViewIcon } from "@chakra-ui/icons";

const OrderDetail = () => {
  const orderApi = new OrderApi();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await orderApi.getOrderDetail({
          paymentId: params.id,
        });

        setOrders(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchOrderDetail();
  }, [params.id]);


  console.log("order detail page", orders);

  function formatTimeDifference(time) {
    const now = new Date();
    const notificationTime = new Date(time);
    const timeDiff = now - notificationTime;

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours < 24) {
      if (hours >= 1) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
      } else {
        return 'just now';
      }
    } else if (hours < 48) {
      return 'yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(notificationTime);
    }
  }

  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.Price, 0);
  };
  const calculateTotalWithGST = (items, gstValue) => {
    const subtotal = calculateSubtotal(items);
    const gstAmount = gstValue; // Assuming GST is provided as a direct value
    const total = subtotal + gstAmount;
    return total;
  };

  return (
    <>
      {isLoading ? (<>
        <Box p={{ base: "5", md: "5", lg: "10" }}>
          <Skeleton height='20px' width={'200px'} />
          <Skeleton height='20px' width={'200px'} />
          <Flex>
            <Box width={{ base: "100%", md: '60%' }} m={4} ml={0}>
              <Skeleton mt={3} height='40px' width={'200px'} />
              <Skeleton mt={3} height='20px' />
              <Skeleton mt={3} height='20px' />
              <Skeleton mt={3} height='40px' />
              <Skeleton mt={3} height='100px' />
              <Skeleton mt={3} height='300px' />
              <Skeleton mt={3} height='100px' />
            </Box>
            <Box width={{ base: "100%", md: '40%' }} mt={3} p={5}>
              <Skeleton mt={3} height={'20px'} />
              <Skeleton mt={3} height={'20px'} />
              <Skeleton mt={3} height={'100px'} />
              <Skeleton mt={3} height={'100px'} />
              <Skeleton mt={3} height={'30px'} />
              <Skeleton mt={3} height={'20px'} />
              <Skeleton mt={3} height={'20px'} />
              <Skeleton mt={3} height={'20px'} />
            </Box>
          </Flex>
        </Box>
      </>) : (
        <Box p={{ base: "5", md: "5", lg: "10" }}>
          <Flex alignItems={'center'}>
            <Link to="/settings/orders">
              <BiLeftArrowAlt fontSize={'24px'} />
            </Link>
            <Text fontSize={'20px'} ml={2}>Your Orders</Text></Flex>
          {orders && orders.map((order, index) => {
            return (
              <Box key={index} >
                <Text mt={4} fontSize={'18px'}>OrderId#: {order.paymentId}</Text>

                {order.status === "UnPaid" ? <Text textAlign={'center'}><></></Text> :
                  <Flex alignItems={'center'} >
                    <Text mr={2} fontSize={'18px'}> InvoiceId: {order.invoiceId}</Text>
                    <a href={order.invoice} target="_blank" style={{ display: "flex", alignItems: "center", fontSize: "15px", marginLeft: "5px", textDecoration: "underline" }}>
                      <ViewIcon />
                    </a>
                  </Flex>
                }
                <Flex width={'100%'} flexDirection={{ base: "column", md: "row" }}>
                  <Box width={{ base: "100%", md: '60%' }} m={4} ml={0}>
                    <Card p={4}>
                      <Text color={'#3f3f51eb'} fontSize={'18px'} fontWeight={'bold'}>Package {index + 1} of {order.cartId.Item.length}</Text>

                    </Card>
                    <Card p={5} mt={5}>
                      <Text>Estimated Delivery Date -</Text>
                      <Text mt={2} fontSize={'20px'} fontWeight={'bold'}> {formatTimeDifference(order.createdAt)}</Text>

                      <Text mt={5} fontSize={'24px'} fontWeight={'bold'} color={'#19884A'}>Out For Delivery</Text>
                      <Text mt={2} color={'#3f3f51eb'}>Your package is on the way</Text>
                      <Flex flexDirection={{base:'column', md:'row'}} justifyContent={'space-between'} width={{ base: "", md: "100%", lg: '90%' }} alignItems={'start'} mt={5}>
                        <Box >
                          <Text fontSize={'16px'} fontWeight={'medium'}>Shipping Address</Text>
                          <Flex gap={2} mt={2}>
                          <Text fontWeight={'medium'}>To :</Text>
                          <Text fontSize={{base:'16px', md:'15px', lg:'16px'}}>
                           {order.cartId.Address.firstName }  {order.cartId.Address.lastName}
                          </Text>
                          </Flex>
                          <Text fontSize={{base:'16px', md:'15px', lg:'16px'}}  pt={1} color={'#3f3f51eb'}>{`${order.cartId.Address.street}`}
                         ,  {`${order.cartId.Address.stateId.Name}`} , {`${order.cartId.Address.cityId.Name}`}</Text>
                          
                          <Text color={'#3f3f51eb'}>{order.cartId.Address.zipCode}</Text>

                        </Box>
                        <Box>

                         <Flex alignItems={'center'} gap={2}>
                         <Text fontSize={{base:'16px', md:'15px', lg:'16px'}}  fontWeight={'medium'}>Payment Type: </Text>
                          <Text fontSize={{base:'16px', md:'15px', lg:'16px'}} color={'#3f3f51eb'}>{order.paymentType}</Text>
                         </Flex>


                         <Flex alignItems={'center'} gap={2} mt={2}>
                         <Text fontSize={{base:'16px', md:'15px', lg:'16px'}} fontWeight={'medium'}>Status: </Text>
                          <Text fontSize={{base:'16px', md:'15px', lg:'16px'}} color={'#3f3f51eb'}>{order.isAccept}</Text>
                         </Flex>

                        </Box>
                      </Flex>
                    </Card>

                    {/* <Card p={5} mt={5}>
                <Text fontSize={'16px'} fontWeight={'bold'}>Sign Up for SMS Order Notifications</Text>
                <Text pt={3} color={'#3f3f51eb'} fontSize={'15px'}>Get delivery updates sent directly. By signing up for SMS updates for this order, you accept our
                <Link to='/Term-Condition' style={{textDecoration:"none"}}>
                 <span style={{color:"#19884A"}}> terms of use.</span>
                 </Link>
                 </Text>
                
               </Card> */}
                  </Box>
                  <Card width={{ base: "100%", md: '40%' }} mt={3} p={5}>
                    <Text fontSize={'18px'} fontWeight={'bold'}>Order Summary</Text>
                    <Text>Number of Items {order.cartId.Item.length}</Text>
                    {order.cartId.Item.map((item, index) => {
                      console.log("item", item)
                      return (
                        <>
                          <Box mt={3} key={index}>
                            <Text pb={1} pt={2}>Package {index + 1} of {order.cartId.Item.length}</Text>
                            <Card boxShadow={'none'}>
                              <Flex justifyContent={'space-between'} alignItems={'center'} pt={2}>
                                <Flex alignItems={'center'}>
                                  <Card width={{ base: '80px', md: '80px', lg: '100px' }} p={2}>  <Image width={{ base: '80px', md: '80px', lg: '100px' }} height={{ base: '70px', md: '70px', lg: '70px' }} src={item.CoverImage} /></Card>
                                  <Box ml={{ base: 2, md: 2, lg: 5 }}> <Text fontSize={{ base: "15px", md: "15px", lg: '16px' }} fontWeight={'bold'}>{item.Name}</Text>
                                    <Text fontSize={'16px'}>Quantity: {item.Quantity}</Text>
                                  </Box>
                                </Flex>
                                <Text fontSize={'18px'} fontWeight={'bold'} color={'#3f3f51eb'}> ₹{item.Price}</Text>
                              </Flex>
                            </Card>
                          </Box>
                        </>
                      )
                    })}
                    <Flex mb={1} mt={5} justifyContent={'space-between'} alignItems={'center'}>
                      <Text fontSize="16px" fontWeight="bold">
                        Subtotal:
                      </Text>
                      <Text fontSize="16px" fontWeight="bold"> ₹{order.cartId.TotalPrice}</Text>
                    </Flex>
                    <hr />

                    <Flex mt={1} mb={1} justifyContent={'space-between'} alignItems={'center'}>
                      <Text color={'#3f3f51eb'}>Shipping</Text>
                      <Text color={'#3f3f51eb'}>free</Text>
                    </Flex>
                    <hr />
                    {/* <Flex mb={1} mt={2} justifyContent="space-between" alignItems="center">
                      <Text fontSize="16px" color={'#3f3f51eb'}>
                        GST:
                      </Text>
                      <Text fontSize="16px" color={'#3f3f51eb'}>
                        ₹{order.cartId.Gst}
                      </Text>
                    </Flex> */}
                    <Flex mb={1} mt={2} justifyContent="space-between" alignItems="center">
                      <Text fontSize="16px" color={'#3f3f51eb'}>
                      CGST:
                      </Text>
                      <Text fontSize="16px" color={'#3f3f51eb'}>
                       {order.cartId.Address.stateId.Name === 'Chhattisgarh' ? <>₹{order.cartId.Gst/2}</>  : <>₹0.0</>}
                      </Text>
                    </Flex>
                    <Flex mb={1} mt={2} justifyContent="space-between" alignItems="center">
                      <Text fontSize="16px" color={'#3f3f51eb'}>
                      SGST:
                      </Text>
                      <Text fontSize="16px" color={'#3f3f51eb'}>
                      {order.cartId.Address.stateId.Name === 'Chhattisgarh' ? <>₹{order.cartId.Gst/2}</>  : <>₹0.0</>}
                      </Text>
                    </Flex>
                    <Flex mb={1} mt={2} justifyContent="space-between" alignItems="center">
                      <Text fontSize="16px" color={'#3f3f51eb'}>
                      IGST:
                      </Text>
                      <Text fontSize="16px" color={'#3f3f51eb'}>
                      {order.cartId.Address.stateId.Name !== 'Chhattisgarh' ? <>₹{order.cartId.Gst}</>  : <>₹0.0</>}
                      </Text>
                    </Flex>
                    <hr />
                    <Flex mt={4} justifyContent="space-between" alignItems="center">
                      <Text fontSize="18px" fontWeight="bold">
                        Total:
                      </Text>
                      <Text fontSize="18px" fontWeight="bold">
                        ₹{order.totalPrice}
                      </Text>
                    </Flex>
                  </Card>

                </Flex>

              </Box>
            )
          })}

        </Box>
      )}
    </>
  )
}
export default OrderDetail;