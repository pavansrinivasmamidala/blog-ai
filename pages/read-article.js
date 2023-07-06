import { useStore } from "../store/store";
import Layout from "../components/layout";
import Article from "../components/article";
import { useEffect, useState } from "react";

export default function ReadArticle() {
  const { state } = useStore();
  const { blogData, title } = state;
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    console.log(blogData);
    if (blogData?.includes("<body>")) {
      setIsLoading(false);
    }

    if (blogData?.includes("</html>")) {
      setIsFinished(true);
    }
    // This will re-render the component every time blogData changes
  }, [blogData]);

  const saveBlogPost = async (title, content) => {
    try {
      const response = await fetch("/api/saveBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      setIsSaved(true);
      return data;
    } catch (error) {
      console.error("Error saving blog post", error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        {!isLoading ? (
          <>
            <Article htmlContent={blogData || ""} />
            {isFinished ? (
              <div className="mt-8 justify-center flex items-center">
                <button
                  onClick={() => saveBlogPost(title, blogData)}
                  disabled={isSaved}
                  className="px-6 py-3 bg-black text-white rounded-2xl text-3xl "
                >
                  {isSaved ? "Submitted" : "Submit to Showcase"}
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <div className="mt-16 flex flex-col justify-center items-center">
            <span
              className="animated-gradient-text-loading text-5xl font-semibold pb-4 mt-6"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #007cf0, #00dfd8, #7928ca, #ff0080, #ff4d4d, #f9cb28)",
              }}
            >
              Generating...
            </span>
          </div>
        )}
      </div>
    </Layout>
  );
}
