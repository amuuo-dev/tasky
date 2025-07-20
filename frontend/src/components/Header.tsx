import { CheckSquare, MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import useUser from "@/store/userStore";

const Header = () => {
  const { user } = useUser();

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "text-blue-700 border-blue-300 border px-3 py-0.8 bg-[#F5FEFA] rounded-sm"
      : "text-blue-700 font-medium";
  };

  function capitalizeFirstName(name: string) {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  return (
    <div className="flex items-center justify-between md:p-12 sm:p-6 p-3">
      <NavLink to="/">
        <header className="flex items-center cursor-pointer">
          <h2 className="md:text-3xl text-1.5xl font-extrabold uppercase text-blue-700">
            Tasky
          </h2>
          <CheckSquare className="md:w-6 md:h-6 w-4 h-4 text-blue-700 translate-y-[-0.5em]" />
        </header>
      </NavLink>
      {!user ? (
        <div className="flex gap-4 items-center">
          <NavLink to="/login">
            <Button
              variant="link"
              className="cursor-pointer md:text-lg text-base text-blue-400"
            >
              Login
            </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button className="text-blue-400 cursor-pointer border border-blue-400 hover:bg-blue-200 hover:text-blue-600 md:text-lg text-base">
              Get Started <MoveRight />
            </Button>
          </NavLink>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <NavLink to="/tasks" className={navLinkClass}>
            Tasks
          </NavLink>
          <NavLink to="/create" className={navLinkClass}>
            Create
          </NavLink>
          <NavLink to="/completed" className={navLinkClass}>
            Completed
          </NavLink>
          {/* <NavLink to="#" className={navLinkClass}>
            Completed
          </NavLink>
          <NavLink to="#" className={navLinkClass}>
            Trash
          </NavLink>
          <NavLink to="#" className={navLinkClass}>
            Profile
          </NavLink> */}
          <div>
            <h2>
              Welcome{" "}
              <span className="md:text-lg text-blue-700 font-medium">
                {capitalizeFirstName(user.firstName)}
              </span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
