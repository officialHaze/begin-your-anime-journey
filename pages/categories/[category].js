import axios from "axios";
import Layout from "@/components/Layout";
import styles from "@/styles/Cards.module.css";
import Link from "next/link";
import AnimeListCards from "@/components/AnimeListCards";
import { motion, AnimatePresence } from "framer-motion";

export default function Category({ data }) {
	const results = data.data;

	return (
		<div>
			<Layout>
				<div className={styles.default_anime_container}>
					{results.map(({ id, attributes }) => {
						return (
							<AnimatePresence key={id}>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, ease: "linear" }}
									exit={{ opacity: 0 }}
								>
									<Link href={`/${id}?title=${attributes.canonicalTitle}`}>
										<AnimeListCards attributes={attributes} />
									</Link>
								</motion.div>
							</AnimatePresence>
						);
					})}
				</div>
			</Layout>
		</div>
	);
}

export async function getServerSideProps({ params }) {
	try {
		const { category } = params;
		const { data } = await axios.get(
			`https://kitsu.io/api/edge/anime?filter[categories]=${category}&page[limit]=20`
		);
		return {
			props: {
				data,
			},
		};
	} catch (err) {
		console.log(err.message);
	}
}
