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
  // ListIcon,
  OrderedList,
  ListIcon,
  UnorderedList,
} from "@chakra-ui/react";
// import { MdCheckCircle } from 'chakra-ui/md'

const index = () => {
  return (
    <Box p={8}>
      <Container maxW="container.xl">
        <Heading as="h1" fontSize="2xl" mb={4}>
        Cancellation policy
        </Heading>
        <Divider mb={4} />
        <VStack align="start" spacing={4}>
          <Text fontSize={`15px`} textAlign={`justify`}>
          Customers must get in touch with our Customer Care representative to cancel an order if they have a change of heart. The cancellation won't be effective unless our corresponding department confirms it.
          </Text>

          {/* <Text fontSize={`15px`} textAlign={`justify`}>
            <Text as="b"> Note: </Text>
            Our privacy policy is subject to change at any time without notice.
            To make sure you are aware of any changes, please review this policy
            periodically.{" "}
          </Text> */}
          <UnorderedList>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>    
              {/* <ListIcon as={MdCheckCircle} color='green.500' />            */}
Requests for cancellations will only be taken into consideration if the product is not sent.
              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>   
              {/* <ListIcon as={MdCheckCircle} color='green.500' /> */}
The consumer is unable to cancel an order once it has been dispatched.
              </Text>
            </ListItem>
            <ListItem pt={2}> 
              {/* <ListIcon as={MdCheckCircle} color='green.500' /> */}
              <Text textAlign={`justify`}>We will conduct a refund within 7 working days if a consumer cancels an order they placed using online payment.
              </Text>
            </ListItem>
          </UnorderedList>
          
          {/* <Text as="b" pl={3}>
              <Link pt={9}>Phone: +91-9865986598</Link>
            </Text> */}
        </VStack>
      </Container>
    </Box>
  );
};

export default index;
