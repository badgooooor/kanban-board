import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
