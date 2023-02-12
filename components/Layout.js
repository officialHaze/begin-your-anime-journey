import styles from "@/styles/Layout.module.css";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Image from "next/image";
import naruto from "@/public/icons/naruto_action_category.png";
import romance from "@/public/icons/nana_romance_category.png";
import drama from "@/public/icons/drama_category.png";
import thriller from "@/public/icons/thriller_category.png";
import Footer from "./Footer";

async function getAnimeNames(searchedTitle) {
	try {
		const { data } = await axios.get(
			`https://kitsu.io/api/edge/anime?filter[text]=${searchedTitle}&page[limit]=5`
		);
		return data;
	} catch (err) {
		console.log(err);
	}
}

export default function Layout({ children, manga }) {
	const [searchedTitle, setTitle] = useState("");
	const [searchedResults, setResults] = useState([]);
	const router = useRouter();

	const handleChange = async (e) => {
		const { value } = e.target;
		setTitle(value);
		const { data } = await getAnimeNames(searchedTitle);
		setResults(data);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		searchedTitle.length !== 0 && router.push(`/search/${searchedTitle}`);
	};

	return (
		<>
			<div>
				{!manga ? (
					<Link href="/" className={styles.home_page_heading}>
						<h1>Search for your favourite anime!</h1>
						<h3>Read the manga!</h3>
					</Link>
				) : (
					<Link href="/" className={styles.home_page_heading}>
						<h1 className={styles.manga_heading}>Manga Next</h1>
					</Link>
				)}
			</div>
			<section className={styles.search_bar_section}>
				<div className={styles.search_bar_container} onSubmit={handleSubmit}>
					<form className={styles.search_bar_wrapper}>
						<button className={styles.search_icon}>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</button>

						<input
							onChange={handleChange}
							className={styles.search_bar}
							type="text"
							placeholder="Search"
							value={searchedTitle}
						/>
						<div className={styles.searched_results}>
							{searchedResults.map(({ id, attributes }) => {
								const { slug } = attributes;
								return (
									<Link
										href={`/search/${slug}`}
										style={searchedTitle.length === 0 ? { display: "none" } : { display: "block" }}
										key={id}
									>
										<p>{slug}</p>
									</Link>
								);
							})}
						</div>
					</form>
				</div>
			</section>

			<section className={styles.category_section}>
				<div className={styles.categories_container}>
					<Link href="/categories/action" style={{ textAlign: "center", cursor: "pointer" }}>
						<Image
							src={naruto}
							width={70}
							height={70}
							alt="naruto icon"
							className={styles.category_image}
						/>
						<p>Action</p>
					</Link>

					<Link href="/categories/romance" style={{ textAlign: "center", cursor: "pointer" }}>
						<Image
							src={romance}
							width={70}
							height={70}
							alt="romantic anime icon"
							style={{ objectFit: "cover" }}
							className={styles.category_image}
						/>
						<p>Romance</p>
					</Link>

					<Link href="/categories/drama" style={{ textAlign: "center", cursor: "pointer" }}>
						<Image
							src={drama}
							width={70}
							height={70}
							alt="drama anime icon"
							style={{ objectFit: "cover" }}
							className={styles.category_image}
						/>
						<p>Drama</p>
					</Link>

					<Link href="/categories/thriller" style={{ textAlign: "center", cursor: "pointer" }}>
						<Image
							src={thriller}
							width={70}
							height={70}
							alt="thriller anime icon"
							style={{ objectFit: "cover" }}
							className={styles.category_image}
						/>
						<p>Thriller</p>
					</Link>
				</div>
			</section>

			{children}

			<Footer />
		</>
	);
}
