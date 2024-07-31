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
          Privacy Policy
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
            <Text textAlign={`justify`} fontSize={'lg'} >Collection of Personally Identifiable Information and other Information
              </Text>
              <Text textAlign={`justify`}>
                When you use our Website, we collect and store your personal
                information, which is provided by you from time to time. Our
                primary goal in doing so is to provide you a safe, efficient,
                smooth and customized experience. This allows us to provide
                services and features that most likely meet your needs, and to
                customize our Website to make your experience safer and easier.
                More importantly, while doing so we collect personal information
                from you that we consider necessary for achieving this purpose.
              </Text>
              <Text textAlign={`justify`}>
              Generally speaking, you are free to explore the website without providing any personal information about yourself or identifying yourself to us. You are no longer anonymous to us after you provide us with your personal information. Whenever feasible, we make it clear which fields are necessary and which are not. You can always elect not to use a specific service or feature on the Website in order to withhold information. 
              </Text>
              <Text textAlign={`justify`}>
              We might automatically collect specific data about you depending on how you use our website. In order to better understand, safeguard, and support our users, we use this data for internal research on the demographics, interests, and behavior of our users. A combined analysis and compilation of this data is done. 
              </Text>
              <Text textAlign={`justify`}>
              This data could include your IP address, your computer browser information, the URL you just came from (and whether it is on our website or not), the URL you go to next (and whether it is on our website or not), and more.
              </Text>
              <Text textAlign={`justify`}>
              On some parts of the website, we utilize data gathering tools called "cookies" to track the performance of our promotions, evaluate the user experience, and foster safety and trust. "Cookies" are little files that are stored on your computer's hard disk to help us provide our services. We provide specific functions that are only accessible by using "cookies."
Additionally, you can enter your password fewer frequently during a session thanks to our use of cookies. 
              </Text>
              <Text textAlign={`justify`}>
              Additionally, cookies enable us to deliver content that is specific to your interests.</Text>
              {/* <Text textAlign={`justify`}>
              On some parts of the website, we utilize data gathering tools called "cookies" to track the performance of our promotions, evaluate the user experience, and foster safety and trust. "Cookies" are little files that are stored on your computer's hard disk to help us provide our services. We provide specific functions that are only accessible by using "cookies."
Additionally, you can enter your password fewer frequently during a session thanks to our use of cookies. 
              </Text>
              <Text textAlign={`justify`}>
              On some parts of the website, we utilize data gathering tools called "cookies" to track the performance of our promotions, evaluate the user experience, and foster safety and trust. "Cookies" are little files that are stored on your computer's hard disk to help us provide our services. We provide specific functions that are only accessible by using "cookies."
Additionally, you can enter your password fewer frequently during a session thanks to our use of cookies. 
              </Text> */}
          </ListItem>
            <ListItem>
            <Text textAlign={`justify`} fontSize={'lg'} pt={5}>Use of Demographic / Profile Data / Your Information
</Text>
              <Text textAlign={`justify`}>
              We use personal information to provide the services you request. To the extent we use your personal information to market to you, we will provide you the ability to opt-out of such uses. We use your personal information to resolve disputes; troubleshoot problems; help promote a safe service; collect money; measure consumer interest in our products and services, inform you about online and offline offers, products, services, and updates; customize your experience; detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions; and as otherwise described to you at the time of collection.
In our efforts to continually improve our product and service offerings, we collect and analyze demographic and profile data about our users’ activity on our Website.
We identify and use your IP address to help diagnose problems with our server, and to administer our Website. Your IP address is also used to help identify you and to gather broad demographic information.
</Text>
              <Text textAlign={`justify`}>
              We will occasionally ask you to complete optional online surveys. These surveys may ask you for contact information and demographic information (like zip code, age, or
income level). We use this data to tailor your experience at our Website, providing you with content that we think you might be interested in and to display content according to your preferences.
              </Text>

              <Text textAlign={`justify`} pt={2}>
<b>Cookies:
</b>              </Text>
              <Text textAlign={`justify`}>
              A “cookie” is a small piece of information stored by a web server on a web browser so it can be later read back from that browser. Cookies are useful for enabling the browser to remember information specific to a given user. We place both permanent and temporary cookies in your computer’s hard drive. The cookies do not contain any of your personally identifiable information.
              </Text>
          </ListItem>
            <ListItem>
            <Text textAlign={`justify`} fontSize={'lg'} pt={5}>Sharing of personal information

</Text>
              <Text textAlign={`justify`}>
              We may share personal information with our other corporate entities and affiliates to help detect and prevent identity theft, fraud and other potentially illegal acts; correlate related or multiple accounts to prevent abuse of our services; and to facilitate joint or co-branded services that you request where such services are provided by more than one corporate entity. Those entities and affiliates may not market to you as a result of such sharing unless you explicitly opt-in.
</Text>
              <Text textAlign={`justify`}>
              We may disclose personal information if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court
orders, or other legal process. We may disclose personal information to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to: enforce our Terms or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.
</Text>
              <Text textAlign={`justify`}>
              We and our affiliates will share / sell some or all of your personal information with another business entity should we (or our assets) plan to merge with, or be acquired by that business entity, or reorganization, amalgamation, restructuring of business. Should such a transaction occur, another business entity (or the new combined entity) will be required to follow this privacy policy with respect to your personal information.
              </Text>
          </ListItem>
          <ListItem>
          <Text textAlign={`justify`} fontSize={'lg'} pt={5}> Links to Other Sites
</Text>
              <Text textAlign={`justify`}>
              Our Website links to other websites that may collect personally identifiable information about you. 
              </Text>
              </ListItem>
          <ListItem>
          <Text textAlign={`justify`} fontSize={'lg'} pt={5}> Security Precautions
</Text>
              <Text textAlign={`justify`}>
              Strict security measures are in place on our website to prevent the loss, exploitation, and manipulation of the data that is in our control. We provide you with the usage of a secure server anytime you modify or access your account information. Once in our hands, your information is safeguarded against unauthorized access by stringent security protocols.
              </Text>
              </ListItem>
          <ListItem>
          <Text textAlign={`justify`} fontSize={'lg'} pt={5}> Your Consent
</Text>
              <Text textAlign={`justify`}>
              You agree that the information you reveal on the website will be collected and used in accordance with this privacy policy by using the website and/or by supplying your information. This includes, but is not limited to, your permission to information sharing in accordance with this privacy policy.
We will always keep you informed about the information we gather, how we use it, and when we disclose it by posting any changes to our privacy policy on this page.
              </Text>
              </ListItem>
          <ListItem>
          <Text textAlign={`justify`} fontSize={'lg'} pt={5}> Grievance Officer
</Text>
              <Text textAlign={`justify`}>
              In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:
 </Text>
              <Text textAlign={`justify`}>
              ADDRESS :  </Text>
              <Text textAlign={`justify`}>
PHONE :  </Text>
              <Text textAlign={`justify`}>
EMAIL : </Text>
              </ListItem>
          </OrderedList>

        </VStack>
      </Container>
    </Box>
  );
};

export default index;
