import axios from "axios";
import heart from "@/public/icons/heart.png";
import rating from "@/public/icons/rating.png";
import Image from "next/image";
import styles from "@/styles/AnimeDetails.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Anime({ data }) {
	const [result] = data.data;

	const { attributes } = result;

	const {
		canonicalTitle,
		coverImage,
		posterImage,
		synopsis,
		titles,
		episodeCount,
		favoritesCount,
		averageRating,
		totalLength,
		episodeLength,
		ageRatingGuide,
		youtubeVideoId,
	} = attributes;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, ease: "linear" }}
				exit={{ opacity: 0 }}
			>
				<div
					className={styles.anime_heading}
					style={{ textAlign: "center", padding: "5rem 0", fontSize: "1.5rem" }}
				>
					<h1 style={{ padding: "0 3rem" }}>
						{canonicalTitle} ({titles.ja_jp})
					</h1>
				</div>

				<div className={styles.main_container}>
					<div>
						<div className={styles.anime_image_container}>
							<img
								className={styles.anime_image}
								src={coverImage === null ? posterImage.large : coverImage.original}
								alt={canonicalTitle}
								width="640px"
								height="480px"
								style={{ objectFit: "cover", borderRadius: "0.5rem" }}
							/>
						</div>
					</div>
					<div className={styles.description}>
						<div className={styles.anime_synopsis}>
							<p>{synopsis}</p>
						</div>
						<div className={styles.episode_details}>
							<p>
								<span className={styles.span}>Total episodes:</span> {episodeCount}
							</p>
							<p>
								<span className={styles.span}>Average episode length:</span> {episodeLength}mins
							</p>
							<p>
								<span className={styles.span}>Total length:</span> {totalLength}mins
							</p>
						</div>
						<p style={{ textAlign: "center" }}>
							<span className={styles.span}>Suitable for ages: {ageRatingGuide}</span>
						</p>
						<div className={styles.details_attr}>
							<div>
								<Image src={heart} width={40} height={40} alt="heart icon" />
								<p>{favoritesCount}</p>
							</div>
							<div>
								<Image src={rating} width={40} height={40} alt="rating icon" />
								<p>{averageRating}</p>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.trailer}>
					<h1>Watch the trailer</h1>
					<iframe
						src={
							youtubeVideoId !== null || youtubeVideoId !== ""
								? `https://youtube.com/embed/${youtubeVideoId}`
								: "Sorry! No info available.."
						}
						width="45%"
						height="400"
					></iframe>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}

export async function getServerSideProps({ query }) {
	try {
		const { id } = query;

		const { data } = await axios.get(`https://kitsu.io/api/edge/anime?filter[id]=${id}`);

		return {
			props: {
				data,
			},
		};
	} catch (err) {
		console.log(err);
	}
}
