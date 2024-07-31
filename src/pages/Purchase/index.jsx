import React from "react";
import "./order.css";

import CategoryLayout from "../../components/layout/CategoryLayout";
import SettingsMenu from "../../components/shared/SettingsMenu";
import Back from "../../assets/setting-image/setback.svg";
import orderBgImg from "../../assets/images/order-bg-img.svg";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Box,
  Image,
  Button,
  TableCaption,
} from "@chakra-ui/react";
import { FaFileInvoice } from "react-icons/fa";

import OrderApi from "../../apis/order.api";
import { useEffect } from "react";
import { formatDate, formatTime } from "../../utils/common.util";
import { Navigate, useNavigate } from "react-router-dom";
import dataNotFound from "../../assets/images/data-not-found-img.svg";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";

const Order = () => {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <Box>
        <Image src={orderBgImg} width={"100%"} height={"auto"} />
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
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [productOrders, setProductsOrders] = useState([]);
  const [showProduct, setShowProduct] = useState(false);
  const [showService, setShowService] = useState(false);
  const [showPurchaseDara, setShowPurchaseData] = useState(true);
  const [serviceOrder, setServiceOrder] = useState([]);
  const [activeSection, setActiveSection] = useState("product");

  const getPurchaseHistory = async () => {
    try {
      const purchaseResponse = await orderApi.getPurchaseHistory();
      if (purchaseResponse || purchaseResponse.data.data) {
        setOrders(purchaseResponse.data.data);
        // console.log("purchaseResponse",purchaseResponse.data.data)
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  };



  const getServiceOrderHistoryData = async () => {
    try {
      const order = await orderApi.getServiceOrderHistory();
      if (order || order.data.data) {
        // dispatch(updateAllOrder(order.data.data));
        setServiceOrder(order.data.data);
        // console.log("service order history", order.data.data)
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  };
  useEffect(() => {
    getPurchaseHistory();

    getServiceOrderHistoryData();
  }, []);

  const showProductOrder = () => {

    setShowService(false);
    setShowPurchaseData(true);
    setActiveSection("product");
  }
  const showServicesOrder = () => {
    setShowService(true)
    // setShowProduct(false);
    setShowPurchaseData(false)
    setActiveSection("service");
  }
  return (
    <div className="order--container">
      <div className="order--header">
        <h2>
          <span className="pro--ham--icon" onClick={() => setMenu(true)}>
            <HamburgerIcon />
          </span>
          Purchase History
        </h2>
      </div>
      <Box border={'1px solid #F0F0F0'}
          width={'95%'}
          m={'auto'}
          bgColor={'white'}
          mt={5}
          mb={8}
          h={'auto'}

        >
          <Flex borderBottom={'1px solid #F0F0F0'} >
        <Button
          bgColor={activeSection === "product" ? "#19884A" : "white"}
          color={activeSection === "product" ? "white" : "#19884A"}
          p={'5px 35px'}
          rounded={'sm'}
          fontWeight={'md'}
          _hover={'none'} _active={'none'}
          onClick={showProductOrder}>
          Product</Button>
        <Button
         ml={2}
         p={'5px 35px'}
              rounded={'sm'}
              fontWeight={'md'}
         _hover={'none'} _active={'none'}
          bgColor={activeSection === "service" ? "#19884A" : "white"}
          color={activeSection === "service" ? "white" : "#19884A"}
          
          onClick={showServicesOrder}>Service</Button>
      </Flex>
      <Flex direction="column" w={`100%`} bgColor={'white'}>
        {/* </Flex> */}
        <Flex alignItems="center" justifyContent="start" width={`100%`}>
          <Box overflowX="auto"    width={`100%`}>
            {showPurchaseDara === true ?
              <Table variant="simple">
               
                <Thead>
                  <Tr>
                    <Th fontSize={`16px`} fontWeight={`600`}>
                      Date
                    </Th>

                    <Th fontSize={`16px`} fontWeight={`600`}>
                      Transaction ID
                    </Th>
                    <Th fontSize={`16px`} fontWeight={`600`}>
                      Payment Type
                    </Th>
                    <Th fontSize={`16px`} fontWeight={`600`}>
                      Amount
                    </Th>
                    <Th fontSize={`16px`} fontWeight={`600`}>
                      Status
                    </Th>
                    <Th fontSize={`16px`} fontWeight={`600`}>
                      Invoice
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
                <Tbody className="history-table-scroll">
                  {orders && orders.map((row, index) => {
                    console.log("row-orders", row);
                    return (
                      <Tr key={index}>
                        <Td>
                          <Text fontSize={`14px`} fontWeight={`600`}>
                            {formatDate(row.updatedAt)}{" "}
                            {formatTime(row.updatedAt)}
                          </Text>
                        </Td>
                        <Td fontSize={`15px`}>{row.transactionId}</Td>
                        <Td fontSize={`16px`} fontWeight={`500`}>
                          {row.paymentType}
                        </Td>
                        <Td fontSize={`16px`} fontWeight={`500`}>
                          ₹ {row.totalPrice}
                        </Td>
                        <Td fontSize={`16px`} fontWeight={`500`} textTransform={'lowercase'}>
                          {row.status}
                        </Td>
                        <Td
                          fontSize={`24px`}
                          fontWeight={`500`}
                          display={'flex'}
                          alignItems="center"
                          justifyContent={'center'}
                        >
                          {row.status === "UnPaid" ? <Text textAlign={'center'}>-</Text> :
                            <a href={row.invoice} target="_blank">
                              <FaFileInvoice />
                            </a>
                          }
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
}
              </Table>
              : ""}


            {showService === true ?
              <Table variant="simple" >
                <Thead>
                  <Tr>
                    {/* <Th width={`150px`}> </Th> */}
                    <Th fontSize={`16px`} fontWeight={`600`}>
                      Order On
                    </Th>
                    <Th fontSize={`16px`} fontWeight={`600`} >
                      Service Name
                    </Th>
                    <Th fontSize={`16px`} fontWeight={`600`} >
                      User Name
                    </Th>

                    <Th fontSize={`16px`} fontWeight={`600`}>
                      Price
                    </Th>
                   
                    <Th fontSize={`16px`} fontWeight={`600`}>
                      Status
                    </Th>
                    <Th fontSize={`16px`} fontWeight={`600`}>
                      Invoice
                    </Th>
                  </Tr>
                </Thead>
                {serviceOrder && serviceOrder.length === 0 ?
                 <TableCaption>
                  <Flex width={'100%'} justifyContent={'center'}>
                  <Image src={dataNotFound}/>
                  </Flex>
                 </TableCaption>
                 :
                <Tbody className="history-table-scroll">
                  {serviceOrder && serviceOrder.map((row1, index) => {

                    return (
                      <Tr key={index}>
                        <Td fontSize={`14px`} fontWeight={`500`}>
                          {formatDate(row1.createdAt)}
                        </Td>
                        <Td>
                          <Text
                            fontSize={`14px`}
                            fontWeight={`600`}
                          >
                            {row1?.serviceId?.service.name}
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontSize={`14px`}
                            fontWeight={`600`}
                          >
                            {row1?.serviceId?.name}
                          </Text>
                        </Td>

                        <Td fontSize={`16px`} fontWeight={`500`}>
                          ₹ {row1.amount}
                        </Td>
                       
                        <Td>

                          <Text
                            fontSize={`14px`}
                            fontWeight={`400`}
                            color={`#4C5056`}
                          >
                            Your item has been  {row1.isAccept}
                          </Text>
                        </Td>
                        <Td
                          fontSize={`24px`}
                          fontWeight={`500`}
                          
                          display={'flex'}
                          justifyContent={'center'}
                          alignItems={'center'}
                        >
                          {row1.status === "UnPaid" ? <Text textAlign={'center'}>-</Text> :
                            <a href={row1.invoice}  target="_blank">
                              <FaFileInvoice />
                            </a>
                          }
                        </Td>
                      </Tr>
                    );

                  })
                  }
                </Tbody>
}
              </Table>
              : ""}
          </Box>
        </Flex>
      </Flex>
      </Box>
    </div>
  );
};

export default Order;
