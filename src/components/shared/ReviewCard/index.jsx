import React from "react";
import { Rating, Star } from "@smastrom/react-rating";
import "./review.css";

const ReviewCard = ({data}) => {
  
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#0d9934",
    inactiveFillColor: "#abb1ac",
  };
  return (
    <div className="r--container">
      <div className="r--upper">
        <div className="r--info">
         
          <div className="r--name">
            <div>{data.Name}</div>
            <div className="rating-icon">
                <Rating
                  value={data.Star }
                  readOnly={true}
                  isDisabled={true}
                  itemStyles={myStyles}
                  style={{
                    maxWidth: "100px",
                  }}
                />
              </div>
          </div>
        </div>
      </div>
      <div className="r--content">
        <div>
         {data.Description}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
