import styles from './interface.module.scss';
import { Status } from '@components';

const Interface = ({caption, statusCaption, statusColor}: {caption: string, statusCaption: string, statusColor: string}) => {
    return (
        <section className={styles.interface}>
            <span className={styles.interface__caption}>Название: {caption}</span>
            <span className={styles.interface__status}>Статус:
                <Status caption={statusCaption} color={statusColor} small={true}/>
            </span>
        </section>
    )
};

export default Interface;