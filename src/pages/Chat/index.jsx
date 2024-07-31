import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Flex,
  Button,
  Input,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  Box,
  Image,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import logo from '../../assets/images/GraminShaktiLogo.svg';
import { CircularProgress } from '@chakra-ui/react'
import { io } from "socket.io-client";
import { AttachmentIcon } from "@chakra-ui/icons";
import { FaVideo } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import sendIcon from "../../assets/images/send-icon.svg";

import UserAPI from "../../apis/auth/auth.api";
import ChatBubble from "./chatBody/messageBubble";
import toast from "react-hot-toast";
import { BiFullscreen } from "react-icons/bi";
import { getUserLocal } from "../../utils/localStorage.util";

const baseURL = import.meta.env.VITE_LIVE_CHAT_SOCKET;

const index = () => {
  const socket = useRef();
  const userapi = new UserAPI();
  const [messages, setMessages] = useState([]);
  const [file1, setFile1] = useState([]);
  const [fileName1, setFileName1] = useState([]);
  const [fileName2, setFileName2] = useState([]);
  const [imageView, setImageView] = useState([]);
  const [checkFile, setCheckFile] = useState("image");
  const [sendSpinner, setSendSpinner] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emoji, setEmoji] = useState(false);

  //for date formate
  let displayedDate = null;

  const [inputMessage, setInputMessage] = useState("");
  const userData = getUserLocal();
  const userId = userData?.UserID
  const divRef = useRef(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };

  const getAllChat = useCallback(async () => {
    try {
      const response = await userapi.chatHistory({
        senderId: userId,
        receiverId: "EMP1000",
        type: "gramin",
      });

      if (!response || !response.data.data) {
        // toast.error("Something went wrong");
      } else if (response.data.code === 200 && response.data.data) {
        scrollToBottom()

        setMessages(response.data.data);
        displayedDate = null; // Reset the displayedDate
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  });


  useEffect(() => {
    getAllChat();
    socket.current = io(baseURL);
    socket.current.emit("addUser", userId, "gramin");
    socket.current.on("getMessage", (data) => {
      setMessages(data);
      scrollToBottom();
    });
    socket.current.on('newNotification', (data) => {
      new Notification(data?.title, { body: data?.body, icon: logo });

    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    setSendSpinner(true);
    if (userId && (inputMessage || file1.length > 0)) {
      var formdata = new FormData();
      formdata.append("senderId", userId);
      formdata.append("receiverId", "EMP1000");
      formdata.append("type", "gramin");
      formdata.append("message", inputMessage.toString().trim());
      if (file1.length > 0) {
        formdata.append("mediaType", "file");
      } else {
        formdata.append("mediaType", "text");
      }
      if (file1?.length > 0) {
        for (const key of Object.keys(file1)) {
          formdata.append(`images`, file1[key]);
        }
      } else {
        formdata.append("images", null);
      }


      const response = await userapi.sendChat(formdata);
      if (response && response?.data?.code === 200) {
        
        setSendSpinner(false);
        setInputMessage("");
        setFile1([]);
        setImageView([]);
        setEmoji(false);
        
        socket.current.emit("sendMessage", {
          senderId: userId,
          receiverId: "EMP1000",
          type: "gramin",
        });

        setMessages((prevMessages) => [...prevMessages, response?.data?.data]);

        if (checkFile === "Image") {
          setFileName1(""); // Reset the image input value
        } else {
          setFileName2(""); // Reset the video input value
        }
      } else {
        setIsLoading(false);
        return toast.error(`Something went wrong!`);
      }
    } else {
      // return toast.error(`Please enter message!`);
      setSendSpinner(false);
    }
  };

  function handleCancel(indexToRemove) {
    const filteredFiles = imageView.filter(
      (file, index) => index !== indexToRemove
    );
    const fileListArray = Array.from(file1);
    const filteredArray = fileListArray.filter(
      (file, index) => index !== indexToRemove
    );
    const dataTransfer = new DataTransfer();
    filteredArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    setFile1(dataTransfer.files);
    setImageView(filteredFiles);

    if (checkFile === "Image") {
      setFileName1(""); // Reset the image input value
    } else {
      setFileName2(""); // Reset the video input value
    }
  }

  function handleChange1(event) { //image
    setFile1(event.target.files);
    setFileName1(event.target.value);
    const files = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImageView(files);
    setCheckFile("Image");

  }

  function handleChange2(event) { //video
    setFile1(event.target.files);
    setFileName2(event.target.value);
    const files = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImageView(files);
    setCheckFile("Videos");

  }

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Flex direction="column" height={{ base: "90vh", md: '60vh', lg: "60vh" }} maxW={"full"} >

      <Flex direction="column" flex="1" overflowY="auto" ref={divRef} style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }} p={4}>
        {messages.map((msg, index) => {
          const shouldDisplayDate =
            !displayedDate || displayedDate !== formatDate(new Date(msg.createdAt));

          if (shouldDisplayDate) {
            displayedDate = formatDate(new Date(msg.createdAt));
          }
          return (
            <ChatBubble
              key={index}
              message={msg.message}
              sender={msg.sender}
              time={msg.createdAt}
              media={msg.media}
              isSender={msg.senderId === userId ? true : false}
              displayDate={shouldDisplayDate}
            />
          );
        })}

      </Flex>
      <Flex direction="row" overflow={"auto"} scrollBehavior={"smooth"}>
        {checkFile == "Image"
          ? imageView.map((src, index) => (
            <>
              <Img
                key={index}
                src={src}
                alt={`Video ${index + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  padding: "10px",
                }}
              />
              <button
                onClick={() => handleCancel(index)}
                style={{
                  position: "relative",
                  top: -26,
                  right: 33,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <AiOutlineCloseCircle
                  style={{ color: "red", fontSize: 24, zIndex: 1 }}
                />
              </button>
            </>
          ))
          : imageView.map((src, index) => (
            <>
              <video
                key={index}
                src={src}
                alt={`Video ${index + 1}`}
                autoPlay={true}
                loop={true}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  padding: "10px",
                }}
              />
              <button
                onClick={() => handleCancel(index)}
                style={{
                  position: "relative",
                  top: -26,
                  right: 33,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <AiOutlineCloseCircle
                  style={{ color: "red", fontSize: 24, zIndex: 1 }}
                />
              </button>
            </>
          ))}
      </Flex>
      {emoji ? (
        <Box position='absolute'
          zIndex='9999'
          width={{ base: "100%", md: "300px", lg: '300px' }}
          bottom={{ base: "8%", md: '12%', lg: '12%' }}
        >
          <EmojiPicker
            onEmojiClick={(emojiObject) => {
              const { emoji } = emojiObject;
              setInputMessage((prevValue) => prevValue + emoji)
              setChosenEmoji(emojiObject.emoji);
            }}

            height={300}
            width={BiFullscreen}
            searchDisabled={"false"}
            suggestedEmojisMode={"recent"}
            emojiStyle={"google"}
          />
        </Box>
      ) : null}

      <Flex
        display={{ base: "flex", md: "flex" }}
        alignItems={{ base: "center" }}
        p={2}
        direction={'row'}
        width={'100%'}
      >
        <InputGroup>
          <InputLeftElement mx={2}>
            <GrEmoji
              colorScheme="green"
              name="Emoji"
              color="#19884A"
              size={"30px"}
              onClick={() => {
                emoji ? setEmoji(false) : setEmoji(true);
              }}
            />
          </InputLeftElement>

          <Input
            placeholder="Type your message"
            value={inputMessage}
            border={"1px solid green"}
            borderColor={"#19884A"}
            focusBorderColor="#19884A"
            _hover={{
              borderColor: "#19884A !important",
            }}
            outline={'none'}
            mx={2}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                setEmoji(false);
                handleSendMessage();
              }
            }}
          />
          <InputRightElement mx={2} >
            {sendSpinner ?
              <CircularProgress size={'20px'} position={'absolute'} right={'0%'} zIndex={1} width={'30px'} isIndeterminate color='green.300' />
              :
              <Image onClick={() => {
                handleSendMessage();
                setEmoji(false);
              }} width={'30px'} cursor={'pointer'} src={sendIcon} />
            }
          </InputRightElement>
        </InputGroup>

        <Menu colorScheme="green">
          <MenuButton
            colorScheme="green"
            cursor={"pointer"}
            as={Button}
            pl={2}
            rightIcon={<AttachmentIcon />}
          >
          </MenuButton>

          <MenuList colorScheme="green">
            <MenuItem>
              <Button
                colorScheme="green"
                onClick={handleChange2}
                mx={{ base: 0, sm: 2 }}
                my={{ base: 2, md: 0 }}
                cursor={"pointer"}
                width={"full"}
              >
                <input
                  accept="video/*"
                  id="video-upload"
                  type="file"
                  style={{ display: "none", width: "Full", height: "auto" }}
                  multiple
                  onChange={handleChange2}
                  value={fileName2}
                  htmlFor="video-upload"
                />
                <label htmlFor="video-upload">
                  <HStack>
                    <FaVideo cursor={"pointer"} />
                    <Text>
                      Videos select here
                    </Text>
                  </HStack>
                </label>
              </Button>
            </MenuItem>

            <MenuItem >
              <Button  // Images
                colorScheme="green"
                onClick={handleChange1}
                mx={{ base: 0, sm: 2 }}
                my={{ base: 2, md: 0 }}
                cursor={"pointer"}
                width={"full"}
              >
                <input
                  accept="image/*"
                  id="image-upload"
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  width={"full"}
                  onChange={handleChange1}
                  value={fileName1}
                />
                <label htmlFor="image-upload">
                  <HStack>
                    <FaRegImages cursor={"pointer"} />
                    <Text>
                      Images select here
                    </Text>
                  </HStack>
                </label>
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default index;

