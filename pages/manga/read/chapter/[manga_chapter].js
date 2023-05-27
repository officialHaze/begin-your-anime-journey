import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styles from "@/styles/Manga_Pages.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function manga_chapter({ results }) {
  // console.log(results);
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
        style={{ display: "flex", alignItems: "center", height: "100%" }}
        options={{
          perPage: 1,
          drag: true,
          direction: "rtl",
          arrows: false,
          pagination: false,
        }}
      >
        {results.map((image, i) => {
          return (
            <SplideSlide
              className={styles.splide_slide}
              key={i}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <div className={styles.img_container}>
                  <img
                    className={styles.pages}
                    src={image.img_url}
                    alt={image.alt_title}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div>
                  <p style={{ padding: "1rem 0" }}>
                    {i + 1 !== results.length ? i + 1 : "End"}
                  </p>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </main>
  );
}

export async function getServerSideProps({ query }) {
  const { chapId, mangaId } = query;
  try {
    const { data } = await axios.post(
      `${process.env.MDO_ENDPOINT}/api/chapter/`,
      {
        manga_id: mangaId,
        chapter_id: chapId,
      },
      {
        headers: {
          "api-key": process.env.API_KEY,
        },
      }
    );
    const results = data.image_detail;
    // const { chapter, baseUrl } = data;
    // const { hash } = chapter;
    // const imagesArray = chapter.dataSaver[0];
    // const image = await axios.get(
    //   `${baseUrl}/data-saver/${hash}/${imagesArray}`
    // );
    // const blob = new Blob([image], { type: "image/jpg" });
    // const imageUrl = URL.createObjectURL(blob);

    return {
      props: {
        results,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
