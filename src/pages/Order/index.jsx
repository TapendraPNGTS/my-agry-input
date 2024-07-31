import React from "react";
import "./order.css";
import CategoryLayout from "../../components/layout/CategoryLayout";
import SettingsMenu from "../../components/shared/SettingsMenu";
import Back from "../../assets/setting-image/setback.svg";
import { EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  Text,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  Flex,
  Box,
  Button,
  TableCaption,
} from "@chakra-ui/react";

import OrderApi from "../../apis/order.api";
import { updateAllOrder } from "../../redux/redux-slice/order.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { formatDate } from "../../utils/common.util";
import orderBgImg from "../../assets/images/order-bg-img.svg";
import dataNotFound from "../../assets/images/data-not-found-img.svg";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [menu, setMenu] = useState(false);
  return (
    <>
    <Box>
    <Image src={orderBgImg} width={"100%"} height={"auto"}/>
    </Box>
      <div className="settings--page--container">
        <CategoryLayout
          left={<NavigationMenu setMenu={setMenu} menu={menu} />}
          right={<Orders setMenu={setMenu} menu={menu} />}
          navOpen={menu}
        />
      </div>
    </>
  );
};

const NavigationMenu = ({ setMenu, menu }) => {
  return (
    <>
     <Flex justifyContent={'right'} pr={3}>
           {menu ? (
                        <img
                            style={{ cursor: "pointer" }}
                            src={cancelIcon}
                            width={'20px'}
                            alt=""
                            onClick={() => setMenu(false)}
                        />
                    ) : null}
           </Flex>
      <div className="navigation--menu--container">
        <h2>
          {menu ? (
            <img
              style={{ cursor: "pointer" }}
              src={Back}
              alt=""
              onClick={() => setMenu(false)}
            />
          ) : null}
          Settings
        </h2>
        <div className="navigation--items">
          <SettingsMenu />
        </div>
      </div>
    </>
  );
};

const Orders = ({ menu, setMenu }) => {
  const orderApi = new OrderApi();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [searchQuery, setSearchQuery] = useState("");

  const [orders, setOrders] = useState([]);
 
 
  const [filteredOrders, setFilteredOrders] = useState([]);

//   const handleSearch = (e) => {
//   const query = e.target.value.toLowerCase();
//   setSearchQuery(query);

//   const filteredOrders = orders.filter((item) =>
//     item.cartId.Item &&
//     item.cartId.Item.Name &&
//     item.cartId.Item.Name.toLowerCase().includes(query)
//   );

//   const filteredServiceOrders = serviceOrder.filter((item) =>
//     item.serviceId &&
//     item.serviceId.name &&
//     item.serviceId.name.toLowerCase().includes(query)
//   );

//   const combinedResults = [...filteredOrders, ...filteredServiceOrders];
//   setFilteredOrders(combinedResults);
// };

  // console.log("combinedResults",combinedResults)
  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    const filteredResults = orders.filter((item) =>
      item.cartId.Item &&
      item.cartId.Item.Name &&
      item.cartId.Item.Name.toLowerCase().includes(query)
    );
  // console.log("filteredResults",filteredResults)
    setOrders(filteredResults);
  };

  const getOrderHistory = async () => {
    try {
      const order = await orderApi.getOrderHistory();
      if (order || order.data.data) {
        dispatch(updateAllOrder(order.data.data));
        setOrders(order.data.data);
        // console.log("order history", order.data.data)
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  };
 
  useEffect(() => {
    getOrderHistory();
   
  }, []);

 
  return (
    <div className="order--container">
     
      <div className="order--header">
        <Flex width={'100%'}>
          <span className="pro--ham--icon" onClick={() => setMenu(true)}>
            <HamburgerIcon />
          </span>
         <Text background={"#19884A"} width={"100%"} color={"white"} p={"8px 15px"} mb={2} fontSize={{base:"16px", md:"18px"}}>ORDER</Text>
        </Flex>
      </div>
        
      <Flex direction="column" w={`100%`}>
        <Flex w={`100%`} mt={2}>
          {/* <InputGroup>
            <Input
              placeholder="Search Your Order"
              // rounded={`full`}
              bg={`white`}
              fontSize={`14px`}
              fontWeight={`small`}
              focusBorderColor={`#006C1E`}
              activeBorderColor={`#006C1E`}
              h={12}
             value={searchQuery}
              onChange={handleSearch}
            />
          </InputGroup> */}
        </Flex>
        {/* </Flex> */}
        <Flex alignItems="center" justifyContent="start" width={`100%`}>
          <Box overflowX="auto" border={"1px solid #E4E7E9"} rounded={"md"} mt={5}  width={`100%`}>
           
            <Table variant="simple" >
              <Thead>
                <Tr>
                  {/* <Th width={`150px`}> </Th> */}

                  <Th fontSize={`16px`} fontWeight={`600`} >
                    Product Name
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`}>
                    Qty
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`}>
                    Price
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`}>
                    Order On
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`}>
                    Status
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`}>
                    Action
                  </Th>
                </Tr>
              </Thead>
              {orders && orders.length === 0 ?
                 <TableCaption>
                  <Flex width={'100%'} justifyContent={'center'}>
                  <Image src={dataNotFound}/>
                  </Flex>
                 </TableCaption>
                 :
              <Tbody>
                {orders && orders.map((row) => {
                  {
                    return row.cartId.Item.map((row1, index) => {

                      return (
                        <Tr key={index} 
                        cursor={'pointer'}
                        onClick={(e)=>{
                          navigate(`/order-detail/${row.paymentId}`);
                        }}
                        >
                          {/* <Td>
                            <Image
                              height={"80px"}
                              width={"80px"}
                              objectFit={"cover"}
                              maxWidth="none" // Prevents scaling down on smaller screens
                              src={row1.CoverImage}
                              alt="test"
                            />
                          </Td> */}
                          <Td>
                            <Text
                              fontSize={`14px`}
                              fontWeight={`600`}
                            >
                              {row1.Name}
                            </Text>
                          </Td>
                          <Td fontSize={`18px`} fontWeight={`500`}>
                            {row1.Quantity}
                          </Td>
                          <Td fontSize={`16px`} fontWeight={`500`}>
                            ₹ {row1.Price}
                          </Td>
                          <Td fontSize={`14px`} fontWeight={`500`}>
                            {formatDate(row.createdAt)}
                          </Td>
                          <Td>
                           
                            <Text
                              fontSize={`14px`}
                              fontWeight={`400`}
                              color={`#4C5056`}
                            >
                              Your item has been  {row.isAccept}
                            </Text>
                          </Td>
                          <Td>
                           
                            <Text
                            textAlign={'center'}
                            onClick={(e)=>{
                              navigate(`/order-detail/${row.paymentId}`);
                            }}
                            cursor={'pointer'}
                            >
                              <EditIcon/>
                            </Text>
                          </Td>
                        </Tr>
                      );
                    });
                  }
                })}
              </Tbody>
}
            </Table>



            
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export default Order;
