import { Button } from "./ui/button";

const Hero = () => {
  const images = [
    {
      pic: "/book.png",
      title: "Stay organized and focused",
      description:
        "Achieve mental clarity by sorting tasks into Today, Upcoming, or using custom filters. See only what you need, when you need it.",
    },
    {
      pic: "/book1.png",
      title: "Simplify your planning",
      description:
        "Make the most of your time. Schedule due dates, visualize your week in calendar view, and set recurring tasks with ease.",
    },
    {
      pic: "/team.png",
      title: "Home for your team’s tasks",
      description:
        "Give your team a shared space to collaborate and stay on top of it all – alongside but separate from your personal tasks and projects.",
    },
  ];
  return (
    <div>
      <div className="sm:pt-20 pt-8 md:pb-16 sm:pb-6 pb-3 md:p-12 sm:p-6 p-3">
        <h2 className="text-center md:text-5xl sm:text-4xl text-xl font-semibold work-sans capitalize ">
          Your daily work, digitalized
        </h2>
        <p className="md:p-6 sm:p-4 p-2 md:text-xl sm:text-base text-xs md:w-4/5 w-5/5 m-auto text-center text-[#374151]">
          Ditch the paperwork and get organized with Tasky. Your secure,
          centralized platform for tasks, docs and teamwork.
        </p>
        <div className="flex justify-center">
          <Button className="bg-blue-400 cursor-pointer text-white px-18 py-5 tracking-wide">
            Start Building Now!
          </Button>
        </div>
      </div>
      <div className="py-10 bg-white">
        <div className="flex overflow-hidden justify-center items-center">
          {images.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center flex-col flex-1"
            >
              <div>
                <img
                  src={item.pic}
                  alt={item.description}
                  className="object-cover md:w-[150px] sm:w-[120px] w-[80px]"
                />
              </div>
              <div className="flex flex-col justify-between">
                <h2 className="sm:font-semibold font-medium capitalize sm:p-2 p-1 md:text-base text-sm text-center">
                  {item.title}
                </h2>
                <h2 className="md:w-5/6 w-6/6 m-auto text-[#374151] text-center md:text-base text-xs">
                  {item.description}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
