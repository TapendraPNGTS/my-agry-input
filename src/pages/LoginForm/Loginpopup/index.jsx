import React, { useState } from "react";
import {
  Text,
  Image,
  Button,
  Heading,
  Card,
  Input,
  Link,
  Box,
  Flex
} from "@chakra-ui/react";

import AuthApi from "../../../apis/auth/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateUser, updateToken } from '../../../redux/redux-slice/user.slice';
import "../login.css";
import phoneIcon from "../../../assets/images/phone-icon.svg";
import lockIcon from "../../../assets/images/lock-icon.svg";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

const Index = ({
  onClose,
  onForget,
  onSignUp,
  loggedIn
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authApi = new AuthApi();
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [numberError, setNumberError] = useState("");
const [passwordError, setPasswordError] = useState("");

// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const isEmail = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};

const isMobileNumber = (input) => {
  const mobileRegex = /^\d{10,}$/;
  return mobileRegex.test(input);
};

  async function handleSubmit(event) {
    event.preventDefault();
    setNumberError("");
    setPasswordError("");
    if (!number) {
      setNumberError("Please enter your Email/Mobile Number");
      return;
    }
    
    
    if (isEmail(number)) {
    
    } else if (isMobileNumber(number)) {
     
    } else {
      setNumberError("Invalid input. Please enter a valid Email or Mobile Number");
      return;
    }
  
    if (!password) {
      setPasswordError("Please enter your Password");
      return;
    }

    // if (!passwordRegex.test(password)) {
    //   setPasswordError("Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character");
    //   return;
    // }
    
    const loginResponse = await authApi.login({
      emailContact: number,
      password: password,
    });

    if (loginResponse && loginResponse?.data?.code === 200) {
      localStorage.setItem("userId", loginResponse.data.data.userId);
      toast.success(`Login successsfully`);
      dispatch(updateUser(loginResponse.data.data.data));
      dispatch(updateToken(loginResponse.data.data.token));
      loggedIn(true);
      onClose(true);
      navigate("/", { replace: true });
    } else if (loginResponse.data.status == 'notFound') {
      return toast.error(`Account does not exist.Please create an account`);
    }
    else {
      return setPasswordError("Please enter correct password!");
        // toast.error(`Please enter correct password.!`)
      
    }

  }


  const handleShowPassword = () =>{
    setShowPassword(!showPassword);
  }

  return (
    <>
      <Card
        // direction={{ base: "column", sm: "row" }}
        // overflow="hidden"
        pt={5}
        variant="outline"
        // maxWidth="100%"
        width={{ base: "100%", md: "100%" }}
        // justifyContent="center"
        // alignItems="center"
        borderWidth={`0`}
        backgroundColor={`transparent`}
        padding={`0px`}
      >
       
        <Box padding={"52px 32px"}>
          <form>
            <Heading textAlign={'center'} color={'#006837'} >Login</Heading>
            <Text textAlign={'center'} pt={2} opacity={'50%'} m={'auto'} width={{base:"255px",md:'350px'}} fontSize={'15px'}>Get access to your Orders, Wishlist and
              Recommendations</Text>
            <Box pt={4}>
              <div className="input-container">

                <input type="text" className="animated-input"    maxLength={Number.isNaN(Number(number))  ? 60 : 10} id="example" placeholder=" "
                 onChange={(e) => {
                  setNumber(e.target.value);
                  setNumberError("");
                }} />
                <label for="example" className="animated-label">Login Email / Mobile Number</label>

                <img className="input-icon" src={phoneIcon} />
              {numberError && <p className="error-message">{numberError}</p>}
              </div>
              <div className="input-container">
                <input type={showPassword ? "text" : "password"} maxLength={40} className="animated-input" id="example" placeholder=" " onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }} />
                <label for="example" className="animated-label">Password</label>
                <img className="input-icon" src={lockIcon} />
               <p className="eye-icon" onClick={handleShowPassword}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</p>
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
            </Box>
            <Text textAlign={'right'} fontSize={'14px'} opacity={'80%'}
             onClick={onForget}
             cursor={`pointer`}
            >Forgot your password?</Text>

            <Flex justifyContent={'center'} pt={5}>
              <Button bgColor={'#006837'} 
              _hover={'none'}
              _active={'none'}
              color={'white'} p={'15px 30px'}
               fontWeight={'400'} 
               onClick={(e) => {
                handleSubmit(e);
              }}
              >LOGIN</Button>
            </Flex>

            <Text textAlign={'center'} pt={5} fontSize={'15px'}>Don’t have account?
            <Link color={'#006837'}  listStyleType={'none'} href="#">
             <span style={{ color: "#006837", paddingLeft:"5px"}} onClick={onSignUp}>Register Now</span>
             </Link>
             </Text>
          </form>
        </Box>
      </Card>
    </>
  );
};

export default Index;
