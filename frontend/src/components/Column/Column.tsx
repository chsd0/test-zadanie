import styles from './column.module.scss';

const Column = ({ children, scrollable }: { children: React.ReactNode | undefined, scrollable?: boolean }) => (
    <section className={styles.column + (scrollable ? ' ' + styles.scrollable : '')}>
        { children }
    </section>
);

export default Column;