import React, { useState, useEffect} from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuthenticated } from "../hooks/useAuthenticated.hook";
import { getUserLocal } from "../utils/localStorage.util";
import LoginModal from "../components/shared/LoginModal";
import Home from "../pages/Home";
import { useDisclosure } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
  const isAuth = useAuthenticated();
  const user = getUserLocal();
  const [showLoginModal, setShowLoginModal] = useState(!isAuth);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    // Check if the user is not authenticated
    if (!isAuth) {
      // Open the login modal
      onOpen();
    }
  }, [isAuth, onOpen]);

  if (!isAuth) {
    return (
      <>
    {/* <Navigate to="/" />; */}
    <LoginModal isOpen={isOpen} onClose={onClose} />
        <Home /> 
      </>
    )
  } else {
    return children;
  }
};

export default ProtectedRoute;
