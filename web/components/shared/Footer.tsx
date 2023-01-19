import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaDiscord, FaTwitter } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <footer className="w-full flex items-center justify-between text-white text-sm py-3 opacity-70">
      <div>Okay</div>
      <p>© 2023 Bonk Drop!</p>
    </footer>
  );
};

export default Footer;
