import { Circle } from "./BlogCard";
export const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="pl-2 font-extralight text-sm flex justify-center flex-col">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-sm flex justify-center flex-col text-slate-400">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
          <div className="font-bold text-2xl">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
          <div className="font-light text-lg">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
          <div className="mt-6">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
