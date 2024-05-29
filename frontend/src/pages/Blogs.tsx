import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
          <div>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar></Appbar>
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Maddie"}
              title={blog.title}
              publishedDate={" May 27,2024 "}
              content={blog.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
