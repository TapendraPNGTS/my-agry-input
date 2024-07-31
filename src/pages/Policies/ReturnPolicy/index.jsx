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
        Return policy
        </Heading>
        <Divider mb={4} />
        <VStack align="start" spacing={4}>
          <Text fontSize={`15px`} textAlign={`justify`}>
          This Policy is subject to the following RULES and EXCEPTIONS:
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
              Duration: Customers have 7 days from the date of receiving their order to initiate a return request.
              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>
              Condition of Items: Items must be returned in their original condition, unused, unworn, and with all original tags and packaging intact.

              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>
              Proof of Purchase: Customers may need to provide proof of purchase, such as an order confirmation or receipt, when initiating a return.
              </Text>
            </ListItem>
            {/* <ListItem pt={2}>
              <Text textAlign={`justify`}>
              Please package your returns securely to avoid any loss or damage during transit if you decide to self-ship. We advise using a reputable courier service for any self-shipped returns.

              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>
              Perishable items, like flowers and seeds, cannot be returned if the packaging is tampered with or opened.

              </Text>
            </ListItem> */}
          </UnorderedList>
          
          {/* <Text as="b" pl={3}>
              <Link pt={9}>Phone: +91-9865986598</Link>
            </Text> */}
        </VStack>

        <Divider mb={4} mt={5}  />
        <VStack align="start" spacing={4}>
          <Heading as="h1" fontSize="2xl" mb={4}>
            Refunds (if applicable)
            </Heading>
            <Text fontSize={`15px`} textAlign={`justify`}>
            <Text as="b"> Note: </Text>
            To complete your return, we require a receipt or proof of purchase.{" "}
          </Text>
          <Text fontSize={`15px`} textAlign={`justify`}>
          Please do not send your purchase back to the manufacturer.
          </Text>
            <UnorderedList>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
              </Text>
            </ListItem>
          </UnorderedList>
        </VStack>


        <Divider mb={4} mt={5}  />
        <VStack align="start" spacing={4}>
          <Heading as="h1" fontSize="2xl" mb={0}>
            Late or missing refunds (if applicable)
              </Heading>
           <UnorderedList>
               <ListItem pt={2}>
              <Text textAlign={`justify`}>If you haven’t received a refund yet, first check your bank account again.<br/>Then contact your credit card company, it may take some time before your refund is officially posted.
                Next contact your bank. There is often some processing time before a refund is posted.
              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>If you’ve done all of this and you still have not received your refund yet, please contact us at  ()

              </Text>
            </ListItem>
          </UnorderedList>
        </VStack>

        <Divider mb={4} mt={5}  />
        <VStack align="start" spacing={4}>
          <Heading as="h1" fontSize="2xl" mb={0}>
           Exchanges (if applicable)
              </Heading>
           <UnorderedList>
               <ListItem pt={2}>
              <Text textAlign={`justify`}>If you haven’t received a refund yet, first check your bank account again.<br/>Then contact your credit card company, it may take some time before your refund is officially posted.
                Next contact your bank. There is often some processing time before a refund is posted.
              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>If you’ve done all of this and you still have not received your refund yet, please contact us at
              </Text>
            </ListItem>
          </UnorderedList>
        </VStack>
        <Divider mb={4} mt={5}  />
        <VStack align="start" spacing={4}>
              <Text textAlign={`justify`}>Governing Law:<br/></Text>
              <Text textAlign={`justify`}>These terms shall be governed by and constructed in accordance with the laws of India without reference to conflict of laws principles and disputes arising in relation hereto shall be subject to the exclusive jurisdiction at the courts 
Shipping
To return your product, you should mail your product to:() 
</Text>
            
        </VStack>
        <Divider mb={4} mt={5}  />
        <VStack align="start" spacing={4}>
              <Text textAlign={`justify`}>Address and name : 
<br/></Text>
              <Text textAlign={`justify`}>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
</Text>
            
        </VStack>
      </Container>
    </Box>
  );
};

export default index;
