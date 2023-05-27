import axios from "axios";
import { useEffect, useState } from "react";
import styles from "@/styles/Manga.module.css";
import Link from "next/link";

export default function manga_id({ cover_art, results, id }) {
  // console.log(results);
  //   useEffect(() => {
  //     const chapterArray = [];
  //     datas.map(({ attributes, id }) => {
  //       const chapter = parseInt(attributes.chapter);
  //       const volume = parseInt(attributes.volume);

  //       const { pages, title, externalUrl } = attributes;

  //       const chapterObj = {
  //         id,
  //         chapter,
  //         volume,
  //         pages,
  //         title,
  //         externalUrl,
  //       };
  //       chapterArray.push(chapterObj);
  //     });
  //     chapterArray.sort((a, b) => {
  //       a = a.chapter;
  //       b = b.chapter;
  //       return a - b;
  //     });
  //     setSortedChapter(chapterArray);
  //   }, []);

  return (
    <main>
      <div className={styles.manga_details_container}>
        <div className={styles.manga_poster_container}>
          <img
            className={styles.manga_posters}
            width={300}
            src={cover_art}
            alt="manga"
          />
        </div>
        <div>
          <div className={styles.manga_chapter_attr_container}>
            <div className={styles.manga_chapter_attributes}>
              <h2>Title</h2>
              {results.map(({ chapter_name, chapter_id }) => {
                return (
                  <Link
                    href={`/manga/read/chapter/${chapter_name}?chapId=${chapter_id}&&mangaId=${id}`}
                    className={styles.chapters}
                    key={chapter_id}
                  >
                    <p>{chapter_name}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({ query }) {
  const { id, cover_art } = query;
  try {
    const { data } = await axios({
      method: "POST",
      url: `${process.env.MDO_ENDPOINT}/api/chapters/`,
      data: {
        manga_id: id,
      },
      headers: {
        "api-key": process.env.API_KEY,
      },
    });
    let results = data.chapter_detail;
    results = results.reverse();
    return {
      props: {
        cover_art,
        results,
        id,
      },
    };
  } catch (err) {
    console.log(err.message);
  }
}
