import { Box, Image, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
import serviceIcon from "../../../assets/images/service-bottom-icon.svg";
import productIcon from "../../../assets/images/product-bottom-icon.svg";
import notificationIcon from "../../../assets/images/notification-bottom-icon.svg";
import wishlistIcon from "../../../assets/images/wishlist-bottom-icon.svg";
import homeIcon from "../../../assets/images/home-bottom-icon.svg";
import homeActive from "../../../assets/images/home-active-bottom-icon.svg";
import serviceActive from "../../../assets/images/services-active-icon.svg";
import productActive from "../../../assets/images/product-active-icon.svg";
import notificationActive from "../../../assets/images/notification-bottom-active-icon.svg";
import wishlistActive from "../../../assets/images/wishlist-active-icon.svg";


const BottomNavigation = () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
       <Box display={{base:"inline-flex", md:"none", lg:"none"}}>
         <div className="bottom-nav-container">
            <ul className="bottom-navs">
                <Link to="/our-products" className="bottom-nav-links">
                    {(location.pathname == "/our-products") ? <> <Image className="active-bottom-link" src={productActive} />  Products </> : <> <Image src={productIcon} />
                       
                    </>
                    }
                </Link>
                <Link to="/services" className="bottom-nav-links">
                    {(location.pathname == '/services') ? <> <Image className="active-bottom-link" src={serviceActive} /> Services </> : <> <Image src={serviceIcon} />
                        
                    </>
                    }
                </Link>
                <Link to="/" className="bottom-nav-links">
                    {(location.pathname == "/") ? <> <Image className="active-bottom-link" src={homeActive} />  Home </> : <> <Image src={homeIcon} />
                       
                    </>
                    }
                </Link>
                <Link to="/settings/wishlist" className="bottom-nav-links">
                    {(location.pathname == "/settings/wishlist") ? <> <Image className="active-bottom-link" src={wishlistActive} /> Wishlist </> : <> <Image src={wishlistIcon} />
                        
                    </>
                    }
                </Link>
                <Link to="/settings/notifications" className="bottom-nav-links">
                    {(location.pathname == "/settings/notifications") ? <> <Image className="active-bottom-link" src={notificationActive} />  Notification </> : <> <Image src={notificationIcon} />
                       
                    </>
                    }
                </Link>
            </ul>
        </div>
       </Box>
    )
}
export default BottomNavigation;