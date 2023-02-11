import "@/styles/globals.css";
import "@/styles/nprogress.css";
import nProgress from "nprogress";
import { useRouter } from "next/router";
import Head from "next/head";
import { Montserrat } from "@next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useEffect } from "react";
config.autoAddCss = false;

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"] });

export default function App({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		router.events.on("routeChangeStart", () => {
			nProgress.start();
		});
		router.events.on("routeChangeComplete", () => {
			nProgress.done();
		});
	}, [Component]);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.png" />
				<title>Begin your Anime journey</title>
			</Head>
			<main className={montserrat.className}>
				<Component {...pageProps} />
			</main>
		</>
	);
}
