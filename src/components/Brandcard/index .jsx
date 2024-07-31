import React, { useCallback, useEffect, useState } from "react";
import { Flex, Box, Image, Heading, Text, HStack, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import CategoryApi from "../../apis/categories.api";
import { updateAllCategories } from "../../redux/redux-slice/categories.slice";
import { useNavigate } from "react-router-dom";
const Brandcard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const categories = useSelector((state) => state.categories.Categories);
  const categoryApi = new CategoryApi();

  const getCategory = useCallback(async () => {
    try {
      const category = await categoryApi.getAllCategories();
      if (category && category.data.data) {
        dispatch(updateAllCategories(category.data.data));
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setIsLoading(flase);
      throw error;
    }
  });

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
    <Flex  justifyContent={'space-between'}>
      {isLoading ?<>
      <Flex flexDirection={'row'} width={'100%'} gap={4}>
<SkeletonCircle spacing='4' size='32' />
<SkeletonCircle spacing='4' size='32' />
<SkeletonCircle spacing='4' size='32' />
<SkeletonCircle spacing='4' size='32' />
<SkeletonCircle spacing='4' size='32' />
<SkeletonCircle spacing='4' size='32' />
<SkeletonCircle spacing='4' size='32' />
<SkeletonCircle spacing='4' size='32' />
<SkeletonCircle spacing='4' size='32' />
<SkeletonCircle spacing='4' size='32' />
</Flex>
      </> :<>
      {categories.map((row, index) => {
        return (
          // <HStack
          //   alignItems={"center"}
          //   minWidth={"300px"}
          //   // maxWidth={"300px"}
          //   gap={6}
          //   paddingX={2}
          //   paddingY={2}
          //   bg={"gray.100"}
          //   rounded={"md"}
          //   // wrap={"wrap"}
          //   flex={1}
          //   key={index}
          //   onClick={(e)=>{
          //     navigate(`/category/${row.CategoryID}`)
          //   }}
          //   cursor={`pointer`}
          //   justify={'space-between'}
          //   justifyContent={'start'}
          // >
          //   <Box height={"64px"} width={"64px"}>
          //     <Image
          //       height={"100%"}
          //       width={"100%"}
          //       objectFit={"cover"}
          //       rounded={"full"}
          //       src={`${row.Image}`}
          //       alt="test"
          //     />
          //   </Box>
          //   {/* <Flex direction={"column"} gap={1}> */}
          //     <Text fontWeight={500} >
          //       {row.Name}
          //     </Text>
          //     {/* <Text fontSize={"sm"}>Delivery in 24 hours</Text> */}
          //   {/* </Flex> */}
          // </HStack>
         
           
             <Box width={{base:"125px" ,md:'160px'}} display={'flex'} flexDirection={'column'} alignItems={'center'}
             key={index}
            onClick={(e)=>{
              navigate(`/category/${row.CategoryID}`)
            }}
            cursor={`pointer`}
             >
             <Box height={{base:"80px", md:"100px"}} width={{base:"80px", md:"100px"}} >
             <Image
             zIndex={9}
                height={"100%"}
                width={"100%"}
                objectFit={"cover"}
                rounded={"full"}
                src={`${row.Image}`}
                alt="test"
                bgColor={'white'}
                border= '1px solid lightgray'
                onClick={(e)=>{
                  navigate(`/category/${row.CategoryID}`)
                }}
              />
             </Box>
              <Text pt={2} fontSize={{base:"14px", md:"16px"}} color="black" fontWeight={'500'} textAlign={'center'}>{row.Name}</Text>
             
            </Box>
         
        );
      })}
      </>}
      </Flex>
    </>
  );
};

export default Brandcard;
