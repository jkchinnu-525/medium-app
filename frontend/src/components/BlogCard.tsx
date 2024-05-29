import { Link } from "react-router-dom";

interface BlogContentInput {
  title: string;
  authorName: string;
  content: string;
  publishedDate: string;
  id: number;
}
export const BlogCard = ({
  title,
  content,
  authorName,
  publishedDate,
  id,
}: BlogContentInput) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <Avatar size={"small"} name={authorName}></Avatar>
          </div>
          <div className="pl-2 font-extralight text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-sm flex justify-center flex-col text-slate-400">
            {publishedDate}
          </div>
        </div>
        <div className="font-bold text-2xl">{title}</div>
        <div className="font-light text-lg">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="mt-6">{`${Math.ceil(
          content.length / 100
        )}minute(s)`}</div>
      </div>
    </Link>
  );
};
export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        }font-medium text-gray-300"`}
      >
        {name.substring(0, 2)}
      </span>
    </div>
  );
}
export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-400"></div>;
}
