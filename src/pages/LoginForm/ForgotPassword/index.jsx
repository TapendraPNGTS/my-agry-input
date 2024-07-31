import {
  Text,
  Image,
  CardFooter,
  Stack,
  CardBody,
  Button,
  Heading,
  Card,
  Input,
  Box,
  Flex
} from "@chakra-ui/react";
import Img1 from "../../../assets/images/Contact_for_Image.svg";
import AuthApi from "../../../apis/auth/auth.api";
import toast from "react-hot-toast";
import { useState } from "react";
import "../login.css";
import forgetImg from "../../../assets/images/forget-pwd-img.svg";
import phonIcon from "../../../assets/images/phone-icon.svg";


const index = ({ onForgotOtp }) => {
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
else{
    const otpResponse = await authApi.ForgetOTP({
      contact: number,
    });
  
    if (otpResponse && otpResponse?.data?.code === 200) {
      toast.success(`otp send successsfully`);
      localStorage.setItem("userId", otpResponse.data.data.UserID)
      localStorage.setItem("number", number);
      onForgotOtp(true);
    } else if (otpResponse?.data?.code === 201) {
      return toast.error("This number is not found!", {
        textAlign: "center",
      });
    }
    else {
      return toast.error(`Something went wrong!`);
    }
  }
  }
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        // pt={5}
        variant="outline"
        maxWidth="100%"
        width={{ base: "column", md: "100%" }}
        justifyContent="center"
        alignItems="center"
        borderWidth={`0`}
        backgroundColor={`transparent`}
      >
       

<Box padding={"52px 32px"}>
          <form>
            <Heading textAlign={'center'} color={'#006837'} >Forgot Password</Heading>
            <Text textAlign={'center'} m={'auto'} width={{base:"255px",md:'350px'}} pt={2} opacity={'50%'} fontSize={'15px'}>Get access to your Orders, Wishlist and
              Recommendations</Text>

              <Flex justifyContent={'center'}>
                <Image src={forgetImg}/>
              </Flex>
            <Box pt={4}>
              <div class="input-container">

                <input type="text" class="animated-input" id="example" maxLength={10} placeholder=" " 
                 onChange={(e) => {
                  
                    setNumber(e.target.value)
                     setNumberError("");
                  
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

            <Flex justifyContent={'center'} pt={5}>
              <Button bgColor={'#006837'} 
              _hover={'none'}
              _active={'none'}
              color={'white'} p={'15px 30px'}
               fontWeight={'400'} 
               onClick={handleSubmit}
              >CONTINUE</Button>
            </Flex>

          
          </form>
        </Box>

      </Card>
    </>
  );
};

export default index;
