import React from "react";
import { Box, Button, Image, Flex, Text, Stack, Img, Card, Grid, GridItem, Modal, ModalBody, ModalOverlay, ModalContent, ModalCloseButton } from "@chakra-ui/react";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import leftIcon from "../../../../assets/images/left-icon-carousel.svg";
import rightIcon from "../../../../assets/images/right-icon-carousel.svg";
import { FaGalacticSenate } from "react-icons/fa";

function formatTime(time) {
  return new Date(time).toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
  });
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const ChatBubble = ({ message, sender, media, time, isSender, displayDate }) => {

  const [showAllImages, setShowAllImages] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setShowAllImages(!showAllImages);
  };

  const handleMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {displayDate && (
        <Text
          textAlign={"center"}
          width={"100%"}
          fontSize="sm"
          fontWeight="bold"
          mb={2}
          mt={2}
          color="gray.500"
        >
          {formatDate(new Date(time))}
        </Text>
      )}
      <Flex
        direction="row"
        justifyContent={isSender ? "flex-end" : "flex-start"}
        alignItems="flex-start"
        marginBottom={2}
      // marginRight={{base:"0", md:"3", lg:"5"}}
      >

        <Box
          backgroundColor={isSender ? "#00683714" : "#E6F4F1"}
          padding={'2px'}
          borderRadius={isSender ? "12px 0px 12px 12px" : "0px 12px 12px 12px"}
        //  maxWidth={'80%'}
        >

          <Stack >

            {media.length < 4 ? media.map((image, index) => {
              return (

                <Card
                  backgroundColor={isSender ? "white" : "#E6F4F1"}
                  borderRadius="lg"
                  // paddingX={3}
                  // paddingY={2}
                  maxWidth="100%"
                  wordBreak="break-word"
                  //  marginBottom={2}
                  boxShadow={'none'}
                // style={{ padding: "5px" }}
                // onChange={((e) =>{const isImage = image.endsWith('.jpg') || image.endsWith('.jpeg') || image.endsWith('.png');})}
                >

                  <Stack >
                    {image.endsWith(".png") ||
                      image.endsWith(".jpg") ||
                      image.endsWith(".svg") ||
                      image.endsWith(".jpeg") ? (
                      <a href={image} target="_blank" key={index}>
                        <div style={{ minWidth: "150px", width: "100%" }}>
                          <Img
                            // borderRadius={5}
                            style={{ minWidth: "150px", borderRadius: "5px" }}
                            src={image}
                            alt="img"
                            width={"150px"}
                            height={"150px"}

                          />
                        </div>
                      </a>
                    ) : image.endsWith(".mp4") ||
                      image.endsWith(".3gp") ||
                      image.endsWith(".mkv")
                      ? (
                        <a href={image} target="_blank" key={index}>
                          <div style={{ minWidth: "150px", width: "100%" }}>
                            <iframe
                              style={{ minWidth: "150px", borderRadius: "5px" }}
                              src={image}
                              title="iframe"
                              width="150px"
                              height="150px"
                              allowFullScreen
                            />
                          </div>
                        </a>
                      ) : null}


                  </Stack>
                </Card>

              );
            })
              : (
                // Render a grid if 3 or more media items
                <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap={'3px'}>
                  {media.slice(0, showAllImages ? media.length : 4).map((image, index) => (
                    <GridItem key={index}>
                      <Card
                        backgroundColor={isSender ? "white" : "#E6F4F1"}
                        borderRadius="lg"
                        maxWidth="100%"
                        wordBreak="break-word"
                        // marginBottom={2}
                        boxShadow={'none'}
                        onClick={index === 3 ? handleMoreClick : undefined}
                      >
                        <Stack>
                          {image.endsWith(".png") ||
                            image.endsWith(".jpg") ||
                            image.endsWith(".svg") ||
                            image.endsWith(".jpeg") ? (
                            <a href={image} target="_blank" rel="noreferrer" key={index}>
                              <Box minWidth={{ base: '100px', md: "120px" }} width={"100%"}>
                                <Img
                                  minWidth={{ base: '100px', md: "120px" }}
                                  style={{
                                    borderRadius: "5px",
                                  }}
                                  src={image}
                                  alt="img"
                                  width={{ base: '100px', md: "115px" }}
                                  height={{ base: '100px', md: "115px" }}
                                />
                              </Box>
                            </a>
                          ) : image.endsWith(".mp4") ||
                            image.endsWith(".3gp") ||
                            image.endsWith(".mkv") ? (
                            <a href={image} target="_blank" rel="noreferrer" key={index}>
                              <div style={{ minWidth: "150px", width: "100%" }}>
                                <iframe
                                  style={{
                                    minWidth: "150px",
                                    borderRadius: "5px",
                                  }}
                                  src={image}
                                  title="iframe"
                                  width="150px"
                                  height="150px"
                                  allowFullScreen
                                />
                              </div>
                            </a>
                          ) : null}
                        </Stack>
                        {/* {index === 3 && (
                        <Text position={'absolute'} top={'42%'} left={'40%'} fontSize="28px" cursor={'pointer'} fontWeight={'bold'} textAlign="center">
                          +{media.length - 4}
                        </Text>
                      )} */}
                        {index === 3 && (
                          <Text position={'absolute'} top={'42%'} left={'40%'} fontSize="28px" cursor={'pointer'} fontWeight={'bold'} textAlign="center">
                            {media.length > 4 ? <> +{media.length - 4} </> : " "}
                          </Text>
                        )}
                      </Card>
                    </GridItem>
                  ))}
                </Grid>
              )
            }

          </Stack>
          {message.length > 0 ? <Text fontSize="md" p={'4px 6px 0px'} >{message}</Text> :
            ""
          }
          <Text textAlign={'right'} fontSize="xs" color="black" p={'2px 6px 2px'}>
            {formatTime(time)}
          </Text>
        </Box>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size={{ base: "1xl", md: '2xl' }} isCentered >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClose={handleCloseModal} />
          <ModalBody pt={8}>
            <Carousel
              autoPlay={false}
              emulateTouch={true}
              interval={8000}
              showArrows={true}
              showIndicators={false}
              showThumbs={true}
              stopOnHover={true}
              showStatus={false}
              infiniteLoop={false}
              width={'100%'}

              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <Button type="button" onClick={onClickHandler} title={label}
                    left={{ base: "0%", md: '8%' }}
                    p={0}
                    style={{
                      position: 'absolute',
                      zIndex: 2,
                      top: '50%',

                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transform: 'translateY(-50%)',
                    }}>
                    <Image src={leftIcon} />
                  </Button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <Button type="button" onClick={onClickHandler} title={label}
                    right={{ base: "0%", md: '8%' }}
                    p={0}
                    style={{
                      position: 'absolute',
                      zIndex: 2,
                      top: '50%',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transform: 'translateY(-50%)',
                    }}>
                    <Image src={rightIcon} />
                  </Button>
                )
              }
            >
              {/* Implement your image carousel here */}
              {media.map((image, index) => (
                <Img key={index} width={'100%'} height={{ base: '200px', md: '300px' }} src={image} alt={`img-${index}`} />
              ))}
            </Carousel>
            <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
              {media.map((image, index) => (
                <Card width={'100%'} display={'flex'} alignItems={'center'}>
                  <Img key={index} width={'50%'} height={'75px'} src={image} alt={`img-${index}`} />
                </Card>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>



    </>
  );
};

export default ChatBubble;
