import styles from "../styles/About.module.css";

const team = [
  {
    name: "Renata Costa",
    avatar: "https://ca.slack-edge.com/TQZR39SET-U03P34Z7H2S-4c6bcbc14409-512",
    linkedin: "https://www.linkedin.com/in/renataracosta/",
    github: "https://github.com/Ray-Costa"
  }
];

export default function About() {
  return (
    <div className={styles.about}>
      <h1>Sobre o projeto</h1>
      <p className={styles.text_justify}>O projeto é um desafio técnico para a vaga de desenvolvedor full-stack
        estagiário na Oper. Consiste na construção de um miniblog que se conecta com a News API para obtenção e
        persistência de informações. A aplicação deverá ser desenvolvida em Next.js, e terá pelo menos duas páginas: a
        Home, que lista informações sobre os artigos obtidos da API, e a Article, que exibe o conteúdo completo do
        artigo escolhido pelo usuário e permite a adição de comentários. As informações sobre os comentários devem ser
        persistidas em um banco de dados. O desenvolvedor é livre para decidir quais tecnologias e bibliotecas utilizar
        e adicionar funcionalidades adicionais, se achar necessário. A News API é uma API exclusiva para este desafio e
        utiliza dados fictícios. As instruções para utilização da API podem ser encontradas no seguinte endereço:
        https://news-api.lublot.dev/api-docs..</p>

      <div className={styles.img}>

        <img src="https://ca.slack-edge.com/TQZR39SET-U03P34Z7H2S-4c6bcbc14409-512" alt="Renata Costa" width="80"
             height="80"/>
        <h2>Renata Costa</h2>
        <p>Desenvolvedora Full Stack</p>
        <div>
          <a href="https://www.linkedin.com/in/renataracosta/">Linkedin</a>
        </div>
        <a href="https://github.com/Ray-Costa">Github</a>
      </div>
    </div>

  );
}
