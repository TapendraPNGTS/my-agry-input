import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Franchise from "../pages/Franchise";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { Toaster } from "react-hot-toast";
import Privacy from "../pages/Policies/PrivacyPolicy";
import ShipingPolicy from "../pages/Policies/ShipingPolicy";
import TermCondition from "../pages/Policies/Term&Condition";
import ReturnPolicy from "../pages/Policies/ReturnPolicy";
import CancellationPolicy from "../pages/Policies/CancellationPolicy";
import ContactUs from "../pages/ContactUS";
import AboutUs from "../pages/AboutUs";

import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";
import Notification from "../pages/Notification";
import CheckOut from "../pages/Checkout";
import Wishlist from "../pages/WishList";
import Purchase from "../pages/Purchase";
import Orders from "../pages/Order";
import Navstrip from "../components/shared/NavStrip";
import Offer from "../pages/Offer";
import Address from "../pages/Address";
import ViewCart from "../pages/ViewCart";

import OrderPlaced from "../pages/OrderPlaced";
import RequestedSuccess from "../pages/RequestedSuccess";
import ScrollToTop from "../pages/scrollToTop";
import Category from "../pages/Category";
import Faqs from "../pages/Faqs";
import OurProduct from "../pages/OurProducts";
import Services from "../pages/Services";
import WeatherAdvisory from "../pages/WeatherAdvisory";
import CropAdvisory from "../pages/CropAdvisory";
import Fertigation from "../pages/Fertilization";
import Pesticide from "../pages/Pesticide";
import Disease from "../pages/Disease";
import Information from "../pages/Information";
import ServicesDetails from "../pages/Services-Details";
import Chat from "../pages/Chat";
import Cart from "../components/Card";
import LoginModal from "../components/shared/LoginModal";
import FloatButton from "../components/shared/whatsapp";
import SubCategoryProduct from "../pages/SubCategory";
import BottomNavigation from "../components/shared/BottomNav";
import OrderDetail from "../pages/OrderDetail";
import OrderSuccessfulPlaced from "../pages/OrderPlaced/CashOnDelivery";
import RegistrationForm from "../components/shared/RegistrationForm";
import AddFieldsMapBox from "../pages/AddFields";
import MapBox from "../pages/AddFields/map";
import FieldsData from "../pages/AddFields";
import AddFields from "../pages/AddFields/addField";
import EditFieldsMapBox from "../pages/AddFields/editField";

const Routers = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const shouldShowNavbarAndFooter = () => {
    const hiddenRoutes = [
      "/mb-Term-Condition",
      "/mb-privacy-policy",
      "/mb-shiping-policy",
      "/mb-cancellation-policy",
      "/mb-return-policy",
      "/mb-faqs",
      "/mb-about-us",
      "/mb-contact-us",
    ];

    return !hiddenRoutes.includes(location.pathname);
  };

  return (
    <>
      <ScrollToTop />
     {shouldShowNavbarAndFooter() && <><Navbar /> <FloatButton/></>}
      {/* <Navstrip /> */}
      {/* <Navbar /> */}
      <Toaster />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/offer"
          element={
            <ProtectedRoute>
              <Offer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-success/:id"
          element={
            <ProtectedRoute>
              <OrderPlaced />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-successful"
          element={
            <ProtectedRoute>
              <OrderSuccessfulPlaced />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/edit"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/purchase-history"
          element={
            <ProtectedRoute>
              <Purchase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-detail/:id"
          element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loginModal"
          element={
            <ProtectedRoute>
              <LoginModal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/notifications"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/address"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/viewCart"
          element={
            <ProtectedRoute>
              <ViewCart />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/settings/weather-advisory"
          element={
            <ProtectedRoute>
              <WeatherAdvisory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/crop-advisory"
          element={
            <ProtectedRoute>
              <CropAdvisory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/fertigation"
          element={
            <ProtectedRoute>
              <Fertigation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/pesticide"
          element={
            <ProtectedRoute>
              <Pesticide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/disease"
          element={
            <ProtectedRoute>
              <Disease />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/important-information"
          element={
            <ProtectedRoute>
              <Information />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/advisory-chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/whatsapp-chat"
          element={
            <ProtectedRoute>
              <FloatButton />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/fields"
          element={
            <ProtectedRoute>
              <FieldsData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/add-fields"
          element={
            <ProtectedRoute>
              <AddFields />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/edit-fields/:id"
          element={
            <ProtectedRoute>
              <EditFieldsMapBox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapBox />
            </ProtectedRoute>
          }
        />
        <Route path="/request-success/:id" element={<RequestedSuccess />} />

        <Route path="/category/:id" element={<Category />} />
        <Route path="/sub-category/:id" element={<SubCategoryProduct />} />
        <Route path="/product-detail/:id" element={<Product />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/Term-Condition" element={<TermCondition />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/shiping-policy" element={<ShipingPolicy />} />
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/our-products" element={<OurProduct />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services-detail/:id" element={<ServicesDetails />} />
        <Route
          path="/viewCart"
          element={
              <ViewCart />
          }
        />
        <Route path="/register" element={<RegistrationForm/>} />



 {/* routes for mobile */}
 <Route path="/mb-privacy-policy" element={<Privacy />} />
      <Route path="/mb-shiping-policy" element={<ShipingPolicy />} />
      <Route path="/mb-cancellation-policy" element={<CancellationPolicy />} />
      <Route path="/mb-return-policy" element={<ReturnPolicy />} />
      <Route path="/mb-Term-Condition" element={<TermCondition />} />
      <Route path="/mb-faqs" element={<Faqs />} />
      <Route path="/mb-about-us" element={<AboutUs />} />
      <Route path="/mb-contact-us" element={<ContactUs />} />
        {/* </>)} */}
      </Routes>
      {shouldShowNavbarAndFooter() && <Footer />}
      {/* <Footer /> */}

      <BottomNavigation />

    </>
  );
};

export default Routers;
