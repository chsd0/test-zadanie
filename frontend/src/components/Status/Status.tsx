import styles from './status.module.scss';

type StatusProps = {
    caption: string, 
    color: string,
    small?: boolean
};

interface CaptionMap {
    [key: string]: string
}

export const captionMap: CaptionMap = {
    'UNREACHABLE': 'Недоступен',
    'SHUTDOWN': 'Остановлен',
    'UP': 'Работает',
    'WARNING': 'Предупреждение',
    'CRITICAL': 'Критический',
    'DOWN': 'Не работает'
}

const Status = ({ caption, color, small }: StatusProps) => {
    return (
        <section className={styles.statusWrapper + (small ? ' ' + styles.small : '')}>
            <div className={styles.status__indicationCircle + ' ' + styles[color]} />
            <span className={styles.status__caption}>{captionMap[caption]}</span>
        </section>
    )
};

export default Status;