import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styles from "@/styles/Manga_Pages.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function manga_chapter({ baseUrl, hash, imagesArray }) {
	const [image, setImage] = useState("");

	useEffect(() => {
		async function getImage() {
			const { data } = await axios({
				method: "GET",
				url: `${baseUrl}/data/${hash}/${imagesArray}`,
			});
			setImage(data);
		}
		getImage();
	}, []);

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
				<img src={`${baseUrl}/data/${hash}/${imagesArray}`} alt="image" />
				{/* {imagesArray.map((image) => {
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
				})} */}
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
		const imagesArray = chapter.data[0];
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
