import React from "react";
import Link from "next/link";
import Image from "next/image";

const Info = () => {
  return (
    <section
      id="info"
      className="w-full h-screen min-h-[1150px] min-w-[200px] overflow-auto m-auto max-w-[1240px]"
    >
      <div className="bg-black/20 h-[80%] border-2 border-accentYellow rounded-xl py-10 m-10 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center w-full">
          <div className="p-4 ml-10">
            <h1>Who?</h1>
            <p className="pl-2 hover:text-complementaryPink">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/AimeSolana"
              >
                I made this
              </a>
            </p>
          </div>
          <div className="p-4 ml-10">
            <h1>What?</h1>
            <p className="pl-2">
              Bonk Drop is a project made during the January 2023 Solana
              Sandstorm Hackathon in support of No-Kill Dog Shelters and the
              $BONK Ecosystem.
            </p>
            <p className="p-2">
              50% of the $BONK dropped on the website is burned, and 50% is
              converted and donated to local southern California dog shelters.
            </p>
          </div>

          <div className="p-4 ml-10">
            <h1>Where?</h1>
            <p className="pl-2">Here at www.BonkDrop.com</p>
          </div>
          <div className="p-4 ml-10">
            <h1>Why?</h1>
            <p className="pl-2">
              During the NFT bull run in 2022, there were a few projects that
              used the hype to fundraise donations for charitible causes. Solana
              has really rallied around $BONK at the start of this year so I
              think it's the perfect time to raise some money in support of the
              very mascot that helped get us here.
            </p>
          </div>
          <div className="p-4 ml-10">
            {" "}
            <h1>How?</h1>
            <p className="pl-2">
              Go and <Link href="/#hero">drop some bonk</Link> to get started
              supporting dogs and the $BONK ecosystem today!
            </p>
          </div>
        </div>
        <div className="py-4 w-full flex justify-center">
          <Image
            className="rounded-lg m-auto w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px]"
            src="/../public/assets/shibe.png"
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
