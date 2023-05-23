import { useStore } from "../store/store";
import Layout from "../components/layout";
import Article from "../components/article";
import { useEffect } from "react";

export default function ReadArticle() {
  const { state } = useStore();
  const { blogData } = state;

  useEffect(() => {
    console.log(blogData);
    // This will re-render the component every time blogData changes
  }, [blogData]);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        {blogData ? (
          <Article htmlContent={blogData || ""} />
        ) : (
          <div>Generating an article to read</div>
        )}
      </div>
    </Layout>
  );
}
