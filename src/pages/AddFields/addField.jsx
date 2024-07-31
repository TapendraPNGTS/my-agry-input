import "../WishList/wishlist.css";
import CategoryLayout from "../../components/layout/CategoryLayout";
import SettingsMenu from "../../components/shared/SettingsMenu";
import Back from "../../assets/setting-image/setback.svg";
import { Flex, Skeleton, Image, Input, Box, Text, Heading, Button, VStack, Card, InputGroup, InputRightElement, Select } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import wishlistBgImg from "../../assets/images/wishlist-bg-img.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BiCurrentLocation } from "react-icons/bi";
import OtherApi from "../../apis/other.api";
import FieldApi from "../../apis/advisory.api";
import { updateState } from "../../redux/redux-slice/state.slice";
import toast from "react-hot-toast";
import "./index.css";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";

const AddFields = () => {
  const [menu, setMenu] = useState(false);


  return (
    <>
      <div>
        <Image width={'100%'} height={'auto'} src={wishlistBgImg} />
      </div>
      <div className="settings--page--container">
        <CategoryLayout
          left={<NavigationMenu setMenu={setMenu} menu={menu} />}
          right={
            <WishlistCards setMenu={setMenu} menu={menu} />
          }
          navOpen={menu}
        />
      </div>
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

const WishlistCards = ({ setMenu }) => {

  const navigate = useNavigate();

  const otherApi = new OtherApi();
  const fieldApi = new FieldApi();

  const [fieldName, setFieldName] = useState("");
  const [fieldId, setFieldId] = useState("");
  const [cropName, setCropName] = useState("");
  const [landDetail, setLandDetail] = useState("");
  const [landMark, setLandMark] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [fieldNameError, setFieldNameError] = useState("");
  const [cropNameError, setCropNameError] = useState("");
  const [landDetailError, setLandDetailError] = useState("");
  const [landMarkError, setLandMarkError] = useState("");
  const [stateIdError, setStateIdError] = useState("");
  const [cityIdError, setCityIdError] = useState("");
  const [locationNameError, setLocationNameError] = useState("");

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
  
    if (fieldName === "") {
      isValid = false;
      setFieldNameError("This field is required!");
    } else {
      setFieldNameError("");
    }
  
    if (cropName === "") {
      isValid = false;
      setCropNameError("This field is required!");
    } else {
      setCropNameError("");
    }
  
    if (landDetail === "") {
      isValid = false;
      setLandDetailError("This field is required!");
    } else {
      setLandDetailError("");
    }
  
    if (landMark === "") {
      isValid = false;
      setLandMarkError("This field is required!");
    } else {
      setLandMarkError("");
    }
  
    if (stateId === "") {
      isValid = false;
      setStateIdError("Please select state!");
    } else {
      setStateIdError("");
    }
  
    if (cityId === "") {
      isValid = false;
      setCityIdError("Please select city!");
    } else {
      setCityIdError("");
    }
  
    if (locationName === "") {
      isValid = false;
      setLocationNameError("Please select location!");
    } else {
      setLocationNameError("");
    }
  
    return isValid;
  };

  

  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.state.State);
  const [districts, setDistricts] = useState([]);

  console.log("states", stateData);

  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationMarkers, setLocationMarkers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchBox, setSearchBox] = useState(false);

  // console.log("selectedlocation", currentLocation);
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcm9pZGFtYW4iLCJhIjoiY2t1MjZ4bThoNDN2ajJvbXA0amc0eWN3NSJ9.vo7c-t6sXINoS7Cs7qTwVA';

    const initialViewport = {
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 18,
    };

    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialViewport.longitude, initialViewport.latitude],
      zoom: initialViewport.zoom
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);
  
  const handleSearch = async () => {
    if (!searchQuery || !map) return;
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${mapboxgl.accessToken}`);
      const data = await response.json();
      setSuggestions(data.features);
  
      const [longitude, latitude] = data.features[0].center;
  
      setCurrentLocation({
        latitude: latitude.toFixed(4),
        longitude: longitude.toFixed(4),
        city: data.features[0].place_name
      });
  
      setLocationName(data.features[0].place_name);
      setLatitude(latitude.toFixed(4));
      setLongitude(longitude.toFixed(4));

  
      // Remove old search markers
      locationMarkers.forEach(marker => marker.remove());
      setLocationMarkers([]);
  
      // Add marker for searched location
      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
  
      setLocationMarkers([marker]);
  
      // Fly to the searched location
      // map.flyTo({ center: [longitude, latitude], zoom: 10 });
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };
  
  const handleSelectSuggestion = (selectedLocation, e) => {
    const [longitude, latitude] = selectedLocation.center;

    // Remove previous location markers
    locationMarkers.forEach(marker => marker.remove());

    // Add marker for selected location
    const marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);

    setLocationMarkers([marker]);

    setCurrentLocation({
      latitude: latitude.toFixed(4),
      longitude: longitude.toFixed(4),
      city: selectedLocation.place_name
    });

    setLocationName(selectedLocation.place_name);
    setLatitude(latitude.toFixed(4));
    setLongitude(longitude.toFixed(4));

    map.flyTo({ center: [longitude, latitude], zoom: 10 });

    setSearchQuery(selectedLocation.place_name);
    setSuggestions([]);
    handleSearchClick(e);
  };

  const handleMapClick = async (event) => {
    if (!map) return;
  
    const { lngLat } = event;
    const [longitude, latitude] = lngLat.toArray();
  
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`);
      const data = await response.json();
      const cityName = data.features.find(feature => feature.place_type.includes('place')).text;
  
      if (currentLocation && currentLocation.marker) {
        currentLocation.marker.remove();
      }
     

      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
  
      setCurrentLocation({
        latitude: latitude.toFixed(4),
        longitude: longitude.toFixed(4),
        city: cityName,
        marker: marker 
      });

      setLocationName(cityName);
      setLatitude(latitude.toFixed(4));
      setLongitude(longitude.toFixed(4));
  
  
      setSearchQuery(cityName);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };
  
  const getCurrentPo = () => {
    if (!map) return; // Check if map is initialized

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setCenter([longitude, latitude]);
        // Add marker for current location
        const marker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map);

        setLocationMarkers([marker]);

        // Fetch current city name
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`)
          .then(response => response.json())
          .then(data => {
            const cityName = data.features.find(feature => feature.place_type.includes('place')).text;
            setCurrentLocation({
              latitude: latitude.toFixed(4),
              longitude: longitude.toFixed(4),
              city: cityName
            });
            setLocationName(cityName);
            setLatitude(latitude.toFixed(4));
            setLongitude(longitude.toFixed(4));

            setSearchQuery(cityName);
          })
          .catch(error => console.error('Error getting current location details:', error));
      },
      (error) => console.error('Error getting current location:', error)
    );
  };

  useEffect(() => {
    if (map) {
      getCurrentPo();
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.on('click', handleMapClick);
    }

    return () => {
      if (map) {
        map.off('click', handleMapClick);
      }
    };
  }, [map]);

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

  const handleSubmit = useCallback(async () => {
    const valid = validateForm();

    if(valid){
    try {
      const getfieldResponse = await fieldApi.addFieldsData({
        fieldName: fieldName,
        cropName: cropName,
        landDetail: landDetail,
        stateId: stateId,
        cityId: cityId,
        locationName: locationName,
        latitude: latitude,
        longitude: longitude,
        landMark: landMark,
      });
      if (getfieldResponse?.data?.data === 200) {
        console.log("data",getfieldResponse?.data?.data)
        toast.success(`Added successfully`);
        setLoading(true);
      }
      navigate('/settings/fields');
      setFormData({
        fieldName: "",
        cropName: "",
        landDetail: "",
        landMark: "",
        stateId: "",
        cityId: "",
        locationName: "",
        latitude: "",
        longitude: "",
      });
      
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  }else{
    toast.error("All fields are required!")
  }
  });

  useEffect(() => {
    getState();
    
  }, [getState, stateId]);

  const handleSearchClick = (e) => {
    e.stopPropagation();
    setSearchBox(prevState => !prevState);
  };

 


  return (
    <Box>
      <Text fontSize={'26px'} fontWeight={'medium'}>Edit Field</Text>
      <Flex width={'100%'} flexDirection={{ base: 'column', md: 'row' }} gap={5} mt={8}>
        <Box width={'100%'}>
          <Text mb={2} fontWeight={'500'}>Field Name</Text>
          <Input
            type="text"
            name='fieldName'
            bgColor={'white'}
            value={fieldName}
            onChange={(e) => {setFieldName(e.target.value)
              setFieldNameError("");
            }}
            placeholder="Enter field Name" />
         {fieldNameError && <span  className="error-message">{fieldNameError}</span>}

        </Box>
        <Box width={'100%'}>
          <Text mb={2} fontWeight={'500'}>Crop Name</Text>
          <Input
            type="text"
            name="cropName"
            bgColor={'white'}
            value={cropName}
            onChange={(e) => {setCropName(e.target.value)
              setCropNameError("")
            }}
            placeholder="Enter crop Name" />
                  {cropNameError && <span  className="error-message">{cropNameError}</span>}

        </Box>
      </Flex>
      <Flex width={'100%'} flexDirection={{ base: 'column', md: 'row' }} gap={5} mt={6}>
        <Box width={'100%'}>
          <Text mb={2} fontWeight={'500'}>LandDetail (total Area/Acres)</Text>
          <Input type="number"
            name="landDetail"
            bgColor={'white'}
            value={landDetail}
            onChange={(e) => {setLandDetail(e.target.value)
              setLandDetailError("");
            }}
            placeholder="Enter your land detail" />
                           {landDetailError && <span  className="error-message">{landDetailError}</span>}

        </Box>
        <Box width={'100%'}>
          <Text mb={2} fontWeight={'500'}>LandMark</Text>
          <Input
            type="text"
            name="landMark"
            bgColor={'white'}
            value={landMark}
            onChange={(e) => {setLandMark(e.target.value)
             setLandMarkError("")
            }}
            placeholder="Enter land mark" />
                           {landMarkError && <span  className="error-message">{landMarkError}</span>}

        </Box>

      </Flex>
      <Flex width={'100%'} flexDirection={{ base: 'column', md: 'row' }} gap={5} mt={6}>
        <Box width={'100%'}>
          <Text mb={2} fontWeight={'500'}>State</Text>
          <Select
            name="stateId"
            placeholder="Select state"
            value={stateId}
            onChange={(e) => {
              setStateId(e.target.value)
              getDistrict(e.target.value);
              setStateIdError("");
            }}
            bg={'white'}
          >

            {stateData.map((state, index) => (
              <option key={index} value={state.StateID}>
                {state.Name}
              </option>
            ))}


          </Select>
          {stateIdError && <span  className="error-message">{stateIdError}</span>}

        </Box>
        <Box width={'100%'}>
          <Text mb={2} fontWeight={'500'}>City</Text>
          <Select
            name="cityId"
            placeholder="Select city"
            value={cityId}
            onChange={(e) => {
              setCityId(e.target.value)
              setCityIdError("");
            }}
            bg={'white'}

          >
            {districts.map((item, index) => (
              <option key={index} value={item.DistrictID}>
                {item.Name}
              </option>
            ))}
          </Select>
          {cityIdError && <span  className="error-message">{cityIdError}</span>}

        </Box>

      </Flex>
      <Box width={'100%'} mt={6}>
        <Text mb={2} fontWeight={'500'}>Location</Text>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type="text"
            bgColor={'white'}
            name="locationName"
            placeholder="Enter your location"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value),
               handleSearch() 
              setLocationNameError("");
              }}
          />

          <InputRightElement>
            <BiCurrentLocation fontSize={'30px'} cursor="pointer" onClick={getCurrentPo} />
          </InputRightElement>
        </InputGroup>
          {locationNameError && <span  className="error-message">{locationNameError}</span>}
        <Box background={'white'}>
        {searchQuery === "" ? "" : <>
          {suggestions.map((location, index) => (
            <Text alignSelf="start" ml={2} p={1} textAlign="start" display="flex" justifyItems="start"
              cursor="pointer" noOfLines={1} key={index} onClick={(e) => handleSelectSuggestion(location, e)}>
              {location.place_name}
            </Text>
          ))}
          </>
}
        </Box>

      </Box>

      <Box h="400px" position="relative" mt={5}>
        <Box id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%', height: '100%' }} />
       
        {currentLocation && (
          <Card position="absolute" top="10px" right="10px" bg="white" p="4" borderRadius="md" boxShadow="md">
            <Text>Location Details</Text>
            <Text>Latitude: {currentLocation.latitude}</Text>
            <Text>Longitude: {currentLocation.longitude}</Text>

            <Text>City: {currentLocation.city}</Text>
          </Card>
        )}
      </Box>

      <Flex justifyContent={'center'} gap={10} mt={10} mb={10}>
       
        {loading ? <Spinner color='green' />
        :
        <Button _hover={'none'}
          _active={'none'}
          color={'white'}
          bgColor={'#006C1E'}
          border={'1px solid #006C1E'}
          p={'10px 30px'}
          fontWeight={'400'}
          onClick={handleSubmit}
        >Edit Field</Button>
        
}
      
      </Flex>
    </Box>
  );
};

export default AddFields;


