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
  UnorderedList,
} from "@chakra-ui/react";
// import { MdCheckCircle } from 'chakra-ui/md'

const index = () => {
  return (
    <Box p={8}>
      <Container maxW="container.xl">
        <Heading as="h1" fontSize="2xl" mb={4}>
          Terms and condition
        </Heading>
        <Divider mb={4} />
        <VStack align="start" spacing={4}>
          {/* <Text fontSize={`15px`} textAlign={`justify`}>
          Customers must get in touch with our Customer Care representative to cancel an order if they have a change of heart. The cancellation won't be effective unless our corresponding department confirms it.
          </Text> */}

          <UnorderedList>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>
             <span style={{fontWeight:"bold"}}> Rama Crop Science Private Limited </span> is a reliable partner that we are happy to have. Their vast agricultural knowledge and constant commitment to innovation have been instrumental in helping us to provide our clients with sustainable solutions. We are working to bring about constructive change in the agriculture sector together.
              </Text>            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>
                This website's content is just for your general information and use. It might change without warning.              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>
                Regarding the correctness, timeliness, functionality, completeness, or suitability of the information and materials found or made available on this website for any specific purpose, neither we nor any third parties give any warranty or guarantee. To the maximum extent permissible by law, you acknowledge that such information and materials may contain mistakes or inaccuracies, and we specifically disclaim any liability for any such errors or inaccuracies.              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>The content on this website is either our property or is licensed to us. This content consists of, but is not restricted to, the layout, appearance, look, and visuals. Except as permitted by the copyright notice incorporated into these terms and conditions, reproduction is banned.
              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>The website acknowledges the use of all trade marks that are reproduced on it but are not owned or licensed by the operator.
                Unauthorized use of this website could result in a criminal charge or a claim for damages.
              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>This website might occasionally have links to other websites. We've included these websites for your convenience in order to get more details. They do not indicate our endorsement of the website or websites. Regarding the linked website(s), we have no control over its content.

              </Text>
            </ListItem>
            <ListItem pt={2}>
              <Text textAlign={`justify`}>The laws of India or another regulatory body shall apply to your use of this website and to any dispute arising from such use.
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
