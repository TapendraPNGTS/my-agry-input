import React from "react";
import "./profile.css";
import CategoryLayout from "../../components/layout/CategoryLayout";
import SettingsMenu from "../../components/shared/SettingsMenu";
import Back from "../../assets/setting-image/setback.svg";
import wishlistBgImg from "../../assets/images/wishlist-bg-img.svg";

import {
  Input,
  Img,
  InputGroup,
  InputRightElement,
  Select,
  Flex,
  Button,
  Image,
  Avatar,
  Box,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { getUserLocal } from "../../utils/localStorage.util";
import UserApi from "../../apis/user.api";
import OtherApi from "../../apis/other.api";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../redux/redux-slice/state.slice";
import toast from "react-hot-toast";
import { updateUser } from "../../redux/redux-slice/user.slice";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";
import { BsCamera } from "react-icons/bs";

const Profile = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div>
        <Image width={"100%"} height={"auto"} src={wishlistBgImg} />
      </div>
      <div className="settings--page--container">
        <CategoryLayout
          left={<NavigationMenu setMenu={setMenu} menu={menu} />}
          right={<EditProfile setMenu={setMenu} menu={menu} />}
          navOpen={menu}
        />
      </div>
    </>
  );
};

const NavigationMenu = ({ setMenu, menu }) => {
  return (
    <>
      <Flex justifyContent={"right"} pr={3}>
        {menu ? (
          <img
            style={{ cursor: "pointer" }}
            src={cancelIcon}
            width={"20px"}
            alt=""
            onClick={() => setMenu(false)}
          />
        ) : null}
      </Flex>
      <div className="navigation--menu--container">
        <h2>
          {menu ? (
            <img
              style={{ cursor: "pointer" }}
              src={Back}
              alt=""
              onClick={() => setMenu(false)}
            />
          ) : null}
          Settings
        </h2>
        <div className="navigation--items">
          <SettingsMenu />
        </div>
      </div>
    </>
  );
};

const EditProfile = ({ menu, setMenu }) => {
  // const userData = getUserLocal();
  const userApi = new UserApi();
  const otherApi = new OtherApi();
  const dispatch = useDispatch();
  const State = useSelector((state) => state.state.State);
  const userData = useSelector((state) => state.user.v_user_info);
  // console.log(userData);
  const [districts, setDistricts] = useState([]);
  const [file, setFile] = useState();
  const [filename, setFileName] = useState();
  const [imageView, setImageView] = useState(userData?.Image);

  const [franchises, setFranchise] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hovered, setHovered] = useState(false);

  const onValueChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
    setFormError({ ...formError, [name]: "" });
  };

  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId"),
    // name: userData.Name,
    // email: userData.Email,
    // contact: userData.Contact,
    // cityId: userData.CityID?.DistrictID,
    // stateId: userData.StateID?.StateID,
    // franchiseId: userData.FranchiseID?.FranchiseID,
    // adhaar: userData?.Aadhaar,
    // address: userData?.Address,
    // cropRabi: userData?.Crops?.Rabi,
    // cropKharif: userData?.Crops?.Kharif,
    // landDetail: userData?.LandDetail,
    // irrigation: userData?.Irrigation,
    // production: userData?.Production,

    address: "",
    cropRabi: "",
    cropKharif: "",
    landDetail: "",
    irrigation: "",
    production: "",
    image: "",
    name: "",
    email: "",
    cityId: "",
    stateId: "",
    adhaar: "",
    franchiseId: "",
  });

  const [formError, setFormError] = useState({
    userId: localStorage.getItem("userId"),
    address: "",
    cropRabi: "",
    cropKharif: "",
    landDetail: "",
    irrigation: "",
    production: "",
    image: "",
    name: "",
    email: "",
    cityId: "",
    stateId: "",
  });

  // const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const validateForm = () => {
    let isValid = true;
    const newFormError = { ...formError };
    if (formData.name === "") {
      newFormError.name = "Please enter your Name!";
      isValid = false;
    }
    // if (formData.email === "") {
    //   setformError((prevErrors) => ({ ...prevErrors, email: prevErrors.email || "Please enter your email!" }));
    //   isValid = false;
    // }
    // if (!emailPattern.test(formData.email)) {
    //   setformError((prevErrors) => ({ ...prevErrors, email: "Invalid email" }));
    //   isValid = false;
    // }
    if (formData.stateId === "") {
      newFormError.stateId = "Please select state!";
      isValid = false;
    }
    if (formData.cityId === "") {
      newFormError.cityId = "Please select state!";
      isValid = false;
    }
    if (formData.address === "") {
      newFormError.address = "Please enter address!";
      isValid = false;
    }
    if (formData.cropKharif === "") {
      isValid = false;
      newFormError.cropKharif = "Please enter crop kharif!";
    }

    if (formData.cropRabi === "") {
      isValid = false;
      newFormError.cropRabi = "Please enter crop rabi!";
    }

    if (formData.production === "") {
      isValid = false;
      newFormError.production = "Please enter production detail!";
    }

    if (formData.irrigation === "") {
      isValid = false;
      newFormError.irrigation = "Please enter irrigation detail!";
    }
    // if (formData.image === "") {
    //   isValid = false;
    //   newFormError.image = "Please upload your image!";
    // }
    // console.log(formData.landDetail == "undefined")
    if (formData.landDetail == "") {
      newFormError.landDetail = "Please enter LandDetail!";
    } else {
      newFormError.landDetail = "";
    }
    setFormError(newFormError);
    return isValid;
  };

  function handleChange1(event) {
    //image
    setFile(event.target.files[0]);
    setFileName(event.target.value);
    const files = URL.createObjectURL(event.target.files[0]);
    setImageView(files);
  }

  const getState = useCallback(async () => {
    try {
      const getStateResponse = await otherApi.getState();
      if (getStateResponse && getStateResponse.data.data) {
        dispatch(updateState(getStateResponse.data.data));
      }
    } catch (error) { }
  });

  const getDistrict = async (stateId) => {
    try {
      const getDistrictResponse = await otherApi.getDistrict({ stateId });
      if (getDistrictResponse && getDistrictResponse.data.data) {
        setDistricts(getDistrictResponse.data.data);
      }
    } catch (error) { }
  };

  const getFranchise = async (cityId) => {
    try {
      const getFranchiseResponse = await otherApi.getFranchise({
        cityId,
        stateId: formData.stateId,
      });
      if (getFranchiseResponse && getFranchiseResponse.data.data) {
        setFranchise(getFranchiseResponse.data.data);
      }
    } catch (error) { }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      var newformdata = new FormData();
      newformdata.append("name", formData.name);
      newformdata.append("cityId", formData.cityId);
      // console.log(file);
      newformdata.append("img", file);
      newformdata.append("stateId", formData.stateId);
      newformdata.append("franchiseId", formData.franchiseId);
      newformdata.append("address", formData.address);
      newformdata.append("cropRabi", formData.cropRabi);
      newformdata.append("cropKharif", formData.cropKharif);
      newformdata.append("landDetail", formData.landDetail);
      newformdata.append("irrigation", formData.irrigation);
      newformdata.append("production", formData.production);
      newformdata.append("adhaar", formData.adhaar);

      const updateUserResponse = await userApi.userChangesUpdate(newformdata);
      if (updateUserResponse && updateUserResponse.data.code == 200) {
        toast.success(`Profile updated successfully`);
        setIsDisabled(false);
      } else {
        setIsDisabled(false);
        toast.error(updateUserResponse.data.message);
      }
    } catch (error) {
      setIsDisabled(false);
      toast.error(error.message);
    }
  };

  const getUserProfile = async () => {
    try {
      const getProfileResponse = await userApi.getUserProfile();
      if (getProfileResponse && getProfileResponse.data.data) {
        console.log("city id",getProfileResponse.data?.data?.CityID?.DistrictID)
        dispatch(updateUser(getProfileResponse.data.data));
        setFormData({
          name: getProfileResponse.data.data.Name,
          email: getProfileResponse.data.data.Email,
          contact: getProfileResponse.data.data.Contact,
          stateId: getProfileResponse.data.data.StateID?.StateID,
          cityId: getProfileResponse.data?.data?.CityID?.DistrictID,
          franchiseId: getProfileResponse.data.data.FranchiseID?.FrenchiseID,
          adhaar: getProfileResponse.data.data?.Aadhaar,
          address: getProfileResponse.data.data?.Address,
          cropRabi: getProfileResponse.data.data?.Crops?.Rabi,
          cropKharif: getProfileResponse.data.data?.Crops?.Kharif,
          landDetail: getProfileResponse.data.data?.LandDetail,
          irrigation: getProfileResponse.data.data?.Irrigation,
          production: getProfileResponse.data.data?.Production,
        })
        setImageView(getProfileResponse.data.data?.Image)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getUserProfile();
    getState();
    getDistrict(userData.StateID?.StateID);
    getFranchise(userData.CityID?.DistrictID);
  }, []);

  return (
    <div className="edit--profile--container">
      <div className="edit--p--header">
        <h2>
          {" "}
          <span className="pro--ham--icon" onClick={() => setMenu(true)}>
            <HamburgerIcon />
          </span>{" "}
          Edit profile
        </h2>
      </div>
      <form className="profile--form" action="">
        <div className="edit--basic--info">
          <div style={{ width: "100%" }}>
            {/* {imageView ? (
              <Img
                borderRadius="full"
                boxSize="150px"
                src={imageView}
                alt="Dan Abramov"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  padding: "10px",
                }}
              />
            ) : (
              <></>
            )} */}
            <Flex justifyContent={'center'} mb={4}>
              <Box width={"150px"}
                height={'150px'}
                position={'relative'}
                className="box-overlay"
              >

                <Input

                  type="file"
                  flex={1}
                  // minW={"210px"}
                  width={"150px"}
                  height={'150px'}
                  size="md"
                  value={formData.file}
                  name="file"
                  onChange={(e) => {
                    handleChange1(e);
                  }}
                  zIndex={2}
                  borderRadius={'100%'}
                  opacity={'0'}
                  cursor={'pointer'}
                />
                <Flex
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  width={"150px"}
                  height={'150px'}
                  position="absolute"
                  top="0"
                  left="0"
                  textAlign={'center'}
                  zIndex={1}
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    borderRadius: '100%',
                    transition: 'opacity 0.3s ease',

                  }}
                  className="overlay-content"
                >
                  <Box><BsCamera fontSize={'30px'} fontWeight={'bold'} /></Box>
                  <Text fontWeight={'bold'}>Add Profile</Text>
                </Flex>


                <Avatar
                  position={'absolute'}
                  alt="image"
                  variant="rounded"
                  size="md"
                  src={imageView}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: "100%",
                    position: "absolute",
                    top: "0",
                    left: '0',
                    border: "1px solid lightgrey"
                  }}
                />
                <Text position={'absolute'} top={'75%'} right={'10%'} background={'white'} borderRadius={'100%'} p={'5px'}><BsCamera fill="#5e5ebf" fontSize={'30px'} fontWeight={'bold'} /></Text>

              </Box>
              {formError.image && (
                <span className="error-message">{formError.image}</span>
              )}
            </Flex>
          </div>

        </div>
        <div className="edit--basic--info">

          <div style={{ width: "100%" }}>
            <Text color={'#006C1E'} mb={2} fontWeight={'500'}>Full name</Text>
            <Input
              flex={1}
              minW={"210px"}
              width={"100%"}
              placeholder="Enter Full Name"
              size="md"
              value={formData.name}
              name="name"
              onChange={onValueChange}
              onKeyPress={(e) => {
                if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            {formError.name && (
              <span className="error-message">{formError.name}</span>
            )}
          </div>
          <div style={{ width: "100%" }}>
            <Text color={'#006C1E'} mb={2} fontWeight={'500'}>Mobile number</Text>
            <Input
              flex={1}
              minW={"210px"}
              width={"100%"}
              placeholder="Enter Phone Number"
              size="md"
              value={formData.contact}
              name="contact"
              onChange={onValueChange}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              maxLength={10}
              disabled
            />
          </div>
        </div>

        <div className="edit--basic--info">
        <div style={{ width: "100%" }}>
          <Text color={'#006C1E'} mb={2} fontWeight={'500'}>Address</Text>
          <Input
            flex={1}
            minW={"210px"}
            width={"100%"}
            placeholder="Enter your Address"
            size="md"
            value={formData.address}
            name="address"
            onChange={onValueChange}
          />
          {formError.address && (
            <span className="error-message">{formError.address}</span>
          )}
        </div>
        <div style={{ width: "100%" }}>
          <Text color={'#006C1E'} mb={2} fontWeight={'500'}>Land detail (total Area/Acres)</Text>
          <Input
            flex={1}
            minW={"210px"}
            width={"100%"}
            placeholder="Enter your land detail (Total Area/Acres)"
            size="md"
            value={formData.landDetail}
            name="landDetail"
            onChange={onValueChange}
          />
          {formError.landDetail && (
            <span className="error-message">{formError.landDetail}</span>
          )}
        </div>
        </div>
        <div className="edit--basic--info">
        <div style={{ width: "100%" }}>
          <Text color={'#006C1E'} mb={2} fontWeight={'500'}>Crop (kharif)</Text>

          <Input
            flex={1}
            minW={"210px"}
            width={"100%"}
            placeholder="Enter crop kharif"
            size="md"
            value={formData.cropKharif}
            name="cropKharif"
            onChange={onValueChange}
          />
          {formError.cropKharif && (
            <span className="error-message">{formError.cropKharif}</span>
          )}
        </div>
        <div style={{ width: "100%" }}>
          <Text color={'#006C1E'} mb={2} fontWeight={'500'}>Crop (rabi)</Text>
          <Input
            flex={1}
            minW={"210px"}
            width={"100%"}
            placeholder="Enter crop rabi"
            size="md"
            value={formData.cropRabi}
            name="cropRabi"
            onChange={onValueChange}
          />
          {formError.cropRabi && (
            <span className="error-message">{formError.cropRabi}</span>
          )}
        </div>
        </div>
        <div className="edit--basic--info">
        <div style={{ width: "100%" }}>
          <Text color={'#006C1E'} mb={2} fontWeight={'500'}>Production</Text>
          <Input
            flex={1}
            minW={"210px"}
            width={"100%"}
            placeholder="Enter Production Detail"
            size="md"
            value={formData.production}
            name="production"
            onChange={onValueChange}
          />
          {formError.production && (
            <span className="error-message">{formError.production}</span>
          )}
        </div>
        <div style={{ width: "100%" }}>
          <Text color={'#006C1E'} mb={2} fontWeight={'500'}>Irrigation</Text>
          <Input
            type="text"
            flex={1}
            minW={"210px"}
            width={"100%"}
            placeholder="Enter irrigation detail"
            size="md"
            p={"10px"}
            value={formData.irrigation}
            name="irrigation"
            onChange={onValueChange}


          />
          {formError.irrigation && (
            <span className="error-message">{formError.irrigation}</span>
          )}
        </div>
        </div>
        <div className="edit--basic--info">
        <div style={{ width: "100%" }}>
          <Text color={'#006C1E'} mb={2} fontWeight={'500'}>Aadhar number</Text>
          <Input
            type="text"
            flex={1}
            minW={"210px"}
            width={"100%"}
            placeholder="Enter Aadhar Number"
            size="md"
            p={"10px"}
            value={formData.adhaar}
            name="adhaar"
            onChange={onValueChange}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            maxLength={12}
          />
        </div>
        <div style={{width:'100%'}}>
          {/* <Flex direction={"column"} width={"100%"}> */}
            <Text color={'#006C1E'} mb={2} fontWeight={'500'}>Email</Text>

            <Input
              flex={1}
              minW={"210px"}
              width={"100%"}
              placeholder="Enter Email"
              size="md"
              p={"10px"}
              value={formData.email}
              name="email"
              onChange={onValueChange}
            />
            <div>
              {/* {formError.email && (
  <span className="error-message">{formError.email}</span>
)} */}
            </div>
          {/* </Flex> */}
        </div>
</div>
        <div className="edit--basic--info">
          <div style={{ width: "100%" }}>
            <Text color={'#006C1E'} mb={2} fontWeight={'500'}>State</Text>

            <Select
              flex={1}
              minW={"210px"}
              size="md"
              name="stateId"
              placeholder="Select State"
              value={formData.stateId}
              onChange={(e) => {
                onValueChange(e);
                getDistrict(e.target.value);
              }}
            >
              {State.map((state, index) => (
                <option key={index} value={state.StateID}>
                  {state.Name}
                </option>
              ))}
            </Select>
            {formError.stateId && (
              <span className="error-message">{formError.stateId}</span>
            )}
          </div>
          <div style={{ width: "100%" }}>
            <Text color={'#006C1E'} mb={2} fontWeight={'500'}>City</Text>

            <Select
              flex={1}
              minW={"210px"}
              placeholder="Select District"
              name="cityId"
              size="md"
              value={formData.cityId}
              onChange={(e) => {
                onValueChange(e);
                getFranchise(e.target.value);
              }}
            >
              {districts.map((item, index) => {
                return (
                  <option key={index} value={item.DistrictID}>
                    {item.Name}
                  </option>
                );
              })}
            </Select>
            {formError.cityId && (
              <span className="error-message">{formError.cityId}</span>
            )}
          </div>
        </div>
        <div className="edit--basic--info">
          <div style={{ width: "100%" }}>
            <Text color={'#006C1E'} mb={2} fontWeight={'500'}>Franchise</Text>
            <Select
              flex={1}
              minW={"210px"}
              size="md"
              name="franchiseId"
              placeholder="Select Franchise"
              value={formData.franchiseId}
              onChange={(e) => {
                onValueChange(e);
              }}
            >
              {franchises.map((franchise, index) => (
                <option key={index} value={franchise.FrenchiseID}>
                  {franchise.Name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <Flex justifyContent={"space-between"} gap={2} marginTop={10} mb={5}>
          <Button
            colorScheme="green"
            background={"#006C1E"}
            color={"#fff"}
            width={"100%"}
            fontSize={"14px"}
            onClick={handleSubmit}
            disabled={isDisabled}
            mb={5}
          >
            Save
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default Profile;
