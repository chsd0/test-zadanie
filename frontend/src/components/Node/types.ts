export interface NodeProps {
    caption: string,
    color: string,
    cpu: number,
    memory: number,
    disk: number,
    active?: boolean,
    onClick?: () => void
}