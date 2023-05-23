import { useState } from "react";
import Layout from "../components/layout";
import { fetchOpenAiCompletion } from "../utils/openaiApi";
import Article from "../components/article";
import { useStore } from "../store/store";
import { useRouter } from "next/router";

export default function createBlog() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [blogData, setBlogData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [length, setLength] = useState("Short");
  const [audience, setAudience] = useState([]);
  const lengthOptions = ["Short", "Medium", "Long"];
  const audienceOptions = [
    "General Audience",
    "Professionals",
    "Developers",
    "Entrepreneurs",
    "Students",
    "Researchers",
  ];
  const [model, setModel] = useState("gpt-3.5-turbo");
  const modelOptions = ["gpt-3.5-turbo", "gpt-4"];
  const { dispatch } = useStore();

  function generateBlog(e) {
    e.preventDefault();

    setIsLoading(true);
    setTitle(text);

    fetchOpenAiCompletion(
      "Write an HTML formatted article based on Title: " +
        text +
        " Size: " +
        length +
        " Intended Audience: " +
        audience.join(", ") +
        ". Please include appropriate HTML tags and styling for different font sizes and formatting.",
      model,
      dispatch
    ).catch((error) => {
      console.error("Error fetching completion:", error.message);
      setIsLoading(false); // Set loading to false if there is an error
    });

    setTimeout(() => {
      setIsLoading(false);
      router.push("/read-article");
    }, 5000); // Wait for 5000ms = 5s
  }

  // async function generateBlog(e) {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setTitle(text);
  //   //generateCoverPrompt();

  //   try {
  //     const completion = await fetchOpenAiCompletion(
  //       "Write an HTML formatted article based on Title: " +
  //         text +
  //         " Size: " +
  //         length +
  //         " Intended Audience: " +
  //         audience.join(", ") +
  //         ". Please include appropriate HTML tags and styling for different font sizes and formatting."
  //     , model);
  //     console.log("Completion:", completion);

  //     //setBlogData(completion);
  //     dispatch({
  //       type: "SET_BLOG_DATA",
  //       payload: completion
  //     });
  //     setIsLoading(false);
  //     router.push('/read-article');

  //   } catch (error) {
  //     console.error("Error fetching completion:", error.message);
  //   }

  //   // setIsLoading(false);
  //   // console.log(completion.data);

  //   // const response = await openai.createCompletion({
  //   //   model: "text-davinci-003",
  //   //   prompt: `Generate a blog post based on the title: ${text}`,
  //   //   temperature: 0.6,
  //   //   max_tokens: 100,
  //   // });

  //   //console.log(response);

  //   // console.log(blogData);
  //   //console.log(text);
  //   setText("");
  // }

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

  const handleClick = (option) => {
    setLength(option);
  };

  const handleAudienceSelection = (option) => {
    if (audience.includes(option)) {
      setAudience(audience.filter((aud) => aud !== option));
    } else {
      setAudience([...audience, option]);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col  justify-center mx-auto items-center ">
        <div className="flex flex-col justify-center px-10 py-5 items-center h-full">
          <form
            onSubmit={generateBlog}
            className="flex-col flex justify-center items-center"
          >
            <span className="text-5xl font-semibold ">
              Start by Entering the Title of the
              <span
                className="animated-gradient-text ml-2 leading-normal"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #007cf0, #00dfd8, #7928ca, #ff0080, #ff4d4d, #f9cb28)",
                }}
              >
                Blog/Article
              </span>
            </span>
            <input
              className="h-16  pl-2  w-full rounded-md bg-white font-semibold text-4xl p-1 border-black   border-4 mt-4"
              type="text"
              value={text}
              placeholder="Longer the Title better the output"
              onChange={(e) => setText(e.target.value)}
            ></input>
            <input type="submit" hidden />
          </form>
        </div>
        {/* <div className="mb-3">
          <button className="px-4 py-2 bg-black text-white rounded-2xl text-lg   transition-all duration-75 ease-in-out ">
            Generate Article
          </button>
        </div> */}
        {/* <div className="flex justify-center">
          <button
            className="rounded-2xl border-none bg-gray-700 flex mb-2 text-white py-1  justify-center items-center pr-4 pl-2"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              className={
                showAdvanced
                  ? "rotate-180 transition-all ease-in-out"
                  : "transition-all ease-in-out"
              }
            >
              <path d="M12 16l-6-6h12z" fill="white" />
            </svg>
            Advanced Features
          </button>
        </div> */}

        <div className="flex justify-between flex-col mx-auto items-center border-gray-900  border-2 py-8 px-4 rounded-2xl transition-all duration-200 ease-in-out ">
          <div className="flex mb-4 ">
            {lengthOptions.map((option, index) => (
              <label
                key={index}
                className={`cursor-pointer px-5 py-1 mr-1 rounded-md  border ${
                  length === option
                    ? "bg-black text-white"
                    : "bg-white text-black border-lightgray "
                } transition-colors duration-300 ease-in-out hover:bg-black  text-2xl hover:text-white`}
                onClick={() => handleClick(option)}
              >
                {option}
              </label>
            ))}
          </div>

          {/* <span className="mb-2 font-semibold text-lg">Intended Audience: </span> */}
          <div className="flex mb-4 mt-4 max-w-4xl flex-wrap justify-center items-center ">
            {audienceOptions.map((option, index) => (
              <label
                key={index}
                className={`cursor-pointer px-4 py-1 mb-2 mr-3 rounded-md  border ${
                  audience.includes(option)
                    ? "bg-black text-white"
                    : "bg-white text-black border-lightgray "
                } transition-colors duration-300 ease-in-out hover:bg-black text-2xl  hover:text-white`}
                onClick={() => handleAudienceSelection(option)}
              >
                {option}
              </label>
            ))}
          </div>

          <div className="flex mb-4 ">
            {modelOptions.map((option, index) => (
              <label
                key={index}
                className={`cursor-pointer px-5 py-1 mr-1 rounded-md  border ${
                  model === option
                    ? "bg-black text-white"
                    : "bg-white text-black border-lightgray "
                } transition-colors duration-300 ease-in-out hover:bg-black  text-xl hover:text-white`}
                onClick={() => setModel(option)}
              >
                {option == "gpt-4"
                  ? "GPT-4 (Takes Longer) "
                  : "GPT-3.5 (Standard)"}
              </label>
            ))}
          </div>

          {/* <input
           className="rounded-lg bg-white border-black border-2 "
           type="text"
           value={audience}
           onChange={(e) => setAudience(e.target.value)}
          /> */}
        </div>

        {text.length > 2 ? (
          <div className="mt-4">
            <button
              onClick={generateBlog}
              className="px-6 py-3 bg-black text-white rounded-2xl text-3xl  "
            >
              Generate Article
            </button>
          </div>
        ) : (
          <div></div>
        )}

        {isLoading ? (
          <div className="mt-4 flex flex-col justify-center items-center">
            <span
              className="animated-gradient-text-loading text-5xl font-semibold pb-4 mt-6"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #007cf0, #00dfd8, #7928ca, #ff0080, #ff4d4d, #f9cb28)",
              }}
            >
              Generating...
            </span>

            <span>It usually takes 5 to 10 seconds...</span>
            {/* <img src={loading} alt="loading..." /> */}
          </div>
        ) : (
          // ) : blogData.content ? (
          //   <div className="flex flex-col justify-center p-10 items-center">
          //     {/* <div className="w-3/4 m-5 ">
          //       <img src={imageUrl} alt="cover page" />
          //     </div> */}
          //     {/* <span className="text-3xl font-bold items-center self-center">
          //       {title}
          //     </span> */}
          //     <div className="border-white border m-10 items-center rounded-md p-10">
          //       <span className="text-lg p-20 ">
          //         <Article htmlContent={blogData?.content || ""} />

          //         {/* <FormattedText text={blogData?.content || ""} />{" "} */}
          //         {/* <ReactMarkdown >{blogData?.content}</ReactMarkdown>; */}
          //       </span>
          //     </div>
          //   </div>
          // ) : (
          <></>
        )}
      </div>
    </Layout>
  );
}
