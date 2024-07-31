import React, { useState } from 'react'
import {
  Text,
  Image,
  Button,
  Heading,
  Card,
  Box,
  Flex
} from "@chakra-ui/react";
import AuthApi from "../../../apis/auth/auth.api";
import forgetImg from "../../../assets/images/forget-pwd-img.svg";
import phonIcon from "../../../assets/images/phone-icon.svg";

import toast from "react-hot-toast";
import { NavLink } from 'react-router-dom';


const index = ({ onOTP }) => {
  const authApi = new AuthApi()
  const [numberError, setNumberError] = useState("");
  const [number, setNumber] = useState("");
  
  const mobileRegex = /^\d{10,}$/;

  async function handleSubmit(event) {
    event.preventDefault();

    if (number === "") {
      setNumberError("Please enter your mobile number!");
    }
    else if (!mobileRegex.test(number)) {
      setNumberError("Invalid number ! Please enter atleast 10-digits of mobile number!");
      return;
    }

    const otpResponse = await authApi.sendOTP({
      contact: number,
    });
    if (otpResponse && otpResponse?.data?.code === 200) {
      toast.success(`otp successsfully`);
      localStorage.setItem("userId", otpResponse.data.data.UserID)
      localStorage.setItem("number", number);
      onOTP(true);
    } else if (otpResponse?.data?.code === 201) {
      return toast.error(otpResponse?.data?.message, {
        textAlign: "center",
      });
    }
    else {
      return toast.error(`Something went wrong!`);
    }
  }

  return (
    <>
     

<Card>
<Box padding={"52px 32px"}>
          <form>
            <Heading textAlign={'center'} color={'#006837'} >Sign Up</Heading>
            <Text textAlign={'center'} m={'auto'} width={{base:"255px",md:'350px'}} pt={2} opacity={'50%'} fontSize={'15px'}>Get access to your Orders, Wishlist and
              Recommendations</Text>

              <Flex justifyContent={'center'}>
                <Image src={forgetImg}/>
              </Flex>
            <Box>
              <div class="input-container">

                <input type="text" maxLength={10} class="animated-input" id="example" placeholder=" " 
                value={number}
                onChange={(e) => {
                  if (e.target.value.length < 11) {
                    setNumber(e.target.value);
                    setNumberError("");
                  }
                }}
                onKeyPress={(e) => {
                 
                  if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                  }
              }}
                />
                <label for="example" class="animated-label">Mobile Number</label>

                <img className="input-icon" src={phonIcon} />
                {numberError && <p className="error-message">{numberError}</p>}

              </div>
              
            </Box>
            <Text
            // py="2"
            fontSize={{ base: `12px`, md: "15px" }}
           m={0}
            fontWeight={`400`}
            width={{base:"300px",md:'400px'}}
          >
            By continuing’ you agree to Gramin-Shakti{" "}
            <NavLink textDecoration={'none'} to='/Term-Condition'>
            <Text as="span" color={`green`}>
              Terms Use
            </Text>
            </NavLink>{" "}
            and
            <NavLink textDecoration={'none'} to='/privacy-policy'>
            <Text as="span" color={`green`}>
              {" "}
              Privacy Policy
            </Text>
            </NavLink>
            .
          </Text>

            <Flex justifyContent={'center'} pt={5} alignItems={'center'}>
              <Button bgColor={'#006837'} 
              _hover={'none'}
              _active={'none'}
              color={'white'} p={'15px 30px'}
               fontWeight={'400'} 
               onClick={handleSubmit}
              >REQUEST OTP</Button>
            </Flex>  
                    
              {/* <Text ml={2} mt={3} textAlign={'center'} textDecoration={'underline'} color={'#006837'}  onClick={(e) => {
               
                setlogIn(true);
              }}>Login</Text> */}
          </form>
        </Box>
</Card>
      
    </>
  )
}

export default index;