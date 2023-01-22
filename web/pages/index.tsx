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
import WalletMultiButtonStyled from "@/components/shared/WalletMultiButtonStyled";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Leaderboard from "@/components/Leaderboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // Set drop bonk button to initialize account when user doesn't have bonk drop account
  // Design basic layout
  return (
    <main className="">
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
      <Hero />
      <Info />
      <Leaderboard />
    </main>
  );
}
