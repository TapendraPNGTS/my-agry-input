import "./loginBtn.css";
import {
  Text,
  IconButton,
  HStack,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import {
  UserIcon,
  FileListIcon,
  HeartOutlineIcon,
  PurchaseIcon,
  NotificationIcon,
  LogoutIcon,
} from "../../../utils/Icons";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { logout } from "../../../utils/common.util";
import { ChatIcon } from "@chakra-ui/icons";

const index = ({ loggedIn ,onClose}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* <Flex> */}
      <Link to={`/settings/edit`} onClick={onClose}>
      <HStack pl={`2`} cursor={`pointer`} >
        <IconButton color={`green`} rounded={`full`} icon={<UserIcon />} />
        <Text fontSize={`sm`} pl={`2`} fontWeight={`medium`}>
          My Profile
        </Text>
      </HStack>
        </Link>
      <Flex
        borderBottom={`1.5px solid #DBDBDB`}
        marginTop={`2`}
        marginLeft={`1`}
        marginRight={`1`}
      />
      <Link to={`settings/orders`} onClick={onClose}>
      <HStack pl={`2`} pt={`3`} cursor={`pointer`}>
        <IconButton color={`green`} rounded={`full`} icon={<FileListIcon />} />
        <Text fontSize={`sm`} pl={`2`} fontWeight={`medium`}>
          Orders
          {/* Orders */}
        </Text>
      </HStack>
      </Link>
      <Flex
        borderBottom={`1.5px solid #DBDBDB`}
        marginTop={`2`}
        marginLeft={`1`}
        marginRight={`1`}
      />
      <Link to={`/settings/wishlist`} onClick={onClose}>
        <HStack pl={`2`} pt={`3`} cursor={`pointer`}>
          <IconButton
            color={`green`}
            rounded={`full`}
            icon={<HeartOutlineIcon />}
          />
          <Text fontSize={`sm`} pl={`2`} fontWeight={`medium`}>
            Wishlist
          </Text>
        </HStack>
      </Link>
      <Flex
        borderBottom={`1.5px solid #DBDBDB`}
        marginTop={`2`}
        marginLeft={`1`}
        marginRight={`1`}
      />
      <Link to={`/settings/purchase-history`} onClick={onClose}>
        <HStack pl={`2`} pt={`3`} cursor={`pointer`}>
          <IconButton color={`green`} rounded={`full`} icon={<PurchaseIcon />} />
          <Text fontSize={`sm`} pl={`2`} fontWeight={`medium`}>
            Purchase History
          </Text>
        </HStack>
      </Link>
      <Flex
        borderBottom={`1.5px solid #DBDBDB`}
        marginTop={`2`}
        marginLeft={`1`}
        marginRight={`1`}
      />
      <Link to={`/settings/notifications`} onClick={onClose}>
        <HStack pl={`2`} pt={`3`} cursor={`pointer`}>
          <IconButton
            color={`green`}
            rounded={`full`}
            icon={<NotificationIcon />}
          />
          <Text fontSize={`sm`} pl={`2`} fontWeight={`medium`}>
            Notification
          </Text>
        </HStack>
      </Link>
      <Flex
        borderBottom={`1.5px solid #DBDBDB`}
        marginTop={`2`}
        marginLeft={`1`}
        marginRight={`1`}
      />
      {/* <Link to={"/settings/advisory-chat"}>
        <HStack pl={`2`} pt={`3`} cursor={`pointer`}>
          <IconButton
            color={`green`}
            rounded={`full`}
            icon={<ChatIcon />}
          />
          <Text fontSize={`sm`} pl={`2`} fontWeight={`medium`}>
            Advisory Chat
          </Text>
        </HStack>
      </Link> */}
      {/* <Flex
        borderBottom={`1.5px solid #DBDBDB`}
        marginTop={`2`}
        marginLeft={`1`}
        marginRight={`1`}
      /> */}
      <HStack pl={`2`} pt={`3`} cursor={`pointer`}>
        <IconButton color={`green`} rounded={`full`} icon={<LogoutIcon />} />
        <Link to={`/`} onClick={onClose}>
          <Text
            fontSize={`sm`}
            pl={`2`}
            fontWeight={`medium`}
            onClick={(e) => {
              loggedIn(false);
              logout(navigate('/'));
            }}
          >
            Logout
          </Text>
        </Link>
      </HStack>
      {/* </Flex> */}
    </>
  );
};

export default index;
