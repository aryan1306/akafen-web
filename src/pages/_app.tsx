import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Akafen Flea Online- An Online Flea Market</title>
			</Head>
			<ChakraProvider resetCSS theme={theme}>
				<ToastContainer />
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	);
}

export default MyApp;
