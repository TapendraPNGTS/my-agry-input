import React from "react";
import "./coupon.css";
import CategoryLayout from "../../components/layout/CategoryLayout";
import SettingsMenu from "../../components/shared/SettingsMenu";
import Back from "../../assets/setting-image/setback.svg";

import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CouponCard from "../../components/shared/CouponCard";
import cancelIcon from "../../assets/images/cancel-sidervar-icon.svg";

const Coupons = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div className="settings--page--container">
        <CategoryLayout
          left={<NavigationMenu setMenu={setMenu} menu={menu} />}
          right={<CouponContainer setMenu={setMenu} menu={menu} />}
          navOpen={menu}
        />
      </div>
    </>
  );
};

const NavigationMenu = ({ setMenu, menu }) => {
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
        <h2>
          {menu ? (
            <img
              style={{ cursor: "pointer" }}
              src={Back}
              alt=""
              onClick={() => setMenu(false)}
            />
          ) : null}
          Settings
        </h2>
        <div className="navigation--items">
          <SettingsMenu />
        </div>
      </div>
    </>
  );
};

const CouponContainer = ({ menu, setMenu }) => {
  return (
    <div className="coupon--container">
      <div className="edit--p--header">
        <h2>
          {" "}
          <span className="pro--ham--icon" onClick={() => setMenu(true)}>
            <HamburgerIcon />
          </span>{" "}
          My Coupons
        </h2>
      </div>
      <div className="coupon--content">
        <CouponCard />
        <CouponCard />
        <CouponCard />
        <CouponCard />
        <CouponCard />
      </div>
    </div>
  );
};

export default Coupons;
