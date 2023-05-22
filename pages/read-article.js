import { useStore } from "../store/store";
import Layout from "../components/layout";
import Article from "../components/article";
import { useEffect } from "react";

export default function ReadArticle() {
  const { state } = useStore();
  const { blogData } = state;
  
  useEffect(() => {
    console.log(blogData)
    // This will re-render the component every time blogData changes
  }, [blogData]);

  return (
    <Layout>
      <div className="flex flex-col justify-center  items-center">
        {blogData ? (
          <div className="flex flex-col justify-center  items-center">
            <div className="border-white border m-10 items-center rounded-md p-10">
              <span className="text-lg p-12 ">
                <Article htmlContent={blogData || ""} />
              </span>
            </div>
          </div>
        ) : (
          <div>Generating an article to read</div>
        )}
      </div>
    </Layout>
  );
}
