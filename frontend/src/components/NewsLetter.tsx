import { Input } from "./ui/input";
import { Button } from "./ui/button";

const NewsLetter = () => {
  return (
    <div className="bg-white md:py-20 sm:py-10 sm:px-4 py-4 px-2">
      <h2 className="text-center font-semibold md:text-2xl text-lg work-sans pb-4 tracking-wide">
        Get started with Tasky today
      </h2>
      <div className="flex md:justify-center items-center gap-3">
        <Input
          type="email"
          placeholder="Click on the button to sign up!"
          disabled
          className="md:w-1/4 sm:w-3/4 w-4/4 md:py-6 sm:py-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-200 cursor-not-allowed"
        />
        <Button className="cursor-pointer bg-blue-700 text-white md:py-6 sm:py-4 py-2">
          Sign up - it's free!
        </Button>
      </div>
    </div>
  );
};

export default NewsLetter;
