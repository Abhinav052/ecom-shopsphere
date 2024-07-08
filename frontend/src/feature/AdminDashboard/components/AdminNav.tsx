import { LogOut } from "lucide-react";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AdminSideMenuList } from "../../../utils/constants/admin.constants";
function AdminSideNav() {
  const navigate = useNavigate();

  return (
    <div className=" h-full p-5 w-[250px] md:w-[250px] bg-slate-100 h-screen fixed">
      <img
        src="/logo.png"
        alt="logo"
        className="border-2 border-blue-500 h-[150px] w-[200px] rounded-lg mx-auto"
      />

      <div className="flex flex-col mt-10">
        {AdminSideMenuList.map((item, index) => (
          // <Link
          //   // href={item.path}
          //   href={"/home"}
          //   key={item.path}
          //   onClick={() => toggleSideBar(false)}
          // >
          <h2
            onClick={() => navigate(item.path)}
            // variant="ghost"
            className="group p-4 flex gap-5 items-center
                justify-start rounded-md cursor-pointer
                 hover:bg-slate-100 text-slate-500"
          >
            <item.icon className="group-hover:animate-bounce" />
            {item.name}
          </h2>
          // </Link>
        ))}
      </div>
      {/* <div className="flex flex-col mt-10 gap-2">
        {MenuList.map((item) => (
          <Link href={item.path}>
            <h2 className="group flex flex-row p-4 gap-5 items-center justify-start text-slate-500 rounded-md cursor-pointer hover:bg-slate-100">
              <item.icon className="group-hover:animate-bounce" />
              {item.name}
            </h2>
          </Link>
        ))}
      </div> */}
      <div className="absolute bottom-10 flex gap-3 items-center">
        <h2>
          <Link to={"/sign-in"}>
            <Button
              variant="ghost"
              className="flex gap-2 items-center cursor-pointer"
            >
              <LogOut />
              Logout
            </Button>
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default AdminSideNav;
