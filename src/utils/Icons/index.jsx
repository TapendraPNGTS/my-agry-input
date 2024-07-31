import { AiOutlineHeart ,AiFillHeart, AiTwotoneMail,AiFillFilePdf} from "react-icons/ai";
import { BsTruck,BsFillTelephoneForwardFill } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";
import { CiCalendar } from "react-icons/ci";
import { PiSuitcaseSimpleThin, PiGiftThin } from "react-icons/pi";
import { LuGift } from "react-icons/lu";
import { IoHelpCircleOutline, IoCloseSharp, IoClose } from "react-icons/io5";
import { BiUser, BiShoppingBag, BiMessageSquareEdit } from "react-icons/bi";
import { RiFileList3Line, RiCouponLine, RiNotification4Line, RiLogoutCircleRLine, RiFolderTransferFill , RiDeleteBin5Fill } from "react-icons/ri";
import { HiOutlineHeart } from "react-icons/hi";
import { GrFormClose } from "react-icons/gr";
import { TbLogout } from "react-icons/tb";

export const HeartIcon = () => {
  return <Icon as={AiOutlineHeart} boxSize={6} />;
};
export const HeartFillIcon = () => {
  return <Icon as={AiFillHeart} boxSize={6} color={`red`} />;
};

export const TruckIcon = () => {
  return <Icon as={BsTruck} boxSize={6} />;
};

export const CalendarEventIcon = () => {
  return <Icon as={CiCalendar} boxSize={6} />;
};
export const Suitecase = () => {
  return <Icon as={PiSuitcaseSimpleThin} boxSize={6} />;
};
export const GiftIcon = () => {
  return <Icon as={LuGift} boxSize={6} />;
};
export const HelpIcon = () => {
  return <Icon as={IoHelpCircleOutline} boxSize={6} />;
};

export const GiftThin = () => {
  return <Icon as={PiGiftThin} boxSize={6} />;
};

export const UserIcon = () => {
  return <Icon as={BiUser} boxSize={6} />;
};

export const FileListIcon = () => {
  return <Icon as={RiFileList3Line} boxSize={6} />;
};

export const HeartOutlineIcon = () => {
  return <Icon as={HiOutlineHeart} boxSize={6} />;
};

export const CouponIcon = () => {
  return <Icon as={RiCouponLine} boxSize={6} />;
};

export const NotificationIcon = () => {
  return <Icon as={RiNotification4Line} boxSize={6} />;
};

export const LogoutIcon = () => {
  return <Icon as={RiLogoutCircleRLine} boxSize={6} />;
};

export const CloseIcon = () => {
  return <Icon as={GrFormClose} boxSize={6} />;
};

export const FolderTransferIcon = () => {
  return <Icon as={RiFolderTransferFill} boxSize={6} />;
};

export const LogoutThinIcon = () => {
  return <Icon as={TbLogout} boxSize={6} />;
};

export const DeleteBinIcon = () => {
  return <Icon as={RiDeleteBin5Fill} boxSize={6} />;
};

export const BagIcon = () => {
  return <Icon as={BiShoppingBag} boxSize={6} />;
};

export const PhoneIcon = () => {
  return <Icon as={BsFillTelephoneForwardFill} boxSize={5} pt={2}/>;
};

export const EmailIcon = () => {
  return <Icon as={AiTwotoneMail} boxSize={5} pt={2}/>;
};

export const MessageIcon = () => {
  return <Icon as={BiMessageSquareEdit} boxSize={5} pt={2}/>;
};


export const PurchaseIcon = () => {
  return <Icon as={AiFillFilePdf} boxSize={5} />;
};

// export const CloseIcon = () => {
//   return <Icon as={IoClose} boxSize={5} pt={2}/>;
// };