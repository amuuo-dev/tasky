const Company = () => {
  return (
    <div className="md:py-20 py-10 px-4">
      <h2 className="text-center md:text-xl font-medium sm:text-base text-xs">
        Join a community of millions of users globally who are using Tasky to
        get more done.
      </h2>
      <div className="flex justify-center items-center py-6 overflow-hidden">
        <img
          src="/zoom.png"
          alt="companies logo that trust tasky"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Company;
