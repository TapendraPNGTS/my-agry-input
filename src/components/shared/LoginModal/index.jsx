import { Modal, ModalContent, ModalBody, ModalCloseButton, ModalOverlay, useDisclosure, Box } from '@chakra-ui/react';
import LoginFrom from "../../../pages/LoginForm/index";
import { useState, useEffect } from 'react';
import { useAuthenticated } from '../../../hooks/useAuthenticated.hook';

const LoginModal = ({ isOpen, onClose }) => {
  const isAuth = useAuthenticated();
  const { onOpen, onClose: onModalClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuth);

  const loggedIn = (data) => {
    setIsLoggedIn(data);
  };

  useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onModalClose();
    }
  }, [isOpen, onOpen, onModalClose]);

  return (
    <Box width={'100%'}>
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent width={'100%'} maxWidth={'fit-content'}  marginLeft={"25px"} marginRight={"25px"} marginTop={{ base: "100px", sm: "120px", md: "120px" }}>
        <ModalBody padding={`0`}>
          <ModalCloseButton zIndex={12} onClose={onClose}/>
          <LoginFrom onClose={onClose} loggedIn={loggedIn} />
        </ModalBody>
      </ModalContent>
    </Modal>
    </Box>
  );
};

export default LoginModal;
