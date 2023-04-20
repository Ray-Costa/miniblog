import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { PostContext } from "@/contexts/PostContext";
import { useContext } from "react";


export default function Navbar() {
  const { filterPostsByAuthor, loadPosts } = useContext(PostContext);

  const searchAutor = async (event) => {
    event.preventDefault();
    const search = event.target[0].value;
    if (search === "" || search === undefined) return loadPosts();
    filterPostsByAuthor(search);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_container}>
        <div className={styles.half_container}>
          <Image className={styles.logo} alt="oculos" src="/oculos.png" width="50" height="50"/>
          <h1>THE BLOG </h1>
        </div>
        <form className={styles.input_pesquisa_form} onSubmit={() => searchAutor(event)}>
          <input className={styles.input_pesquisa} type="text" placeholder="Pesquisar Autor"/>
          <button className={styles.btn_pesquisa_lupa} type="submit"><img
            alt="curtida" src="/imglupa.png" width="20" height="20"/></button>
        </form>
        <div className={styles.half_container_flex_end}>
          <ul className={styles.link_items}>
            <li>
              <Link href="/">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
