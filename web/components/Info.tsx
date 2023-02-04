import React from "react";
import { Link } from "react-scroll";
import Image from "next/image";
import shibe from "../public/assets/shibe.png";

const Info = () => {
  return (
    <section
      id="info"
      className="h-auto w-auto lg:w-full lg:h-screen min-h-[1300px] min-w-[380px] overflow-auto m-auto max-w-[1240px]"
    >
      <div className="bg-complementaryBlue/80 h-[80%] border-2 border-primaryOrange rounded-xl py-10 m-10 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center w-full">
          <div className="p-4 ml-2 md:ml-5 lg:ml-10">
            <h1>Who? 🐕</h1>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/AimeSolana"
                className="px-2 rounded-md hover:bg-backgroundPrimary duration-150 ease-in-out"
              >
                I made this
              </a>
            </p>
          </div>
          <div className="p-4 ml-2 md:ml-5 lg:ml-10">
            {" "}
            <h1>What? 🐕</h1>
            <p className="pl-2">
              Bonk Drop is a project started during the January 2023 Solana
              Sandstorm Hackathon, and continued in the Encode Hackathon. Its
              made in support of No-Kill Dog Shelters and the $BONK Ecosystem.
            </p>
            <p className="p-2">
              50% of the $BONK dropped on the website is burned, and 50% is
              converted and donated to local southern California dog shelters.
            </p>
          </div>

          <div className="p-4 ml-2 md:ml-5 lg:ml-10">
            {" "}
            <h1>Where? 🐕</h1>
            <p className="pl-2">Here at www.bonkdrop.com</p>
          </div>
          <div className="p-4 ml-2 md:ml-5 lg:ml-10">
            {" "}
            <h1>Why? 🐕</h1>
            <p className="pl-2">
              During the NFT bull run in 2022, there were a few projects that
              used the hype to fundraise donations for charitible causes. Solana
              has really rallied around $BONK at the start of this year so I
              think it&apos;s the perfect time to raise some money in support of
              the very mascot that helped get us here, dogs.
            </p>
          </div>
          <div className="p-4 ml-2 md:ml-5 lg:ml-10">
            {" "}
            <h1>How? 🐕</h1>
            <p className="pl-2">
              Go and{" "}
              <Link
                to="hero"
                smooth
                className="hover:cursor-pointer rounded-md hover:bg-backgroundPrimary duration-150 ease-in-out"
              >
                drop some bonk
              </Link>{" "}
              to get started supporting dogs and the $BONK ecosystem today!
            </p>
          </div>
          <div className="p-4 ml-2 md:ml-5 lg:ml-10 ">
            <h2 className="underline text-center">Transparency</h2>
            <p className="text-center">
              Program ID: 3BM5STVPUNwaJzsA7MoCU3ASNuj51tvad5ZycGbx3LNv
            </p>
            <p className="text-center">
              Treasury: BoNkLayXFhzKh8qDz7ux4BGC7jfUxA8HZ4ieCwtHenSU
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/AimeSolana"
            >
              <p className="text-center rounded-md hover:bg-backgroundPrimary duration-150 ease-in-out">
                I&apos;ll be tweeting a donation any time USDC is moved out of
                the treasury wallet! 🐕
              </p>
            </a>
          </div>
        </div>
        <div className="py-4 w-full flex flex-col justify-center items-center">
          <Image
            className="rounded-lg m-auto w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px] border-2 border-accentYellow"
            src={shibe}
            alt="A AI generated 3d shiba inu"
            width="400"
            height="400"
          ></Image>
        </div>
      </div>
    </section>
  );
};

export default Info;
