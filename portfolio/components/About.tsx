import { motion } from "framer-motion";
import React from "react";
import Image from 'next/image'

type Props = {};

const ABOUT_IMG = '/about/me.jpg'

const About = (props: Props) => {
  return (
    <motion.div
      className="component-basic"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <h3 className="basic">
        About 2
      </h3>

      <div className="h-[80%] max-w-7xl flex flex-col items-center justify-center gap-10">
        <motion.div 
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
          className="rounded-full h-[25%] aspect-square overflow-hidden"
        >
          <Image
            priority = {true}
            src={ABOUT_IMG}
            alt='about me'
            width={500}
            height={500}
            className="rounded-full max-w-full max-h-full object-cover object-center"
          />
        </motion.div>

        <div className="h-[75%] space-y-10 px-0 md:px-10">
          <h4 className="text-4xl font-semibold text-primary">
            Here is a{" "}
            <span className="underline decoration-primary/80">little</span>{" "}
            background
          </h4>

          <div className="max-h-[80%] overflow-y-auto scrollbar-basic text-primary">
            <p className="text-sm">
              As an ambitious and innovative Computer Science and Data Science graduate from the University of Wisconsin-Madison, I am deeply passionate about leveraging technology to create meaningful and user-centered solutions. With hands-on experience as the CTO of DiscoverE Inc. and a Software Engineer at EasyJobs Inc., I have honed my skills in developing scalable, high-performance applications, managing diverse teams, and delivering projects using Agile methodologies. My technical expertise spans a wide range of programming languages, libraries, and frameworks, including Python, Golang, Java, FastAPI, React, and AWS services.
            </p>

            <p className="text-sm">
              Driven by my curiosity and commitment to excellence, I have also engaged in impactful research projects, most notably the Work Conserving Scheduler Cooperative Lock under the guidance of Professor Yuvraj Patel and Professor Remzi Arpaci-Dusseau. This experience has allowed me to explore complex concepts, develop valuable collaboration skills, and further solidify my dedication to the field of computer science.
            </p>

            <p className="text-sm">
              As a proactive learner and an adaptable professional, I am eager to contribute my skills and knowledge to a team that shares my vision for innovation and excellence. I am confident that my diverse skill set, strong work ethic, and passion for problem-solving will enable me to make a significant impact in any organization.
            </p>
          </div>

        </div>
      </div>

    </motion.div>
  );
};

export default About;
