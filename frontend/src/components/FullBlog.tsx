import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar></Appbar>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="font-extrabold text-5xl">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 26th May 2024</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-6 text-lg00">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar
                  size="big"
                  name={blog.author.name || "Anonymus"}
                ></Avatar>
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymus"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about authors ability to grab attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
