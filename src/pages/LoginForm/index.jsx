import { useState } from "react";
// import "./LoginForm.css";
import {
  Box,
  Card
} from "@chakra-ui/react";
import Login from "./Loginpopup/index";
import ForgotOtp from "./ForgotOtp";
import ForgotPassword from "./ForgotPassword";
import CreatePassword from "./CreatePassword";
import SignUp from "./SignUp";
import UpdateDetails from "./UpdateDetails";
import OTP from '../LoginForm/OTP'


const index = ({ onClose, loggedIn }) => {
  const [otpState, setotpState] = useState(false);
  const [logIn, setlogIn] = useState(true);
  const [forgotPass, setForgotPass] = useState(false);
  const [forgotOtp, setForgotOtp] = useState(false);
  const [createNewPass, setCreateNewPass] = useState(false);
  const [updateDetails, setUpdateDetails] = useState(false);
  const [signUp, setSignUp] = useState(false);


  return (
    <>
      <Box

        width={{ base: "100%", md: "100%", lg:"100%"}}

      >
        {otpState === true ? (
          <OTP onClose={onClose} onUpdateDetails={() => { setotpState(false); setUpdateDetails(true) }} />
        ) : forgotOtp === true ? (
          <ForgotOtp onCreatePassword={() => { setForgotOtp(false); setCreateNewPass(true) }} />
        ) : logIn === true ? (
          <Login onClose={onClose} loggedIn={loggedIn} onForget={() => {
            setForgotPass(true);
            setlogIn(false);
          }
          }
            onSignUp={() => {
              setlogIn(false); setSignUp(true);
            }}
          />
        ) : forgotPass === true ? (
          <ForgotPassword onForgotOtp={() => {
            setForgotOtp(true); setForgotPass(false);
          }} />
        ) : createNewPass === true ? (
          <CreatePassword onClose={onClose} />
        ) : updateDetails === true ? (
          <UpdateDetails loggedIn={loggedIn} onClose={onClose} />
        ) : signUp == true ? (
          <SignUp onOTP={() => { setotpState(true); setSignUp(false) }} />
        ) : (
          // OTP FORM
          <>
            <h1>Some thing is wrong</h1>
          </>
        )}
      </Box>


    </>
  );
};

export default index;
