import styles from './node.module.scss';
import { NodeProps } from './types';

const Node = ({caption, color, cpu, memory, disk, active, onClick}: NodeProps) => {
    return (
        <section className={styles.node + (active ? ' ' + styles.active : '')} onClick={onClick}>
            <div className={styles.node__statusCircle + ' ' + styles[color]} />
            <span className={styles.node__caption}>{caption}</span>
            <div className={styles.node__utilization}>
                <span className={styles.node__tech}>
                    <span className={styles.node__techName}>CPU</span>
                    <span className={cpu < 85 ? 
                                     styles.normal : cpu < 95 ?
                                     styles.warning : styles.critical}>{cpu}%</span>
                </span>
                <span className={styles.node__tech}> 
                    <span className={styles.node__techName}>Memory</span>
                    <span className={memory < 85 ? 
                                     styles.normal : memory < 95 ?
                                     styles.warning : styles.critical}>{memory}%</span>
                </span>
                <span className={styles.node__tech}> 
                    <span className={styles.node__techName}>Disk</span>
                    <span className={disk < 85 ? 
                                     styles.normal : disk < 95 ?
                                     styles.warning : styles.critical}>{disk}%</span>
                </span>
            </div>
        </section>
    )
};

export default Node;