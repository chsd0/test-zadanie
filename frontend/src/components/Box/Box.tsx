import styles from './box.module.scss';

type boxProps = {
    children: React.ReactNode,
    title: string
};

const Box = ({children, title}: boxProps) => (
    <article className={styles.box}>
        <span className={styles.box__article}>{title}</span>
        {children}
    </article>
);

export default Box;