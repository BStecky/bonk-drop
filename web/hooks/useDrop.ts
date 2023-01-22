import React from "react";
import { create } from "zustand";
import { Program, AnchorProvider, BN } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
  ConfirmOptions,
  Connection,
  PublicKey,
  Signer,
  AccountInfo,
  ParsedAccountData,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccount,
  burn,
} from "@solana/spl-token";
import { BonkDrop } from "../../target/types/bonk_drop";
import IDL from "../../target/idl/bonk_drop.json";

type DropAccount = {
  authority: PublicKey;
  twitter: String;
  discord: String;
  droppedAmount: any;
};
type WebState = {
  program: Program<BonkDrop>;
  connection: Connection;
  provider: AnchorProvider;
  user: AnchorWallet;
  dropAccount: PublicKey;
  treasury: PublicKey;
  treasuryAddress: PublicKey;
  bonkToken: PublicKey;
  dropAccountList: DropAccount[];
};
interface UseDrop {
  state: WebState;
  initState: (wallet: AnchorWallet) => Promise<boolean>;
  initAccount: () => Promise<boolean>;
  fetchAccount: () => Promise<DropAccount | any>;
  enterDrop: (dropAmount: number) => Promise<boolean>;
}
const useDrop = create<UseDrop>((set, get) => ({
  state: {} as WebState,
  initState: async (wallet: AnchorWallet) => {
    const connection = new anchor.web3.Connection(
      process.env.NEXT_PUBLIC_RPC_ENDPOINT as string,
      "processed" as ConfirmOptions
    );
    const provider = new AnchorProvider(
      connection,
      wallet,
      "processed" as ConfirmOptions
    );
    const program = new anchor.Program(
      IDL as anchor.Idl,
      process.env.NEXT_PUBLIC_DOG_PROGRAM as string,
      provider
    ) as unknown as Program<BonkDrop>;
    const [treasury, treasuryBump] = await PublicKey.findProgramAddressSync(
      [Buffer.from("treasury_config")],
      program.programId
    );
    //My devnet token
    const bonkToken = new PublicKey(
      "8JR9axZDuZcUHRoLxbrVgju7EJYwKjDfMLDxqrYCmnKL"
    );
    const treasuryAddress = await getAssociatedTokenAddress(
      bonkToken,
      new PublicKey("AimefnHrwr7Rmx8Bbm5JVcKgiiJ71jQs2PpChQ91t1Xu")
    );
    const [dropAccount, dropBump] = await PublicKey.findProgramAddressSync(
      [wallet.publicKey.toBuffer(), Buffer.from("user")],
      program.programId
    );

    const dropAccounts = await program.account.dropAccount.all([]);
    let dropAccountList: DropAccount[] = dropAccounts
      .sort(
        (a, b) =>
          (b.account.totalDropped as any) - (a.account.totalDropped as any)
      )
      .map((dropAccount) => ({
        authority: dropAccount.account.authority,
        twitter: dropAccount.account.twitter,
        discord: dropAccount.account.discord,
        droppedAmount: dropAccount.account.totalDropped,
      }));

    // for (let i = 0; i < dropAccounts.length; i++) {
    //   let account: DropAccount = {
    //     authority: dropAccounts[i].account.authority,
    //     twitter: dropAccounts[i].account.twitter,
    //     discord: dropAccounts[i].account.discord,
    //     droppedAmount: dropAccounts[i].account.totalDropped,
    //   };
    //   dropAccountList.push(account);
    // }
    // dropAccountList.sort((a, b) => b.droppedAmount - a.droppedAmount);
    // Mainnet token
    // const bonkToken = new PublicKey(
    //   "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
    // );
    const user = wallet;
    set({
      state: {
        program,
        connection,
        provider,
        user,
        dropAccount,
        treasury,
        treasuryAddress,
        bonkToken,
        dropAccountList,
      },
    });
    return true;
  },
  initAccount: async () => {
    const program = get().state.program;
    const user = get().state.user;
    const treasury = get().state.treasury;
    const treasuryAddress = get().state.treasuryAddress;
    const dropAccount = get().state.dropAccount;
    const mint = get().state.bonkToken;
    const userTokenAccount = await getAssociatedTokenAddress(
      mint,
      user.publicKey
    );
    try {
      const tx = await program.methods
        .createAccount()
        .accounts({
          treasury: treasury,
          dropAccount: dropAccount,
          authority: user.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
      console.log("account initialized tx: ", tx);
      return true;
    } catch (e) {
      console.log("error: ", e);
      return false;
    }
  },
  enterDrop: async (dropAmount: number) => {
    const program = get().state.program;
    const user = get().state.user;
    const userDropAccount = get().state.dropAccount;
    const treasury = get().state.treasury;
    const treasuryAddress = get().state.treasuryAddress;
    const mint = get().state.bonkToken;
    const userTokenAccount = await getAssociatedTokenAddress(
      mint,
      user.publicKey
    );
    try {
      const tx = await program.methods
        .dropBonk(new BN(dropAmount))
        .accounts({
          treasury: treasury,
          treasuryAddress: treasuryAddress,
          authority: user.publicKey,
          userTokenAccount: userTokenAccount,
          dropAccount: userDropAccount,
          tokenMint: mint,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .rpc();
      console.log("bonk dropped tx: ", tx);
      return true;
    } catch (e) {
      console.log("error: ", e);
      return false;
    }
  },
  fetchAccount: async () => {
    let _state = get().state;
    try {
      const dropAccountData = await _state.program.account.dropAccount.fetch(
        _state.dropAccount
      );
      if (dropAccountData) {
        const account: DropAccount = {
          authority: dropAccountData.authority,
          twitter: dropAccountData.twitter,
          discord: dropAccountData.discord,
          droppedAmount: dropAccountData.totalDropped,
        };
        return account;
      } else {
        return false;
      }
    } catch (err: any) {
      console.log("Could Not Fetch Account: ", err);
      return false;
    }
  },
  setLeaderboard: async () => {},
}));

export default useDrop;
