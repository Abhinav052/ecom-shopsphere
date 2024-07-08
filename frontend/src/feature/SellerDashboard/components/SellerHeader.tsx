import React from "react";
import SideNav from "./SideNav";
import { Button } from "@chakra-ui/react";
import { PhoneCall } from "lucide-react";

const SellerHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SideNav />
      <div className="md:ml-[250px]">
        <div className="h-[80px] bg-slate-100 flex items-center justify-end">
          <Button
            variant="outline"
            className="flex gap-2 items-center cursor-pointer  mx-8"
          >
            <PhoneCall />
            Support
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SellerHeader;
