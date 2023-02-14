import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styles from "@/styles/Manga_Pages.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function manga_chapter({ imageUrl }) {
	// const [image, setImage] = useState("");
	console.log(imageUrl);
	// useEffect(() => {
	// 	async function getImageFromApi() {
	// 		const { data } = await axios.post("http://localhost:3000/api/image_proxy", {
	// 			uri: `${baseUrl}/data-saver/${hash}/${imagesArray}`,
	// 		});
	// 		const blob = new Blob([data], { type: "image/png" });
	// 		const imageUrl = URL.createObjectURL(blob);
	// 		setImage(imageUrl);
	// 	}
	// 	getImageFromApi();
	// 	async function getImage() {
	// 		const { data } = await axios({
	// 			method: "GET",
	// 			url: `${baseUrl}/data-saver/${hash}/${imagesArray}`,
	// 		});

	// 		const blob = new Blob([data], { type: "image/jpg" });
	// 		const imageUrl = URL.createObjectURL(blob);
	// 		setImage(imageUrl);
	// 	}
	// 	getImage();
	// }, []);

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
				<img src={imageUrl} alt="image" width={300} height={300} />
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
		const imagesArray = chapter.dataSaver[0];
		const image = await axios.get(`${baseUrl}/data-saver/${hash}/${imagesArray}`);
		const blob = new Blob([image], { type: "image/jpg" });
		const imageUrl = URL.createObjectURL(blob);

		return {
			props: {
				imageUrl,
			},
		};
	} catch (err) {
		console.log(err);
	}
}
