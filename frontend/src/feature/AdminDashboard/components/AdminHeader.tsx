import React from "react";
import AdminSideNav from "./AdminNav";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Menu } from "lucide-react";
import { AdminSideMenuList } from "../../../utils/constants/admin.constants";
import { useNavigate } from "react-router";

const AdminHeader = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div className="hidden md:block">
        <AdminSideNav />
      </div>
      <div className="md:ml-[250px]">
        <div className="h-[80px] bg-slate-100 flex items-center ">
          <IconButton
            className="md:hidden mx-4"
            aria-label="menu"
            icon={<Menu />}
            onClick={() => onOpen()}
          ></IconButton>
        </div>
        {children}
      </div>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"xs"}>
        <DrawerOverlay className="max-w-[250px] bg-slate-100 m-0" />
        <DrawerContent className="max-w-[250px] bg-slate-100 m-0">
          <DrawerBody>
            <img
              src="/logo.png"
              alt="logo"
              className="border-2 border-blue-500 h-[150px] w-[200px] rounded-lg mx-auto"
            />
            {AdminSideMenuList.map((item, index) => (
              // <Link
              //   // href={item.path}
              //   href={"/home"}
              //   key={item.path}
              //   onClick={() => toggleSideBar(false)}
              // >
              <h2
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                // variant="ghost"
                className="group p-4 flex gap-5 items-center
                justify-start rounded-md cursor-pointer bg-slate-100 my-4
                 hover:bg-slate-100 text-slate-500"
              >
                <item.icon className="group-hover:animate-bounce" />
                {item.name}
              </h2>
              // </Link>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AdminHeader;
