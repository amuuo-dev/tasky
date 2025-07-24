import { CheckSquare, Menu, MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import useUser from "@/store/userStore";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { user } = useUser();

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "text-blue-700 border-blue-300 border px-3 py-0.8 bg-[#F5FEFA] rounded-sm"
      : "text-blue-700 font-medium";
  };

  function capitalizeFirstName(name: string) {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
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

      <div className="hidden md:flex gap-4 items-center">
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
            <NavLink to="/trash" className={navLinkClass}>
              Trash
            </NavLink>
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
            <div>
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} profile image`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-500 text-white text-lg font-semibold flex justify-center items-center">
                    {capitalizeFirstName(user.firstName)[0]}
                    {capitalizeFirstName(user.lastName)[0]}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-[#FCF8FF]">
            <SheetHeader className="flex flex-row gap-3">
              <div>
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                  {user && user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.firstName} profile image`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-500 text-white text-lg font-semibold flex justify-center items-center">
                      {user && capitalizeFirstName(user.firstName)[0]}
                      {user && capitalizeFirstName(user.lastName)[0]}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <SheetTitle>Switch Pages</SheetTitle>
                <SheetDescription>
                  Navigate around the tasky app
                </SheetDescription>
              </div>
            </SheetHeader>
            <div>
              {!user ? (
                <div className="flex flex-col items-center gap-4 justify-center">
                  <NavLink to="/login">
                    <Button
                      variant="link"
                      className="text-blue-400 text-left w-full"
                    >
                      Login
                    </Button>
                  </NavLink>
                  <NavLink to="/signup">
                    <Button className="text-blue-400 border border-blue-400 hover:bg-blue-200 hover:text-blue-600">
                      Get Started <MoveRight />
                    </Button>
                  </NavLink>
                </div>
              ) : (
                <div className="flex flex-col gap-4 items-center">
                  <NavLink to="/tasks" className={navLinkClass}>
                    Tasks
                  </NavLink>
                  <NavLink to="/create" className={navLinkClass}>
                    Create
                  </NavLink>
                  <NavLink to="/completed" className={navLinkClass}>
                    Completed
                  </NavLink>
                  <NavLink to="/trash" className={navLinkClass}>
                    Trash
                  </NavLink>
                  <NavLink to="/profile" className={navLinkClass}>
                    Profile
                  </NavLink>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
