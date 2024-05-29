import { ChangeEvent, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <TextEditor
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></TextEditor>
        <button
          onClick={async () => {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/blog}`,
              {
                title,
                content: description,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("jwt"),
                },
              }
            );
            navigate(`/blogs/${response.data.id}`);
          }}
          type="submit"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Publish post
        </button>
      </div>
    </div>
  );
};
function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4 ">
        <div className="flex items-center justify-between border">
          <div className="bg-white rounded-b-lg my-2 w-full ">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="focus-outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2 "
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Publish post
        </button>
      </div>
    </div>
  );
}
