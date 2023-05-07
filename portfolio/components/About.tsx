import { motion } from "framer-motion";
import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <motion.div
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>

      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        src="https://charlesqimg.s3.us-east-2.amazonaws.com/20230116_153842.jpg"
        className="-mb-20 md:mb-0 flex-shrink-0 rounded-full h-56 w-56 object-cover md:rounded-lg md:h-64 md:w-64 xl:w-[500px] xl:h-[600px]"
      />

      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-[#F7AB0A]">little</span>{" "}
          background
        </h4>
        <p className="text-sm">
          Ever since I was young, I have been fascinated by the world of
          technology and its potential to transform the way we live, work, and
          communicate. As I continued to explore this passion, I discovered the
          power of computer science and data science to uncover hidden patterns,
          predict trends, and solve complex problems. My journey in the field of
          technology has been one of continuous growth, learning, and discovery,
          and I am eager to further deepen my knowledge and expertise by
          pursuing a career at a top tech company.
        </p>
      </div>
    </motion.div>
  );
};

export default About;