import React from "react";
import "./category.css";
import CategoryLayout from "../../components/layout/CategoryLayout";
import {
  Text,
  Flex,
  Image,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Slider,
  Heading,
  Skeleton
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import Back from "../../assets/setting-image/setback.svg";
import ProductCard from "../../components/Itemcard";
import ProductApi from "../../apis/product.api";
import CategoryApi from "../../apis/categories.api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAllProduct } from "../../redux/redux-slice/product.slice";
import { useCallback } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateSubCategory, updateCategoryAndSubCategory } from "../../redux/redux-slice/categories.slice";
import toast from "react-hot-toast";
import { useState } from "react";
import { findCategory, findCategoryName } from "../../utils/common.util";
import wishlistBgImg from "../../assets/images/wishlist-bg-img.svg";
import searchIcon from "../../assets/images/search-category-icon.svg";
import productNotFound from "../../assets/images/product-not-found.svg";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";

const Category = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const productApi = new ProductApi();
  const categoryApi = new CategoryApi();
  const productData = useSelector((state) => state.products.Products);
  const cat_sub_data = useSelector(
    (state) => state.categories.CategoryAndSubCategories);
  const [menu, setMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [filterProducts, setFilterProducts] = useState([]);


  // console.log("cat_sub_data",cat_sub_data)
  // console.log("productData",cat_sub_data)


  const getProductByCategoryId = useCallback(async () => {
    try {
      setIsLoading(true);
      const product = await productApi.getProductByCategoryId({
        categoryId: params.id,
      });
      // console.log("getProductByCategoryId",product);

      if (product && product.data && product.data.data) {
        dispatch(updateAllProduct(product.data.data));
        // console.log("Redux State:", product.data.data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setIsLoading(false);
      throw error;
    }
  }, [dispatch, params.id]);



  const getAllCategory = useCallback(async () => {
    try {
      const allCategoryResponse = await categoryApi.getCategoryAndSubCategory({
        // categoryId: params.id,
      });

      if (allCategoryResponse && allCategoryResponse.data && allCategoryResponse.data.data) {
        dispatch(updateCategoryAndSubCategory(allCategoryResponse.data.data));
      }
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  }, [dispatch, params.id]);

  const getAllSubCategory = useCallback(async () => {
    try {
      const allCategoryResponse = await categoryApi.getSubCategory({
        categoryId: params.id,
      });

      if (allCategoryResponse && allCategoryResponse.data && allCategoryResponse.data.data) {
        dispatch(updateSubCategory(allCategoryResponse.data.data));
      }
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong");
      throw error;
    }
  }, [dispatch, params.id]);

  

  const getRangeProducts = useCallback(async () => {
    try {
      // setIsLoading(true);
        const getfilterProducts = await productApi.getAllRangeProductFilter({
            minPrice: minPrice,
            maxPrice: maxPrice,
        });
        if (getfilterProducts && getfilterProducts.data && getfilterProducts.data.data) {
            setFilterProducts(getfilterProducts.data.data);
            
        }
        setIsLoading(false);
    } catch (error) {
        // console.error(error);
    }
}, [minPrice, maxPrice, setIsLoading]);

useEffect(() => {
  getRangeProducts();
}, [getRangeProducts]);

  useEffect(() => {
    getAllCategory();
    getProductByCategoryId();
    getAllSubCategory();
  }, [params.id]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredCategories = cat_sub_data.filter((row) =>
    row.Name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div>
        <Image width={'100%'} height={'auto'} src={wishlistBgImg} />
      </div>
      <div className="category--page--container">
        <CategoryLayout
          navOpen={menu}
          left={
            <LeftContainer
              categories={filteredCategories}
              name={"Categories"}
              setMenu={setMenu}
              menu={menu}
              categoryId={params.id}
              handleSearch={handleSearch}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
              isLoading={isLoading}
            />
          }
          right={
            <RightContainer
              productData={productData}
              setMenu={setMenu}
              menu={menu}
              categoryId={params.id}
              categoryData={cat_sub_data}
              isLoading={isLoading}
              filterProducts={filterProducts}
            // categoryName={categoryName}
            />
          }
        />
      </div>
    </>
  );
};

const LeftContainer = ({ categories, name, setMenu, menu, categoryId, handleSearch, minPrice, setMinPrice, maxPrice, setMaxPrice,isLoading }) => {
  const [subCatId, setSubCatId] = useState();
  const [sliderValues, setSliderValues] = useState([minPrice, maxPrice]);

  // console.log("categories", categories);

  useEffect(() => {
    setSliderValues([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleSliderChange = (val) => {
    setMinPrice(val[0]);
    setMaxPrice(val[1]);
  };
  const handleMinPrice = (e) => {
    const value = parseFloat(e.target.value);
    setMinPrice(value);
  }
  const handleMaxPrice = (e) => {
    const value = parseFloat(e.target.value);
    setMaxPrice(value);
  }
  return (
    <>
     <Flex justifyContent={'right'} pr={3}>
           {menu ? (
                        <img
                            style={{ cursor: "pointer" }}
                            src={cancelIcon}
                            width={'20px'}
                            alt=""
                            onClick={() => setMenu(false)}
                        />
                    ) : null}
           </Flex>
      <div className="navigation--menu--container">
        <div>
          <Heading textAlign={'left'} fontSize={'26px'} mb={3}>Price</Heading>
          <GridItem px={{ base: "5px", sm: "20px", md: "20px" }}>

            <RangeSlider
              aria-label={["min", "max"]}
              min={10}
              max={10000}
              value={sliderValues}
              onChange={handleSliderChange}
              width={"99%"}
            >
              <RangeSliderTrack h={"6px"}>
                <RangeSliderFilledTrack bg={"#19884A"} />
              </RangeSliderTrack>
              <RangeSliderThumb
                index={0}
                bg={"#19884A"}
                h={"1.0pc"}
                w={"1pc"}
              />
              <RangeSliderThumb
                index={1}
                bg={"#19884A"}
                h={"1.0pc"}
                w={"1pc"}
              />
            </RangeSlider>
            <InputGroup justifyContent={"space-between"} mt={2}>
              <Input
                w={'86px'}
                h={8}
                value={minPrice}
                placeholder={"10.00"}
                // value={10}
                textAlign={'center'}
                onChange={handleMinPrice}
                opacity={"1 !important"}
                // disabled
                type="number"
              />

              <Input
                w={'86px'}
                h={8}
                textAlign={'center'}
                placeholder="54464.00"
                // value={100000}
                value={maxPrice}
                onChange={handleMaxPrice}
                opacity={"1 !important"}
                // disabled
                type="number"
              />
            </InputGroup>
          </GridItem>
        </div>
        <div>

          <InputGroup
            width={'100%'}
            display={"flex"}
            className="category-input"
            alignItems={'center'}
            textAlign={'center'}
          >

            <Input
              type=""
              placeholder="Search Category..."
              // value={searchInput}
              onChange={handleSearch}
              focusBorderColor="none"
              border={"none"}
              _focusVisible={{
                outline: "none",
              }}
            />
            <InputRightElement pointerEvents="none" >

              <Image src={searchIcon} />
            </InputRightElement>
          </InputGroup>
        </div>
        <h2>
          {menu ? (
            <img
              style={{ cursor: "pointer" }}
              src={Back}
              alt=""
              onClick={() => setMenu(false)}
            />
          ) : null}
          Category
        </h2>
        <div>

          {/* {categories.map((row, index) => {
            return (
              <SubCategory
                subCategory={row}
                categoryId={categoryId}
                categoryData={row}
                key={index}
              />
            );
          })} */}
{isLoading ?  (
       <Box>
        <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
       </Box>
            
          ) : (
            <>
          {categories.map((row, index) => (
            <SubCategory
              subCategory={row}
              categoryId={categoryId}
              categoryData={row}
              key={index}
             
            />
          ))}
          </>
          )
}
        </div>
      </div>
    </>
  );
};

const RightContainer = ({
  productData,
  menu,
  setMenu,
  categoryId,
  categoryData,
  isLoading,
  filterProducts
}) => {
  return (
    <>
      <div className="cat--right--container">
        <div className="cat--right--header">
          <Text
            fontSize={{ base: "20px", md: "xl", lg: "2xl" }}
            fontWeight={{
              base: 400,
              md: 600,
            }}
          >
            <span className="pro--ham--icon" onClick={() => setMenu(true)}>
              <HamburgerIcon />
            </span>{" "}

            {categoryData && categoryData.length > 0
              ? findCategoryName(categoryId, categoryData)
              : `Category Name`}

          </Text>
        </div>

        {/* {filterProducts && (
                     <div className="cat--right--content">
                    
                     {filterProducts.length === 0 ?
                         <Flex width={"100%"} alignItems={'center'} justifyContent={'center'}>
                         <Image   src={productNotFound} />
                         </Flex>
                        :<>
                     
                     <Grid
                         templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
                         gap={{ base: "2", md: "3", lg: "4" }}
 
                     >
                        
                         {filterProducts.map((product, index) => (
           <GridItem key={index} >
             <ProductCard
               widthmin={"100%"}
               widthmax={"100%"}
               // scroll={scroll}
               products={[product]} // Displaying one card at a time
               isLoading={isLoading}
             />
           </GridItem>
         ))}
 
                     </Grid>
                    
 </>}
                 </div>
                ) 
                         }  */}
                {/* :
                 ( */}

        {productData &&
          <div className="cat--right--content">
            {productData && productData.length === 0 ? (
              <Flex width={"100%"} justifyContent={'center'}>
                <Image src={productNotFound} />
              </Flex>
              // <></>
            )
              : (

                <Grid
                  templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
                  gap={{ base: "2", md: "3", lg: "4" }}

                >

                  {productData.map((product, index) => (
                    <GridItem key={index} >
                      <ProductCard
                        widthmin={"100%"}
                        widthmax={"100%"}
                        // scroll={scroll}
                        products={[product]} // Displaying one card at a time

                      />
                    </GridItem>
                  ))}

                </Grid>
              )}

          </div>
}
                {/* )
        } */}

        {/* <div className="cat--right--content">

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: "2", md: "3", lg: "4" }}
          >
            {subCategoryProducts.map((product, index) => {
              console.log(product, "product");
              { console.log("product", product) }
              return (
                <GridItem key={index}>
                  <ProductCard
                    widthmin={"100%"}
                    widthmax={"100%"}
                    
                    products={[product]}
                  />
                </GridItem>

              )
            })}
          </Grid>

        </div> */}
      </div>

    </>
  );
};

const SubCategory = ({ subCategory, categoryId, categoryData, key }) => {
  const navigate = useNavigate()
 
  const [categoryShow, setCategoryShow] = useState(false);


  return (
    <>
      <Flex direction="column" w={`100%`} pt={2} key={key}>
        <Flex className="category-container-my">
          <div>
            <div
              className="edit--p--header"
              onClick={() => {
                if (categoryShow) {
                  setCategoryShow(false);
                } else {
                  setCategoryShow(true);
                }
              }}
            >
              <h3
                className={
                  findCategory(categoryId, categoryData) ? `active` : ``
                }
                onClick={(e) => {
                  navigate(`/category/${subCategory.CategoryID}`)
                }}
              >
                {" "}
                {subCategory.Name}
                {/* { console.log("subCategory.Name",subCategory.Name)} */}
              </h3>
              <h3>
                {categoryShow ? (
                  <ChevronDownIcon onClick={() => setCategoryShow(true)} />
                ) : (
                  <ChevronRightIcon onClick={() => setCategoryShow(false)} />
                )}
              </h3>
            </div>
            <div className="SubCat">
              {categoryShow || findCategory(categoryId, categoryData)
                ? subCategory?.subCategory.map((row, index) => {
                  
                  return <p style={{ cursor: "pointer", color: "black" }} key={index}
                  onClick={(e)=>{navigate(`/sub-category/${row.SubCategoryID}`)}}
                    
                  >{row.Name}</p>;
                })
                : ``}
            </div>
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default Category;
