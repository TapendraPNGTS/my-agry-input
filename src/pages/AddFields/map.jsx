import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Input, VStack, Card} from '@chakra-ui/react';
import { CiSearch } from "react-icons/ci";
import { BiCurrentLocation } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLocation } from '../../redux/redux-slice/location.slice';

const MapBox = () =>{
    const [map, setMap] = useState(null);
      const [currentLocation, setCurrentLocation] = useState(null);
      const [searchQuery, setSearchQuery] = useState('');
      const [locationMarkers, setLocationMarkers] = useState([]);
      const [suggestions, setSuggestions] = useState([]);
      const [searchBox, setSearchBox] = useState(false);

      const dispatch = useDispatch();
      const selectedLocation = useSelector(state => state.location.selectedLocation);

    console.log("selectedlocation", selectedLocation);
    
      console.log("location", currentLocation);
      
      useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcm9pZGFtYW4iLCJhIjoiY2t1MjZ4bThoNDN2ajJvbXA0amc0eWN3NSJ9.vo7c-t6sXINoS7Cs7qTwVA';
    
        const initialViewport = {
          latitude: 37.7577,
          longitude: -122.4376,
          zoom: 8,
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
    
          dispatch(setSelectedLocation({
            latitude: latitude.toFixed(4),
            longitude: longitude.toFixed(4),
            city: data.features[0].place_name
          }));
    
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
    
    
      const handleMapClick = async (event) => {
        if (!map) return;
    
        const { lngLat } = event;
        const [longitude, latitude] = lngLat.toArray();
    
        try {
          const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`);
          const data = await response.json();
          const cityName = data.features.find(feature => feature.place_type.includes('place')).text;
    
          dispatch(setSelectedLocation({
            latitude: latitude.toFixed(4),
            longitude: longitude.toFixed(4),
            city: cityName
          }));
    
          // Remove previous location markers
          if (locationMarkers.length > 0) {
            locationMarkers[0].remove();
            setLocationMarkers([]);
          }
    
          // Add marker for clicked location
          const marker = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map);
    
          setLocationMarkers([marker]);
        } catch (error) {
          console.error('Error fetching location data:', error);
        }
      };
    
      const handleSelectSuggestion = (selectedLocation, e) => {
        const [longitude, latitude] = selectedLocation.center;
    
        dispatch(setSelectedLocation({
          latitude: latitude.toFixed(4),
          longitude: longitude.toFixed(4),
          city: selectedLocation.place_name
        }));
    
        map.flyTo({ center: [longitude, latitude], zoom: 10 });
    
        setSearchQuery('');
        setSuggestions([]);
        handleSearchClick(e);
      };
    
      const getCurrentPo = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            map.setCenter([longitude, latitude]);
            // Add marker for current location
            const marker = new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .addTo(map);
    
            setLocationMarkers([marker]);
          },
          (error) => console.error('Error getting current location:', error)
        );
    
        map.on('click', handleMapClick);
    
        return () => {
          map.off('click', handleMapClick);
        };
      }
    
      useEffect(() => {
        if (map) {
          getCurrentPo();
        }
      }, [map]);
    
      const searchBoxRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setSearchBox(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    
      const handleSearchClick = (e) => {
        e.stopPropagation(); 
        setSearchBox(prevState => !prevState);
      };

    return(
        <Box h="90vh" position="relative">
          <Box id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%', height: '100%' }} />
          <Box position="absolute" top="10px" left="10px" zIndex="999">
            <Box display={searchBox ? "none" : "block"} fontSize="40px" fontWeight="bold">
              <CiSearch cursor="pointer" onClick={handleSearchClick} />
              <BiCurrentLocation cursor="pointer" onClick={getCurrentPo} />
            </Box>
          </Box>
          <Box>
            {searchBox && (
              <VStack ref={searchBoxRef} position="absolute" top="10px" left="10px" bg="white" h="300px" w="400px" rounded="xl" zIndex="99">
                <Input
                  border="1px solid black"
                  placeholder="Search location"
                  zIndex={999}
                  autoFocus
                  w="100%"
                  bg="white"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value), handleSearch() }}
                />
                {suggestions.map((location, index) => (
                  <Text alignSelf="start" ml={2} p={1} border="1px solid #d6d6d6" borderRadius="4px" textAlign="start" display="flex" justifyItems="start"
                   cursor="pointer" noOfLines={1} key={index} onClick={(e) => handleSelectSuggestion(location, e)}>
                    {location.place_name}
                  </Text>
                ))}
              </VStack>
            )}
          </Box>
          {currentLocation && (
            <Card position="absolute" top="10px" right="10px" bg="white" p="4" borderRadius="md" boxShadow="md">
              <Text>Location Details</Text>
              <Text>Latitude: {currentLocation.latitude}</Text>
              <Text>Longitude: {currentLocation.longitude}</Text>
    
              <Text>City: {currentLocation.city}</Text>
            </Card>
          )}
        </Box>
    )
}
export default MapBox;