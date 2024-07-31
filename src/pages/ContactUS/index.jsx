import React, { useState } from "react";
import Lottie from "lottie-react";

import "./contactUs.css";

// import ContactImg from "../../assets/Images/contact-us.svg";
import { CloseIcon } from "../../utils/Icons"
import ContactApi from "../../apis/user.api";

import {
  Input,
  Button,
  Modal,
  Text,
  Flex,
  VStack,
  Stack,
  Container,
  Textarea,
  Heading,
  Card,
  Image,
  Box,
} from '@chakra-ui/react'
import toast from "react-hot-toast";
import locationImg from "../../assets/images/location-icon.svg";
import emailImg from "../../assets/images/email-contact-icon.svg";
import contactImg from "../../assets/images/phone-call-icon.svg";
import { Link } from "react-router-dom";

const Contact = () => {

  const contactApi = new ContactApi();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    query: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    contact: "",
    query: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, email, contact, query } = formData;

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (formData.name.trim() === "") {
      errors.name = "Name is required!";
      valid = false;
    }
    // if (formData.email.trim() === "") {
    //   errors.email = "Please enter an email!";
    //   valid = false;
    // } else if (!emailRegex.test(formData.email)) {
    //   errors.email = "Please enter a valid email address!";
    //   valid = false;
    // }
    if (formData.contact.trim() === "") {
      errors.contact = "Please enter number!";
      valid = false;
    } else if (!phoneRegex.test(formData.contact)) {
      errors.contact = "Please enter a valid 10-digits of contact number!";
      valid = false;
    }
    if (formData.query.trim() === "") {
      errors.query = "Please enter a query!";
      valid = false;
    }
    setFormError(errors);

    return valid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {

    try {
      const response = await contactApi.getcontact(formData);

      // console.log("API response:", response.data);
      toast.success("Your Query is Submitted.");

      setFormData({
        name: "",
        email: "",
        contact: "",
        query: "",
      });
    } catch (error) {
      console.error("API call error:", error);
    }
  }
  };

  return (
    <>
      <div className="contact-parent">
        <div className="contact-container">

          <Flex justifyContent={'center'} gap={6} width={'100%'} p={{ base: 0, md: 5 }} flexDirection={{ base: 'column', md: "row" }}>
            <Card p={4} textAlign={'center'} width={{ base: "100%", md: '350px' }} >
              <Image width={'100%'} h={'60px'} src={locationImg} />
              <Text mt={4} fontSize={'18px'} fontWeight={'bold'}>Address</Text>
              <Text mt={2} fontSize={{ base: "15px", md: '14px', lg: '15px' }}>34, Ground Floor, Progressive Point,<br/>
Raipur (C.G.)</Text>
            </Card>
            <Card p={4} textAlign={'center'} width={{ base: "100%", md: '350px' }}>
            <Link to="mailto:contact@graminshakti.com" >  
              <Image width={'100%'} h={'60px'} src={emailImg} />
              </Link>
              <Text mt={4} fontSize={'18px'} fontWeight={'bold'}>Email</Text>
              <Link to="mailto:contact@graminshakti.com" >  
              <Text mt={2} fontSize={{ base: "15px", md: '14px', lg: '15px' }}>contact@graminshakti.com</Text>
           </Link>
            </Card>
            <Card p={4} textAlign={'center'} width={{ base: "100%", md: '350px' }}>
            <Link to="tel:7880130147">
              <Image width={'100%'} h={'60px'} src={contactImg} />
              </Link>
              <Text mt={4} fontSize={'18px'} fontWeight={'bold'}>Phone</Text>
              <Link to="tel:7880130147">
              <Text mt={2} fontSize={{ base: "15px", md: '14px', lg: '15px' }}>+91 7880130147</Text>
              </Link>
            </Card>
          </Flex>

          <Box textAlign={'center'} width={'100%'}>
            <Heading color={'black'} mt={3} fontSize={{ base: "24px", md: "30px", lg: '42px' }}>Drop us a message for any query or You.</Heading>
            <Text pt={3} width={{ base: "100%", md: '600px' }} m={'auto'} fontSize={'16px'} fontWeight={500}>Write to us, we’ll get back to you as fast as we can. You may find some of your questions answered on our FAQ page.</Text>
          </Box>

          <div className="contact-form">
            <form  >
              <Flex width={'100%'} gap={5} mt={5} flexDirection={{ base: "column", md: "row" }}>
                <Box width={'100%'}>
                  <lable style={{ color: "#039441", fontWeight: "600" }} >Full Name*</lable>
                  <Input
                    colorScheme="primary"
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    type="string"
                    required
                    value={name}
                    onChange={handleChange}
                    mt={1}
                    bgColor={'white'}
                    maxLength={60}
                    onKeyPress={(e) => {
                      if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                   {formError.name && (
  <span style={{color:"red"}}>{formError.name}</span>
)}
                </Box>
                <Box width={'100%'}>
                  <lable style={{ color: "#039441", fontWeight: "600" }}>Phone Number*</lable>
                  <Input
                    colorScheme="primary"
                    placeholder="Enter your phone number"
                    id="contact"
                    name="contact"
                    type="text"
                    value={contact}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      
                      if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                      }
                  }}
                    required
                    mt={1}
                    bgColor={'white'}
                    maxLength={10}
                  />
                   {formError.contact && (
  <span style={{color:"red"}}>{formError.contact}</span>
)}
                </Box>
              </Flex>
              <Box mt={{ base: 4, md: '' }}>
                <lable style={{ color: "#039441", fontWeight: "600" }}>Your Email <span>(optional)</span></lable>
                <Input
                  colorScheme="primary"
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  required
                  mt={1}
                  bgColor={'white'}
                  maxLength={60}
                />
                 {/* {formError.email && (
  <span style={{color:"red"}}>{formError.email}</span>
)} */}
              </Box>
              <Box mt={{ base: 4, md: '' }}>
                <label style={{ color: "#039441", fontWeight: "600" }}>Message*</label>
                <Textarea
                  colorScheme="primary"
                  placeholder="Enter your query"
                  id="query"
                  name="query"
                  type="textarea"
                  value={query}
                  onChange={handleChange}
                  required
                  mt={1}
                  bgColor={'white'}
                />
                 {formError.query && (
  <span style={{color:"red"}}>{formError.query}</span>
)}
              </Box>
              <Flex justifyContent={'center'}>
                <Button width={'250px'} rounded={'full'} color={'#fff'} bg={'#039441'} _hover={{ bg: "#017c34", color: "white" }} action="submit" onClick={handleSubmit}>
                  Send Message
                </Button>
              </Flex>
            </form>

          </div>

        </div>

        {/* <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
          aria-labelledby="Join Waitlist"
          aria-describedby="Join Waitlist"
        >
          <div className="modal-container">
            <div className="modal-parent">
              <CloseIcon className="close-icon" onClick={handleCloseModal}/>
              <div className="join-waitlist-modal">
                <>
                  <div className="join-waitlist-success">
                    <Lottie
                    //   animationData={success}
                      loop={false}
                      style={{
                        width: "200px",
                        height: "200px",
                        marginTop: "-40px",
                      }}
                    />
                    <h4 className="text-xl text-center -mt-5 font-bold">
                      Your query has been recieved
                    </h4>
                  </div>
                </>
              </div>
            </div>
          </div>
        </Modal> */}
      </div>
    </>
  );
};

export default Contact;
