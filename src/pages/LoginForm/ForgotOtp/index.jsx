import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  Image,
  CardFooter,
  Stack,
  CardBody,
  Button,
  Heading,
  Card,
  PinInput,
  PinInputField,
  HStack,
  Link,
  Flex
} from "@chakra-ui/react";
import Img1 from "../../../assets/images/Contact_for_Image.svg";
import AuthApi from "../../../apis/auth/auth.api";
import toast from "react-hot-toast";
import otpImg from "../../../assets/images/otp-img.svg";
import { useNavigate } from "react-router-dom";

const Index = ({ onCreatePassword }) => {
  const [secondsLeft, setSecondsLeft] = useState(30); // Set the initial timer value to 30 seconds
  const [otp, setOtp] = useState("");
  const [otpResent, setOtpResent] = useState(false);
  const [resendAttempts, setResendAttempts] = useState(0);

  const authApi = new AuthApi();
  

  const updateMaskedValue = (inputValue) => {
    // Replace all non-digit characters with asterisks.
    const lastTwoDigits = inputValue.slice(-2);
    const firstTwoDigits = inputValue.slice(0,1);
    
    // Generate the masked value with asterisks for the rest.
    const maskedValue = firstTwoDigits+'*'.repeat(Math.max(2, inputValue.length - 2)) + lastTwoDigits;
    
    
    return maskedValue;
  };
  
  
  const number = updateMaskedValue(localStorage.getItem('number'))
  // const [secondsLeft, setSecondsLeft] = useState(30); // Set the initial timer value to 60 seconds
  // const [otp, setOtp] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    const otpResponse = await authApi.VerifyResetOTP({
      userId:localStorage.getItem(`userId`),
      otp: otp,
    });
    if (otpResponse && otpResponse?.data?.code === 200) {
      toast.success(`OTP send successsfully`);
      onCreatePassword(true);
    } else if (otpResponse?.data?.code === 201) {
      return toast.error(otpResponse?.data?.message, {
        textAlign: "center",
      });
    }
    else {
      return toast.error(`Something went wrong!`);
    }
  }
  const inputRef = useRef(null); 

  useEffect(() => {
   
    const countdown = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        
        clearInterval(countdown);
      }
    }, 1000);

   
    return () => clearInterval(countdown);
  }, [secondsLeft]);

  const handleResendOTP = async () => {
    
      try {
        
      const resendResponse = await authApi.getforgetReSendOTP({
        userId: localStorage.getItem("userId"),
      });
  
      if (resendResponse?.data?.code === 200) {
        toast.success(`OTP resent successfully`);
        setOtpResent(true);
        setSecondsLeft(30);
        setResendAttempts(resendAttempts + 1); // Increment resend attempts
      } else {
        toast.error(resendResponse?.data?.message, {
          textAlign: "center",
        });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error(`Something went wrong while resending OTP`);
    }
  };
  

  return (
    <>
     
      <Card padding={"52px 32px"}>

      <Stack className="Background">
          <CardBody>
            <Heading textAlign={'center'} color={'#006837'} >
            Verify OTP
            </Heading>
            <Text  textAlign={'center'} pt={2} opacity={'50%'} fontSize={'15px'}>Please enter the OTP sent to <br/>
              +91 {number}
            </Text>
            <Flex justifyContent={'center'}>
                <Image src={otpImg}/>
              </Flex>
            <HStack  justifyContent={'center'}  pt={5}>
              <PinInput otp value={otp} onChange={(value) => setOtp(value)}>
                <PinInputField
                  _focus={{
                    borderColor: "#009229",
                    outline: "none",
                  }}
                />
                <PinInputField
                  _focus={{
                    borderColor: "#009229",
                    outline: "none",
                  }}
                />
                <PinInputField
                  _focus={{
                    borderColor: "#009229",
                    outline: "none",
                  }}
                />
                <PinInputField
                  _focus={{
                    borderColor: "#009229",
                    outline: "none",
                  }}
                />
                <PinInputField
                  _focus={{
                    borderColor: "#009229",
                    outline: "none",
                  }}
                />
                <PinInputField
                  _focus={{
                    borderColor: "#009229",
                    outline: "none",
                  }}
                />
               
              </PinInput>
            </HStack>

            <Text
              justifyContent={`end`}
              mr={8}
              mt={3}
              textAlign={`end`}
              color={`#12142080;`}
            >
                 {secondsLeft > 0 ? (
    `Resend OTP in 00:${secondsLeft}`
  ) : (
    <Link onClick={handleResendOTP} color={'#006837'}>
      Resend OTP
    </Link>
  )}
            </Text>
          </CardBody>
          <Flex  justifyContent={'center'}>
            <Button
              // variant="solid"
              _hover={'none'}
              _active={'none'}
              backgroundColor="#006837"
              border={`none`}
              p={'10px 20px'}
              alignContent={`center center`}
              color={`#fff`}
              fontSize={"16px"}
              borderRadius={`5px`}
              onClick={handleSubmit}
            >
              VERIFY
            </Button>
          </Flex>
        </Stack>
        </Card>
    </>
  );
};

export default Index;
