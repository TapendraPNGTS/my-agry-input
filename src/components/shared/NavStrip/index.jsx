import "./navstrip.css";
import CategoriesApi from "../../../apis/categories.api";
import { useEffect } from "react";
import { updateCategoryAndSubCategory } from "../../../redux/redux-slice/categories.slice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";

import {Text}from "@chakra-ui/react"
const Navstrip = () => {
  const Categories = useSelector(
    (state) => state.categories.CategoryAndSubCategories
  );
  const categoriesApi = new CategoriesApi();
  const dispatch = useDispatch();
  const [openCategories, setOpenCategories] = useState(`none`);

  const categoriesData = useCallback(async () => {
    try {
      const categoriesResponse =
        await categoriesApi.getCategoryAndSubCategory();
      if (categoriesResponse && categoriesResponse.data.data) {
        dispatch(updateCategoryAndSubCategory(categoriesResponse.data.data));
      }
    } catch (error) {
      toast.error(error.message);
    }
  });

  const toggleCategory = (categoryName) => {
    setOpenCategories(categoryName);
  };
  useEffect(() => {
    categoriesData();
  }, []);
  return (
    <div className="navstrip-parent">
      <div className="navstrip-tele">
        {Categories.map((row, index) => {
          return (
            <>
              <p
                key={index}
                onClick={() =>
                  openCategories == row.Name
                    ? toggleCategory(``)
                    : toggleCategory(row.Name)
                }
                className={`navstrip-item ${
                  openCategories == row.Name ? "opened" : ""
                }`}
              >
                {" "}
                {row.Name}{" "}
                <span style={{ cursor: "pointer" }}>
                  {openCategories == row.Name ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )}
                </span>
                <>
                  {" "}
                  {row.subCategory.length > 0 &&openCategories == row.Name && (
                    <div
                      className={`dropdown-content ${
                        openCategories == row.Name ? "opened" : ""
                      }`}
                    >
                      {
                        row.subCategory.map((subCategory, index1) => {
                          return (<Text key={`sub-${index}-${index1}`}>{subCategory.Name}</Text>);
                        })}
                    </div>
                  )}
                </>
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Navstrip;
