import useDrop from "../hooks/useDrop";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { FC, useCallback, useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Link from "next/link";
import WalletMultiButtonStyled from "@/components/shared/WalletMultiButtonStyled";

const Hero = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const initState = useDrop((state) => state?.initState);
  const state = useDrop((state) => state?.state);
  const [accountFetched, setAccountFetched] = useState(false);
  const [accountLoading, setAccountLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const enterDrop = useDrop((state) => state?.enterDrop);
  const initAccount = useDrop((state) => state?.initAccount);
  const fetchAccount = useDrop((state) => state?.fetchAccount);

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

  useEffect(() => {
    async function init() {
      if (wallet?.publicKey) {
        await initState(wallet);
        await updateAccount();
        setWalletConnected(true);
      }
    }
    init();
  }, [wallet]);

  return (
    <section
      id="hero"
      className="w-full h-screen min-h-[640px] min-w-[200px] overflow-auto m-auto max-w-[1240px]"
    >
      <div className="bg-black/20 h-[80%] border-2 border-accentYellow rounded-xl py-10 m-10 grid grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center text-center w-full md:p-4">
          <Image
            className="rounded-[50%] m-auto w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]"
            src="/../public/assets/bonkToken.jpeg"
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
                  <button
                    className="btn-regular"
                    onClick={async () => {
                      const result = await enterDrop();
                    }}
                  >
                    Drop Bonk!
                  </button>
                )}
              </div>
            ) : (
              <div className="">
                <WalletMultiButtonStyled />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
