import React from "react";
import "./address.css";
import CategoryLayout from "../../components/layout/CategoryLayout";
import SettingsMenu from "../../components/shared/SettingsMenu";
import Back from "../../assets/setting-image/setback.svg";
import wishlistBgImg from "../../assets/images/wishlist-bg-img.svg";
import {
  HamburgerIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import {
  Text,
  Card,
  CardBody,
  CardFooter,
  Input,
  Flex,
  Select,
  Button,
  Box,
  Image
} from "@chakra-ui/react";

import AddressApi from "../../apis/address.api";
import OtherApi from "../../apis/other.api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateAllAddress } from "../../redux/redux-slice/address.slice";
import { updateState } from "../../redux/redux-slice/state.slice";
import { useCallback } from "react";
import toast from "react-hot-toast";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";

const Address = () => {
  const [menu, setMenu] = useState(false);
  return (
    <>
    <div>
    <Image width={'100%'} height={'100%'} src={wishlistBgImg}/>
    </div>
      <div className="settings--page--container">
        <CategoryLayout
          left={<NavigationMenu setMenu={setMenu} menu={menu} />}
          right={<RightMenu setMenu={setMenu} menu={menu} />}
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

const RightMenu = ({ menu, setMenu }) => {
  const addressApi = new AddressApi();
  const otherApi = new OtherApi();
  const dispatch = useDispatch();
  const [addressShow, setAddressShow] = useState(false);
  const address = useSelector((state) => state.address.Address);
  const State = useSelector((state) => state.state.State);
  const [districts, setDistricts] = useState([]);

  const [disableButton, setDisableButton] = useState(false);


  const [type ,setType] = useState(`Add`);
  const getAllAddress = async () => {
    try {
      const addressResponse = await addressApi.getAllAddress();
      if (addressResponse || addressResponse.data.data) {
        dispatch(updateAllAddress(addressResponse.data.data));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  };
  const getState = useCallback(async () => {
    try {
      const getStateResponse = await otherApi.getState();
      if (getStateResponse && getStateResponse.data.data) {
        dispatch(updateState(getStateResponse.data.data));
      }
    } catch (error) {}
  });

  const getDistrict = async (stateId) => {
    try {
      const getDistrictResponse = await otherApi.getDistrict({ stateId });
      if (getDistrictResponse && getDistrictResponse.data.data) {
        setDistricts(getDistrictResponse.data.data);
      }
    } catch (error) {}
  };
  const onValueChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
    setformError({ ...formError, [name]: "" });
  };

  

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    street: "",
    zipcode: "",
    cityId: "",
    stateId: "",
    addressId: "",
    email: "",
    companyName:"",
    gstNumber: "",
  });

  const [formError, setformError] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    street: "",
    zipcode: "",
    cityId: "",
    stateId: "",
    addressId: "",
    email: "",
    companyName:"",
    gstNumber:"",
  });

const numregex = /^\d{10}$/;

  const validateForm = () => {
    const errors = {};
  
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    } 
    if (formData.contact === "") {
      errors.contact = "Contact is required";
    } if (!numregex.test(formData.contact)) {
      errors.contact = "Invalid Contact format";
    }
    if (!formData.street.trim()) {
      errors.street = "Street is required";
    }
    if (formData.zipcode && typeof formData.zipcode === 'string') {
      if (!formData.zipcode.trim()) {
        errors.zipcode = "Zip Code is required";
      } else if (!/^\d{6}$/.test(formData.zipcode.trim())) {
        errors.zipcode = "Invalid Zip Code format";
      }
    } 
    if (!formData.cityId.trim()) {
      errors.cityId = "City ID is required";
    }
    if (!formData.stateId.trim()) {
      errors.stateId = "State ID is required";
    }
    // if (!formData.addressId.trim()) {
    //   errors.addressId = "Address ID is required";
    // }
    // if (!formData.email.trim()) {
    //   errors.email = "Email is required";
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    //   errors.email = "Invalid Email format";
    // }
    return errors;
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setformError(validateForm());

    if (Object.keys(formError).length > 0) {
      console.log("Form errors:", formError);
      return;
    }
    try {
      const response = await addressApi.addAddress(formData);
      if (response && response.data.data) {
        toast.success(`Address add successfully`);
        getAllAddress();
        setAddressShow(false);
        setFormData({
          firstName: "",
          lastName: "",
          contact: "",
          street: "",
          zipcode: "",
          cityId: "",
          stateId: "",
          email: "",
          companyName:"",
          gstNumber: "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const deleteResponse = await addressApi.removeAddress({
        addressId
      });
      if (deleteResponse && deleteResponse.data.code ==200) {
        toast.success(`Deleted successfully`);
        getAllAddress();
        setAddressShow(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  

  const editAddress = async (e) => {
    e.preventDefault();
  
    
    const formErrors = validateForm();
    setformError(formErrors);
  
    setDisableButton(true);
    if (Object.keys(formErrors).length > 0) {
      console.log("Form errors:", formErrors);
      return;
    }
  
    try {
     
      const editResponse = await addressApi.editAddress(formData);
  
      if (editResponse && editResponse.data.code === 200) {
        toast.success(`Edited successfully`);
        getAllAddress();
        setAddressShow(false);
        setType(`Add`);
        setDisableButton(false);
      }
    } catch (error) {
      toast.error(error.message);
      setDisableButton(false);
    }
  };
  
  

  const getAddressById = async (addressId) => {
    try {
      const getAddressByIdResponse = await addressApi.getAddressById({
        addressId
      });
      if (getAddressByIdResponse && getAddressByIdResponse.data.data) {
        setAddressShow(true);
        getDistrict(getAddressByIdResponse.data.data?.StateID?.StateID);

        setFormData({
          firstName: getAddressByIdResponse.data.data.FirstName,
          lastName: getAddressByIdResponse.data.data.LastName,
          contact: getAddressByIdResponse.data.data.Contact,
          street: getAddressByIdResponse.data.data.Street,
          zipcode:getAddressByIdResponse.data.data.ZipCode,
          cityId: getAddressByIdResponse.data.data?.CityID?.DistrictID,
          stateId: getAddressByIdResponse.data.data?.StateID?.StateID,
          addressId: getAddressByIdResponse.data.data.AddressID,
          email: getAddressByIdResponse.data.data.Email,
          companyName: getAddressByIdResponse.data.data.CompanyName,
          gstNumber: getAddressByIdResponse.data.data.GstNumber,
        })
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    getState();
    getAllAddress();
  }, []);
  return (
    <div className="order--container">
      <div className="order--header">
        <h2>
          {" "}
          <span className="pro--ham--icon" onClick={() => setMenu(true)}>
            <HamburgerIcon />
          </span>{" "}
          Address
        </h2>
      </div>

      <Flex direction="column" w={`100%`} pt={2}>
        <Flex>
          <div className="edit--profile--container">
            <div
              className="edit--p--header"
              onClick={() => {
                if (addressShow) {
                  setAddressShow(false);
                } else {
                  setAddressShow(true);
                }
              }}
            >
              <h3>
                {" "}
                <b>{type} Address</b>
              </h3>
              <h3>
                {addressShow ? (
                  <ChevronDownIcon onClick={() => setAddressShow(false)} />
                ) : (
                  <ChevronRightIcon onClick={() => setAddressShow(true)} />
                )}
              </h3>
            </div>
            <form
              className={`profile--form ${addressShow ? "" : "d-none"}`}
              onSubmit={(type==`Add`)?handleSubmit:editAddress}
            >
              <div className="edit--basic--info">
                <div style={{width:'100%'}}>
                <Input
                  // flex={1}
                  // minW={"210px"}
                  width={'100%'}
                  placeholder="Enter First Name"
                  // size="md"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onValueChange}
                  maxLength={60}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {formError.firstName && (
  <span style={{color:"red"}}>{formError.firstName}</span>
)}
                </div>
                <div style={{width:'100%'}}>
                <Input
                  // flex={1}
                  // minW={"210px"}
                  width={'100%'}
                  placeholder="Enter Last Name"
                  // size="md"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onValueChange}
                  maxLength={60}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {formError.lastName && (
  <span style={{color:"red"}}>{formError.lastName}</span>
)}
                </div>
              </div>

              <div className="edit--basic--info">
                <div style={{width:'100%'}}>
                <Input
                  flex={1}
                  // minW={"210px"}
                  placeholder="Enter Contact Number"
                  // size="md"
                  name="contact"
                  value={formData.contact}
                  onChange={onValueChange}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                    }
                }}
                  maxLength={10}
                />
                 {formError.contact && (
  <span style={{color:"red"}}>{formError.contact}</span>
)}
                </div>
                <div style={{width:'100%'}}>
                <Input
                  flex={1}
                  // minW={"210px"}
                  placeholder="Enter Street"
                  // size="md"
                  name="street"
                  value={formData.street}
                  onChange={onValueChange}
                  maxLength={60}
                />
                 {formError.street && (
  <span style={{color:"red"}}>{formError.street}</span>
)}
                </div>
              </div>
              <div className="edit--basic--info">
                <div style={{width:'100%'}}>
                <Select
                  flex={1}
                  // minW={"210px"}
                  // size="md"
                  name="stateId"
                  placeholder="Select State"
                  value={formData.stateId}
                  onChange={(e) => {
                    onValueChange(e);
                    getDistrict(e.target.value);
                  }}
                >
                  {State&&State.map((item, index) => {
                    return (
                      <option key={index} value={item.StateID}>
                        {item.Name}
                      </option>
                    );
                  })}
                </Select>
                {formError.stateId && (
  <span style={{color:"red"}}>{formError.stateId}</span>
)}
</div>
<div style={{width:'100%'}}>
                <Select
                  flex={1}
                  // minW={"210px"}
                  placeholder="Select District"
                  name="cityId"
                  // size="md"
                  value={formData.cityId}
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                >
                  {districts && districts.map((item, index) => {
                    return (
                      <option key={index} value={item.DistrictID}>
                        {item.Name}
                      </option>
                    );
                  })}
                </Select>
                {formError.cityId && (
  <span style={{color:"red"}}>{formError.cityId}</span>
)}
</div>
              </div>

              <div className="edit--basic--info">
                <div style={{width:'100%'}}>
                <Input
                  flex={1}
                  // minW={"210px"}
                  placeholder="Enter Pin Code"
                  // size="md"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={onValueChange}
                  maxLength={6}
                />
                 {formError.zipcode && (
  <span style={{color:"red"}}>{formError.zipcode}</span>
)}
</div>
<div style={{width:'100%'}}>
                <Input
                  flex={1}
                  // minW={"210px"}
                  placeholder="Enter your Email"
                  // size="md"
                  name="email"
                  value={formData.email}
                  onChange={onValueChange}
                  maxLength={60}
                />
                 {/* {formError.email && (
  <span style={{color:"red"}}>{formError.email}</span>
)} */}
</div>
              </div>
              <div className="edit--basic--info">
              <Input
                  flex={1}
                  // minW={"210px"}
                  style={{width:'100%'}}
                  placeholder="Enter Company Name"
                  size="md"
                  name="companyName"
                  value={formData.companyName}
                  onChange={onValueChange}
                  maxLength={60}
                />
              <Input
                  flex={1}
                  // minW={"210px"}
                  style={{width:'100%'}}
                  placeholder="Enter Gst"
                  size="md"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={onValueChange}
                  maxLength={15}
                />
                </div>

              <Flex justifyContent={"space-between"} gap={2} marginTop={1}>
                {disableButton ? <Button
                  colorScheme="green"
                  background={"#006C1E"}
                  color={"#fff"}
                  width={"100%"}
                  fontSize={"14px"}
                 
                >
{type} Address            
    </Button>
                :
                <Button
                  colorScheme="green"
                  background={"#006C1E"}
                  color={"#fff"}
                  width={"100%"}
                  fontSize={"14px"}
                  type="submit"
                >
                  {type} Address
                </Button>
}
              </Flex>
            </form>
          </div>
        </Flex>
        {/* </Flex> */}
        <Flex alignItems="center" justifyContent="start" width={`100%`}>
          <div className="add--address2">
            <h3> Your Addresses</h3>
            <div className="address--fields">
              {address&&address.map((row, index) => {
                return (
                  <Card>
                    <CardBody gap={1} display={"flex"} flexDirection={"column"} pb={0}>
                      <Text>
                        <span style={{ fontWeight: "600" }}>Name : </span>
                        {row.FirstName} {row.LastName}
                      </Text>
                      <Text>
                        <span style={{ fontWeight: "600" }}>Mobile : </span>
                        {row.Contact}
                      </Text>
                      <Text>
                        <span style={{ fontWeight: "600" }}>Address : </span>
                        {row.Street} ,{row?.CityID?.Name},{row?.StateID?.Name} (
                        {row?.ZipCode})
                      </Text>
                    </CardBody>
                    <CardFooter display={"flex"} width={"100%"} gap={4} pt={3}>
                      <Button
                        variant={"outline"}
                        colorScheme="green"
                        width={"100%"}
                        onClick={(e)=>{
                          e.preventDefault();
                          setType(`Edit`)
                          getAddressById(row.AddressID)
                        }}
                      >
                        Edit
                      </Button>
                      <Button colorScheme="red" width={"100%"}
                      onClick={(e)=>{
                        e.preventDefault();
                        deleteAddress(row.AddressID);
                      }}>
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default Address;
