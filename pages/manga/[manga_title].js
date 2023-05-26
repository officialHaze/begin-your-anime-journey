import Layout from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/Manga.module.css";
import Link from "next/link";

export default function manga_title({ results }) {
  // console.log(results);

  return (
    <div>
      <Head>
        <title>Manga Next</title>
      </Head>
      <Layout manga>
        <div className={styles.manga_list_container}>
          {results.map(({ manga_name, manga_id, manga_img_link }) => {
            return (
              <Link
                href={`/manga/read/${manga_name}?id=${manga_id}&cover_art=${manga_img_link}`}
                key={manga_id}
                className={styles.manga}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p style={{ width: "15rem", textAlign: "center" }}>
                    {manga_name}
                  </p>
                </div>
                <div>
                  <img
                    className={styles.manga_posters}
                    width={300}
                    src={manga_img_link}
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
              No manga found based on your selection! Please try a different
              version.
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
    const { data } = await axios.post(`http://localhost:8000/api/search/`, {
      manga_name: manga_title.toLowerCase(),
    });

    const results = data.detail;
    return {
      props: {
        results,
      },
    };
  } catch (err) {
    console.log(err.message);
  }
}
