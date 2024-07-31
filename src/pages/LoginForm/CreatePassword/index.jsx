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
import React, { useState } from "react";
import AuthApi from "../../../apis/auth/auth.api";
import toast from "react-hot-toast";
import forgetImg from "../../../assets/images/forget-pwd-img.svg";
import lockIcon from "../../../assets/images/lock-icon.svg";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

const index = ({ onClose }) => {
  const authApi = new AuthApi()
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    // setPassword(e.target.value);
    // Check password match dynamically
    const newPassword = e.target.value;
    setPassword(newPassword);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    // Check if the new password matches the regex pattern
    const isValidPassword = passwordRegex.test(newPassword);
    const match = newPassword === confirmPassword;
    // setPasswordMatch(match);
    // setButtonDisabled(!match);
    // setPasswordMatch(match);
    if (!isValidPassword) {
      setError("Password must contain at least one letter, one digit, and be at least 8 characters long.");
    } else {
      setError(""); 
    }
  
    setButtonDisabled(!match || !isValidPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Check password match dynamically
    const match = e.target.value === password;
    setPasswordMatch(match);
    setButtonDisabled(!match);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    setButtonDisabled(true)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  const isValidPassword = passwordRegex.test(password);
  if (!isValidPassword) {
    setError("Password must contain at least one letter, one digit, and be at least 8 characters long.");
    setButtonDisabled(true)
    return; // Stop further execution if the password is not valid
  }
    const otpResponse = await authApi.ForgetPassword({
      userId: localStorage.getItem(`userId`),
      password: password,
    });
    if (otpResponse && otpResponse?.data?.code === 200) {
      toast.success(`Password Forget Succesfully`);
      onClose(true);
    } else if (otpResponse?.data?.code === 201) {
      return toast.error(otpResponse?.data?.message, {
        textAlign: "center",
      });
    }
    else {
      return toast.error(`Something went wrong!`);
    }
  }

  const handleShowPassword = () =>{
    setShowPassword(!showPassword);
  }
  const handleShowConfirmPassword = () =>{
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        // pt={5}sss
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
            <Heading textAlign={'center'} color={'#006837'} >Reset Password</Heading>
            <Text textAlign={'center'} pt={2} m={'auto'} width={{base:"255px",md:'350px'}} opacity={'50%'} fontSize={'15px'}>Get access to your Orders, Wishlist and
              Recommendations</Text>
              <Flex justifyContent={'center'}>
                <Image src={forgetImg}/>
              </Flex>
            <Box >
            <div class="input-container">
                <input type={showPassword ? "text" : "password"}
                 class="animated-input"
                  id="example" 
                  placeholder=" "
                  value={password}
                  onChange={handlePasswordChange}
                 />
                <label for="example" class="animated-label">Password</label>
                <img className="input-icon" src={lockIcon} />
                <p className="eye-icon" onClick={handleShowPassword}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</p>

              </div>
              <div class="input-container">
                <input type={showConfirmPassword ? "text" : "password"}
                 class="animated-input"
                  id="example"
                   placeholder=" "
                   value={confirmPassword}
              onChange={handleConfirmPasswordChange}
                 />
                <label for="example" class="animated-label">Confirm Password</label>
                <img className="input-icon" src={lockIcon} />
                <p className="eye-icon" onClick={handleShowConfirmPassword}>{showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}</p>

              </div>
              <div style={{ color: "red", fontSize: "15px", margin: "0" }}>{error}</div>
              {!passwordMatch && (
              <div style={{ color: "red", fontSize:"15px", margin:"0"}}>Please Enter Same Password!</div>
            )}
            </Box>
           
            <Flex justifyContent={'center'} pt={5}>
              <Button bgColor={'#006837'} 
              _hover={'none'}
              _active={'none'}
              color={'white'} p={'15px 30px'}
               fontWeight={'400'} 
               onClick={handleSubmit}
               isDisabled={isButtonDisabled}        
              >CONTINUE</Button>
            </Flex>
          </form>
        </Box>
      </Card>
    </>
  );
};

export default index;
