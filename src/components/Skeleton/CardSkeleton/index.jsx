import React, { useRef } from "react";
import { Flex, Image, IconButton, Button, Text,Skeleton,SkeletonCircle ,SkeletonText} from "@chakra-ui/react";
import { HeartIcon } from "../../../utils/Icons";
import { Rating, Star } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

const SkeletonEffect = () => {
  return (
    <>
      <Flex
        direction={"column"}
        flex={1}
        minWidth={"300px"}
        shadow={"sm"}
        cursor={`pointer`}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={"300px"}
          bg={"gray.100"}
          roundedTopLeft={"xl"}
          roundedTopRight={"xl"}
          position={"relative"}
          // key={index}
        >
          <Link to="/product-detail">
            <SkeletonCircle
              maxHeight={"200px"}
              maxWidth={"200px"}
              margin={"auto"}
            />
          </Link>
        </Flex>

        <Flex
          marginTop={3}
          direction={"column"}
          gap={2}
          paddingX={4}
          paddingY={2}
          paddingBottom={6}
          roundedBottomRight={"xl"}
          roundedBottomLeft={"xl"}
          shadow={"lg"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}></Flex>
          <SkeletonText fontSize={"14px"}>
            Organic Cotton, fairtrade certified
          </SkeletonText>
        </Flex>
      </Flex>

      <Flex
        direction={"column"}
        flex={1}
        minWidth={"300px"}
        shadow={"sm"}
        cursor={`pointer`}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={"300px"}
          bg={"gray.100"}
          roundedTopLeft={"xl"}
          roundedTopRight={"xl"}
          position={"relative"}
          // key={index}
        >
          <Link to="/product-detail">
            <SkeletonCircle
              maxHeight={"200px"}
              maxWidth={"200px"}
              margin={"auto"}
            />
          </Link>
        </Flex>

        <Flex
          marginTop={3}
          direction={"column"}
          gap={2}
          paddingX={4}
          paddingY={2}
          paddingBottom={6}
          roundedBottomRight={"xl"}
          roundedBottomLeft={"xl"}
          shadow={"lg"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}></Flex>
          <SkeletonText fontSize={"14px"}>
            Organic Cotton, fairtrade certified
          </SkeletonText>
        </Flex>
      </Flex>

      <Flex
        direction={"column"}
        flex={1}
        minWidth={"300px"}
        shadow={"sm"}
        cursor={`pointer`}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={"300px"}
          bg={"gray.100"}
          roundedTopLeft={"xl"}
          roundedTopRight={"xl"}
          position={"relative"}
          // key={index}
        >
          <Link to="/product-detail">
            <SkeletonCircle
              maxHeight={"200px"}
              maxWidth={"200px"}
              margin={"auto"}
            />
          </Link>
        </Flex>

        <Flex
          marginTop={3}
          direction={"column"}
          gap={2}
          paddingX={4}
          paddingY={2}
          paddingBottom={6}
          roundedBottomRight={"xl"}
          roundedBottomLeft={"xl"}
          shadow={"lg"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}></Flex>
          <SkeletonText fontSize={"14px"}>
            Organic Cotton, fairtrade certified
          </SkeletonText>
        </Flex>
      </Flex>

      <Flex
        direction={"column"}
        flex={1}
        minWidth={"300px"}
        shadow={"sm"}
        cursor={`pointer`}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={"300px"}
          bg={"gray.100"}
          roundedTopLeft={"xl"}
          roundedTopRight={"xl"}
          position={"relative"}
          // key={index}
        >
          <Link to="/product-detail">
            <SkeletonCircle
              maxHeight={"200px"}
              maxWidth={"200px"}
              margin={"auto"}
            />
          </Link>
        </Flex>

        <Flex
          marginTop={3}
          direction={"column"}
          gap={2}
          paddingX={4}
          paddingY={2}
          paddingBottom={6}
          roundedBottomRight={"xl"}
          roundedBottomLeft={"xl"}
          shadow={"lg"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}></Flex>
          <SkeletonText fontSize={"14px"}>
            Organic Cotton, fairtrade certified
          </SkeletonText>
        </Flex>
      </Flex>
    </>
  );
};
export default SkeletonEffect;