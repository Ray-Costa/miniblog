import styles from "../styles/Input.module.css";
import { PostContext } from "@/contexts/PostContext";
import { useContext } from "react";


// async function createComment(event) {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const postId = formData.get("postId");
//   const email = formData.get("email");
//   const comentario = formData.get("comentario");
//
//   const comment = {
//     postId,
//     email,
//     comment: comentario
//   };
//
//   await fetch("/api/comment", {
//     method: "POST",
//     body: JSON.stringify(comment),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
// }

export default function Input({ postId }) {
  // const { posts, loadingPosts, userPost, setPosts  } = useContext(PostContext);
  return (
    <div>
      <form className={styles.form} onSubmit={() => createComment(event)}>
        <input name="postId" type="hidden" value={postId}/>
        <div className={styles.label_email}>
          <label>Email</label>
          <input name="email" type="email" placeholder="Digite o seu email"/>

        </div>
        <div className={styles.label_comentario}>
          <label>Adicionar Comentário</label>
          <textarea className={styles.textarea} rows="10" cols="38" name="comentario" maxLength="400"
                    minLength="10"></textarea>
        </div>
        <button type="submit">Comentar</button>
      </form>
    </div>
  );
}
