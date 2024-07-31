import { Box, Text, Button, Image } from "@chakra-ui/react";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { MdOutlineNearMeDisabled } from "react-icons/md";
import Chat from "../../../pages/Chat/index";
import logo from '../../../assets/images/GraminShaktiLogo.svg';
import Farmer from '../../../assets/images/chat-icon-img.svg';
import remove from '../../../assets/images/remove-icon.svg';
// import daddu from '../../../assets/Images/daddu.SVG';

import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { useAuthenticated } from "../../../hooks/useAuthenticated.hook";
import { useNavigate } from "react-router-dom";
import "./style.css"
const FloatButton = () => {
    const navigate = useNavigate()
    const isAuth = useAuthenticated();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const chatBoxRef = useRef(null);

    const togglePopup = () => {
        isAuth ?
            setIsPopupOpen(!isPopupOpen) :
            navigate("/settings/whatsapp-chat")
    };

    useEffect(() => {
        if (isPopupOpen && chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [isPopupOpen]);

    return (

        <Box>

            <Box
                position="fixed"
                width="80px"
                height="70px"
                bottom={{base:"65px", md:'5px'}}
                right="30px"
                // backgroundColor="#25d366"
                color="#FFF"
                borderRadius="50px"
                textAlign="center"
                fontSize="30px"
                zIndex="999"
                className="float"
                // display={{ base: "none", md: "flex" }}


                style={{ transition: 'all 0.6s ease' }}
                onClick={togglePopup}

            >
                {
                    !isPopupOpen ?
                        //  <Image
                        //     w={"100%"}
                        //     src={Farmer}

                        // />
                        <button className="ButtonEffect"
                        ><MdMarkUnreadChatAlt style={{ marginLeft: "16px" }} /></button>
                        : <Image display={{ base: "none", md: "inline-block" }} ml={0} w={'64px'} cursor={'pointer'} src={remove} />
                }
            </Box>

            <Box
                zIndex="999"
                top={{ base: "0", md: "15%" }}
                right={{ base: "0", md: "2%" }}
                bg="white"
                h={{ base: "100%", md: "fit-content" }}
                width={{ base: "100%", md: "380px" }}
                pb={2}
                // border="1px solid red"
                boxShadow={'2px 2px 4px rgba(0,0,0,0.6)'}
                rounded={{ base: "0", md: "20" }}
                overflow="hidden"
                position="fixed"
                style={{
                    display: isPopupOpen ? 'block' : 'none',
                    transition: 'opacity 0.6s ease',
                }}
                ref={chatBoxRef}
            >
                <Box
                    display="flex"
                    gap={2}
                    justifyContent={'space-between'}
                    p={1}
                    bg="#006c1e"

                >
                    <Box display={'flex'} gap={2} textAlign="center"
                        justifyContent="space-between"
                        alignItems="center">
                        <IoMdArrowRoundBack cursor={'pointer'} onClick={togglePopup} fontSize={24} color="white" />
                        <Image rounded="full" w={12} src={Farmer} />
                        <Text textAlign={'start'}
                            display={'flex'} flexDir={'column'} textColor="white" fontSize={'20px'} fontWeight="semibold">
                            GRAMIN SHAKTI  <br />
                            <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                                Customer Support!
                            </span>
                        </Text>
                    </Box>
                    <Image rounded="sm" w={'auto'} src={logo} />
                </Box>

                <Chat />

            </Box>


        </Box>
    );
};

export default FloatButton;
