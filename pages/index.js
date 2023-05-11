import { useState } from "react";
import Layout from "../components/layout";
import Link from 'next/link'

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export default function Home() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [blogData, setBlogData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  async function generateBlog(e) {
    e.preventDefault();

    setIsLoading(true);
    setTitle(text);
    generateCoverPrompt();
    console.log(process.env.OPENAI_API_KEY);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a blog post based on the title: ${text}`,
      temperature: 0.6,
      max_tokens: 100,
    });

    console.log(response);
    setBlogData(response.data.choices[0].text);
    setIsLoading(false);
    console.log(blogData);
    console.log(text);
    setText("");
  }

  async function generateCoverPrompt() {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a cover page image prompt to ask dall-e for the blog post with the following title: "${title}"`,
      temperature: 0.6,
      max_tokens: 100,
    });
    console.log(response.data.choices[0].text);

    const imageResponse = await openai.createImage({
      prompt: response.data.choices[0].text,
      n: 1,
      size: "1024x1024",
    });
    console.log(imageResponse);
    setImageUrl(imageResponse.data.data[0].url);
  }

  return (
    // <div className="flex flex-col  justify-center mx-auto items-center h-full">
    //   {/* <div className="flex w-1/2 justify-center items-center h-full">
    // Enter a title for the blog you want to create and the
    //     <span className="text-xl font-bold"> AI </span> will generate one for
    //     you
    //   </div> */}
    //   <div className="flex flex-col justify-center p-10 items-center h-full">
    //     <form
    //       onSubmit={generateBlog}
    //       className="flex-col flex justify-center items-center"
    //     >
    //       <span className="text-3xl">Enter Blog Title </span>
    //       <input
    //         className="h-12 w-96 rounded-md  text-2xl p-1 border-white  border mt-5"
    //         type="text"
    //         value={text}
    //         onChange={(e) => setText(e.target.value)}
    //       ></input>
    //       <input type="submit" hidden />
    //     </form>
    //   </div>

    //   {isLoading ? (
    //     <div>
    //       <p>Loading</p>
    //     </div>
    //   ) : blogData ? (
    //     <div className="flex flex-col justify-center p-10 items-center">
    //       <div className="w-3/4 m-5 ">
    //         <img src={imageUrl} alt="cover page" />
    //       </div>
    //       <span className="text-3xl font-bold items-center self-center">
    //         {title}
    //       </span>
    //       <div className="border-white border m-10 items-center rounded-md p-10">
    //         <span className="text-lg p-20 ">{blogData || ""} </span>
    //       </div>
    //     </div>
    //   ) : (
    //     <></>
    //   )}
    // </div>

    <Layout>
      <div className="container mx-auto ">
        <div className="max-w-4xl mt-20 pb-4">
          <span className="font-bold text-8xl" style={{ lineHeight: "107px" }}>
            Generate a
            <span
              className="animated-gradient-text"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #007cf0, #00dfd8, #7928ca, #ff0080, #ff4d4d, #f9cb28)",
              }}
            >
              Blog/Article
            </span>
            using AI
          </span>
        </div>

        <div className="mt-32 flex justify-between items-center max-w-2xl">
          <Link href="/showcase" className="text-white bg-black font-semibold text-4xl px-4 py-4 rounded-lg shadow-black">
            Checkout Showcase
          </Link>
          <Link href="/create-blog" className="text-white flex justify-center items-center bg-black font-semibold text-4xl px-3 py-4 rounded-lg shadow-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              className="mr-2"
            >
              <path fill="#000" strokeWidth={10} d="M0 0h24v24H0z" />
              <path fill="#fff" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
            </svg>
            Start Creating
          </Link>
        </div>
      </div>
    </Layout>
  );
}
