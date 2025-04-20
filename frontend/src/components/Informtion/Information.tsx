import styles from './information.module.scss';
import { InformationProps } from './types';
import { captionMap } from '@components/Status';

const Information = (informationProps: InformationProps) => (
    <section className={styles.infromationWrapper}>
        <span className={styles.information__text}>Группа: {informationProps.currentGroup}</span>
        <span className={styles.information__text}>Нод в группе: {informationProps.nodesInGroup}</span>
        <span className={styles.information__text}>Статус: {captionMap[informationProps.status!]}</span>
        <span className={styles.information__text}>Последнее обновление: {informationProps.lastUpdate}</span>
    </section>
);

export default Information;