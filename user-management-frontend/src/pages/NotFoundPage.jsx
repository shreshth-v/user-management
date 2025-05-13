const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex items-center mb-4 space-x-2">
        <h1 className="text-2xl font-bold text-red-500">Page Not Found</h1>
        <div
          className="relative text-red-500 cursor-pointer"
          data-tooltip-id="not-found-tooltip"
          data-tooltip-content="This page does not exist."
        ></div>
      </div>
      <h1 className="text-xl">
        Sorry, the page you're looking for does not exist.
      </h1>
    </div>
  );
};

export default NotFoundPage;
