import styles from './group.module.scss';

const Group = ({ groupNumber, nodeCount, active, onClick }: {groupNumber: number, nodeCount: number, active?: boolean, onClick: () => void}) => {
    return (
        <div className={styles.group + (active ? ' ' + styles.active : '')} onClick={onClick}>
            <span className={styles.group__number}>Группа {groupNumber}</span>
            <div className={styles.group__divider} />
            <span className={styles.group__nodeCount}>Количество нод: {nodeCount}</span>
        </div>
    )
};

export default Group;