import React, { FC, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import WalletMultiButtonStyled from "./WalletMultiButtonStyled";

const Navbar: FC = () => {
  return (
    <div className="bg-black/20 border-y-2 border-y-accentYellow">
      <div className="p-4">
        <WalletMultiButtonStyled />
      </div>
    </div>
  );
};

export default Navbar;
