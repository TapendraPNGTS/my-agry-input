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
  Link,
  Select,
} from "@chakra-ui/react";
import Img1 from "../../assets/images/Update.svg";

import React, { useState } from "react";
import UserApi from "../../apis/user.api";
import toast from "react-hot-toast";

const index = () => {
  const userApi = new UserApi()
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");


  const handleSubmit = async (e) => {
    alert(e.message)
    e.preventDefault();
    if (password === confirmPassword) {
      const updateUserResponse = await userApi.updateUser({
        userId:localStorage.getItem(`userId`),
        name,
        email,
        password,
        state,
        city,
      });
      if (updateUserResponse && updateUserResponse?.data?.code === 200) {
        toast.success(`Account created successsfully`);
        onUpdateDetails(true);
      } else if (updateUserResponse?.data?.code === 400) {
        return toast.error(updateUserResponse?.data?.message, {
          textAlign: "center",
        });
      }
      else {
        return toast.error(`Something went wrong!`);
      }      // Passwords match, you can proceed with further actions here.
    } else {
      toast.error("Passwords do not match")
      setError("Passwords do not match");
    }
  };

  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        pt={5}
        variant="outline"
        maxWidth="100%"
        width={{ base: "column", md: "100%" }}
        justifyContent="center"
        alignItems="center"
        borderWidth={`0`}
        backgroundColor={`transparent`}
      >

        <Stack
          backgroundColor={`#009229`}
          width={{ base: "50%", xs: "100%", sm: "100%" }}
          justifyContent={`center`}
          textAlign={`center`}
        >
          <Heading
            title="Contact"
            color={`white`}
            fontFamily={``}
            fontSize={`25px`}
            mt={`30px`}
            // paddingLeft={`50px`}
            textAlign={`Start`}
            ml={8}
          >
            Update Detail's
          </Heading>
          <Heading
            title="Contact"
            color={`whitesmoke`}
            fontFamily={``}
            textStyle={`justify-content`}
            fontSize={`13px`}
            // paddingLeft={`50px`}
            textAlign={`start`}
            ml={8}
            fontWeight={`400`}
          >
            Get access to your Orders,
            <br />
            Wishlist and Recommendations
          </Heading>
          <Image
            objectFit="cover"
            paddingTop={`40px`}
            paddingLeft={{ base: `40px`, sm: `0px` }}
            maxW={{ base: "100%" }}

            src={Img1}
            alt="Caffe Latte"
          />
        </Stack>
        <Stack
          className="Background"
          w={{ base: "100%", sm: "100%", md: "500px" }} // Responsive width
          // fontSize={{ base: "20px", sm: "25px", md: "28px" }}
          padding={0}
          margin={0}
        >
          <Heading ml={7} fontSize={`28px`} fontFamily={``}>
            Update Detail's
          </Heading>
          <CardBody>
            <Input
              type={`text`}
              placeholder={`Enter your Name`}
              max={`10`}
              borderBottom={`1px solid #ACACAC !important`}
              border={`none`}
              borderRadius={`none`}
              mt={2}
              _focus={{ borderColor: "green" }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              type={`email`}
              placeholder={`Enter your Email`}
              max={`10`}
              borderBottom={`1px solid #ACACAC !important`}
              border={`none`}
              borderRadius={`none`}
              mt={2}
              _focus={{ borderColor: "green" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Select
              placeholder="Select state"
              mt={2}
              borderBottom="1px solid #ACACAC !important"
              border="none"
              borderRadius="none"
              _focus={{ borderColor: "green" }}
              onChange={(e) => {
                setState(e.target.value);
              }}
            >
              <option>Andhra Pradesh</option>
              <option>Arunachal Pradesh</option>
              <option>Assam</option>
              <option>Bihar</option>
              <option>Chhattisgarh</option>
              <option>Goa</option>
              <option>Gujarat</option>
              <option>Haryana</option>
              <option>Himachal Pradesh</option>
              <option>Jharkhand</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Madhya Pradesh</option>
              <option>Maharashtra</option>
              <option>Manipur</option>
              <option>Meghalaya</option>
              <option>Mizoram</option>
              <option>Nagaland</option>
              <option>Odisha</option>
              <option>Punjab</option>
              <option>Rajasthan</option>
              <option>Sikkim</option>
              <option>Tamil Nadu</option>
              <option>Telangana</option>
              <option>Tripura</option>
              <option>Uttar Pradesh</option>
              <option>Uttarakhand</option>
              <option>West Bengal</option>
            </Select>
            <Select
              placeholder="City"
              mt={2}
              borderBottom="1px solid #ACACAC !important"
              border="none"
              borderRadius="none"
              _focus={{ borderColor: "green" }}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              <option>Andhra Pradesh</option>
              <option>Arunachal Pradesh</option>
              <option>Assam</option>
              <option>Bihar</option>
              <option>Chhattisgarh</option>
              <option>Goa</option>
              <option>Gujarat</option>
              <option>Haryana</option>
              <option>Himachal Pradesh</option>
              <option>Jharkhand</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Madhya Pradesh</option>
              <option>Maharashtra</option>
              <option>Manipur</option>
              <option>Meghalaya</option>
              <option>Mizoram</option>
              <option>Nagaland</option>
              <option>Odisha</option>
              <option>Punjab</option>
              <option>Rajasthan</option>
              <option>Sikkim</option>
              <option>Tamil Nadu</option>
              <option>Telangana</option>
              <option>Tripura</option>
              <option>Uttar Pradesh</option>
              <option>Uttarakhand</option>
              <option>West Bengal</option>
            </Select>

            <Input
              type="password" // Change type to password
              placeholder=" Password"
              borderBottom="1px solid #ACACAC !important"
              border="none"
              borderRadius="none"
              value={password}
              mt={2}
              _focus={{ borderColor: "green" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Input
              type="password" // Change type to password
              placeholder="Confirm Password"
              borderBottom="1px solid #ACACAC !important"
              border="none"
              borderRadius="none"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }} mt={2}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <Button
              // variant="solid"
              backgroundColor="#009229"
              border={`none`}
              ml={5}
              mt={`5`}
              w={"85%"}
              alignContent={`center center`}
              color={`#fff`}
              fontSize={"24px"}
              borderRadius={`0`}
              type="submit"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </CardBody>

          <CardFooter></CardFooter>
        </Stack>

      </Card>
    </>
  );
};

export default index;
