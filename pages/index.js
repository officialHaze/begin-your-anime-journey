import Layout from "@/components/Layout";
import axios from "axios";
import styles from "@/styles/Cards.module.css";
import AnimeListCards from "@/components/AnimeListCards";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Home({ data }) {
	return (
		<>
			<Layout>
				<div className={styles.default_anime_container}>
					{data.map(({ id, attributes }) => {
						const { canonicalTitle } = attributes;
						return (
							<AnimatePresence
								key={id}
								style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
							>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5 }}
									exit={{ opacity: 0 }}
								>
									<Link href={`/${id}?title=${canonicalTitle}`}>
										<AnimeListCards attributes={attributes} />
									</Link>
								</motion.div>
							</AnimatePresence>
						);
					})}
				</div>
			</Layout>
		</>
	);
}

export async function getStaticProps() {
	try {
		const { data } = await axios.get("https://kitsu.io/api/edge/anime?page[limit]=20");

		return {
			props: data,
		};
	} catch (err) {
		console.log(err.message);
	}
}
