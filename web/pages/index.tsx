import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import useDrop from "../hooks/useDrop";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { FC, useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
// Components
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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

  // Set drop bonk button to initialize account when user doesn't have bonk drop account
  // Design basic layout
  return (
    <main className="h-screen bg-slate-400">
      <Head>
        <title>Drop some $BONK!</title>
        <meta
          name="description"
          content="Drop some $BONK for the greater good of dogs and the $BONK ecosystem!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <section>
        <div className="text-center text-white">
          <Image
            className="rounded-[50%] m-auto py-4"
            src="/../public/assets/bonkToken.jpeg"
            alt="The logo for Bonk token, a cartoon shiba inu head."
            width="400"
            height="400"
          ></Image>
          <h1>Bonk Drop</h1>
          <h2>It's time to drop some bonk for the greater good of Dogs!</h2>
        </div>
        <div className="text-center">
          {accountFetched == false ? (
            <button
              className="btn btn-primary"
              onClick={async () => {
                const result = await initAccount();
              }}
            >
              Init Account!
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={async () => {
                const result = await enterDrop();
              }}
            >
              Drop Bonk!
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
