"use client";
import {
  CircleUser,
  MenuIcon,
  PersonStandingIcon,
  ShoppingCart,
} from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Avatar,
  Input,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import MobileDrawer from "./MobileDrawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { AuthState } from "../../../models/auth.model";
import { login, logout } from "../../../redux/features/auth/auth.slice";
import {
  openAuthModal,
  openSellerRequestModal,
} from "../../../redux/features/home/home.slice";
import { userRole } from "../../../utils/constants/user.constants";
import { useNavigate } from "react-router-dom";
import SellerRequest from "./SellerRequest";

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  // const storeState: AuthState = useSelector(
  //   (state: RootState): AuthState => state.auth
  // );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth: AuthState = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    console.log("dgfv");
    // dispatch(login());
    console.log(auth.isAuthenticated);
  }, [auth]);

  const onOpenModal = () => {
    dispatch(openAuthModal());
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div className="flex items-center gap-4">
        <img src="./logo.png" alt="" className="h-20 mx-4 md:mx-10" />
        <div className={`h-20 w-20 bg-green text-black`}>
          {auth.isAuthenticated ? "hello" : "bye"} no
        </div>
        {/* <Input placeholder="Search..." /> */}
        <Input
          focusBorderColor="teal.500"
          variant="outline"
          placeholder="Search..."
          className="ml-auto max-w-72 border-teal-500"
        />
        <div className="md:hidden mx-4">
          <IconButton
            aria-label="menu"
            icon={<MenuIcon />}
            onClick={onOpen}
          ></IconButton>
        </div>
        <div className="items-center gap-6 mx-10 hidden md:flex">
          <Button colorScheme="teal" variant="ghost">
            Products
          </Button>
          <Button colorScheme="teal" variant="ghost">
            Wishlist
          </Button>
          <Button colorScheme="teal" variant="ghost" className="flex-col ">
            <ShoppingCart /> Cart
          </Button>
          {auth.isAuthenticated ? (
            <Popover isOpen={open}>
              <PopoverTrigger>
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  className="flex-col"
                  onClick={() => setOpen((open) => !open)}
                >
                  <CircleUser /> Account
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[200px] m-2">
                <PopoverHeader fontWeight="semibold">My Profile</PopoverHeader>
                <PopoverArrow bg="teal.500" />
                <PopoverCloseButton onClick={() => setOpen(false)} />
                <PopoverBody className="flex-col">
                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    className="w-full"
                    justifyContent="start"
                  >
                    Profile
                  </Button>
                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    className="w-full"
                    justifyContent="start"
                  >
                    Orders
                  </Button>
                  {auth.user!.role == userRole.buyer ? (
                    <Button
                      colorScheme="teal"
                      variant="ghost"
                      className="w-full"
                      justifyContent="start"
                      onClick={() => dispatch(openSellerRequestModal())}
                    >
                      Become A Seller
                    </Button>
                  ) : auth.user!.role == userRole.seller ? (
                    <Button
                      colorScheme="teal"
                      variant="ghost"
                      className="w-full"
                      justifyContent="start"
                      onClick={() => navigate("/seller")}
                    >
                      Seller Dashboard
                    </Button>
                  ) : auth.user!.role == userRole.admin ? (
                    <Button
                      colorScheme="teal"
                      variant="ghost"
                      className="w-full"
                      justifyContent="start"
                    >
                      Admin Dashboard
                    </Button>
                  ) : null}

                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    className="w-full"
                    justifyContent="start"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </Button>
                  {/* <div className="flex">
                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    className="w-full"
                    justifyContent="start"
                  >
                    Login
                  </Button>
                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    className="w-full"
                    justifyContent="start"
                  >
                    SignUp
                  </Button>
                </div> */}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <Button colorScheme="teal" onClick={onOpenModal}>
              Login
            </Button>
          )}
        </div>
      </div>
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
      <SellerRequest />
      {children}
    </div>
  );
};

export default Header;
