import React from "react";
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
import "./index.css";
import ServiceApi from "../../apis/services.api";
import { updateAllOrder } from "../../redux/redux-slice/order.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { formatDate } from "../../utils/common.util";
import wishlistBgImg from "../../assets/images/wishlist-bg-img.svg";
import dataNotFound from "../../assets/images/data-not-found-img.svg";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";

const FieldsData = () => {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <Box>
        <Image src={wishlistBgImg} width={"100%"} height={"auto"} />
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
  const serviceApi = new ServiceApi();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [fields, setFields] = useState([]);


  const getFieldHistory = async () => {
    try {
      const fields = await serviceApi.getFields({});
      if (fields || fields.data.data) {
        setFields(fields.data.data);
        console.log("fields history", fields.data.data)
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  };

  useEffect(() => {
    getFieldHistory();

  }, []);


  return (
    <div className="order--container">

      <div className="order--header">
        <Flex width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
        <Flex  alignItems={'center'}>
          <span className="pro--ham--icon" onClick={() => setMenu(true)}>
            <HamburgerIcon />
          </span>
          <Text fontWeight={'500'} color={"black"}  fontSize={{ base: "20px", md: "24px" }}>Fields Detail</Text>
        </Flex>
        <Link to='/settings/add-fields'>
        <Button color={'white'} bgColor={'#006C1E'} _hover={'none'} _active={'none'} fontWeight={'medium'}><IoMdAddCircleOutline fontSize={'20px'} style={{marginRight:'5px'}}/>Add Field</Button>
        </Link>
        </Flex>
      </div>

      <Flex direction="column" w={`100%`}>
        <Flex alignItems="center" justifyContent="start" width={`100%`}>
          <Box overflowX="auto" border={"1px solid #E4E7E9"} rounded={"md"} mt={5} width={`100%`}>

            <Table variant="simple" >
              <Thead>
                <Tr>
                  {/* <Th width={`150px`}> </Th> */}

                  <Th fontSize={`16px`} fontWeight={`600`} >
                    Date
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`} >
                    State
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`} >
                    District
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`}>
                    Field Name
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`}>
                    Crop Name 
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`}>
                  Land Detail
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`}>
                  Land Mark
                  </Th>
                  <Th fontSize={`16px`} fontWeight={`600`}>
                   Location
                  </Th>
                 
                  <Th fontSize={`16px`} fontWeight={`600`}>
                    Action
                  </Th>
                </Tr>
              </Thead>
              {fields && fields.length === 0 ?
                <TableCaption>
                  <Flex width={'100%'} justifyContent={'center'}>
                    <Image src={dataNotFound} />
                  </Flex>
                </TableCaption>
                :
                <Tbody>
                  {fields && fields.map((row, index) => {

                    return (
                      <Tr key={index}
                        cursor={'pointer'}
                        onClick={(e) => {
                          navigate(`/settings/edit-fields/${row.fieldID}`);
                        }}
                      >
                        <Td >
                          {formatDate(row.createdAt)}
                        </Td>
                        <Td >
                          {row.StateID.Name}
                        </Td>
                        <Td >
                          {row.DistrictID.Name}
                        </Td>
                        <Td >
                          {row.fieldName}
                        </Td>
                        <Td>
                      
                            {row.cropName}
                         
                        </Td>
                        <Td>
                      
                            {row.landDetail}
                         
                        </Td>
                        <Td>
                      
                            {row.landMark}
                         
                        </Td>

                        <Td >
                          {row.location.locationName}
                        </Td>
                        <Td>
                          <Text
                            textAlign={'center'}
                            onClick={(e) => {
                              navigate(`/settings/edit-fields/${row.fieldID}`);
                            }}
                            cursor={'pointer'}
                          >
                            <EditIcon />
                          </Text>
                        </Td>
                      </Tr>
                    );


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

export default FieldsData;
