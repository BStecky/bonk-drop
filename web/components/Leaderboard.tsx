import useDrop from "../hooks/useDrop";
import React, { FC, useCallback, useState, useEffect } from "react";

const Leaderboard = () => {
  const state = useDrop((state) => state?.state);

  return (
    <section
      id="leaderboard"
      className="w-full h-screen min-h-[1150px] min-w-[200px] overflow-auto m-auto max-w-[1240px]"
    >
      <div className="bg-[#242933] h-[80%] border-2 border-primaryOrange rounded-xl m-10 overflow-x-auto">
        <h1 className="text-center p-4 underline bg-[#242933] text-accentYellow">
          Bonk Drop Leaderboards!
        </h1>
        <table className="table w-full">
          <thead>
            <th>User</th>
            <th>Amount Dropped!</th>
          </thead>
          <tbody>
            {state.dropAccountList?.length ? (
              state.dropAccountList.map((dropAccount, index) =>
                dropAccount.droppedAmount > 0 ? (
                  <tr key={index}>
                    <td> {dropAccount.authority.toString()}</td>
                    <td>
                      {Number(
                        dropAccount.droppedAmount.toString()
                      ).toLocaleString()}
                    </td>
                  </tr>
                ) : null
              )
            ) : (
              <td> Please connect your wallet to view the leaderboard!</td>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Leaderboard;
