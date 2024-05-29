import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading) {
    return (
      <div>
        <Appbar></Appbar>
        <div className="h-screen flex justify-center flex-col">
          <div className="flex justify-center">
            <Spinner></Spinner>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
