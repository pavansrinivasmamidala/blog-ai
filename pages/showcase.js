import Layout from "../components/layout";

export default function Showcase() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center  mt-20">
        <h1 className="text-4xl font-bold mb-4">
          <span
            className="animated-gradient-text mr-4"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #007cf0, #00dfd8, #7928ca, #ff0080, #ff4d4d, #f9cb28)",
            }}
          >
           Articles  Showcase
          </span>
        </h1>
        <p className="text-2xl">Coming Soon...</p>
      </div>
    </Layout>
  );
}
