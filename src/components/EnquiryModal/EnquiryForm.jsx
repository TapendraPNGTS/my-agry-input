import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Stack,
  Heading,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  Skeleton,
  SkeletonText,
  Box
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductApi from "../../apis/product.api";
import { useToaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Services from "../../apis/services.api";
// import CategoryCard from "../CategoryCard/Skeleton";

export const EnquireForm = ({ isOpen, onOpen, onClose, serviceName, servicesType }) => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [enquiry, setEnquiry] = useState('');
  const [email, setEmail] = useState('');
  const [acers, setAcers] = useState('');
  const [errors, setErrors] = useState({});

  const ServiceApi = new Services();
  // const [contact, setContact] = useState("");

  // const params = useParams();
  // console.log(serviceName);
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!acers.trim()) {
      errors.acers = 'Acers is required';
      isValid = false;
    }

    if (!number.trim()) {
      errors.number = 'Mobile number is required';
      isValid = false;
    } else {
      const regExContact = /^[6-9]\d{9}$/;
      const validatecontact = regExContact.test(number);
      if (!validatecontact) {
        errors.number = 'Invalid Mobile number ';
        isValid = false;
      }
    }

    if (!enquiry.trim()) {
      errors.enquiry = 'Enquiry is required';
      isValid = false;
    }

    // if (!email.trim()) {
    //   errors.email = 'Email is required';
    //   isValid = false;
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   errors.email = 'Invalid email format';
    //   isValid = false;
    // }
    setErrors(errors);
    return isValid;
  };
  const EnquirySumbitHandlar = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setName('');
      setNumber('');
      setEnquiry('');
      setEmail('');
      setAcers('')
      setErrors({});
      const productResponse = await ServiceApi.getServiceEnquiry({
        // productId: params.id,
        service: serviceName,
        name: name,
        description: enquiry,
        contact: number,
        email: email,
        acre: acers,
        serviceType: servicesType,
      });
      if (productResponse || productResponse.data.code === 200) {
        toast.success(" Enquiry sumitted successfully");
        onClose()
        navigate('/')
      } else {
        toast.error("Something Went Wrong");
      }
      onClose();
      navigate('/')

    } else {
      // Form validation failed
      // toast.error(
      //   'Please fill out the form correctly.',

      // );
    }
  };
  const handleContactChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^\d]/g, '');
    const validValue = sanitizedValue.charAt(0) >= '6' && sanitizedValue.charAt(0) <= '9'
      ? sanitizedValue.substr(0, 10)
      : '';
    setNumber(validValue);
  };

  return (
    <>
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom' size={'xl'}>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent maxH={'530'} overflowY={'scroll'} marginTop={28}>
          <form>
            <ModalHeader>
              <Flex direction={'column'}>
                <Text fontSize={'lg'} fontWeight={'600'}> ⪼ Complete Your Enquiry Form ⪻</Text>
                <Text fontSize={'12px'} fontWeight={'600'} marginStart={'1px'} marginTop={'-1px'}> Our representative will contact you shortly</Text>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction={'column'} gap={'10px'} justifyContent={'center'}>
                <center>
                  {/* Add your image component here */}
                </center>
                <FormControl isRequired>
                  <FormLabel fontSize={'md'} fontWeight={'600'}>Name</FormLabel>
                  <Input
                    placeholder="Enter Here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fontSize={'md'}
                    fontWeight={'600'}
                  />
                  {errors.name && <Text color="red.500">{errors.name}</Text>}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize={'md'} fontWeight={'600'}>Mobile Number</FormLabel>
                  <Input
                    placeholder="Enter Here"
                    type="number"
                    value={number}
                    // maxLength={'11'}
                    minLength={10}
                    // onChange={(e) => setNumber(e.target.value)}
                    onChange={(e) => handleContactChange(e)}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                      }
                  }}
                    fontSize={'md'}
                    fontWeight={'600'}
                  />
                  {errors.number && <Text color="red.500">{errors.number}</Text>}
                </FormControl>
                <FormControl >
                  <FormLabel fontSize={'md'} fontWeight={'600'}>Email <span>(optional)</span></FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    fontSize={'md'}
                    fontWeight={'600'}
                    placeholder='Enter Email Address'
                  />
                  {errors.email && <Text color="red.500">{errors.email}</Text>}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize={'md'} fontWeight={'600'}>Number of Acre</FormLabel>
                  <Input
                    value={acers}
                    onChange={(e) => setAcers(e.target.value)}
                    type="email"
                    fontSize={'md'}
                    fontWeight={'600'}
                    placeholder="Enter Here" />
                  {errors.acers && <Text color="red.500">{errors.acers}</Text>}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize={'md'} fontWeight={'600'}>Your Enquiry</FormLabel>
                  <Textarea
                    value={enquiry}
                    onChange={(e) => setEnquiry(e.target.value)}
                    fontSize={'md'}
                    rounded={'md'}
                    fontWeight={'600'}
                    placeholder='Enter Enquiry'
                    size='sm'
                  />
                  {errors.enquiry && <Text color="red.500">{errors.enquiry}</Text>}
                </FormControl>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" variant="outline" type='submit' width={"100%"} onClick={EnquirySumbitHandlar}>
                Enquire now
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};