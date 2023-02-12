import axios from "axios";
import { useEffect, useState } from "react";
import styles from "@/styles/Manga.module.css";
import Link from "next/link";

export default function manga_id({ cover_art, data, id }) {
	const [chapterSorted, setSortedChapter] = useState([]);
	const datas = data.data;

	useEffect(() => {
		const chapterArray = [];
		datas.map(({ attributes, id }) => {
			const chapter = parseInt(attributes.chapter);
			const volume = parseInt(attributes.volume);

			const { pages, title, externalUrl } = attributes;

			const chapterObj = {
				id,
				chapter,
				volume,
				pages,
				title,
				externalUrl,
			};
			chapterArray.push(chapterObj);
		});
		chapterArray.sort((a, b) => {
			a = a.chapter;
			b = b.chapter;
			return a - b;
		});
		setSortedChapter(chapterArray);
	}, []);

	return (
		<main>
			<div className={styles.manga_details_container}>
				<div className={styles.manga_poster_container}>
					<img
						className={styles.manga_posters}
						width={300}
						src={`https://uploads.mangadex.org/covers/${id}/${cover_art}`}
						alt="manga"
					/>
				</div>
				<div>
					<div className={styles.manga_chapter_attr_container}>
						<div className={styles.manga_chapter_attributes}>
							<h2>Chpt.</h2>
							{chapterSorted.map(({ id, chapter, externalUrl }) => {
								return (
									<Link
										href={
											externalUrl === null ? `/manga/read/chapter/${chapter}?id=${id}` : externalUrl
										}
										className={styles.chapters}
										key={id}
									>
										<p id={id}>Chpt. {chapter}</p>
									</Link>
								);
							})}
						</div>
						<div className={styles.manga_chapter_attributes}>
							<h2>Vol.</h2>
							{chapterSorted.map(({ id, volume }) => {
								return (
									<div className={styles.volume} key={id}>
										<p>Vol. {volume}</p>
									</div>
								);
							})}
						</div>
						<div className={styles.manga_chapter_attributes}>
							<h2>Title</h2>
							{chapterSorted.map(({ id, title }) => {
								return (
									<div className={styles.title} key={id}>
										<p>{title}</p>
									</div>
								);
							})}
						</div>
						<div className={styles.manga_chapter_attributes}>
							<h2>Pages</h2>
							{chapterSorted.map(({ id, pages }) => {
								return (
									<div className={styles.pages_no} key={id}>
										<p>{pages}</p>
									</div>
								);
							})}
						</div>
					</div>
					{chapterSorted.length == 0 && (
						<p style={{ marginTop: "2rem", textAlign: "center" }}>English translation not found!</p>
					)}
				</div>
			</div>
		</main>
	);
}

export async function getServerSideProps({ query }) {
	const { id, cover_art } = query;
	const languages = ["en"];
	try {
		const { data } = await axios({
			method: "GET",
			url: `https://api.mangadex.org/manga/${id}/feed`,
			params: {
				translatedLanguage: languages,
			},
		});
		return {
			props: {
				cover_art,
				data,
				id,
			},
		};
	} catch (err) {
		console.log(err.message);
	}
}
