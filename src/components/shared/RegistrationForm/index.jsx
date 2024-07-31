import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Heading,
  Select,
  Card,
  Flex,
  Box,
  Text,
  Image
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateToken } from "../../../redux/redux-slice/user.slice";
import { updateState } from "../../../redux/redux-slice/state.slice";

import UserApi from "../../../apis/user.api";
import OtherApi from "../../../apis/other.api";

import toast from "react-hot-toast";
// import "./UpdateDetails.css";
// import "../login.css";
import profileIcon from "../../../assets/images/form-profile-icon.svg";
import irrigationIcon from "../../../assets/images/irrigation_update.svg";
import productionIcon from "../../../assets/images/production.svg";
import addressIcon from "../../../assets/images/address.svg";
import cropKhariIcon from "../../../assets/images/crop_kharif.svg";
import cropRabiIcon from "../../../assets/images/crop_rabi.svg";
import landDetailIcon from "../../../assets/images/land_details.svg";
import phonelIcon from "../../../assets/images/phone-icon.svg";
import agriculture from "../../../assets/images/agriculture-rImg.svg";
import organicProduct from "../../../assets/images/organic-productImg.svg";
import Satellite from "../../../assets/images/satteliteImg.svg";

import lockIcon from "../../../assets/images/lock-icon.svg";
import cityIcon from "../../../assets/images/form-city-icon.svg";
import stateIcon from "../../../assets/images/form-state-icon.svg";
import emailIcon from "../../../assets/images/form-email-icon.svg";
import frechiseIcon from "../../../assets/images/frenchise-icon.svg";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import IdCard from "../../../assets/images/id-card.svg";
import { PhoneIcon } from "@chakra-ui/icons";


const RegistrationForm = () => {

  const userApi = new UserApi();
  const otherApi = new OtherApi();
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.state.State);
  const [districts, setDistricts] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId") || "",
    name: "",
    email: "",
    cityId: "",
    stateId: "",
    password: "",
    address: "",
    landDetail: "",
    cropRabi: "",
    cropKharif: "",
    production: "",
    irrigation: "",
    confirmPassword: "",
    franchiseId: "",
    adhaar: "",
    contact: "",
  });

  const [formError, setFormError] = useState({
    userId: "",
    name: "",
    email: "",
    cityId: "",
    stateId: "",
    password: "",
    confirmPassword: "",
    address: "",
    cropRabi: "",
    cropKharif: "",
    landDetail: "",
    irrigation: "",
    production: "",
    contact: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newFormError = { ...formError };

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.name.trim() === "") {
      isValid = false;
      newFormError.name = "Name is required!";
    } else {
      newFormError.name = "";
    }

    if (formData.stateId === "") {
      isValid = false;
      newFormError.stateId = "Please select a state!";
    } else {
      newFormError.stateId = "";
    }

    if (formData.cityId === "") {
      isValid = false;
      newFormError.cityId = "Please select a city!";
    } else {
      newFormError.cityId = "";
    }
    if (formData.address === "") {
      isValid = false;
      newFormError.address = "Address is required!";
    } else {
      newFormError.address = "";
    }

    const numberRegex = /^[0-9]{10}/;

    if (formData.contact === "") {
      isValid = false;
      newFormError.contact = "Please enter number!";
    } else if (!numberRegex.test(formData.contact)) {
      isValid = false;
      newFormError.contact = "Please enter 10 digits of mobile number!";
    } else {
      newFormError.password = "";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (formData.password === "") {
      isValid = false;
      newFormError.password = "Please enter password!";
    } else {
      newFormError.password = "";
    }
    if (formData.password === "" || !passwordRegex.test(formData.password)) {
      isValid = false;
      newFormError.password =
        "Password must be at least 8 characters and include at least one letter and one number!";
    } else {
      newFormError.password = "";
    }
    if (formData.confirmPassword === "") {
      isValid = false;
      newFormError.confirmPassword = "Please enter Password!";
    } else {
      newFormError.confirmPassword = "";
    }

    if (
      formData.confirmPassword !== "" &&
      formData.password !== formData.confirmPassword
    ) {
      isValid = false;
      newFormError.confirmPassword = "Passwords do not match!";
    }

    setFormError(newFormError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      try {

        const updateUserResponse = await userApi.preRegistration(formData);

        if (updateUserResponse?.data?.code === 200) {
          toast.success(`Account created successfully`);
          // localStorage.setItem("userId", updateUserResponse.data.data.UserID);
          // dispatch(updateUser(updateUserResponse.data.data.data));
          // dispatch(updateToken(updateUserResponse.data.data.token));

          window.location.href = `${updateUserResponse.data.data.data.instrumentResponse.redirectInfo.url}`;

          setFormData({
            userId: "",
            name: "",
            email: "",
            cityId: "",
            stateId: "",
            password: "",
            address: "",
            landDetail: "",
            cropRabi: "",
            cropKharif: "",
            production: "",
            irrigation: "",
            confirmPassword: "",
            franchiseId: "",
            adhaar: "",
            contact: "",
          });
        } else if (updateUserResponse?.data?.code === 400) {
          toast.error(updateUserResponse?.data?.message, {
            textAlign: "center",
          });
        } else {
          toast.error(`invalid number!`);
        }
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error(`Something went wrong!`);
      }
    } else {
      // toast.error("Passwords do not match");
      setError("Passwords do not match");
    }
  };

  const onValueChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormError({ ...formError, [name]: "" });

    if (name === "stateId") {
      getDistrict(value);
    }
  };

  const getState = useCallback(async () => {
    try {
      const getStateResponse = await otherApi.getState();
      if (getStateResponse?.data?.data) {
        dispatch(updateState(getStateResponse.data.data));
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  }, [dispatch]);

  const getDistrict = async (stateId) => {
    try {
      const getDistrictResponse = await otherApi.getDistrict({ stateId });
      if (getDistrictResponse?.data?.data) {
        setDistricts(getDistrictResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const getFranchises = async (cityId, stateId) => {
    try {
      const getFranchiseResponse = await otherApi.getFranchise({
        cityId,
        stateId,
      });
      if (getFranchiseResponse?.data?.data) {
        setFranchises(getFranchiseResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching franchises:", error);
    }
  };

  useEffect(() => {
    getState();
  }, [getState, formData.stateId]);

  useEffect(() => {
    if (formData.stateId && formData.cityId) {
      getFranchises(formData.cityId, formData.stateId);
    }
  }, [formData.cityId, formData.stateId]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <Box width={'100%'}>
      <Box padding={"30px 32px"} width={'100%'}>
        <form>
          <Heading textAlign={"center"} color={"black"} mt={4}>
            Khetimitra Hospital
          </Heading>
          <Heading mt={2} textAlign={"center"} fontSize={'30px'} fontWeight={'medium'} color={"#006837"} textDecoration={'underline'}>
            Registration Form
          </Heading>

          <Flex alignItems={'center'} gap={{ base: 0, md: 2, lg: 4 }} width={'100%'} justifyContent={'center'} marginTop={6} flexDirection={{ base: 'column', md: 'row' }}>
            <Flex alignItems={'center'} gap={{ base: 2, md: 1, lg: 2 }}><Image src={agriculture} />
              <Text fontSize={{ base: '15px', md: '10px', lg: '15px' }} fontWeight={500}>Soil Testing (1 Sample) (200/-)</Text>
            </Flex>
            <Text fontSize={{ base: '24px', md: '12px', lg: '24px' }} fontWeight={'medium'}>+</Text>
            <Flex alignItems={'center'} gap={{ base: 2, md: 1, lg: 2 }}><Image src={organicProduct} />
              <Text fontSize={{ base: '15px', md: '10px', lg: '15px' }} fontWeight={500}>Land Reform Product - ROOT-H (400/-)</Text>
            </Flex>
            <Text fontSize={{ base: '24px', md: '12px', lg: '24px' }} fontWeight={'medium'}>+</Text>
            <Flex alignItems={'center'} gap={{ base: 2, md: 1, lg: 2 }}><Image src={Satellite} />
              <Text fontSize={{ base: '15px', md: '10px', lg: '15px' }} fontWeight={500}>Satelite Based Crop Monitoring (360/-)</Text>
            </Flex>
          </Flex>
          <Box pt={4}>


            <Flex gap={{ base: '0', md: "3", lg: '4' }} flexDirection={{ base: 'column', md: "row" }}>
              <div class="input-container">
                <input
                  type="text"
                  class="animated-input"
                  id="example"
                  placeholder=" "
                  value={formData.name}
                  name="name"
                  onChange={onValueChange}
                  maxLength={60}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <label for="example" class="animated-label">
                  Full Name *
                </label>

                <img className="input-icon" src={profileIcon} />
                {formError.name && (
                  <div className="error-message">{formError.name}</div>
                )}
              </div>

              <div class="input-container">
                <input
                  type="email"
                  class="animated-input"
                  id="example"
                  placeholder=" "
                  value={formData.email}
                  name="email"
                  onChange={onValueChange}
                  maxLength={60}
                />
                <label for="example" class="animated-label">
                  Email <span>(optional)</span>
                </label>

                <img className="input-icon email-icon" src={emailIcon} />
              </div>
            </Flex>
            <Flex gap={{ base: '0', md: "3", lg: '4' }} flexDirection={{ base: 'column', md: "row" }}>
              <div class="input-container">
                <select
                  class="animated-input"
                  name="stateId"
                  placeholder="Select State"
                  value={formData.stateId}
                  onChange={(e) => {
                    onValueChange(e);
                    getDistrict(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Select State
                  </option>
                  {stateData.map((state, index) => (
                    <option key={index} value={state.StateID}>
                      {state.Name}
                    </option>
                  ))}
                </select>
                <label for="example" class="animated-label">
                  State *
                </label>

                <img className="input-icon" src={stateIcon} />
                {formError.stateId && (
                  <div className="error-message">{formError.stateId}</div>
                )}
              </div>
              <div class="input-container">
                <select
                  class="animated-input"
                  name="cityId"
                  size="md"
                  value={formData.cityId}
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                >
                  <option value="" disabled selected>
                    Select City
                  </option>
                  {districts.map((item, index) => (
                    <option key={index} value={item.DistrictID}>
                      {item.Name}
                    </option>
                  ))}
                </select>
                <label for="example" class="animated-label">
                  City *
                </label>

                <img className="input-icon" src={cityIcon} />
                {formError.cityId && (
                  <div className="error-message">{formError.cityId}</div>
                )}
              </div>
            </Flex>
            <Flex gap={{ base: '0', md: "3", lg: '4' }} flexDirection={{ base: 'column', md: "row" }}>
              <div class="input-container">
                <select
                  class="animated-input"
                  name="franchiseId"
                  placeholder="Select Franchise"
                  value={formData.franchiseId}
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                >
                  <option value="" disabled selected>
                    Select Franchise
                  </option>
                  {franchises.map((franchise, index) => (
                    <option key={index} value={franchise.FrenchiseID}>
                      {franchise.FirmName}
                    </option>
                  ))}
                </select>
                <label for="example" class="animated-label">
                  Franchise
                </label>

                <img className="input-icon" src={frechiseIcon} />
                {/* {formError.franchiseId && <div className="error-message">{formError.franchiseId}</div>} */}
              </div>

              <div class="input-container">
                <input
                  type="text"
                  class="animated-input"
                  id="land"
                  placeholder=""
                  value={formData.address}
                  name="address"
                  onChange={onValueChange}
                  maxLength={120}
                />
                <label for="land" class="animated-label">
                  Address *
                </label>
                <img className="input-icon" src={addressIcon} />
                {formError.address && (
                  <div className="error-message">{formError.address}</div>
                )}
              </div>
            </Flex>
            <Flex gap={{ base: '0', md: "3", lg: '4' }} flexDirection={{ base: 'column', md: "row" }}>
              <div class="input-container">
                <input
                  type="text"
                  class="animated-input"
                  id="example"
                  placeholder=""
                  value={formData.adhaar}
                  name="adhaar"
                  onChange={onValueChange}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={12}
                  pattern="[0-9]*"
                />
                <label for="example" class="animated-label">
                  Aadhar Number (optional)
                </label>
                <img className="input-icon" src={IdCard} />

              </div>
              <div class="input-container">
                <input
                  type="text"
                  class="animated-input"
                  id="example"
                  placeholder=""
                  value={formData.contact}
                  name="contact"
                  onChange={onValueChange}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={10}
                  pattern="[0-9]*"
                />
                <label for="example" class="animated-label">
                  Mobile Number *
                </label>
                <img className="input-icon" src={phonelIcon} />
                {formError.contact && (
                  <div className="error-message">{formError.contact}</div>
                )}
              </div>

            </Flex>
            <Flex gap={{ base: '0', md: "3", lg: '4' }} flexDirection={{ base: 'column', md: "row" }}>
              <div class="input-container">
                <input
                  type="text"
                  class="animated-input"
                  id="crop-Rabi"
                  placeholder=""
                  value={formData.cropRabi}
                  name="cropRabi"
                  onChange={onValueChange}
                  maxLength={120}

                />
                <label for="land" class="animated-label">
                  Crop (Rabi)<span> (optional)</span>
                </label>
                <img className="input-icon" src={cropRabiIcon} />
                {formError.cropRabi && (
                  <div className="error-message">{formError.cropRabi}</div>
                )}
              </div>


              <div class="input-container">
                <input
                  type="text"
                  class="animated-input"
                  id="land"
                  placeholder=""
                  value={formData.cropKharif}
                  name="cropKharif"
                  onChange={onValueChange}
                  maxLength={120}

                />
                <label for="land" class="animated-label">
                  Crop (Kharif)<span> (optional)</span>
                </label>
                <img className="input-icon" src={cropKhariIcon} />
                {formError.cropKharif && (
                  <div className="error-message">{formError.cropKharif}</div>
                )}
              </div>
            </Flex>
            <Flex gap={{ base: '0', md: "3", lg: '4' }} flexDirection={{ base: 'column', md: "row" }}>
              <div class="input-container">
                <input
                  type="text"
                  class="animated-input"
                  id="land"
                  placeholder=""
                  value={formData.production}
                  name="production"
                  onChange={onValueChange}
                  maxLength={120}

                />
                <label for="land" class="animated-label">
                  Production<span> (optional)</span>
                </label>
                <img className="input-icon" src={productionIcon} />
                {formError.production && (
                  <div className="error-message">{formError.production}</div>
                )}
              </div>
              <div class="input-container">
                <input
                  type="text"
                  class="animated-input"
                  id="land"
                  placeholder=""
                  value={formData.irrigation}
                  name="irrigation"
                  onChange={onValueChange}
                  maxLength={120}

                />
                <label for="land" class="animated-label">
                  Irrigation <span>(optional)</span>
                </label>
                <img className="input-icon" src={irrigationIcon} />
                {formError.irrigation && (
                  <div className="error-message">{formError.irrigation}</div>
                )}
              </div>
            </Flex>
            <Flex>
              <div class="input-container">
                <input
                  type="text"
                  class="animated-input"
                  id="land"
                  placeholder=""
                  value={formData.landDetail}
                  name="landDetail"
                  onChange={onValueChange}
                  maxLength={120}
                />
                <label for="land" class="animated-label">
                  Land Details<span > (Area/Acre) (optional)</span>
                </label>
                <img className="input-icon" src={landDetailIcon} />
                {formError.landDetail && (
                  <div className="error-message">{formError.landDetail}</div>
                )}
              </div>
            </Flex>
            <Flex gap={{ base: '0', md: "3", lg: '4' }} flexDirection={{ base: 'column', md: "row" }}>
              <Box width={'100%'}>
                <div class="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    class="animated-input"
                    id="example"
                    placeholder=""
                    value={formData.password}
                    name="password"
                    onChange={onValueChange}
                    maxLength={60}
                  />
                  <label for="example" class="animated-label">
                    Password *
                  </label>
                  <img className="input-icon" src={lockIcon} />
                  <p className="eye-icon" onClick={handleShowPassword}>
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </p>
                </div>
                {formError.password && (
                  <div className="error-message" style={{ width: "300px" }}>{formError.password}</div>
                )}
              </Box>
              <Box width={'100%'} >
                <div class="input-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    class="animated-input"
                    id="example"
                    placeholder=" "
                    value={formData.confirmPassword}
                    name="confirmPassword"
                    onChange={onValueChange}
                    maxLength={60}
                  />
                  <label for="example" class="animated-label">
                    Confirm Password *
                  </label>
                  <img className="input-icon" src={lockIcon} />
                  <p className="eye-icon" onClick={handleShowConfirmPassword}>
                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </p>
                </div>

                {formError.confirmPassword && (
                  <div className="error-message">{formError.confirmPassword}</div>
                )}
              </Box>
            </Flex>
          </Box>

          <Text mt={4} fontSize={{ base: '24px', md: '32px' }} color={'#006837'} textAlign={'center'} fontWeight={'bold'}>Total Amount:- ₹960/-</Text>
          <Text mt={4} fontSize={{ base: '12px', md: '15px' }} fontWeight={'300'}>*Crop management facility to every gram panchayat of the chhattisgarh state</Text>
          <Flex justifyContent={"center"} pt={5}>
            <Button
              bgColor={"#006837"}
              _hover={"none"}
              _active={"none"}
              color={"white"}
              p={"15px 30px"}
              fontWeight={"400"}
              onClick={handleSubmit}
            >
              REGISTER
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  )
}
export default RegistrationForm;