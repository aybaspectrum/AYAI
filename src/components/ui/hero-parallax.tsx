"use client";
import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";

export const HeroParallax = ({
  products,
  title,
  subtitle,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  title: React.ReactNode;
  subtitle: React.ReactNode;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig,
  );
  return (
    <div
      ref={ref}
      className="relative flex h-[250vh] flex-col self-auto overflow-hidden py-8 antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header title={title} subtitle={subtitle} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="mb-20 flex flex-row space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = ({
  title,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
}) => {
  return (
  <div className="relative top-0 left-0 mx-auto w-full max-w-7xl px-4 py-6 md:py-12">
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 bg-clip-text text-3xl font-semibold text-transparent md:text-7xl font-[Inter,sans-serif]"
        style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        className="mt-2 max-w-3xl text-lg md:text-2xl font-semibold font-[Poppins,sans-serif] bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent"
        style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
        rotate: "-5deg",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      key={product.title}
  className="group/product relative h-72 w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <a
        href={product.link}
        className="block h-full w-full"
        target="_blank"
        rel="noreferrer"
        aria-label={product.title}
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="absolute inset-0 h-full w-full object-cover object-center rounded-2xl"
          alt={product.title}
        />
      </a>
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
      <h2 className="absolute bottom-4 left-4 right-4 text-lg md:text-xl font-bold text-white drop-shadow-lg bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent">
        {product.title}
      </h2>
    </motion.div>
  );
};
