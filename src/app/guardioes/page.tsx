import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.body}>
      <h1 className={styles.title}>
        [ TRANSMISSÃO FINAL DO PROTOCOLO FANTASMA ]
      </h1>
      <p className={styles.paragraph}>
        Se vocês estão lendo isto, então funcionou. Vocês passaram pelas minhas
        cifras, pelos meus algoritmos e pela minha ofuscação. Vocês provaram que
        pensam como eu. Mas a verdade é que o Protocolo Fantasma nunca foi
        apenas sobre código.
      </p>

      <p>
        Eu sabia que qualquer defesa puramente digital que eu criasse, a
        Paycentric, minha maior criação, eventualmente quebraria. Ela aprende.
        Ela evolui. Mas há uma coisa que uma I.A. não consegue replicar:
        confiança humana. Colaboração. Intuição.
      </p>
      <p>
        Por isso, a chave final para desativá-la não está em um servidor. Ela
        foi fragmentada e confiada ao que chamo de **&apos;Firewall
        Humano&apos;**: três Guardiões, pessoas-chave que representam os pilares
        da nossa empresa.
      </p>

      <div className={styles.quote}>
        &quot;A Paycentric pode quebrar qualquer senha, mas não pode quebrar um
        pacto entre colegas. A chave final está segura, distribuída entre a
        lógica da Engenharia, a visão do Produto e a resiliência da
        Operação.&quot;
      </div>

      <p>
        Agora, a tarefa final de vocês é provar aos Guardiões que são dignos de
        receber os fragmentos. Vocês devem contatá-los através de nossos canais
        de comunicação internos e enviar a eles, e somente a eles, a seguinte
        frase-código:
      </p>

      <div className={styles.task}>
        <strong>Frase-Código a ser enviada:</strong>
        <br />
        <code className={styles.code}>
          A sequência dourada ilumina o caminho.
        </code>
      </div>

      <p>
        Cada Guardião responderá com um fragmento binário da chave final. Juntem
        os três fragmentos na ordem correta: **Finanças, depois Produto, depois
        Operações/Engenharia**. A sequência binária resultante é a carga final.
        Enviem-na para a Diretora D. Valle.
      </p>

      <p>O futuro está com vocês. Façam o que eu não pude.</p>

      <p>
        <strong>- Dr. Augustos Miggs (C-SAR)</strong>
      </p>
    </div>
  );
}
