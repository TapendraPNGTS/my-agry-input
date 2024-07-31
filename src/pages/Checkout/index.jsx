import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
  Heading,
  Text,
  Box,
  Button,
  Flex,
  Card,
  CardBody,
  Stack,
  Image,
  Radio,
  RadioGroup,
  useDisclosure,
  Input,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";
import AddressApi from "../../apis/address.api";
import PaymentApi from "../../apis/payment.api";
import CartApi from "../../apis/cart.api";
import OtherApi from "../../apis/other.api";
import numeral from "numeral";
import "./Checkout.css";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, resetCart } from "../../redux/redux-slice/cart.slice";
import { updateAllAddress } from "../../redux/redux-slice/address.slice";
import emptyCart from '../../assets/images/emptyCart.svg'
import cashDelivery from '../../assets/images/cash-delivery.svg';
import phonePay from '../../assets/images/phone-pay.svg';
import deliveryIcon from "../../assets/images/delivery-icon.svg";
import refundImg from "../../assets/images/refund-img.svg";
import supportImg from "../../assets/images/support-img.svg";
import CheckIcon from "../../assets/CheckCircle.svg";
import { ArrowForwardIcon, HamburgerIcon } from "@chakra-ui/icons";


import { useEffect } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { updateState } from "../../redux/redux-slice/state.slice";

const Checkout = () => {
  const dispatch = useDispatch();
  const addressApi = new AddressApi();
  const otherApi = new OtherApi();
  const cartApi = new CartApi();
  const paymentApi = new PaymentApi();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addresses = useSelector((state) => state.address.Address);
  const State = useSelector((state) => state.state.State);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [buyNow, setBuyNow] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const [cartId, setCartId] = useState("");
  const totalPrice = useSelector((state) => state.cart.TotalPrice);
  const GSTMain = useSelector((state) => state.cart.GSTMain);
  const navigate = useNavigate();
  const [type, setType] = useState(`Add`);
  const [districts, setDistricts] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const [disableButton, setDisableButton] = useState(false);

  const Cart = useSelector((state) => state.cart.Cart);

  // const removeItem = (ProductID, Price, Quantity) => {
  //   dispatch(removeCart({ ProductID, Price, Quantity }));
  // };

  const getAddress = useCallback(async () => {
    const getAddressResponse = await addressApi.getAllAddress();
    if (getAddressResponse && getAddressResponse.data.data) {
      dispatch(updateAllAddress(getAddressResponse.data.data));
    }
  });

  const handleAddress = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handlePayment = async (e) => {
    if (!paymentMode) {
      toast.error(`Please select an payment mode`);
    }
    if (paymentMode == `COD`) {
      const paymentResponse = await paymentApi.paymentCod({
        cartId,
        type: `User`,
      });

      if (paymentResponse && paymentResponse.data.code == 200) {
        // navigate(`/orderplaced/${paymentResponse.data.data.orderId}`);

        toast.success(`Your Order Succuesfully Complated`)
        dispatch(resetCart())
        onOpen();
      }
    } else if (paymentMode == "PhonePe") {
      const paymentResponse = await paymentApi.paymentPhonePe({
        cartId,
        type: `User`,
      });
      if (paymentResponse && paymentResponse.data.code == 200) {
        window.location.href = `${paymentResponse.data.data.data.instrumentResponse.redirectInfo.url}`;
        dispatch(resetCart())
      }
    }
  };
  const handlePaymentMode = async (e) => {
    setPaymentMode(e.target.value);
  };

  const handlProceedNow = async (e) => {
    try {
      if (!selectedAddress) {
        toast.error(`Please select an address`);
        return;
      } else {
        const cartResponse = await cartApi.addCart({
          addressId: selectedAddress,
          cart: Cart,
        });

        if (cartResponse && cartResponse.data.code == 200) {
          setCartId(cartResponse.data.cartId);
          setBuyNow(true);
        }
        else {
          toast.error(cartResponse.data.message)
        }
      }
    } catch (error) {
      toast.error(`Something Went Wrong `);
    }
  };

  //modal functions

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
    } catch (error) { }
  });

  const getDistrict = async (stateId) => {
    try {
      const getDistrictResponse = await otherApi.getDistrict({ stateId });
      if (getDistrictResponse && getDistrictResponse.data.data) {
        setDistricts(getDistrictResponse.data.data);
      }
    } catch (error) { }
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
    companyName: "",
    email: "",
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
    companyName: "",
    email: "",
    gstNumber: "",
  });

  const editAddress = async (e) => {
    setDisableButton(true);
    try {
      e.preventDefault();
      const editResponse = await addressApi.editAddress(formData);
      if (editResponse && editResponse.data.code == 200) {
        toast.success(`Edited successfully`);
        getAllAddress();
        setType(`Add`);
        // console.log("Editing address...");
        setDisableButton(false)
      }
    } catch (error) {
      console.error("Error in editAddress:", error);
      toast.error(error.message);
      setDisableButton(false)
    }
  };

  const phoneNumberRegex = /^\d{10}$/;
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    let valid = true;
    const errors = {
      firstName: "",
      lastName: "",
      contact: "",
      street: "",
      zipcode: "",
      cityId: "",
      stateId: "",
      addressId: "",
      companyName: "",
      email: ""

    };

    if (formData.firstName === "") {
      errors.firstName = "Please enter your first name!";
      valid = false;
    }
    if (formData.lastName === "") {
      errors.lastName = "Please enter your last name!";
      valid = false;
    }

    //   if (formData.email === "") {
    //     errors.email = "Please enter email!";
    //     valid = false;
    // } else {

    //     if (!emailRegex.test(formData.email)) {
    //         errors.email = "Please enter a valid email address!";
    //         valid = false;
    //     }
    // }
    if (formData.contact === "") {
      errors.contact = "Please enter your contact number!";
      valid = false;
    } else if (!phoneNumberRegex.test(formData.contact)) {
      errors.contact = "Please enter a valid 10-digit phone number!";
      valid = false;
    }
    if (formData.street === "") {
      errors.street = "Please enter your street!";
      valid = false;
    }
    if (formData.zipcode === "") {
      errors.zipcode = "Please enter your zipcode!";
      valid = false;
    }
    else if (formData.zipcode.length !== 6) {
      errors.zipcode = "Please enter a valid 6-digit zip code!";
      valid = false;
    }
    if (formData.cityId === "") {
      errors.cityId = "Please select your city!";
      valid = false;
    }
    if (formData.stateId === "") {
      errors.stateId = "Please select your state!";
      valid = false;
    }

    setformError(errors);
    return valid;
  };



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
  
      const isValid = validateForm();


      if (isValid) {
        setDisableButton(true);
        const response = await addressApi.addAddress(formData);
        if (response && response.data.data) {
          toast.success(`Address added successfully`);
          getAllAddress();
          setFormData({
            firstName: "",
            lastName: "",
            contact: "",
            street: "",
            zipcode: "",
            cityId: "",
            stateId: "",
            companyName: "",
            email: "",
            gstNumber: ""
          });
          onClose();
          setIsShow(true);
          setDisableButton(false)
        }
        setTimeout(() => {
          setIsShow(false);
          onClose();
          setDisableButton(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(error.message);
      setDisableButton(false);
    }
  };


  useEffect(() => {

    getAddress();
    getState();
    getAllAddress();
  }, []);

  const orderPlacedTime = new Date();

  return (
    <>
      <div>
        {/* {Cart && Cart.length > 0 ? <> */}
        <div className="home-parent">
          <div className="layout-container home-shop-brand">
            <Flex wrap={"wrap"} gap={6} marginTop={6}>
              <Flex
                direction={`column`}
                flex={1}
                // minWidth={`60%`}
                minWidth={{ base: "100%", lg: `60%` }}
                cursor={`pointer`}
              >


                {/* ----new checkout ui---- */}
                <Box>
                  <Box
                    fontSize={'20px'}
                    fontWeight={'bold'}
                    bg={'#19884A'}
                    textColor={'white'}
                    mt={4}
                    // border={'1px solid #E4E7E9'}
                    p={'2'}
                  >
                    Delivery Address
                  </Box>
                  {/* select Address for delivery */}
                  <Box
                    // mt={2} p={2} boxShadow={'1px'}
                    border={'1px solid #E4E7E9'}
                  >
                    <RadioGroup>
                      <Stack
                        spacing={1}
                        direction="column"
                        onChange={handleAddress}
                      >
                        {addresses && addresses.map((row, index) => {
                          return (
                            <>
                              <Flex
                                // gap={2}
                                direction={`row`}
                                flex={1}
                                minWidth={`100%`}
                                marginTop={`3`}
                                mb={-4}
                                p={2}
                                key={index}

                              >
                                <Flex
                                  flex={1}
                                  justifyContent={`space-between`}
                                >
                                  <Flex>
                                    <Radio
                                      colorScheme="green"
                                      value={row.AddressID}
                                    >
                                      <Flex
                                        gap={2}
                                        direction={`row`}
                                        flex={1}
                                        minWidth={`100%`}
                                        marginTop={`3`}
                                      >
                                        <Flex
                                          direction={`column`}
                                          alignItems={`start`}
                                          width={{ base: "50px", md: `80px` }}
                                          height={`100%`}
                                        >
                                          <Text as="b" fontSize={{ base: "15px", md: `16px` }}>Name:</Text>
                                        </Flex>
                                        <Flex
                                          direction={`column`}
                                          flex={1}
                                          alignItems={`flex-start`}
                                          width={{ base: '100%', md: 'auto' }}
                                        >
                                          <Text
                                            fontSize={`15px`}
                                            fontWeight={`400`}
                                            width={'100%'}
                                          >
                                            {row.FirstName +
                                              " " +
                                              row.LastName}
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Flex
                                        gap={2}
                                        direction={`row`}
                                        flex={1}
                                        minWidth={`100%`}
                                        marginTop={`3`}
                                      >
                                        <Flex
                                          direction={`column`}
                                          alignItems={`start`}
                                          width={{ base: "65px", md: `80px` }}
                                          height={`100%`}
                                        >
                                          <Text as="b" fontSize={{ base: "15px", md: `16px` }}>Address:</Text>
                                        </Flex>
                                        <Flex
                                          direction={`column`}
                                          flex={1}
                                          width={{ base: '50px', md: 'auto' }}
                                          alignItems={`flex-start`}

                                        >
                                          <Text
                                            fontSize={`15px`}
                                            fontWeight={`400`}
                                            width={'100%'}
                                          >
                                            {row.Street +
                                              "," +
                                              row.CityID?.Name +
                                              "," +
                                              row.StateID?.Name +
                                              "," +
                                              row.ZipCode}
                                          </Text>
                                        </Flex>
                                      </Flex>

                                      <Flex
                                        gap={2}
                                        direction={`row`}
                                        flex={1}
                                        minWidth={`100%`}
                                        marginTop={`3`}
                                      >
                                        <Flex
                                          direction={`column`}
                                          alignItems={`start`}
                                          width={{ base: "60px", md: `80px` }}
                                          height={`100%`}
                                        >
                                          <Text as="b" fontSize={{ base: "15px", md: `16px` }}>Mobile:</Text>
                                        </Flex>
                                        <Flex
                                          direction={`column`}
                                          flex={1}
                                          alignItems={`flex-start`}
                                        >
                                          <Text
                                            fontSize={`15px`}
                                            fontWeight={`400`}
                                          >
                                            {row.Contact}
                                          </Text>
                                        </Flex>
                                      </Flex>
                                    </Radio>
                                  </Flex>
                                  <Flex flexDir={'column'}>
                                    <Box
                                      p={2}
                                      mt={'10'}
                                      fontWeight={'semibold'}
                                      color={`blue`}
                                      textAlign={'center'} alignItems={'center'} justifyContent={'center'}
                                      onClick={() => {
                                        navigate(`/settings/address`);
                                      }}
                                    >
                                      Edit
                                      <EditIcon
                                        ml={2}
                                        // mx={2}
                                        mt={-1}

                                      />
                                    </Box>

                                  </Flex>
                                </Flex>
                              </Flex>

                              <Flex
                                marginTop={`5`}
                                marginBottom={`2`}
                              // borderBottom={`1.5px solid #E2E8F0`}
                              />
                            </>
                          );
                        })}
                      </Stack>
                    </RadioGroup>
                  </Box>
                </Box>

                <Accordion  allowMultiple>
                  <AccordionItem >
                  {({ isExpanded }) => (
      <>
                    <h2>
                      <AccordionButton p={0} >
                        <Flex bg={'#19884A'}
                          w={'full'} flexDir={'row'}
                          alignItems={'center'}
                          fontSize={'20px'}
                          fontWeight={'bold'}
                          textColor={'white'}>
                          <Text
                            textAlign={'start'}
                            // mt={4}
                            // border={'1px solid #E4E7E9'}
                            p={'2'}
                          >
                            Add New Address
                          </Text>
                          
                          {isExpanded ? (
              <CiCircleMinus fontSize='30px' />
            ) : (
              <CiCirclePlus fontSize={'30px'} />
            )}
                        </Flex>

                      </AccordionButton>
                    </h2>
                    <AccordionPanel p={0} pb={4} >
                      <Box p={2} border={'1px solid #E4E7E9'}>
                        <Flex justifyContent={'space-between'} alignItems={'center'}>
                          <Text fontSize={'24px'} fontWeight={'bold'}>Billing Information</Text>
                          {/* <Text color="#19884A">Choose another address</Text> */}
                        </Flex>
                        {/* <Flex gap={3} width={'100%'} justifyContent={'space-between'} mt={5}> */}
                        <form
                          onSubmit={
                            type == `Add` ? handleSubmit : editAddress
                          }
                        >
                          <Flex flexDirection={{ base: "column", md: 'row', lg: 'row' }} width={'100%'} gap={{ base: 1, md: 3 }} mt={5}>
                            <div className="basic-inputs">
                              <label className="checkout-labels">First name</label>
                              {/* <Flex gap={3} width={'100%'} flexDirection={'row'}> */}
                              <Input
                                id="firstName"
                                flex={1}
                                // minW={"100%"}
                                placeholder="Enter First Name"
                                size="md"
                                name="firstName"
                                value={formData.firstName}
                                onChange={onValueChange}
                                width={'100%'}
                                bgColor={'white'}
                                mt={2}
                                maxLength={60}
                                onKeyPress={(e) => {
                                  if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {formError.firstName && (
                                <span style={{ color: "red" }}>
                                  {formError.firstName}
                                </span>
                              )}
                            </div>
                            <div className="basic-inputs">
                              <label className="checkout-labels">Last name</label>
                              <Input
                                flex={1}
                                // minW={"100%"}
                                placeholder="Enter Last Name"
                                size="md"
                                name="lastName"
                                value={formData.lastName}
                                onChange={onValueChange}
                                width={'100%'}
                                bgColor={'white'}
                                mt={2}
                                maxLength={60}
                                onKeyPress={(e) => {
                                  if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {formError.lastName && (
                                <span style={{ color: "red" }}>
                                  {formError.lastName}
                                </span>
                              )}
                              {/* </Flex> */}
                            </div>
                          </Flex>
                          <Flex gap={{ base: 1, md: 3 }} flexDirection={{ base: "column", md: 'row', lg: 'row' }} width={'100%'}>
                            <div className="basic-inputs">
                              <label className="checkout-labels">Company Name <span style={{ color: "#929FA5" }}>(Optional)</span></label>
                              <Input
                                flex={1}
                                // minW={"100%"}
                                placeholder="Enter Company Name"
                                size="md"
                                name="companyName"
                                value={formData.companyName}
                                onChange={onValueChange}
                                width={'100%'}
                                bgColor={'white'}
                                mt={2}
                                maxLength={60}
                              />
                              {formError.companyName && (
                                <span style={{ color: "red" }}>
                                  {formError.companyName}
                                </span>
                              )}
                            </div>

                            <div className="basic-inputs">
                              <label className="checkout-labels">Street</label>
                              <Input
                                flex={1}
                                marginTop={0}
                                minW={"210px"}
                                placeholder="Enter Street"
                                size="md"
                                name="street"
                                value={formData.street}
                                onChange={onValueChange}
                                mt={2}
                                maxLength={60}
                              />
                              {formError.street && (
                                <span style={{ color: "red" }}>
                                  {formError.street}
                                </span>
                              )}
                            </div>
                          </Flex>



                          <Flex gap={{ base: 1, md: 3 }} flexDirection={{ base: "column", md: 'row', lg: 'row' }} width={'100%'}>


                            <div className="basic-inputs">
                              <label className="checkout-labels">Region/State</label>
                              <Select
                                flex={1}
                                minW={"210px"}
                                size="md"
                                mt={2}
                                name="stateId"
                                placeholder="Select State"
                                value={formData.stateId}
                                onChange={(e) => {
                                  onValueChange(e);
                                  getDistrict(e.target.value);
                                }}
                                bgColor={'white'}
                                width={'100%'}
                              >
                                {State && State.map((item, index) => {
                                  return (
                                    <option key={index} value={item.StateID}>
                                      {item.Name}
                                    </option>
                                  );
                                })}
                              </Select>

                              {formError.stateId && (
                                <p style={{ color: "red" }}>
                                  {formError.stateId}
                                </p>
                              )}
                            </div>
                            <div className="basic-inputs">
                              <label className="checkout-labels">District</label>
                              <Select
                                flex={1}
                                mt={2}
                                minW={"210px"}
                                placeholder="Select district"
                                name="cityId"
                                size="md"
                                value={formData.cityId}
                                onChange={(e) => {
                                  onValueChange(e);
                                }}
                                bgColor={'white'}
                                width={'100%'}
                              >
                                {districts && districts.map((item, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={item.DistrictID}
                                    >
                                      {item.Name}
                                    </option>
                                  );
                                })}
                              </Select>
                              {formError.cityId && (
                                <p style={{ color: "red" }}>
                                  {formError.cityId}
                                </p>
                              )}
                            </div>

                          </Flex>

                          <Flex width={'100%'} flexDirection={{ base: "column", md: 'row', lg: 'row' }} gap={{ base: 1, md: 3 }}>
                            <div className="basic-inputs">
                              <label className="checkout-labels">Email <span style={{ color: "#929FA5" }}>(optional)</span></label>
                              <Input
                                flex={1}
                                // minW={"100%"}
                                mt={2}
                                marginBottom={0}
                                placeholder="Enter Your Email"
                                size="md"
                                name="email"
                                value={formData.email}
                                onChange={onValueChange}
                                width={'100%'}
                                bgColor={'white'}
                                maxLength={60}
                              />
                              {/* {formError.email && (
                                <span style={{ color: "red" }}>
                                  {formError.email}
                                </span>
                              )} */}
                            </div>
                            <div className="basic-inputs">
                              <label className="checkout-labels">Phone Number</label>
                              <Input
                                flex={1}
                                mt={2}
                                // minW={"210px"}
                                marginBottom={0}
                                placeholder="Enter Phone Number"
                                size="md"
                                min={0}
                                max={10}
                                name="contact"
                                value={formData.contact}
                                onChange={onValueChange}
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                width={'100%'}
                                bgColor={'white'}
                                maxLength={10}
                              />
                              {formError.contact && (
                                <span style={{ color: "red" }}>
                                  {formError.contact}
                                </span>
                              )}
                            </div>
                          </Flex>

                          <Flex gap={{ base: 1, md: 3 }} flexDirection={{ base: "column", md: 'row', lg: 'row' }} width={'100%'}>
                            <div className="basic-inputs">
                              <label className="checkout-labels">Gst Number <span style={{ color: "#929FA5" }}>(Optional)</span></label>
                              <Input
                                flex={1}
                                // minW={"100%"}
                                placeholder="Enter Gst"
                                size="md"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={onValueChange}
                                width={'100%'}
                                bgColor={'white'}
                                mt={2}
                                maxLength={60}
                              />

                            </div>
                            <div className="basic-inputs">
                              <label className="checkout-labels">Zip Code</label>
                              <Input
                                flex={1}
                                mt={2}
                                minW={"210px"}
                                placeholder="Enter Pin Code"
                                size="md"
                                name="zipcode"
                                value={formData.zipcode}
                                onChange={onValueChange}
                                bgColor={'white'}
                                width={'100%'}
                                maxLength={6}
                              />
                              {formError.zipcode && (
                                <span style={{ color: "red" }}>
                                  {formError.zipcode}
                                </span>
                              )}
                            </div>
                          </Flex>
                          <Flex
                            justifyContent={"center"}
                            gap={3}
                            marginTop={4}
                          >
                            {disableButton ? <Button
                              colorScheme="green"
                              background={"#006C1E"}
                              color={"#fff"}
                              // width={"100%"}
                              fontSize={"14px"}


                            >
                              Address
                            </Button> :
                              <Button
                                colorScheme="green"
                                background={"#006C1E"}
                                color={"#fff"}
                                // width={"100%"}
                                fontSize={"14px"}
                                type="submit"

                              >
                                {type} Address
                              </Button>
                            }
                          </Flex>
                        </form>



                      </Box>
                    </AccordionPanel>
                    </>
    )}
                  </AccordionItem>


                </Accordion>


              </Flex>

              <Flex mt={4} direction={`column`} minWidth={{ base: "100%", lg: `30%` }}>
                <Card width={`100%`} shadow={`0`} border={`1px solid #E2E8F0`}>
                  <CardBody>
                    <Box>
                      <Heading
                        as="h4"
                        size="md"
                        fontWeight="bold"
                        textAlign={`left`}
                      >
                        Order Summary
                      </Heading>
                      <Flex
                        marginTop={`5`}
                        marginBottom={`5`}
                        borderBottom={`1.5px solid #E2E8F0`}
                      />
                      <Flex>
                        <Heading
                          size={"sm"}
                          pl={2}
                          fontWeight={500}
                          fontFamily={``}
                        >
                          Selected Item
                        </Heading>

                        <Heading
                          size={"sm"}
                          marginLeft={`auto`}
                          pr={2}
                          fontFamily={``}
                          fontWeight={400}
                        >
                          {Cart.length} Items
                        </Heading>
                      </Flex>
                      <Flex
                        marginTop={`5`}
                        marginBottom={`2`}
                        borderBottom={`1.5px solid #E2E8F0`}
                      />
                      <Flex>
                        <Heading
                          size={"sm"}
                          pl={2}
                          fontWeight={500}
                          fontFamily={``}
                        >
                          Subtotal
                        </Heading>

                        <Heading
                          size={"sm"}
                          marginLeft={`auto`}
                          pr={2}
                          fontFamily={``}
                          fontWeight={400}
                        >
                          ₹{numeral(totalPrice).format("00,00")}
                        </Heading>
                      </Flex>
                      <Flex
                        marginTop={`5`}
                        marginBottom={`2`}
                        borderBottom={`1.5px solid #E2E8F0`}
                      />
                      <Flex mt={2}>
                        <Heading
                          size={"sm"}
                          pl={2}
                          fontWeight={500}
                          fontFamily={``}
                        >
                          GST and Fees
                        </Heading>

                        <Heading
                          size={"sm"}
                          marginLeft={`auto`}
                          pr={2}
                          fontFamily={``}
                          fontWeight={400}
                        >
                          ₹{numeral(GSTMain).format("00,00")}
                        </Heading>
                      </Flex>
                      <Flex
                        marginTop={`5`}
                        marginBottom={`2`}
                        borderBottom={`1.5px solid #E2E8F0`}
                      />

                      <Flex>
                        <Heading
                          size={"sm"}
                          pl={2}
                          fontWeight={500}
                          fontFamily={``}
                        >
                          Total
                        </Heading>

                        <Heading
                          size={"sm"}
                          marginLeft={`auto`}
                          pr={2}
                          fontFamily={``}
                          fontWeight={400}
                        >
                          ₹
                          {numeral(
                            parseFloat(totalPrice) +
                            parseFloat(GSTMain)
                          ).format("00,00")}
                        </Heading>
                      </Flex>
                      {buyNow ? (
                        <>
                          <Flex
                            marginTop={`5`}
                            marginBottom={`2`}
                            borderBottom={`1.5px solid #E2E8F0`}
                          />
                          <Heading
                            as="h5"
                            size="md"
                            fontWeight="bold"
                            textAlign={`left`}
                          >
                            Payment Mode
                          </Heading>
                          <RadioGroup>
                            <Stack
                              spacing={1}
                              direction="column"
                              onChange={handlePaymentMode}
                            >
                              <Flex
                                gap={2}
                                direction={`column`}
                                flex={1}
                                minWidth={`100%`}
                                marginTop={`3`}
                              >
                                <Flex>
                                  <Radio colorScheme="green" value={`PhonePe`}>
                                    <Flex alignItems={'center'}>
                                      <Image mr={2} width={'20px'} src={phonePay} />
                                      <Text> Phone Pe</Text>
                                    </Flex>
                                  </Radio>
                                </Flex>
                                <Flex>
                                  <Radio colorScheme="green" value={`COD`}>
                                    <Flex alignItems={'center'}>
                                      <Image mr={2} width={'20px'} src={cashDelivery} />
                                      <Text>Cash on delivery</Text>
                                    </Flex>
                                  </Radio>
                                </Flex>
                              </Flex>
                            </Stack>
                          </RadioGroup>
                          <Flex
                            marginTop={`5`}
                            marginBottom={`2`}
                            borderBottom={`1.5px solid #E2E8F0`}
                          />
                        </>
                      ) : (
                        <></>
                      )}

                      {buyNow ? (
                        <Button
                          marginTop={`5`}
                          width={`100%`}
                          borderRadius={`30px`}
                          colorScheme="green"
                          background={"#006C1E"}
                          size="lg"
                          leftIcon={<FaShoppingCart />} // Add the icon here
                          onClick={handlePayment}
                        >
                          Buy Now
                        </Button>
                      ) : Cart.length > 0 ? (
                        <Button
                          marginTop={`5`}
                          width={`100%`}
                          borderRadius={`30px`}
                          colorScheme="green"
                          background={"#006C1E"}
                          size="lg"
                          leftIcon={<FaShoppingCart />}
                          onClick={handlProceedNow}
                        >
                          Proceed Now
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Box>
                    <Box></Box>
                  </CardBody>
                </Card>
              </Flex>
            </Flex>
          </div>
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
        {/* </> :
          <Box mt={'10'} h={{base:"80vh",sm:"80vh"}}>
            <Image  w={'md'} m={'auto'} src={emptyCart} />

          </Box>} */}


        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody p={5} pb={10}>

              <Flex justifyContent={'center'}>
                <img src={CheckIcon} alt="" />
              </Flex>
              <Text fontSize={"xl"} fontWeight={600} textAlign={'center'}>
                Your order is successfully placed
              </Text>
              <Text mt={3} color={'black'} textAlign={'center'} fontSize={"md"} fontWeight={400}>
                Order Placed on: {orderPlacedTime.toLocaleString()}
              </Text>
              <Flex
                alignItems={"center"}
                gap={4}
                flexDirection={'row'}
                width={"100%"}
                justifyContent={"center"}
                mt={5}
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
                  onClick={(e) => {
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
                  onClick={(e) => {
                    navigate("/settings/orders")
                  }}
                >
                  View Order <ArrowForwardIcon boxSize={6} />
                </Button>
              </Flex>


            </ModalBody>


          </ModalContent>
        </Modal>

      </div>
    </>
  );
};
export default Checkout;
