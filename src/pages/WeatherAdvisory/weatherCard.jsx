import { Avatar, Box, Flex, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import cardImg from "../../assets/images/advisory-card-img.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
// import "./weather.css";

const WeatherCard = ({ temperture, imgH, cardp, bgImage, carouselHeight, date, rainfall, humidity, wind, severe, images, Rainfall, Humidity, Wind, Severe, body }) => {

    const [textCount, setTextCount] = useState(true);
    console.log(images, 'images');
    return (
        <div>
            <Flex
                // ref={containerRef}
                direction={'column'}
                bgImage={bgImage}
                bgSize={'cover'}
                bgPosition={'center'}
                bgRepeat={'no-repeat'}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                width={{ base: '100%', md: "100%" }}
                bgColor={'white'}
            >
                <Text height={carouselHeight}>
                    <Carousel
                        autoPlay={false}
                        emulateTouch={true}
                        interval={8000}
                        showArrows={true}
                        showIndicators={false}
                        showThumbs={true}
                        stopOnHover={true}
                        showStatus={false}
                        infiniteLoop={true}
                        width={'100%'}
                    // style={{height:"50px"}}
                    // height={"50px"}
                    >
                        {images && Array.isArray(images) && images.length !== 0  ?

(images || []).map((img, i) => {

                                return (
                                    <Image
                                        key={i}
                                        h={imgH}
                                        width={'100%'}
                                        // src={img.length > 0 ? img : cardImg}
                                        src={img}
                                        objectFit="cover"
                                        alt="#"
                                        minHeight={'175px'}
                                        onClick={() => {
                                            window.open(img, "_blank", "noopener,noreferrer");
                                        }}
                                    />
                                )
                            }) : (
                                <Image
                                    p={0}
                                    m={0}
                                    objectFit="cover"
                                    //    width={'20px'}
                                    minHeight={'175px'}
                                    h={'auto'} src={cardImg} />
                            )
                        }
                    </Carousel>
                </Text>

                {/* <Text pl={{base:2, md:4}} pr={{base:2, md:4}} pb={5} pt={5} color={'black'} fontSize={{base:'15px', md:'16px'}}>{body}</Text> */}
                <Flex direction={"row"} >
                    {textCount && body && body.length > 25 ? (
                        <>
                            <Text mt={1} fontSize="16px" fontWeight={500} pl={2} pr={2} flexWrap={'wrap'} maxWidth={{base:'140px', md:"100%"}} width={'100%'}>
                                {body.slice(0, 22) + " ..."}
                            </Text>
                        </>
                    ) : (
                        <Text mt={1} fontSize="16px" fontWeight={500} pl={2} pr={2} maxWidth={{base:'140px', md:"100%"}} width={'100%'}>
                            {body}
                            <Text display={textCount ? 'block' : 'none'}>&nbsp;</Text>
                        </Text>
                    )}
                </Flex>
                {
                    body && body.length > 22 ? <>
                        <Text pl={2} pr={2} color={'#19884A'} cursor={'pointer'}  onClick={(() => { setTextCount(textCount ? false : true) })}>{textCount ? 'Read More' : 'Read Less'}</Text>
                    </> : null
                }
                <Box p={cardp}>
                    <Flex spacing={0} alignItems={'baseline'} justifyContent={'space-between'} mb={2}>
                        <Text fontSize={{ base: "18px", md: '24px', lg: '40px' }} fontWeight={500} color={'white'} fontFamily={'body'}>
                            {temperture}
                        </Text>
                        <Text color={'white'} fontSize={{ base: "12px", md: '15px' }}>{date}</Text>
                    </Flex>

                    <Flex direction={'row'} >
                        <Text fontSize={{ base: "12px", md: 'sm' }} color={'white'} fontWeight={'400'} minW={{ base: "0", md: '100px' }} >
                            {Rainfall}
                        </Text>
                        <Text fontSize={{ base: "12px", md: 'sm' }} color={'white'} fontWeight={'400'} marginStart={{ base: '5px', md: '10px' }}>
                            {rainfall}
                        </Text>
                    </Flex >
                    <Flex direction={'row'} >
                        <Text fontSize={{ base: "12px", md: 'sm' }} color={'white'} fontWeight={'400'} minW={{ base: "0", md: '100px' }} >
                            {Humidity}
                        </Text>
                        <Text fontSize={{ base: "12px", md: 'sm' }} color={'white'} fontWeight={'400'} marginStart={'10px'}>
                            {humidity}
                        </Text>
                    </Flex >
                    <Flex direction={'row'} >
                        <Text fontSize={{ base: "12px", md: 'sm' }} color={'white'} fontWeight={'400'} minW={{ base: "0", md: '100px' }} >
                            {Wind}
                        </Text>
                        <Text fontSize={{ base: "12px", md: 'sm' }} color={'white'} fontWeight={'400'} marginStart={'10px'}>
                            {wind}
                        </Text>
                    </Flex >
                    <Flex direction={'row'} >
                        <Text fontSize={{ base: "12px", md: 'sm' }} color={'white'} fontWeight={'400'} minW={{ base: "0", md: '100px' }} >
                            {Severe}
                        </Text>
                        <Text fontSize={{ base: "12px", md: 'sm' }} color={'white'} fontWeight={'400'} marginStart={'10px'}>
                            {severe}
                        </Text>
                    </Flex >


                </Box>
            </Flex>
        </div>
    )
}
export default WeatherCard;