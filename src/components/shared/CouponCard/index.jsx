import React from "react";
import "./coupon.css";
import { AttachmentIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const CouponCard = () => {
  return (
    <div className="coupon--card--container">
      <div className="coupon--card--header">
        <div className="cc--percent">5% OFF</div>
        <div className="cc--date">Vaild till 30 Sep,2023</div>
      </div>
      <div className="cc--name">For whole order</div>
      <div className="cc-lower">
        <div className="cc--code">Code: CODE_123sksdiof</div>
        <div className="cc--btn">
          <Button
            leftIcon={<AttachmentIcon />}
            colorScheme="green"
            variant="outline"
            size="sm"
          >
            Copy Code
          </Button>
          <Button
            leftIcon={<ArrowForwardIcon />}
            colorScheme="green"
            variant="outline"
            size="sm"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
