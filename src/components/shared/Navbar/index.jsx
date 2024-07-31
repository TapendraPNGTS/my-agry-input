import React, { useEffect } from "react";
import "./navbar.css";
import { useState } from "react";
import {
  Button,
  Input,
  InputLeftElement,
  InputGroup,
  Icon,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Divider,
  PopoverCloseButton,
  Box,
} from "@chakra-ui/react";
import logo from "../../../assets/images/my-agri-input-logo.svg";

import profileIcon from "../../../assets/images/profile-icon.svg";
import cartIcon from "../../../assets/images/cart-icon.svg";
import searchIcon from "../../../assets/images/search-icon.svg";
import { SearchIcon } from "@chakra-ui/icons";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import AccountBtn from "../Login/index";
import Card from "../../Card";
import LoginFrom from "../../../pages/LoginForm/index";
import { useAuthenticated } from "../../../hooks/useAuthenticated.hook";
import { useOutsideClick } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { openLoginForm } from "../../../redux/redux-slice/viewCart.slice";
import LoginModal from "../LoginModal";
import FirebaseApi from "../../../apis/auth/auth.api";
import { messaging } from "../../../firebase/firebase";
import { getToken } from "firebase/messaging";
import GoogleTranslateButton from "../../../pages/languageTranslator";
import languageIcon from "../../../assets/images/language-icon.svg";
import { getUserLocal } from "../../../utils/localStorage.util";

const tokenUrl = import.meta.env.VITE_APP_FIREBASE_TOKEN_URL;

const Navbar = (user) => {
  const isAuth = useAuthenticated();
  const userData = getUserLocal();
  // console.log(userData);
  const ref = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuth);
  const [isSearchOpen, setisSearchOpen] = useState(false);
  const [size, setSize] = useState("xl");
  const [imageView, setImageView] = useState(userData?.Image);

  const products = useSelector((state) => state.products.Products);
  const dispatch = useDispatch();
  const authtokenapi = new FirebaseApi();
  const handleSizeClick = () => {
    // setSize("xl");
    if (!isLoggedIn) {
      onOpen(); // Open the modal only if not logged in
    }
  };

  const loggedIn = (data) => {
    setIsLoggedIn(data);
  };
  const handleSearchDialogOpen = (event) => {
    // console.log('handleSearchDialogOpen triggered');
    event.stopPropagation();
    if (!isSearchOpen) {
      setisSearchOpen(true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setisSearchOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    // console.log('handleFilter triggered');
    event.stopPropagation();
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = products.filter((value) => {
      return value.Name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSearchDialogClose = () => {
    setisSearchOpen(false);
  };
  const handleResultClick = () => {
    handleSearchDialogClose();
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const Cart = useSelector((state) => state.cart.Cart);

  const location = useLocation();

  const handleClickOutside1 = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setCartOpen(false);
    }
  };

  const handleClickOutside2 = (event) => {
    // if (ref2.current && !ref2.current.contains(event.target)) {
    //   setNotifOpen(false);
    // }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      const navbar = document.querySelector(".navbar-parent");
      const handleScroll = () => {
        if (window.scrollY > 20) {
          navbar.classList.add("sticky");
        } else {
          navbar.classList.remove("sticky");
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      const navbar = document.querySelector(".navbar-parent");
      navbar.classList.add("sticky");
      // alert('sdlkfj')
    }
  }, [window.location.pathname, location]);

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    setIsLoggedIn(isAuth);
  }, [isAuth]);

  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // Generate Token
        const userAgent = navigator.userAgent;
        const language = navigator.language;

        const combinedId = `${userAgent}-${language}`;
        const hashedId = btoa(combinedId);

        const token = await getToken(messaging, {
          vapidKey: tokenUrl,
        })
          .then(async (response) => {
            if (response) {
              const getfirebasetoken = await authtokenapi.firebaseToken({
                token: response,
                deviceId: hashedId,
              });
              if (
                getfirebasetoken &&
                getfirebasetoken.data.code === 201 &&
                getfirebasetoken.data.message == "Unauthorized"
              ) {
                handleLogout();
              }
            }
          })
          .catch((err) => {});
      } else if (permission === "denied") {
        alert("You denied for the notification");
      }
    }
    requestPermission();
    document.addEventListener("click", handleClickOutside1, true);
    document.addEventListener("click", handleClickOutside2, true);
    return () => {
      document.removeEventListener("click", handleClickOutside1, true);
      document.removeEventListener("click", handleClickOutside2, true);
    };
  }, []);

  // const handleLanguageIconClick = () => {

  //   if (!window.google || !window.google.translate) {

  //     function googleTranslateElementInit() {
  //       new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
  //     }

  //     const script = document.createElement('script');
  //     script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  //     script.async = true;
  //     document.head.appendChild(script);

  //     return () => {
  //       document.head.removeChild(script);
  //     };
  //   } else {

  //     new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
  //   }
  // };

  //   useEffect( () =>{
  // handleLanguageIconClick();
  //   },[])

  return (
    <>
      <div className="navbar-parent">
        <Link to="/">
          <div className="navbar-logo">
            <Image src={logo} width={"100%"} height={"65px"} />
          </div>
        </Link>

        <div>
          <ul>
            <Link
              to="/"
              className={`nav-links-items ${
                isLinkActive("/") && "active-nav-link"
              }`}
            >
              Home
            </Link>
            <Link
              to="/our-products"
              className={`nav-links-items ${
                isLinkActive("/our-products") && "active-nav-link"
              }`}
            >
              Our Products
            </Link>
            <Link
              to="/services"
              className={`nav-links-items ${
                isLinkActive("/services") && "active-nav-link"
              }`}
            >
              Services
            </Link>
            <Link
              to="/about-us"
              className={`nav-links-items ${
                isLinkActive("/about-us") && "active-nav-link"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className={`nav-links-items ${
                isLinkActive("/contact-us") && "active-nav-link"
              }`}
            >
              Contact Us
            </Link>
          </ul>
        </div>
        <div className="navbar-btns">
          {/* <div id="google_translate_element" className="language-container">
          <img className="language-icon"  src={languageIcon} onClick={handleLanguageIconClick}/>
        </div> */}

          <Image
            cursor={"pointer"}
            onClick={(event) => handleSearchDialogOpen(event)}
            src={searchIcon}
          />

          <Modal isOpen={isSearchOpen} onClose={() => setisSearchOpen(false)}>
            <ModalOverlay />
            <ModalContent
              marginTop={"135px"}
              width={{ base: "300px", md: "500px" }}
            >
              <Flex direction={"column"}>
                <InputGroup
                  width={{ base: "200px", lg: "200px", xl: "full" }}
                  display={{ base: "flex", md: "flex" }}
                  paddingBottom={"10px"}
                  paddingTop={"10px"}
                >
                  <InputLeftElement pointerEvents="none" marginTop={"10px"}>
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type=""
                    placeholder="Search..."
                    value={wordEntered}
                    onChange={handleFilter}
                    onClick={(e) => e.stopPropagation()}
                    focusBorderColor="none"
                    border={"none"}
                    _focusVisible={{
                      outline: "none",
                    }}
                  />
                </InputGroup>

                {filteredData.slice(0, 10).map((value, index) => {
                  return (
                    <>
                      <Link to={`/product-detail/${value.ProductID}`}>
                        <Text
                          key={index}
                          mr={5}
                          ml={5}
                          mt={2}
                          mb={2}
                          onClick={() => {
                            handleResultClick();
                            clearInput();
                          }}
                        >
                          {value.Name}
                        </Text>
                      </Link>
                      <Divider />
                    </>
                  );
                })}
              </Flex>
            </ModalContent>
          </Modal>

          {isLoggedIn ? (
            <>
              <Box position={"relative"}>
                <Text
                  top="0px"
                  right="-14px"
                  zIndex="2"
                  fontSize="12px"
                  borderRadius="50%"
                  background="#d60b28"
                  width="20px"
                  height="20px"
                  lineHeight="16px"
                  padding={"2px"}
                  display={Cart.length > 0 ? "block" : "none"}
                  textAlign="center"
                  color="white"
                  fontFamily="'Roboto', sans-serif"
                  fontWeight="bold"
                  position={"absolute"}
                >
                  {Cart.length}
                </Text>
                <Link to="/viewCart">
                  <button>
                    <Image pt={"2"} src={cartIcon} />
                  </button>
                </Link>
              </Box>
            </>
          ) : (
            <></>
          )}

          {isLoggedIn ? (
            <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
              <PopoverTrigger>
                <Image
                  cursor={"pointer"}
                  borderRadius = {imageView ?"full": ""}
                  boxSize={imageView?"150px":""}
                  style={
                    imageView
                      ? {
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          padding: "10px",
                        }
                      : {}
                  }
                  src={imageView ? imageView : profileIcon}
                />
              </PopoverTrigger>
              <PopoverContent
                mt={`2`}
                border={`none`}
                shadow={`md`}
                width={`250px`}
                mr={"2"}
              >
                <PopoverArrow />
                <PopoverBody>
                  <AccountBtn loggedIn={loggedIn} onClose={onClose} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Box
                alignItems={"center"}
                onClick={handleSizeClick}
               width={'100%'}
              >
                <Button
                  _hover={"none"}
                  _active={"none"}
                  bg={"#19884A"}
                  color={"white"}
                  p={"20px"}
                >
                  Login
                </Button>
              </Box>
              <LoginModal
                isOpen={isOpen}
                onClose={onClose}
                loggedIn={loggedIn}
                
              />
            </>
          )}
        </div>
      </div>
      {/* <Modal onClose={onClose}  isOpen={isOpen} width={"100%"}>
        <ModalOverlay />
        <ModalContent 
        marginLeft={'25px'}
        marginRight={'25px'}
        marginTop={{ base: "100px", sm: "120px", md: "120px" }} 
        >
          <ModalBody padding={`0`}>
            <ModalCloseButton zIndex={12} />
            <LoginFrom onClose={onClose} loggedIn={loggedIn} />
          </ModalBody>
         
        </ModalContent>
      </Modal> */}
      {/* <LoginModal  isOpen={isOpen} /> */}
    </>
  );
};

export default Navbar;
