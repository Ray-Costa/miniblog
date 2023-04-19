import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";


export default function Navbar() {

  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_container}>
        <div className={styles.half_container}>
          <Image className={styles.logo} alt="oculos" src="/oculos.png" width="50" height="50"/>
          <h1>THE BLOG </h1>
        </div>
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
