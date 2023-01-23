import useDrop from "../hooks/useDrop";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { FC, useCallback, useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Link from "next/link";
import WalletMultiButtonStyled from "@/components/shared/WalletMultiButtonStyled";
import { GiphyFetch } from "@giphy/js-fetch-api";
import bonkLogo from "../public/assets/bonkToken.jpeg";
import { Gif } from "@giphy/react-components";
import { off } from "process";

const Hero = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const initState = useDrop((state) => state?.initState);
  const state = useDrop((state) => state?.state);
  const [accountFetched, setAccountFetched] = useState(false);
  const [accountLoading, setAccountLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [dropSuccess, setDropSuccess] = useState(false);
  const enterDrop = useDrop((state) => state?.enterDrop);
  const initAccount = useDrop((state) => state?.initAccount);
  const fetchAccount = useDrop((state) => state?.fetchAccount);
  const [dropAmount, setDropAmount] = useState<number>(100000);
  const [gifUrl, setGifUrl] = useState("");
  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY as string);

  async function updateAccount() {
    setAccountLoading(true);
    const account = await fetchAccount();
    if (account) {
      setAccountFetched(true);
      setAccountLoading(false);
    } else {
      setAccountLoading(false);
    }
  }

  async function setGif() {
    const offset = Math.floor(Math.random() * 100);
    gf.search("shiba inu dog", {
      sort: "relevant",
      lang: "es",
      limit: 1,
      type: "gifs",
      offset: offset,
    }).then((result) => {
      setGifUrl(result.data[0].images.fixed_height.url);
    });
  }

  useEffect(() => {
    async function init() {
      if (wallet?.publicKey) {
        await initState(wallet);
        await updateAccount();
        await setGif();
        setWalletConnected(true);
        // gf.random({ tag: "shiba inu dog cute", type: "gifs" }).then((result) =>
        //   setGifUrl(result.data.images.fixed_height.url)
        // );
      }
    }
    init();
  }, [wallet]);

  return (
    <main>
      <section
        id="hero"
        className="w-full h-screen min-h-[640px] min-w-[200px] overflow-auto m-auto max-w-[1240px]"
      >
        <div className="bg-black/20 h-[80%] border-2 border-accentYellow rounded-xl py-10 m-10 grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center text-center w-full md:p-4">
            <Image
              className="rounded-[50%] m-auto w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]"
              src={bonkLogo}
              alt="The logo for Bonk token, a cartoon shiba inu head."
              width="1000"
              height="1000"
            ></Image>
          </div>
          <div className="text-center p-4 w-full h-full flex flex-col items-center justify-center">
            <div className="py-4 max-w-[500px]">
              <h1 className="">Bonk Drop</h1>
              <p className="py-4">
                Drop some $BONK to benefit actual Dogs as well as the $BONK
                ecosystem!
              </p>
              <Link href="/#info">
                <button className="btn-regular btn-sm">Learn More!</button>
              </Link>
            </div>
            <input
              type="range"
              min="0"
              max="1000000"
              value={dropAmount}
              className="range"
              onChange={(e) => setDropAmount(Number(e.target.value))}
            />
            <p>Drop Amount: {dropAmount}</p>
            <div className="py-4">
              {wallet?.publicKey ? (
                <div>
                  {accountFetched == false ? (
                    <button
                      className="btn-regular"
                      onClick={async () => {
                        const result = await initAccount();
                      }}
                    >
                      Init Account!
                    </button>
                  ) : (
                    <div>
                      <button
                        className="btn-regular"
                        onClick={async () => {
                          const result = await enterDrop(dropAmount);
                          if (result) {
                            setDropSuccess(true);
                            setTimeout(() => {
                              setDropSuccess(false);
                              setGif();
                            }, 15000); // 10 seconds
                          }
                        }}
                      >
                        Drop Bonk!
                      </button>
                    </div>
                  )}
                  {dropSuccess && gifUrl && (
                    <div>
                      <div className="p-2">
                        <h3 className="text-accentYellow">
                          Success! Thank you for dropping!
                        </h3>
                        <img
                          src={gifUrl}
                          className="w-full rounded-md border-2 border-accentYellow"
                          alt="shiba inu dog"
                        />
                      </div>
                      <a
                        className="bg-primaryOrange text-white p-2 text-lg font-bold rounded-lg hover:bg-complementaryPink "
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://twitter.com/intent/tweet?text=I just dropped some $BONK and helped real dogs! 50 Percent Burned, 50 Percent donated to dog shelters. Try it yourself -> www.bonkdrop.com"
                      >
                        Share to help more dogs!
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="">
                  <WalletMultiButtonStyled />
                </div>
              )}
              <div></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
