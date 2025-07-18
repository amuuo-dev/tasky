import { CheckSquare, MoveRight } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex items-center justify-between md:p-12 sm:p-6 p-3">
      <header className="flex items-center cursor-pointer">
        <h2 className="md:text-3xl text-1.5xl font-extrabold uppercase text-blue-700">
          Tasky
        </h2>
        <CheckSquare className="md:w-6 md:h-6 w-4 h-4 text-blue-700 translate-y-[-0.5em]" />
      </header>
      <div className="flex gap-4">
        <Button
          variant={"link"}
          className="cursor-pointer md:text-lg text-base text-blue-400"
        >
          Login
        </Button>
        <Button className="text-blue-400 cursor-pointer border border-blue-400 hover:bg-blue-200 hover:text-blue-600 md:text-lg text-base">
          Get Started <MoveRight />
        </Button>
      </div>
    </div>
  );
};

export default Header;
