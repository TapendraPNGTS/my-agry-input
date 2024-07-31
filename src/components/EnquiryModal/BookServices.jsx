
import React, { useState, useCallback, useEffect } from "react";
import {
  Flex,
  Button,
  Text,
  Modal,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Select,
  Box,
  Input,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import Services from "../../apis/services.api";
import { useRef } from "react";


const BookServicesForm = ({ onOpen, onClose, isOpen, serviceName, serviceId, Basicprice, servicesType, serviceGst }) => {
  const serviceAPI = new Services();
  const [gst, SetGst] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [SHORTCODE, setSHORTCODE] = useState("");
  const [fullName, setfullName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [previousCrop, setPreviousCrop] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [numbersOfAcre, setNumbersOfAcre] = useState(1);
  const [price, setPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [serviceField, SetServiceField] = useState([]);
  const [serviceFieldInput, SetServiceFieldInput] = useState(null);
  const [serviceType, SetserviceType] = useState([]);
  const [selectedTypeValue, SetSelectedTypeValue] = useState(null);
  const [selectedPackageValue, setSelectedPackageValue] = useState(null);
  const [packageId, SetPackageId] = useState([]);
  const serviceRef = useRef([]);

  const [fullNameError, setFullNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [contactError, setContactError] = useState('');
  const [dateError, setDateError] = useState('');
  const [cropError, setCropError] = useState('');
  const [acreError, setAcreError] = useState('');
  const [serviceFieldError, SetServiceFieldError] = useState([]);

console.log(serviceName,"servicename");
 
  const contactRegex = /^\d{10}$/;
 

  const addServicesPurchase = useCallback(async () => {
    setFullNameError('');
    setAddressError('');
    setContactError('');
    setAcreError('');
    setDateError('');
    setCropError('');
    SetServiceFieldError('');

  if (fullName.trim() === "") {
    setFullNameError('Please enter your name!');
    return;
  }

  

   if (serviceFieldInput === "") {
    SetServiceFieldError('This field is required!');
    return;
  }
  

  if (contact.trim() === "") {
    setContactError('Please enter your contact number!');
    return;
  } 

  if (!contactRegex.test(contact)) {
    setContactError('Please enter a valid contact number!');
    return;
  }
 
  if (numbersOfAcre === "") {
    setAcreError('This field is required!');
    return;
  }
  if (serviceField.length > 0) {
    if (!serviceFieldInput) {
      toast.error('Please Select Service field name!')
      return;

    }
  }
    if (serviceType.length > 0) {
      if (!selectedTypeValue) {
        toast.error('Please Select Service Type')
        return;

      }
      if (packageId.length > 0) {
        if (!selectedPackageValue) {
          toast.error('Please Select Service Package')
          return;
        }
      }

      // if (numbersOfAcre === "") {
      //   toast.error('Please Enter Acre');
      //   return;
      // }

    }
    if (dateError.trim() === "") {
      setDateError('Please select date!');
      return;
    }
    

    const productResponse = await serviceAPI.getservicePurchase({
      serviceId,
      typeId: selectedTypeValue,
      packageId: selectedPackageValue,
      // address: address,
      contact: contact,
      checkDate: selectedDate,
      acre: numbersOfAcre,
      name: fullName,
      // crop: previousCrop,
      serviceType: servicesType,
      fieldID: serviceFieldInput,
    });

    if (productResponse && productResponse.data.code == 200) {
      window.location.href = `${productResponse.data.data.data.instrumentResponse.redirectInfo.url}`;
    }
  });


  const onBookClick = () => {

    if (selectedPackage === "300" || selectedPackage === "360") {
      setSHORTCODE(SHORTCODE + "M4")
    } else if (selectedPackage === "430" || selectedPackage === "522") {
      setSHORTCODE(SHORTCODE + "M6")
    } else if (selectedPackage === "755" || selectedPackage === "620") {
      setSHORTCODE(SHORTCODE + "M9")
    } else if (selectedPackage === "985" || selectedPackage === "800") {
      setSHORTCODE(SHORTCODE + "Y1")
    }
    addServicesPurchase();

  };

  const ServicesApi = new Services();

  const GetFields = useCallback(async () => {
    try {
      const GetFieldResponse = await ServicesApi.getFields(
        { serviceId }
      );
      if (GetFieldResponse && GetFieldResponse.data.data) {
        SetServiceField(GetFieldResponse.data.data)
      }
    } catch (error) { }
  });

  const GetServiceType = useCallback(async () => {
    try {
      const GetServiceTypeResponse = await ServicesApi.getServiceType(
        { serviceId }
      );
      if (GetServiceTypeResponse && GetServiceTypeResponse.data.data) {
        SetserviceType(GetServiceTypeResponse.data.data)
        // setIsLoading(false);

      }
    } catch (error) { }
  });
  const GetServicePackage = async (typeId) => {
    try {
      const GetServicePackageResponse = await ServicesApi.GetServicePackage({
        serviceId,
        typeId
      });
      if (GetServicePackageResponse && GetServicePackageResponse.data.data) {
        SetPackageId(GetServicePackageResponse.data.data);
        // setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GetServiceType()
    GetFields();
  }, [])
  useEffect(() => {
    if (Basicprice) {
      setPrice(Basicprice);
      setFinalPrice(Basicprice);
    }

  }, [Basicprice])

  const handleTypePrice = (e) => {
    const type = e.target.value;
    const serviceDetail = serviceType.find((service) => service.typeId === type);

    if (serviceDetail) {
      setPrice(serviceDetail.price)
      if (numbersOfAcre) {
        setFinalPrice(parseFloat(numbersOfAcre * serviceDetail.price).toFixed(0))
      } else {
        setFinalPrice(serviceDetail.price);
      }
    }
  }

  const handlePackagePrice = (e) => {
    const servicepackage = e.target.value;
    const serviceDetail = packageId.find((service) => service.packageId === servicepackage);
    if (serviceDetail) {
      setPrice(serviceDetail.price)
      if (numbersOfAcre) {
        setFinalPrice(numbersOfAcre * serviceDetail.price)
      } else {
        setFinalPrice(serviceDetail.price);

      }
    }
  }
  const discountPrice = (number) => {
    if (number > 9) {
      if (number >= 9 && number < 15) {
        return 5;
      } else if (number >= 15 && number < 20) {
        return 8;
      } else if (number >= 20 && number < 25) {
        return 12;
      } else if (number >= 25) {
        return 15;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const handPriceOnAcresChange = (e) => {
    const acre = e.target.value;
    const Isservice = serviceType.length != 0
    const discountPercent = discountPrice(acre);
    if (acre) {
      if (Isservice) {
        if (discountPercent) {
          const discountedPrice = (price * acre * discountPercent) / 100;
          setFinalPrice(acre * price - discountedPrice)
        }
        else {
          setFinalPrice(acre * price);
        }
      }
      else {
        setFinalPrice(acre * price);
      }
    } else {
      if (Isservice) {
        if (discountPercent) {
          const discountedPrice = (price * discountPercent) / 100;
          setFinalPrice(price - discountedPrice)
        }
        else {
          setFinalPrice(price);
        }
      }
      else {
        setFinalPrice(price);
      }
    }

  };
  console.log("serviceField",serviceField);

  var GST = (parseFloat((finalPrice * parseFloat(serviceGst/100)).toFixed(0)));

  const handleContactChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^\d]/g, '');
      const validValue = sanitizedValue.charAt(0) >= '6' && sanitizedValue.charAt(0) <= '9'
      ? sanitizedValue.substr(0, 10)
      : '';
    setContact(validValue);
  };

  return (
    <>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"xl"}      
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent maxH={'530'} overflowY={'scroll'} marginTop={28} marginBottom={5}>
          <ModalHeader>
            <Flex direction={"column"}>
              <Text fontSize={"lg"} fontWeight={"600"}>
                {" "}
                ⪼ Complete Your Booking Information ⪻
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap={"10px"} justifyContent={"center"}>
              <Text fontSize={"md"} fontWeight={"600"}>
                Name
              </Text>
              <Input
                placeholder="Enter Here"
                name="fullname"
                fontSize={"md"}
                fontWeight={"400"}
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
                maxLength={60}
              />
               {fullNameError && <Text color="red">{fullNameError}</Text>}
              <Text fontSize={"md"} fontWeight={"600"}>
                {" "}
                Start of service
              </Text>
              <Input
                type="date"
                name="date"
                fontSize={"md"}
                fontWeight={"400"}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}

              />
               {dateError && <Text color="red">{dateError}</Text>}
              {/* <Text fontSize={"md"} fontWeight={"600"}>
                Type of Crop
              </Text>
              <Input
                placeholder="Enter Here"
                
                fontSize={"md"}
                fontWeight={"400"}
                name="address"
                value={previousCrop}
                onChange={(e) => setPreviousCrop(e.target.value)}
                maxLength={80}
              />
               {cropError && <Text color="red">{cropError}</Text>}
              <Text fontSize={"md"} fontWeight={"600"}>
                {" "}
                Address{" "}
              </Text>
              <Input
                placeholder="Enter Here"
                
                fontSize={"md"}
                fontWeight={"400"}
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={120}
              />
              {addressError && <Text color="red">{addressError}</Text>} */}
              <Text fontSize={"md"} fontWeight={"600"}>
                {" "}
                Contact Number{" "}
              </Text>
              <Input
                placeholder="Enter Here"
                
                fontSize={"md"}
                fontWeight={"400"}
                name="address"
                value={contact}
                maxLength={10}
                // onChange={(e) => setContact(e.target.value)}
                onChange={(e) => handleContactChange(e)}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                  }
              }}
              />
               {contactError && <Text color="red">{contactError}</Text>}

              {/* select fields */}

                <Text fontSize={"md"} fontWeight={"600"}>
              Select Field
              </Text>
              <Select
                      required
                      value={serviceFieldInput}
                      ref={serviceRef}
                      onChange={(e) => {
                        SetServiceFieldInput(e.target.value)}}
                    >
                      <option >Select field name</option>
                      {serviceField.map((value, index) => (
                        <option key={index} value={value.fieldID}>
                          {value.fieldName}
                        </option>
                      ))}
                    </Select>
              {serviceFieldError && <Text color="red">{serviceFieldError}</Text>}

 {/* select fields  type */}

              {
                serviceType.length != 0 ?
                  <Flex direction={"column"}>
                    <Text fontSize={"md"} fontWeight={"600"}>
                      {" "}
                      Select Field Type{" "}
                    </Text>
                    <Select
                      required
                      value={selectedTypeValue}
                      ref={serviceRef}
                      onChange={(e) => {
                        SetSelectedTypeValue(e.target.value)
                        handleTypePrice(e);
                        GetServicePackage(e.target.value);
                      }}
                    >
                      <option >Select Field Type</option>
                      {serviceType.map((value, index) => (
                        <option key={index} value={value.typeId}>
                          {value.name}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                  : <></>}
              {packageId.length != 0 ?
                <Flex direction={"column"}>
                  <Text fontSize={"md"} fontWeight={"600"}>
                    {" "}
                    Select Package{" "}
                  </Text>
                  <Select
                    required
                    ref={serviceRef}
                    value={selectedPackageValue}
                    onChange={(e) => {
                      setSelectedPackageValue(e.target.value);
                      handlePackagePrice(e);

                    }}
                  >
                    <option >Select Package Type</option>
                    {packageId.map((value,index) => (
                      <option key={index} value={value.packageId}>
                        {value.name}
                      </option>
                    ))}
                  </Select>
                </Flex>

                : <></>}

                
              <Text fontSize={"md"} fontWeight={"600"}>
               
                {serviceName == "Soil Health-Satellite" ||
              serviceName == "Soil Health-Spectroscopy" ?
                "Number of Sample" : " Number of Acre"}
              </Text>
              <Input
                type="number"
                placeholder="Enter Here"
                value={numbersOfAcre}
                name="address"
                ref={serviceRef}
                fontSize={"md"}
                fontWeight={"640000"}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  if (/^[1-9]\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                    setNumbersOfAcre(inputValue);
                    handPriceOnAcresChange(e);
                  }
                }
              }
              />
             
               {acreError && <Text color="red">{acreError}</Text>}
              <Text
                fontSize={"sm"}
                color={"green"}
                fontWeight={"600"}
                marginEnd={0}
              >
                Price ₹ {finalPrice} <br />
                GST {" "} ₹ {GST}
              </Text>
              <Text
                fontSize={"sm"}
                color={"green"}
                fontWeight={"600"}
                marginEnd={0}
              >
                Total ₹ {parseFloat(finalPrice) + parseFloat(GST)} you need pay.{" "}
              </Text>

              {/* <Text
                fontSize={"sm"}
                color={"red"}
                fontWeight={"600"}
                marginEnd={0}
              > */}
                {/* <b fontSize={'25px'}>Note :-</b> You have to pay only {`${packageId.length != 0 ? "100" : "50"}%`} amount , the remaining balance will be collected by our representative. */}
              {/* </Text> */}



            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              variant="outline"
              width={"100%"}
              onClick={onBookClick}
            >
              Book now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};

export default BookServicesForm;
