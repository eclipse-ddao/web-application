import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

// import "@rainbow-me/rainbowkit/styles.css";

// import {
//   darkTheme,
//   getDefaultWallets,
//   RainbowKitProvider,
// } from "@rainbow-me/rainbowkit";
// import { configureChains, createClient, WagmiConfig } from "wagmi";
// import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { publicProvider } from "wagmi/providers/public";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  // const { chains, provider } = configureChains(
  //   [mainnet, polygon, optimism, arbitrum],
  //   [alchemyProvider({ apiKey: "someid" }), publicProvider()]
  // );

  // const { connectors } = getDefaultWallets({
  //   appName: "My RainbowKit App",
  //   chains,
  // });

  // const wagmiClient = createClient({
  //   autoConnect: true,
  //   connectors,
  //   provider,
  // });

  return (
    // <WagmiConfig client={wagmiClient}>
    //   <RainbowKitProvider theme={darkTheme()} chains={chains}>
    <QueryClientProvider client={queryClient}>
      <title>Eclipse</title>
      <Component {...pageProps} />
      <Toaster />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
    // </RainbowKitProvider> </WagmiConfig>
  );
}

export default MyApp;
