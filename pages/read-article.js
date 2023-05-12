import Layout from "../components/layout";
import Article from "../components/article";
import { useStore } from '../store/store'; 

export default function ReadArticle() {
  const { state } = useStore();
  const { blogData } = state;
  
  return (
    <Layout>
      <div className="flex flex-col justify-center  items-center">
        {blogData?.content ? (
          <div className="flex flex-col justify-center  items-center">
            <div className="border-white border m-10 items-center rounded-md p-10">
              <span className="text-lg p-12 ">
                <Article htmlContent={blogData?.content || ""} />
              </span>
            </div>
          </div>
        ) : (
          <div>Create a blog to read it</div>
        )}
      </div>
    </Layout>
  );
}

