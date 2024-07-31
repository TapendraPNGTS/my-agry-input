import React from "react";
import {
  Input,
  Button,
  Select,
  Box,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Heading,
  Stack,
  Flex,
  Text,
} from "@chakra-ui/react";
import OtherApi from "../../apis/other.api";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../redux/redux-slice/state.slice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function HookForm() {
  const otherApi = new OtherApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const State = useSelector((state) => state.state.State);
  const [districts, setDistricts] = useState([]);
  const [stateIncharge, setStateIncharge] = useState([]);
  const [requestId, setRequestId] = useState("");
  const [regType, setRegType] = useState("");

  const [disableButton, setDissableButton] = useState(false);

  const getState = useCallback(async () => {
    try {
      const getStateResponse = await otherApi.getState();
      if (getStateResponse && getStateResponse.data.data) {
        dispatch(updateState(getStateResponse.data.data));
      }
    } catch (error) {}
  });

  const getDistrict = async (stateId) => {
    try {
      const getDistrictResponse = await otherApi.getDistrict({ stateId });
      if (getDistrictResponse && getDistrictResponse.data.data) {
        setDistricts(getDistrictResponse.data.data);
      }
    } catch (error) {}
  };

  const getStateIncharge = async () => {
    try {
      const getStateInchargeResponse = await otherApi.getStateIncharge();
      if (getStateInchargeResponse && getStateInchargeResponse.data.data) {
        setStateIncharge(getStateInchargeResponse.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getDivisionIncharge = async () => {
    try {
      const getStateInchargeResponse = await otherApi.getDivision();
      if (getStateInchargeResponse && getStateInchargeResponse.data.data) {
        setStateIncharge(getStateInchargeResponse.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDistrictIncharge = async () => {
    try {
      const getDistrictInchargeResponse = await otherApi.getDistrictIncharge();
      if (
        getDistrictInchargeResponse &&
        getDistrictInchargeResponse.data.data
      ) {
        setStateIncharge(getDistrictInchargeResponse.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getBlockIncharge = async () => {
    try {
      const getBlockInchargeResponse = await otherApi.getBlockIncharge();
      if (getBlockInchargeResponse && getBlockInchargeResponse.data.data) {
        setStateIncharge(getBlockInchargeResponse.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getClusterIncharge = async () => {
    try {
      const getClusterInchargeResponse = await otherApi.getClusterIncharge();
      if (getClusterInchargeResponse && getClusterInchargeResponse.data.data) {
        setStateIncharge(getClusterInchargeResponse.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getBronzeIncharge = async () => {
    try {
      const getClusterInchargeResponse = await otherApi.getAllFranchise();
      if (getClusterInchargeResponse && getClusterInchargeResponse.data.data) {
        setStateIncharge(getClusterInchargeResponse.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onValueChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
   
    
    setFormData({ ...formData, [name]: value });
    setformError({ ...formError, [name]: "" });
  };

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    cityId: "",
    stateId: "",
    regType: "",
    inchargeId: "",
    bankName: "",
    accountNumber: "",
    branchName: "",
    ifsc: "",
    firmName: "",
    firmType: "",
    gst: "",
    pincode: "",
    pstLicense: "",
    pstDate: "",
    pstValidDate: "",
    seedLicense: "",
    seedDate: "",
    seedValidDate: "",
    fertiLicense: "",
    fertiDate: "",
    fertiValidDate: "",
  });

  const [formError, setformError] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    cityId: "",
    stateId: "",
    regType: "",
    inchargeId: "",
    bankName: "",
    accountNumber: "",
    branchName: "",
    ifsc: "",
    firmName: "",
    firmType: "",
    gst: "",
    pincode: "",
    pstLicense: "",
    pstDate: "",
    pstValidDate: "",
    seedLicense: "",
    seedDate: "",
    seedValidDate: "",
    fertiLicense: "",
    fertiDate: "",
    fertiValidDate: "",
  });


  // Regular expressions for validation
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const gstRegex = /^\d{2}[A-Za-z]{5}\d{4}[A-Za-z]\d[Zz]\d{1}$/;

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (formData.name.trim() === "") {
        errors.name = "Please enter a name!";
        valid = false;
    }

    if (formData.contact.trim() === "") {
      errors.contact = "Please enter number!";
      valid = false;
  }else if (!phoneRegex.test(formData.contact)) {
        errors.contact = "Please enter a valid 10-digits of contact number!";
        valid = false;
    }

    // if (formData.email.trim() === "") {
    //     errors.email = "Please enter an email!";
    //     valid = false;
    // } else if (!emailRegex.test(formData.email)) {
    //     errors.email = "Please enter a valid email address!";
    //     valid = false;
    // }

    if (formData.address.trim() === "") {
      errors.address = "Please enter address!";
      valid = false;
  }
    if (formData.stateId.trim() === "") {
      errors.stateId = "Please select state!";
      valid = false;
  }
    if (formData.cityId.trim() === "") {
      errors.cityId = "Please select city!";
      valid = false;
  }
    if (formData.regType.trim() === "") {
      errors.regType = "This field is required!";
      valid = false;
  }

    setformError(errors);

    return valid;
};

const validateSecondForm = () =>{
  let valid = true;
  const errors = {};

  if (formData.bankName.trim() === "") {
      errors.bankName = "Please enter a bank name!";
      valid = false;
  }
  if (formData.accountNumber.trim() === "") {
      errors.accountNumber = "Please enter a account number!";
      valid = false;
  }
  if (formData.ifsc.trim() === "") {
      errors.ifsc = "Please enter IFSC code!";
      valid = false;
  }
  if (formData.branchName.trim() === "") {
      errors.branchName = "Please enter branchName!";
      valid = false;
  }
  setformError(errors);

  return valid;
}
  useEffect(() => {
    getState();
  }, []);

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = async () => {
    
    const isValids = await validateForm();
    setDissableButton(true);
    
    if (currentStep < 3) {
      if (currentStep == 0) {
        if (isValids) {
        try {
          const addFrenchiseResponse = await otherApi.addFrenchise1({
            name: formData.name,
            contact: formData.contact,
            email: formData.email,
            cityId: formData.cityId,
            stateId: formData.stateId,
            type: formData.regType,
            address: formData.address,
          });

          if (addFrenchiseResponse && addFrenchiseResponse.data.data) {
            setRequestId(addFrenchiseResponse.data.data);
            setCurrentStep(currentStep + 1);
            setDissableButton(false)
          } else {
            toast.error(addFrenchiseResponse.data.message);
            setDissableButton(false)
          }
        } catch (error) {
          toast.error(error.message);
          setDissableButton(false)
        }
      } else {
          
        setDissableButton(false);
    }
      } else if (currentStep == 1) {
        

        const isValid = await validateSecondForm();
        if (isValid) {
        try {
          const addFrenchiseResponse1 = await otherApi.addFrenchise2({
            bank: {
              BankName: formData.bankName,
              AccountNumber: formData.accountNumber,
              BranchName: formData.branchName,
              IFSCCode: formData.ifsc,
            },
            requestId: requestId,
            type: formData.regType,
          });

          if (addFrenchiseResponse1 && addFrenchiseResponse1.data.code == 200) {
            if (regType === "State") {
              navigate(`/request-success/${requestId}`);
            }
            setDissableButton(false)
            setCurrentStep(currentStep + 1);
          } else {
            toast.error(addFrenchiseResponse1.data.message);
            setDissableButton(false)
          }
        } catch (error) {
          toast.error(error.message);
          // setDissableButton(false)
        }}
        else {
          
          setDissableButton(false);
      }
      } else if (currentStep == 2) {
        
        try {
          var Data = {
           
            requestId: requestId,
            type: formData.regType,
            gst: formData.gst,
            pincode: formData.pincode,
            inchargeId: formData.inchargeId,
            firmName: formData.firmName,
            firmType: formData.firmType,
            presticide: {
              LicenseNumber: formData.pstLicense,
              StartDate: formData.pstDate,
              ValidUpto: formData.pstValidDate,
            },
            seed: {
              LicenseNumber: formData.seedLicense,
              StartDate: formData.seedDate,
              ValidUpto: formData.seedValidDate,
            },
            fertilizer: {
              LicenseNumber: formData.fertiLicense,
              StartDate: formData.fertiDate,
              ValidUpto: formData.fertiValidDate,
            }
          }

          // if(regType =='Franchise'){
          //   Data.append={
          //     ,
            
          //   }
          // }
          const addFrenchiseResponse3 = await otherApi.addFrenchise3(Data);

          if (addFrenchiseResponse3 && addFrenchiseResponse3.data.code == 200) {
            navigate(`/request-success/${requestId}`);
            // setDissableButton(false)
          } else {
            toast.error(addFrenchiseResponse3.data.message);
            // setDissableButton(false)
          }
        } catch (error) {
          toast.error(error.message);
          // setDissableButton(false)
        }
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div>
        <div className="home-parent">
          <div className="layout-container">
            <Card display={`flex`} mt={10}>
              <CardHeader pb={0}>
                <Heading size="md">
                  {currentStep == 0
                    ? `Basic Details`
                    : currentStep == 1
                    ? `Bank Details`
                    : `Registerations Details`}
                </Heading>
              </CardHeader>

              <CardBody pt={0}>
                <Stack divider={<StackDivider />} spacing="4">
                  <form action="">
                    <Box>
                      <div className="profile--form">
                        {currentStep === 0 ? (
                          <>
                            <div className="edit--basic--info">
                              <div style={{width:"100%"}}>
                              <Input
                                flex={1}
                                minW={"210px"}
                                placeholder="Enter Full Name"
                                size="md"
                                name="name"
                                value={formData.name}
                                onChange={onValueChange}
                                maxLength={60}
                                onKeyPress={(e) => {
                                  if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                               {formError.name && (
  <span style={{color:"red"}}>{formError.name}</span>
)}
                              </div>
                              <div style={{width:"100%"}}>
                              <Input
                                flex={1}
                                minW={"210px"}
                                placeholder="Enter Email"
                                size="md"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={onValueChange}
                                maxLength={60}
                              />
                               {/* {formError.email && (
  <span style={{color:"red"}}>{formError.email}</span>
)} */}
                              </div>
                            </div>
                            <div className="edit--basic--info">
                              <div style={{width:"100%"}}>
                              <Input
                                flex={1}
                                minW={"210px"}
                                placeholder="Enter Contact number"
                                size="md"
                                name="contact"
                                value={formData.contact}
                                onChange={onValueChange}
                                onKeyPress={(e) => {
                                  
                                  if (!/[0-9]/.test(e.key)) {
                                      e.preventDefault();
                                  }
                              }}
                                maxLength={10}
                              />
                               {formError.contact && (
  <span style={{color:"red"}}>{formError.contact}</span>
)}
                              </div>
                              <div style={{width:"100%"}}>
                              <Input
                                flex={1}
                                minW={"210px"}
                                placeholder="Enter Address"
                                size="md"
                                name="address"
                                value={formData.address}
                                onChange={onValueChange}
                                maxLength={100}
                              />
                               {formError.address && (
  <span style={{color:"red"}}>{formError.address}</span>
)}
                              </div>
                            </div>
                            <div className="edit--basic--info">
                              <div style={{width:"100%"}}>
                              <Select
                                flex={1}
                                minW={"210px"}
                                size="md"
                                name="stateId"
                                placeholder="Select State"
                                onChange={(e) => {
                                  onValueChange(e);
                                  getDistrict(e.target.value);
                                }}
                                value={formData.stateId}
                              >
                                {State.map((item, index) => {
                                  return (
                                    <option key={index} value={item.StateID}>
                                      {item.Name}
                                    </option>
                                  );
                                })}
                              </Select>
                              {formError.stateId && (
  <span style={{color:"red"}}>{formError.stateId}</span>
)}
                              </div>
                              <div style={{width:"100%"}}>
                              <Select
                                flex={1}
                                minW={"210px"}
                                placeholder="Select District"
                                name="cityId"
                                value={formData.cityId}
                                onChange={(e) => {
                                  onValueChange(e);
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
  <span style={{color:"red"}}>{formError.cityId}</span>
)}
                              </div>
                            </div>
                            <div className="edit--basic--info">
                              <Flex flexDirection={'column'} width={'100%'}>
                              <Select
                                flex={1}
                                minW={"210px"}
                                size="md"
                                name="regType"
                                placeholder="Select Registration Type"
                                value={regType}
                                onChange={(e) => {
                                  onValueChange(e);
                                  setRegType(e.target.value);
                                  if (
                                    e.target.value == "Division" 
                                  ) {
                                    getStateIncharge();
                                  }else  if (
                                    e.target.value == "District" 
                                  ) {
                                    getDivisionIncharge();
                                  }else if (
                                    
                                    e.target.value == "Block" 
                                  ) {
                                    getDistrict();
                                  }else if (
                                    e.target.value == "Cluster" 
                                  ) {
                                    getBlockIncharge();
                                  }else if (
                                    e.target.value == "Franchise"
                                  ) {
                                    getClusterIncharge();
                                  }else if (
                                    e.target.value == "Village"
                                  ) {
                                    getBronzeIncharge();
                                  }
                                }}
                              >
                                <option value={`State`}>Amerold</option>
                                <option value={`Division`}>Platinum</option>
                                <option value={`District`}>Diamond</option>
                                <option value={`Block`}>Gold</option>
                                <option value={`Cluster`}>Silver</option>
                                <option value={`Franchise`}>Bronze</option>
                                <option value={`Village`}>Gramin Shathi</option>
                              </Select>
                              {formError.regType && (
  <span style={{color:"red"}}>{formError.regType}</span>
)}</Flex>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        {currentStep === 1 ? (
                          <>
                            <div className="edit--basic--info">
                              <div style={{width:"100%"}}>
                              <Input
                                flex={1}
                                minW={"210px"}
                                placeholder="Enter Bank Name"
                                size="md"
                                name="bankName"
                                value={formData.bankName}
                                onChange={onValueChange}
                                maxLength={60}
                              />
                               {formError.bankName && (
  <span style={{color:"red"}}>{formError.bankName}</span>
)}
                              </div>
                              <div style={{width:"100%"}}>
                              <Input
                                flex={1}
                                minW={"210px"}
                                placeholder="Enter Account Number"
                                size="md"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={onValueChange}
                                maxLength={20}
                              />
                               {formError.accountNumber && (
  <span style={{color:"red"}}>{formError.accountNumber}</span>
)}
                              </div>
                            </div>
                            <div className="edit--basic--info">
                              <div style={{width:"100%"}}>
                              <Input
                                flex={1}
                                minW={"210px"}
                                placeholder="Enter IFSC Code"
                                size="md"
                                name="ifsc"
                                value={formData.ifsc}
                                onChange={onValueChange}
                                maxLength={12}
                              />
                               {formError.ifsc && (
  <span style={{color:"red"}}>{formError.ifsc}</span>
)}
                              </div>
                              <div style={{width:"100%"}}>
                              <Input
                                flex={1}
                                minW={"210px"}
                                placeholder="Enter Branch Name"
                                size="md"
                                name="branchName"
                                value={formData.branchName}
                                onChange={onValueChange}
                                maxLength={60}
                              />
                               {formError.branchName && (
  <span style={{color:"red"}}>{formError.branchName}</span>
)}
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        {currentStep === 2 ? (
                          <>
                            <div className="edit--basic--info">
                              <Select
                                flex={1}
                                minW={"210px"}
                                size="md"
                                name="regType"
                                placeholder="Select Registration Type"
                                value={regType}
                                onChange={(e) => {
                                  onValueChange(e)
                                  setRegType(e.target.value);
                                  if ( e.target.value == "Division") {
                                    getStateIncharge();
                                  }else if (e.target.value == "District") {
                                    getDivisionIncharge();
                                  }else if (e.target.value == "Block") {
                                    getDistrictIncharge();
                                  } else if (e.target.value == "Cluster") {
                                    getBlockIncharge();
                                  } else if (e.target.value == "Franchise") {
                                    getClusterIncharge();
                                  } else if (e.target.value == "Village") {
                                    getBronzeIncharge();
                                  }
                                }}
                              >
                                <option value={`State`}>Amerold</option>
                                <option value={`Division`}>Platinum</option>
                                <option value={`District`}>Diamond</option>
                                <option value={`Block`}>Gold</option>
                                <option value={`Cluster`}>Silver</option>
                                <option value={`Franchise`}>Bronze</option>
                                <option value={`Village`}>Gramin Shathi</option>
                              </Select>

                              {regType != "State" && regType != "" ? (
                                <Select
                                  flex={1}
                                  minW={"210px"}
                                  size="md"
                                  name="inchargeId"
                                  placeholder={`Select Incharge`}
                                  
                                  
                                  onChange={onValueChange}
                                >
                                  {stateIncharge.map((row, index) => {
                                    if (regType == "Division") {
                                      return (
                                        <option
                                          key={index}
                                          value={row.StateFID}
                                        >
                                          {row.Name}
                                        </option>
                                      );
                                    } else if (regType == "District") {
                                      return (
                                        <option
                                          key={index}
                                          value={row.DivisionID}
                                        >
                                          {row.Name}
                                        </option>
                                      );
                                    } else if (regType == "Block") {
                                      return (
                                        <option
                                          key={index}
                                          value={row.DistrictID}
                                        >
                                          {row.Name}
                                        </option>
                                      );
                                    } else if (regType == "Cluster") {
                                      return (
                                        <option key={index} value={row.BlockID}>
                                          {row.Name}
                                        </option>
                                      );
                                    } else if (regType == "Franchise") {
                                      return (
                                        <option
                                          key={index}
                                          value={row.ClusterID}
                                        >
                                          {row.Name}
                                        </option>
                                      );
                                    }
                                    else if (regType == "Village") {
                                      return (
                                        <option
                                          key={index}
                                          value={row.FrenchiseID}
                                        >
                                          {row.Name}
                                        </option>
                                      );
                                    }
                                  })}
                                </Select>
                              ) : (
                                <></>
                              )}
                            </div>

                            {regType == "Franchise" ? (
                              <>
                                <div className="edit--basic--info">
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Enter Firm Name"
                                    size="md"
                                    name="firmName"
                                    value={formData.firmName}
                                    onChange={onValueChange}
                                    pr={0}
                                  />
                                  <Select
                                    flex={1}
                                    minW={"210px"}
                                    size="md"
                                    name="firmType"
                                    placeholder="Select Firm Type"
                                    value={formData.firmType}
                                    onChange={onValueChange}
                                  >
                                    <option value="Prop">Prop</option>
                                    <option value="LLP">LLP</option>
                                    <option value="PVT. LTD.">PVT. LTD.</option>
                                    <option value="FPO">FPO</option>
                                    <option value="Corporative">
                                      Corporative
                                    </option>
                                  </Select>
                                </div>
                                <div className="edit--basic--info">
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Enter GST Number"
                                    size="md"
                                    name="gst"
                                    value={formData.gst}
                                    onChange={onValueChange}
                                    pr={0}
                                  />
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Enter Pin Code"
                                    size="md"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={onValueChange}
                                    pr={0}
                                  />
                                </div>
                                <Heading size="md">Pesticide License</Heading>
                                <div className="edit--basic--info">
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Pesticide License No"
                                    size="md"
                                    name="pstLicense"
                                    value={formData.pstLicense}
                                    onChange={onValueChange}
                                    pr={0}
                                  />
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Enter Date"
                                    size="md"
                                    name="pstDate"
                                    value={formData.pstDate}
                                    onChange={onValueChange}
                                    type="text"
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                    pr={0}
                                  />
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Valid Upto"
                                    size="md"
                                    name="pstValidDate"
                                    value={formData.pstValidDate}
                                    onChange={onValueChange}
                                    pr={0}
                                    type="text"
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                  />
                                </div>
                                <Heading size="md">Seed License</Heading>
                                <div className="edit--basic--info">
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Seed License No"
                                    size="md"
                                    name="seedLicense"
                                    value={formData.seedLicense}
                                    onChange={onValueChange}
                                    pr={0}
                                  />
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Enter Date"
                                    size="md"
                                    name="seedDate"
                                    value={formData.seedDate}
                                    onChange={onValueChange}
                                    type="text"
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                    pr={0}
                                  />
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Valid Upto"
                                    size="md"
                                    name="seedValidDate"
                                    value={formData.seedValidDate}
                                    onChange={onValueChange}
                                    pr={0}
                                    type="text"
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                  />
                                </div>
                                <Heading size="md">Fertilizer License</Heading>
                                <div className="edit--basic--info">
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Fertilizer License No"
                                    size="md"
                                    name="fertiLicense"
                                    value={formData.fertiLicense}
                                    onChange={onValueChange}
                                    pr={0}
                                  />
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Enter Date"
                                    size="md"
                                    name="fertiDate"
                                    value={formData.fertiDate}
                                    onChange={onValueChange}
                                    type="text"
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                    pr={0}
                                  />
                                  <Input
                                    flex={1}
                                    minW={"210px"}
                                    placeholder="Valid Upto"
                                    size="md"
                                    name="fertiValidDate"
                                    value={formData.fertiValidDate}
                                    onChange={onValueChange}
                                    pr={0}
                                    type="text"
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                  />
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <Flex
                        justifyContent={"space-between"}
                        gap={2}
                        marginTop={10}
                      >
                        {disableButton ? <Button
                            colorScheme="green"
                            background={"#006C1E"}
                            color={"#fff"}
                            width={"100%"}
                            fontSize={"14px"}
                            disabled
                          >
                            Save
                          </Button> :
                        <>
                        {currentStep < 2 ? (
                          <Button
                            colorScheme="green"
                            background={"#006C1E"}
                            color={"#fff"}
                            width={"100%"}
                            fontSize={"14px"}
                            onClick={nextStep}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            colorScheme="green"
                            background={"#006C1E"}
                            color={"#fff"}
                            width={"100%"}
                            fontSize={"14px"}
                            onClick={nextStep}
                          >
                            Submit
                          </Button>
                        )}
                        </>
                        }
                      </Flex>
                    </Box>
                  </form>
                </Stack>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
