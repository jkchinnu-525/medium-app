import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
export const Appbar = () => {
  return (
    <div className="py-4 border-b px-10 flex justify-between">
      <Link
        to={"/blogs"}
        className="flex justify-center flex-col cursor-pointer"
      >
        Medium
      </Link>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4"
          >
            New
          </button>
        </Link>
        <Avatar size={"big"} name="jk" />
      </div>
    </div>
  );
};
