import { Button, Link } from "@nextui-org/react";
import ConnectionSVG from "../assets/connectionSVG";
import JionSVG from "../assets/jionSVG";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
export const Homepage = () => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { currentTarget, clientX, clientY } = event;
    if (currentTarget) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  };
  return (
    <div
      className="relative bg-gradient-to-br from-neutral-900 to-black group"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute z-50 transition duration-300 opacity-0 pointer-events-none max-md:hidden -inset-px rounded-3xl group-hover:opacity-100"
        style={{
          background: useMotionTemplate` radial-gradient( 100px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.15), transparent 80% ) `,
        }}
      />
      <div className="container p-8 mx-auto overflow-hidden text-gray-300 md:rounded-lg md:p-10 lg:p-12">
        <div className="flex justify-between">
          <div>
            {" "}
            <p className="inline text-4xl font-bold text-inherit"> C</p>
            <span className="text-2xl ">hatter</span>
          </div>
          <div className="space-x-3 ">
            <Link href="/signin" className="text-xs">
              <Button
                color="default"
                variant="flat"
                className="text-white bg-neutral-700"
                size="sm"
              >
                Signin
              </Button>
            </Link>{" "}
            <Link href="/signup" className="text-xs">
              <Button
                color="default"
                variant="flat"
                className="text-black bg-white"
                size="sm"
              >
                {" "}
                Create an account
              </Button>{" "}
            </Link>
          </div>
        </div>
        <div className="h-32 md:h-40"></div>
        <p className="max-w-5xl font-sans text-4xl font-bold text-gray-200 lg:text-7xl lg:pr-24 md:text-6xl">
          Discover, Create, and Share on Chatter
        </p>
        <div className="h-10"></div>
        <p className="max-w-2xl text-xl text-gray-400 md:text-2xl">
          Connect with a creative community, share your ideas, and bring your
          vision to life with Chatter. Join us today!
        </p>
        <div className="h-32 md:h-40"></div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600">
              Write and connect
            </p>
            <h2 className="text-4xl font-bold">
              Unleash your ideas with Chatter
            </h2>
            <div className="h-6"></div>
            <p className="text-xl text-gray-400 md:pr-10">
              Share your thoughts, discover new perspectives, and connect with
              like-minded creators on Chatter. Join our community today and
              start making your mark on the world!
            </p>
            <div className="h-8"></div>
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
              <div>
                <p className="font-semibold text-gray-400">
                  Join the Chatter community
                </p>
                <div className="h-4"></div>
                <p className="text-gray-400 ">
                  Find your tribe and share your creativity with the world.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-400">
                  Share, engage, and grow
                </p>
                <div className="h-4"></div>
                <p className="text-gray-400 ">
                  Share your ideas with the community and grow your network.
                </p>
              </div>
            </div>
          </div>
          <div>
            <ConnectionSVG />
          </div>
        </div>

        <div className="h-32 md:h-40"></div>
        <p className="text-4xl ">
          <span className="text-gray-400">With Chatter, </span>{" "}
          <span className="text-gray-600">
            the possibilities are endless. Connect with like-minded individuals
            and share your ideas today!
          </span>
        </p>
        <div className="h-32 md:h-40"></div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-br from-gray-900 to-black">
            <p className="flex items-center justify-center text-4xl font-semibold text-orange-400 bg-orange-800 rounded-full shadow-lg w-14 h-14">
              1
            </p>
            <div className="h-6"></div>
            <p className="text-3xl ">Share your ideas effortlessly</p>
          </div>
          <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-b from-gray-900 to-black">
            <p className="flex items-center justify-center text-4xl font-semibold text-blue-400 bg-blue-800 rounded-full shadow-lg w-14 h-14">
              2
            </p>
            <div className="h-6"></div>
            <p className="text-3xl ">Connect with a creative community</p>
          </div>
          <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-bl from-gray-900 to-black">
            <p className="flex items-center justify-center text-4xl font-semibold text-green-400 bg-green-800 rounded-full shadow-lg w-14 h-14">
              3
            </p>
            <div className="h-6"></div>
            <p className="text-3xl ">Publish your work with ease</p>
          </div>
        </div>

        <div className="h-40"></div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col justify-center md:col-span-2">
            <p className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-teal-600">
              We are writers, artists, and creators
            </p>
            <h2 className="text-4xl font-bold">Join the Chatter community</h2>
            <div className="h-6"></div>
            <p className="text-xl text-gray-400 md:pr-10">
              Connect with like-minded individuals, share your ideas, and bring
              your vision to life with Chatter.
            </p>
            <div className="h-8"></div>
            <div className="grid gap-6 pt-8 border-t border-gray-800 lg:grid-cols-3">
              <div>
                <p className="font-semibold text-gray-400">
                  Easy-to-use editor
                </p>
                <div className="h-4"></div>
                <p className="text-gray-400 ">
                  Write and format your content using our intuitive editor.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-400">
                  Categories and tags
                </p>
                <div className="h-4"></div>
                <p className="text-gray-400 ">
                  Browse and discover content based on your interests and
                  reading history.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-400">
                  Engage with the community
                </p>
                <div className="h-4"></div>
                <p className="text-gray-400 ">
                  Share your thoughts, comment on other people's work, and
                  connect with other writers and artists.
                </p>
              </div>
            </div>
          </div>
          <div>
            <JionSVG />
          </div>
        </div>
        <div className="h-10 md:h-40"></div>
        <div className="text-center">
          {" "}
          Copyright © 2024 Chatter. All rights reserved.{" "}
        </div>
        <div className="h-12"></div>
      </div>
    </div>
  );
};
