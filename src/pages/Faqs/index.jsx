import React, { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  VStack,
  Icon,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"; // Import Chakra UI Icons

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Flex direction={`column`} boxShadow="sm" p={5}>
         <Heading as="h1" fontSize="2xl" mb={4} textAlign={'center'}>
         Frequently asked questions (FAQ)
        </Heading>
        <Accordion allowMultiple border="transperent" pt={2}>
          <AccordionItem>
            <h2>
              <AccordionButton onClick={toggleAccordion}>
                <Box flex="1" textAlign="left" as="b">
                Is an account necessary for users to shop on Gramin-Shakti?
                </Box>
                <Icon
                  as={isOpen ? ChevronUpIcon : ChevronDownIcon}
                  w={6}
                  h={6}
                  transform={isOpen ? "rotate(180deg)" : ""}
                  transition="transform 0.2s ease-in-out"
                />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <VStack align="start" spacing={4}>
                <Text>
                You don't need an internet account to shop on Gramin-Shakti. However, when placing an online order, all details must be provided. It is suggested that you register for just one account. You can benefit from recommendations and useful effects when you register for a personalized shopping experience with Gramin-Shakti.
                </Text>
                {/* <Text>
                  Your use of any information or materials on this website is
                  entirely at your own risk, for which we shall not be liable.
                  It shall be your own responsibility to ensure that any
                  products, services or information available through this
                  website meet your specific requirements.
                </Text> */}
                
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Accordion allowMultiple   pt={2}>
          <AccordionItem>
            <h2>
              <AccordionButton bg='#E2E8F0' onClick={toggleAccordion}>
                <Box flex="1" textAlign="left" >
                Why do multiple prices appear for the same product on my screen?
                </Box>
                <Icon
                  as={isOpen ? ChevronUpIcon : ChevronDownIcon}
                  w={6}
                  h={6}
                  transform={isOpen ? "rotate(180deg)" : ""}
                  transition="transform 0.2s ease-in-out"
                />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <VStack align="start" spacing={4}>
                <Text>
                A product may have many price listings. It's possible that other vendors are charging you a different price for the same item.
                </Text>
                <Text>
                Because of this, many merchants compete for your purchase on the Gramin-Shakti marketplace, allowing the buyer to benefit as much as possible from Gramin-Shakti. 
                </Text>
                {/* <Text>
                  Donec eu scelerisque risus, vel commodo elit. Nulla facilisi.
                  Suspendisse potenti. Aenean quis vulputate metus. Donec non ex
                  vitae libero vehicula viverra ac ac nunc. Quisque luctus metus
                  vel libero feugiat, non suscipit odio malesuada.
                </Text> */}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Accordion allowMultiple  pt={2}>
          <AccordionItem>
            <h2>
              <AccordionButton onClick={toggleAccordion}>
                <Box flex="1" textAlign="left">
                When I make a purchase on Gramin-Shakti, are there any additional fees?
                </Box>
                <Icon
                  as={isOpen ? ChevronUpIcon : ChevronDownIcon}
                  w={6}
                  h={6}
                  transform={isOpen ? "rotate(180deg)" : ""}
                  transition="transform 0.2s ease-in-out"
                />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <VStack align="start" spacing={4}>
                <Text>
                  
When you buy something on Gramin-Shakti, there are never any additional fees. All of the item prices are final and include all applicable taxes. You just pay the amount that appears on the product page.
                </Text>
                {/* <Text>
                  Phasellus mattis lorem sed sem convallis, id pellentesque
                  dolor posuere. Nulla eget tristique metus, a ultricies ante.
                  Quisque id vestibulum metus.
                </Text>
                <Text>
                  Donec eu scelerisque risus, vel commodo elit. Nulla facilisi.
                  Suspendisse potenti. Aenean quis vulputate metus. Donec non ex
                  vitae libero vehicula viverra ac ac nunc. Quisque luctus metus
                  vel libero feugiat, non suscipit odio malesuada.
                </Text> */}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Accordion allowMultiple pt={2}  >
          <AccordionItem>
            <h2>
              <AccordionButton bg='#E2E8F0' onClick={toggleAccordion}>
                <Box flex="1" textAlign="left">
                How do I pay for a Gramin-Shakti  purchase?
                </Box>
                <Icon
                  as={isOpen ? ChevronUpIcon : ChevronDownIcon}
                  w={6}
                  h={6}
                  transform={isOpen ? "rotate(180deg)" : ""}
                  transition="transform 0.2s ease-in-out"
                />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <VStack align="start" spacing={4}>
                <Text>
                Gramin-Shakti provides you with a variety of payment options. Regardless of the online payment method you choose, you can be sure that safe encryption technology is always being used by Gramin-Shakti's reliable payment gateway partners to protect the confidentiality of your transaction information.
                </Text>
                <Text>
                To complete your purchase, you can use Cash on Delivery and Internet Banking.
                </Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
       
      </Flex>
    </>
  );
};

export default Index;
