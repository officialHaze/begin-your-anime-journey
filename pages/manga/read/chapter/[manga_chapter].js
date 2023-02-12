import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styles from "@/styles/Manga_Pages.module.css";

export default function manga_chapter({ baseUrl, hash, imagesArray }) {
	return (
		<main className={styles.main}>
			<Splide
				style={{ display: "flex", alignItems: "center" }}
				options={{
					perPage: 1,
					drag: true,
					direction: "rtl",
					arrows: false,
					pagination: false,
				}}
			>
				{imagesArray.map((image) => {
					return (
						<SplideSlide
							key={image}
							style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
						>
							<img
								className={styles.pages}
								src={`${baseUrl}/data/${hash}/${image}`}
								alt="manga"
								style={{ width: "30%", height: "100%" }}
							/>
						</SplideSlide>
					);
				})}
			</Splide>
		</main>
	);
}

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { data } = await axios.get(`https://api.mangadex.org/at-home/server/${id}`);
		const { chapter, baseUrl } = data;
		const { hash } = chapter;
		const imagesArray = chapter.data;
		return {
			props: {
				baseUrl,
				hash,
				imagesArray,
			},
		};
	} catch (err) {
		console.log(err);
	}
}
