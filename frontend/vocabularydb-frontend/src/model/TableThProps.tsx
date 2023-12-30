export default interface TableThProps {
    children: React.ReactNode,
    reversed: boolean,
    sorted: boolean,
    onSort(): void,
}