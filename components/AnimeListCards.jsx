import styles from "@/styles/Cards.module.css";

export default function AnimeListCards({ attributes }) {
	const { canonicalTitle, ageRating, status, posterImage } = attributes;
	return (
		<div className={styles.anime}>
			<div className={styles.anime_title}>
				<p>{canonicalTitle}</p>
			</div>
			<div className={styles.image_container}>
				<img
					className={styles.poster_images}
					src={posterImage.original}
					alt={canonicalTitle}
					width={250}
					height={400}
				/>
			</div>
			<div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
				<p>Rated: {ageRating}</p>
				<button
					className={styles.status}
					style={status === "finished" ? { background: "green" } : { background: "blue" }}
				>
					{status}
				</button>
			</div>
		</div>
	);
}
