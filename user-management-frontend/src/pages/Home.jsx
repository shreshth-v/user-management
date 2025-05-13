import { useSelector } from "react-redux";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

const Home = () => {
  const { authUser } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {authUser ? (
        <div className="flex items-center mb-4 space-x-2">
          <h1 className="text-2xl font-bold">Hello, {authUser.firstName}</h1>
          {!authUser.email_verified && (
            <>
              <div
                className="relative text-red-500 cursor-pointer"
                data-tooltip-id="email-tooltip"
                data-tooltip-content="Email is not verified"
              >
                <AiOutlineExclamationCircle size={24} />
              </div>
              <Tooltip id="email-tooltip" />
            </>
          )}
        </div>
      ) : (
        <h1 className="text-2xl font-bold mb-4">Hello, Guest</h1>
      )}
      <h1 className="text-xl">Welcome to User Management System</h1>
    </div>
  );
};

export default Home;
