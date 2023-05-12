import Layout from "../components/layout";

export default function About() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center p-10  mx-16 my-4">
        <h1 className="text-6xl font-bold mb-4 ">
          {" "}
          <span
            className="animated-gradient-text"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #007cf0, #00dfd8, #7928ca, #ff0080, #ff4d4d, #f9cb28)",
            }}
          >
            About Us
          </span>
        </h1>
        <p className="text-5xl mb-4 mt-20  leading-snug ">
          Our Blog AI uses the power of artificial intelligence, specifically
          OpenAI's GPT-3.5, to create diverse, engaging blogs/articles. With a
          focus on technology, business, and education, our platform offers
          unique articles crafted by advanced AI technology.{" "}
        </p>
        {/* <p className="text-4xl mt-6">
          The articles are generated using OpenAI's GPT-3.5 , a cutting-edge language model capable of creating human-like text. Whether you're interested in technology, business, or education, you'll find something to capture your interest here.
        </p> */}
      </div>
    </Layout>
  );
}
