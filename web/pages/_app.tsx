import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const WalletProviderSection = dynamic(
  () => import("../components/shared/ConnectionProvider"),
  {
    ssr: false,
  }
);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletProviderSection>
      <Component {...pageProps} />
    </WalletProviderSection>
  );
}
