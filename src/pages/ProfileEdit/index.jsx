import React from "react";
import "./profileDetails.css";
import SettingsMenu from "../../components/shared/SettingsMenu/index";

import {
  Input,
  InputGroup,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import SideProfile from "../../components/shared/ProfileSideBar";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";

const index = () => {
  return (
    <>
      <Flex pt={`0`} gap={3} marginTop={5} pb={5} flexWrap="wrap">
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "center" }}
          p={2}
          flex={1}
          maxW={{ base: "100%", md: "20%" }}
        >
          <SideProfile />
        </Flex>

        <Flex
          direction={"column"}
          padding={5}
          width={{ base: "100%"}}
          flex={1}
          maxW={{ base: "100%", md: "80%" }}  
          shadow={"lg"}
          rounded={"md"}
        >
          <Flex >

              <Heading fontSize={`28px`}>Profile Information</Heading>
              <Box >
                <Avatar src="https://bit.ly/broken-link" />
                <Flex direction={`column`} pl={`30px`} width={`full`}>
                  <Heading fontSize={`28px`}> Mike Edward </Heading>
                  <Heading fontSize={`18px`} fontWeight={`400`}>
                    mikeedward52@gmail.com
                  </Heading>
                </Flex>
              </Box>
          </Flex>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={5}>
            <GridItem minW={"300px"}>
              <Heading fontSize={`21px`} fontFamily={``}>
                Name
              </Heading>
              <Input
                placeholder="Enter first name"
                borderRadius={`full`}
                required
              />
            </GridItem>

            <GridItem minW={"300px"}>
              <Heading fontSize={`21px`} fontFamily={``}>
                Email Address
              </Heading>
              <Input
                placeholder="mikeedward52@gmail.com"
                width={"100%"}
                borderRadius={`full`}
                required
              />
            </GridItem>

            <GridItem minW={"300px"}>
              <Heading fontSize={`21px`} fontFamily={``}>
                Phone Number
              </Heading>
              <InputGroup>
                <InputLeftAddon children="+91" borderStartRadius={`full`} />
                <Input
                  type="tel"
                  placeholder="Enter Phone Number"
                  borderEndRadius={`full`}
                />
              </InputGroup>
            </GridItem>

            <GridItem minW={"300px"}>
              <Heading fontSize={`21px`} fontFamily={``}>
                State
              </Heading>
              <Select placeholder="Select State" borderRadius={`full`}>
                {/* Options */}
              </Select>
            </GridItem>

            <GridItem minW={"300px"}>
              <Heading fontSize={`21px`} fontFamily={``}>
                City
              </Heading>
              <Select placeholder="Select City" borderRadius={`full`}>
                {/* Options */}
              </Select>
            </GridItem>

            <GridItem minW={"300px"}>
              <Heading fontSize={`21px`} fontFamily={``}>
                Zip Code
              </Heading>
              <Input
                placeholder="Enter Zip Code"
                borderRadius={`full`}
                required
              />
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
    </>
  );
};

const NavigationMenu = ({ setMenu, menu }) => {
  return (
    <>
     <Flex justifyContent={'right'} pr={3}>
           {menu ? (
                        <img
                            style={{ cursor: "pointer" }}
                            src={cancelIcon}
                            width={'20px'}
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
  const [districts, setDistricts] = useState([]);
  const [franchise, setFranchise] = useState([]);
  
  const [frenchiseFormData, setfrenchiseFormData] = useState({
    name: "",
    email: "",
    contact: "",
    frnchiseId: "",
    cityId: "",
    stateId: "",
    tehsil: "",
    village: "",
  });

  const [formError, setformError] = useState({
    name: "",
    email: "",
    contact: "",
    gst: "",
    frenchiseId: "",
    cityId: "",
    stateId: "",
    tehsil: "",
    village: "",
  });

  const onValueChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setfrenchiseFormData({ ...frenchiseFormData, [name]: value });
  };

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

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
        <div className="edit--p--img">
          <img
            src="https://s3-alpha-sig.figma.com/img/63b9/b6ec/fcbbfb89e172228dac9ea0121de7892b?Expires=1698019200&Signature=bpQLU4sEKktBqZ-Po7DOZKDKl9wbdditnQejJnvoOOwGN4l2NRQlA-ufIWh15QlvOvM~HwpnGFfOD3PivdC5fOaQG1GkIiqcZ934AtAmroKtCMH8KIb5zVL1XmtPOEjJXYwYepEbK7KUKS95bK~48GkIcyiAGM4OVGR8CYxDuwBLUtTTvrP735Z9QRyCS6giTgZUxipmEmITmsWNqeF548vsHdA~emNGtKNA-sF5lntpQOwKYFMU8m8lLFdbj9a5vJTsX4jOX06N2CrrMCXEgdFQ3HIJRV4BT2gBTNcsKVQKa5CFGJR-YAnHpeR5fichrRzuOqpp7gxzq-QGdrmqPg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
            width={40}
          />
        </div>
      </div>
      <form className="profile--form" action="">
        <div className="edit--basic--info">
          <Input
            flex={1}
            minW={"210px"}
            placeholder="Enter Full Name"
            size="md"
            value={frenchiseFormData.name}
            // defaultValue={name}
            name="name"
            onChange={onValueChange}
            onKeyPress={(e) => {
              if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <Input
            flex={1}
            minW={"210px"}
            placeholder="Enter Phone Number"
            size="md"
            value={frenchiseFormData.contact}
            // defaultValue={contact}
            name="contact"
            onChange={onValueChange}
            onKeyPress={(e) => {
             
              if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
              }
          }}
            maxLength={10}
          />
        </div>

        <InputGroup>
          <Input
            placeholder="Enter Email Id"
            value={frenchiseFormData.email}
            name="email"
            // defaultValue={email}
            onChange={onValueChange}
          />
          <InputRightElement>
            <CheckIcon color="green.500" />
          </InputRightElement>
        </InputGroup>

        {/* <InputGroup>
          <Input
            flex={1}
            minW={"210px"}
            value={frenchiseFormData.address}
            placeholder="Enter Address"
            name="address"
            size="md"
            onChange={onValueChange}
          />
        </InputGroup> */}

        <InputGroup>
          <Input
            flex={1}
            minW={"210px"}
            value={frenchiseFormData.village}
            placeholder="Enter Village"
            name="village"
            size="md"
            onChange={onValueChange}
          />
        </InputGroup>

        <InputGroup>
          <Input
            flex={1}
            // minW={"210px"}
            value={frenchiseFormData.tehsil}
            placeholder="Enter Tehsil"
            name="tehsil"
            size="md"
            onChange={onValueChange}
          />
        </InputGroup>

        

        <div className="edit--basic--info">
          <Select
            placeholder="Select State "
            type="select"
            id="state"
            name="stateId"
            value={frenchiseFormData.stateId}
            onChange={(e) => {
              onValueChange(e);
              // getDistricts(e.target.value);
            }}
            error={formError.stateId}
            forType={`state`}
          >
            {/* {allStates.map((country, index) => {
              return (
                <option value={country.stateId} key={index}>
                  {country.name}
                </option>
              );
            })} */}
          </Select>
          <Select
            placeholder="Select District *"
            type="select"
            id="district"
            name="cityId"
            value={frenchiseFormData.cityId}
            onChange={(e) => {
              onValueChange(e);
              // getFranchise(e.target.value);
            }}
            error={formError.cityId}
            options={districts}
            forType={`district`}
          >
            {/* {districts.map((district, index) => {
              return (
                <option value={district.districtId} key={index}>
                  {district.name}
                </option>
              );
            })} */}
          </Select>
          <Select
            placeholder="Select Franchise *"
            type="select"
            id="franchise"
            name="franchiseId"
            value={frenchiseFormData.frenchiseId}
            onChange={(e) => {
              onValueChange(e);
            }}
            error={formError.frenchiseId}
            options={franchise}
            forType={`franchise`}
          >
            {/* {franchise.map((fran, index) => {
              return (
                <option value={fran.frenchiseId} key={index}>
                  {fran.name}
                </option>
              );
            })} */}
          </Select>
        </div>

       

        <Flex justifyContent={"space-between"} gap={2} marginTop={10}>
          <Button
            colorScheme="green"
            variant="outline"
            width={"100%"}
            onClick={(e) => {
              navigate(`/product/${row.productId}`);
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="green"
            background={"#006C1E"}
            color={"#fff"}
            width={"100%"}
            fontSize={"14px"}
            // onClick={handleSubmit}
          >
            Save
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default EditProfile;
