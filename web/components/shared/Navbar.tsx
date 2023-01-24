import React, { FC, useEffect } from "react";
import { Link } from "react-scroll";
import Image from "next/image";

// Components
import WalletMultiButtonStyled from "./WalletMultiButtonStyled";

const Navbar: FC = () => {
  return (
    <div className="border-y-2 border-y-primaryOrange">
      <div
        className="navbar bg-complementaryBlue text-accentYellow"
        data-theme="luxury"
      >
        <div className="flex-1">
          <Link to="hero" smooth>
            <a className="btn btn-ghost text-xl normal-case ">Bonk Drop!</a>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="info" smooth>
                <a>Info</a>
              </Link>
            </li>

            <li>
              <Link to="leaderboard" smooth>
                <a>Leaderboard</a>
              </Link>
            </li>
            <div className="p-4">
              <WalletMultiButtonStyled />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
