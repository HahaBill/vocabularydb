import { keys } from "@mantine/core";
import TableRowData from "../model/TableRowData";

function sortData(data: TableRowData[], 
    payload: { sortBy: keyof TableRowData | null; reversed: boolean; search: string }) {
    const { sortBy, reversed, search } = payload;

    let filteredData = data;
    if (search) {
        const query = search.toLowerCase().trim();
        filteredData = data.filter((item) =>
            keys(item).some((key) => item[key].toLowerCase().includes(query))
        );
    }

    if (sortBy) {
        filteredData.sort((a, b) => {
            if (reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }
            return a[sortBy].localeCompare(b[sortBy]);
        });
    }

    return filteredData;
}

export { sortData };