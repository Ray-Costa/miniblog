import styles from "../styles/Input.module.css";
import { PostContext } from "@/contexts/PostContext";
import { useContext } from "react";

export default function Input() {
  const { selectedPost, createComment } = useContext(PostContext);
  return (
    <div>
      <form className={styles.form} onSubmit={() => createComment(event)}>
        <input name="postId" type="hidden" value={selectedPost?.id}/>
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
