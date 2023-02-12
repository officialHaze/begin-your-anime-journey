import Layout from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/Manga.module.css";
import Link from "next/link";

export default function manga_title({ data, coverAttr }) {
	const results = data.data;
	console.log(coverAttr);
	let i = -1;

	return (
		<div>
			<Head>
				<title>Manga Next</title>
			</Head>
			<Layout manga>
				<div className={styles.manga_list_container}>
					{results.map(({ attributes, id }) => {
						i += 1;
						return (
							<Link
								href={`/manga/read/${attributes.title.en}?id=${id}&cover_art=${coverAttr[i].fileName}`}
								key={id}
								className={styles.manga}
							>
								<div style={{ display: "flex", justifyContent: "center" }}>
									<p style={{ width: "15rem", textAlign: "center" }}>{attributes.title.en}</p>
								</div>
								<div>
									<img
										className={styles.manga_posters}
										width={300}
										src={`https://uploads.mangadex.org/covers/${id}/${coverAttr[i].fileName}`}
										alt="manga"
									/>
								</div>
							</Link>
						);
					})}
				</div>
				{results.length === 0 && (
					<div>
						<h2 style={{ textAlign: "center", padding: "5rem" }}>
							No manga found based on your selection! Please try a different version.
						</h2>
					</div>
				)}
			</Layout>
		</div>
	);
}

export async function getServerSideProps({ params }) {
	const { manga_title } = params;
	try {
		const { data } = await axios.get(
			`https://api.mangadex.org/manga?title=${manga_title}&includes[]=cover_art`
		);

		const results = data.data;
		const coverAttr = [];
		results.map(({ relationships }) => {
			relationships.map(({ attributes, type }) => {
				if (type === "cover_art") {
					coverAttr.push(attributes);
				}
			});
		});

		return {
			props: {
				data,
				coverAttr,
			},
		};
	} catch (err) {
		console.log(err.message);
	}
}
