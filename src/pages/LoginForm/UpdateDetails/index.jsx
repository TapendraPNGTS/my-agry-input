import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Heading,
  Select,
  Card,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateToken } from "../../../redux/redux-slice/user.slice";
import { updateState } from "../../../redux/redux-slice/state.slice";

import UserApi from "../../../apis/user.api";
import OtherApi from "../../../apis/other.api";

import toast from "react-hot-toast";
import "./UpdateDetails.css";
import "../login.css";
import profileIcon from "../../../assets/images/form-profile-icon.svg";
import irrigationIcon from "../../../assets/images/irrigation_update.svg";
import productionIcon from "../../../assets/images/production.svg";
import addressIcon from "../../../assets/images/address.svg";
import cropKhariIcon from "../../../assets/images/crop_kharif.svg";
import cropRabiIcon from "../../../assets/images/crop_rabi.svg";
import landDetailIcon from "../../../assets/images/land_details.svg";


import lockIcon from "../../../assets/images/lock-icon.svg";
import cityIcon from "../../../assets/images/form-city-icon.svg";
import stateIcon from "../../../assets/images/form-state-icon.svg";
import emailIcon from "../../../assets/images/form-email-icon.svg";
import frechiseIcon from "../../../assets/images/frenchise-icon.svg";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import IdCard from "../../../assets/images/id-card.svg";

const UpdateDetails = ({ onClose, loggedIn }) => {
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
    cropRabi : "",
    cropKharif : "",
    production : "",
    irrigation : "",
    confirmPassword: "",
    franchiseId: "",
    adhaar: "",
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
    cropRabi : "",
    cropKharif : "",
    landDetail: "",
    irrigation: "",
    production: "",
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

    // if (formData.email.trim() === "" || !emailRegex.test(formData.email)) {
    //   isValid = false;
    //   newFormError.email = "Enter a valid email address!";
    // } else {
    //   newFormError.email = "";
    // }

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
    // if (formData.franchiseId === "") {
    //   isValid = false;
    //   newFormError.franchiseId = "Please select a franchise!";
    // } else {
    //   newFormError.franchiseId = "";
    // }

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

    // if (
    //   formData.cropKharif === ""
    // ) {
    //   isValid = false;
    //   newFormError.cropKharif = "Please enter crop kharif!";
    // }

    // if (
    //   formData.cropRabi === ""
    // ) {
    //   isValid = false;
    //   newFormError.cropRabi = "Please enter crop rabi!";
    // }

    // if (formData.production === "" ) {
    //   isValid = false;
    //   newFormError.production = "Please enter production detail!";
    // }

    // if (formData.irrigation === "" ) {
    //   isValid = false;
    //   newFormError.irrigation = "Please enter irrigation detail!";
    // }

    if (
      formData.confirmPassword !== "" &&
      formData.password !== formData.confirmPassword
    ) {
      isValid = false;
      newFormError.confirmPassword = "Passwords do not match!";
    }


    // if (formData.landDetail === "") {
    //   isValid = false;
    //   newFormError.landDetail = "Please enter LandDetail!";
    // } else {
    //   newFormError.landDetail = "";
    // }
    setFormError(newFormError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateForm();
    // if (formData.password === formData.confirmPassword) {
    if (valid) {
      try {
        // const form = new FormData();
        // form.append("",formData.name)
        const updateUserResponse = await userApi.updateUser(formData);

        if (updateUserResponse?.data?.code === 200) {
          toast.success(`Account created successfully`);
          localStorage.setItem("userId", updateUserResponse.data.data.UserID);
          dispatch(updateUser(updateUserResponse.data.data.data));
          dispatch(updateToken(updateUserResponse.data.data.token));
          onClose(true);
          loggedIn(true);
        } else if (updateUserResponse?.data?.code === 400) {
          toast.error(updateUserResponse?.data?.message, {
            textAlign: "center",
          });
        } else {
          // toast.error(`Something went wrong!`);
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

  // useEffect(() => {
  //   getState();
  //   getFranchises(formData.cityId, formData.stateId);
  // }, [getState, formData.cityId, formData.stateId]);

  useEffect(() => {
    getState();
  }, [getState, formData.stateId]);
  
  useEffect(() => {
    if (formData.stateId && formData.cityId) {
      getFranchises(formData.cityId, formData.stateId);
    }
  }, [ formData.cityId, formData.stateId]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Box width={'100%'}>
        <Box padding={"52px 32px"} width={'100%'}>
          <form>
            <Heading textAlign={"center"} color={"#006837"}>
              Register
            </Heading>
            <Text textAlign={"center"} m={'auto'} width={{base:"255px",md:'350px'}} pt={2} opacity={"50%"} fontSize={"15px"}>
              Get access to your Orders, Wishlist and  Recommendations
            </Text>
            <Box pt={4}>

            {/* <div class="input-container">
                <input
                  type="file"
                  class="animated-input"
                  id="profile"
                  placeholder=" "
                  value={formData.img}
                  name="img"
                  accept="image/png, image/jpeg"
                  onChange={(e)=>{
                    // console.log(e.target.files);
                    setFormData({ ...formData, ['img']: e.target?.files[0]})
                    setFile(e.target?.files[0]);
                  }}
                  maxLength={60}
                />
                <label for="example" class="animated-label">
                  Full Name
                </label>

                <img className="input-icon" src={profileIcon} />
                {formError.name && (
                  <div className="error-message">{formError.name}</div>
                )}
              </div> */}
<Flex gap={{base:'0',md:"3",lg:'4'}} flexDirection={{base:'column',md:"row"}}>
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
                  Full Name
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
                {/* {formError.email && <div className="error-message">{formError.email}</div>} */}
              </div>
              </Flex>
              <Flex gap={{base:'0',md:"3",lg:'4'}} flexDirection={{base:'column',md:"row"}}>
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
                  State
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
                  City
                </label>

                <img className="input-icon" src={cityIcon} />
                {formError.cityId && (
                  <div className="error-message">{formError.cityId}</div>
                )}
              </div>
              </Flex>
              <Flex gap={{base:'0',md:"3",lg:'4'}} flexDirection={{base:'column',md:"row"}}>
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
                  Address
                </label>
                <img className="input-icon" src={addressIcon} />
                {formError.address && (
                  <div className="error-message">{formError.address}</div>
                )}
              </div>
              </Flex>
              <Flex gap={{base:'0',md:"3",lg:'4'}} flexDirection={{base:'column',md:"row"}}>
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
                  id="land"
                  placeholder=""
                  value={formData.landDetail}
                  name="landDetail"
                  onChange={onValueChange}
                  maxLength={120}
                />
                <label for="land" class="animated-label">
                  Land Details<span style={{fontSize:'13px'}}> (Area/Acre) (optional)</span>
                </label>
                <img className="input-icon" src={landDetailIcon} />
                {formError.landDetail && (
                  <div className="error-message">{formError.landDetail}</div>
                )}
              </div>
              </Flex>
              <Flex gap={{base:'0',md:"3",lg:'4'}} flexDirection={{base:'column',md:"row"}}>
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
              <Flex gap={{base:'0',md:"3",lg:'4'}} flexDirection={{base:'column',md:"row"}}>
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
              <Flex gap={{base:'0',md:"3",lg:'4'}} flexDirection={{base:'column',md:"row"}}>
              <div>
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
                  Password
                </label>
                <img className="input-icon" src={lockIcon} />
                <p className="eye-icon" onClick={handleShowPassword}>
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </p>
              </div>
              {formError.password && (
                <div className="error-message" style={{width:"300px"}}>{formError.password}</div>
              )}
              </div>
              <div>
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
                  Confirm Password
                </label>
                <img className="input-icon" src={lockIcon} />
                <p className="eye-icon" onClick={handleShowConfirmPassword}>
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </p>
              </div>

              {formError.confirmPassword && (
                <div className="error-message">{formError.confirmPassword}</div>
              )}
              </div>
              </Flex>
            </Box>
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
    </>
  );
};
export default UpdateDetails;
