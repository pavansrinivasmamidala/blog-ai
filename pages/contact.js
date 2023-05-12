import Layout from "../components/layout";
import Image from "next/image";
import illustration from "../assets/illustration.svg";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.png";
import link from "../assets/link.png";

export default function Contact() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center p-10">
        <Image
          className="mt-10"
          src={illustration}
          width={280}
          height={280}
          alt="Pavan Srinivas"
        />

        <h1 className="text-5xl font-bold mb-4 mt-12 ">
          {" "}
          <span
            className="animated-gradient-text"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #007cf0, #00dfd8, #7928ca, #ff0080, #ff4d4d, #f9cb28)",
            }}
          >
            Pavan Srinivas
          </span>
        </h1>
        <div className="flex justify-around items-center w-full max-w-md mt-12">
          <a
            href="https://github.com/pavansrinivasmamidala"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={github} width={64} height={64} alt="Github" />
          </a>
          <a
            href="https://linkedin.com/in/your_username"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={linkedin} width={64} height={64} alt="Linkedin" />
          </a>
          <a
            href="https://pavansrinivas.info"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={link} alt="Portfolio Link" width={50} height={50} />
          </a>
        </div>
      </div>
    </Layout>
  );
}
