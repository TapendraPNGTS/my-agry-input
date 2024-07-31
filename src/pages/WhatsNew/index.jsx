import React from "react";
import {
  Flex,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  CardFooter,
} from "@chakra-ui/react";
import Navstrip from "../../components/shared/NavStrip";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import Img from "../../assets/pesticideImage/pesticideImage.jpg";
import Img2 from "../../assets/pesticideImage/pesticideImage2.jpg";
import Img3 from "../../assets/pesticideImage/pesticideImage3.jpg";

const index = () => {
  return (
    <>
     
      <div className="home-hero-content ">
        <div className="layout-container">
          <Heading fontSize={{ base: "42px", md: "64px" }} color={"green"}>
            Shopping And <br /> Department Store.
          </Heading>
          <Text
            fontSize={{ base: "16px", md: "18px" }}
            marginTop={"1rem"}
            marginBottom={"40px"}
          >
            Shopping is a bit if a relaxing hobby for me, which <br /> is
            sometimes troubling for bank balance.
          </Text>
          <Button
            size={"lg"}
            width={"150px"}
            colorScheme="green"
            className="btn-primary"
            rounded={"full"}
          >
            Learn More
          </Button>
        </div>
      </div>
      <div className="layout-container home-shop-brand section-margin">
        <Flex wrap={"wrap"} gap={6} marginTop={5} marginBlock={10}>
          <Flex>
            <Card maxW="sm" bgColor={`green`}>
              <CardBody color={`white`}>
                <Image
                  src={Img2}
                  alt="Image not found"
                  borderRadius="lg"
                  // display={`cover`}
                  height={`400px`}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Endosalafan</Heading>
                  <Text>
                    It is a great combination of fungicide with systemic and
                    contact action. Its application results in a phytotonic
                    effect on crops, which leads to better yield and quality of
                    the produce.
                  </Text>
                  <Text fontSize="2xl">$450</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="ghost" colorScheme="White" color={`white`}>
                    Read More
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Flex>
          <Flex>
            <Card maxW="sm" bgColor={`green`}>
              <CardBody color={`white`}>
                <Image
                  src={Img3}
                  height={`400px`}
                  alt="Image not found"
                  borderRadius="lg"
                  display={`cover`}
                  width={`-webkit-fill-available`}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Endosalafan</Heading>
                  <Text>
                    It is a great combination of fungicide with systemic and
                    contact action. Its application results in a phytotonic
                    effect on crops, which leads to better yield and quality of
                    the produce.
                  </Text>
                  <Text fontSize="2xl">$450</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="ghost" colorScheme="White" color={`white`}>
                    Read More
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Flex>
          <Flex>
            <Card maxW="sm" bgColor={`green`}>
              <CardBody color={`white`}>
                <Image
                  src={Img}
                  alt="Image not found"
                  borderRadius="lg"
                  height={`400px`}
                  display={`cover`}
                  width={`-webkit-fill-available`}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Endosalafan</Heading>
                  <Text>
                    It is a great combination of fungicide with systemic and
                    contact action. Its application results in a phytotonic
                    effect on crops, which leads to better yield and quality of
                    the produce.
                  </Text>
                  <Text fontSize="2xl">$450</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="ghost" colorScheme="White" color={`white`}>
                    Read More
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Flex>
        </Flex>
      </div>
      <div className="layout-container home-shop-brand section-margin">
        <Flex wrap={"wrap"} gap={6} marginTop={5} marginBlock={10}>
          <Flex>
            <Card maxW="sm" bgColor={`green`}>
              <CardBody color={`white`}>
                <Image
                  src={Img2}
                  alt="Image not found"
                  borderRadius="lg"
                  // display={`cover`}
                  height={`400px`}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Endosalafan</Heading>
                  <Text>
                    It is a great combination of fungicide with systemic and
                    contact action. Its application results in a phytotonic
                    effect on crops, which leads to better yield and quality of
                    the produce.
                  </Text>
                  <Text fontSize="2xl">$450</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="ghost" colorScheme="White" color={`white`}>
                    Read More
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Flex>
          <Flex>
            <Card maxW="sm" bgColor={`green`}>
              <CardBody color={`white`}>
                <Image
                  src={Img}
                  alt="Image not found"
                  borderRadius="lg"
                  height={`400px`}
                  display={`cover`}
                  width={`-webkit-fill-available`}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Endosalafan</Heading>
                  <Text>
                    It is a great combination of fungicide with systemic and
                    contact action. Its application results in a phytotonic
                    effect on crops, which leads to better yield and quality of
                    the produce.
                  </Text>
                  <Text fontSize="2xl">$450</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="ghost" colorScheme="White" color={`white`}>
                    Read More
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Flex>
          <Flex>
            <Card maxW="sm" bgColor={`green`}>
              <CardBody color={`white`}>
                <Image
                  src={Img3}
                  height={`400px`}
                  alt="Image not found"
                  borderRadius="lg"
                  display={`cover`}
                  width={`-webkit-fill-available`}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Endosalafan</Heading>
                  <Text>
                    It is a great combination of fungicide with systemic and
                    contact action. Its application results in a phytotonic
                    effect on crops, which leads to better yield and quality of
                    the produce.
                  </Text>
                  <Text fontSize="2xl">$450</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="ghost" colorScheme="White" color={`white`}>
                    Read More
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default index;
