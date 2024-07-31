import React from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  VStack,
  Link,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

const index = () => {
  return (
    <Box p={8}>
      <Container maxW="container.xl">
        <Heading as="h1" fontSize="2xl" mb={4}>
          Shipping / Delivery policies
        </Heading>
        <Divider mb={4} />
        <VStack align="start" spacing={4}>
          <Text fontSize={`15px`} textAlign={`justify`}>
            <Text as="b"> Note: </Text>
            Our privacy policy is subject to change at any time without notice.
            To make sure you are aware of any changes, please review this policy
            periodically.{" "}
          </Text>
          <OrderedList>
            <ListItem>
              
              <Text textAlign={`justify`}>
                We will ship your product using regular courier services to make sure it reaches you in good condition and within our typical delivery window of six to twelve working days.
              </Text>



            </ListItem>
            <ListItem mt={'4'}>

              <Text textAlign={`justify`}>
                In the event that you are a first-time user, an executive will get in touch with you to confirm your order (in order to ensure perfect delivery, the executive will verify your specific delivery address and pin code). You must provide us with another address and pin code if your current one isn't working or we can't deliver the material.

              </Text>

            </ListItem>
            <ListItem mt={'4'}>

              <Text textAlign={`justify`}>
                Before accepting delivery of the goods, if you think the product is not in good condition or if the packaging has been tampered with or damaged, please refuse to accept delivery of the package, take some pictures of it, and tell the courier boy, "The package is tampered or damaged in courier so, I will not accept the order." You can also call our customer service line with your order reference number and the attached pictures. We'll do everything in our power to get you a replacement delivery as soon as possible.
              </Text>

            </ListItem>
            <ListItem mt={'4'}>

              <Text textAlign={`justify`}>
                The delivery time indicated on the product page, website, or cart is an estimate. The product's availability, the weather, the delivery address, and the courier company's policies all affect the estimated delivery time.
              </Text>
            </ListItem>
            <ListItem mt={'4'}>

              <Text textAlign={`justify`}>
              We will do everything in our power to ensure that your product is delivered; you purchased it from our platform, and we will do everything in our power to ensure that it reaches you. However, if for any reason the product is delivered late or not at all, and as a result, you incur any losses, please note that kheti mitra is not liable.              </Text>
            </ListItem>
           

          </OrderedList>

        </VStack>
      </Container>
    </Box>
  );
};

export default index;
