import { keys } from "@mantine/core";
import TableRowData from "../model/TableRowData";

function filterData(data: TableRowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
      keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
}

function sortData(data: TableRowData[], 
    payload: { sortBy: keyof TableRowData | null; reversed: boolean; search: string }) {
    const { sortBy } = payload;
  
    if (!sortBy) {
      return filterData(data, payload.search);
    }
  
    return filterData(
      [...data].sort((a, b) => {
        if (payload.reversed) {
          return b[sortBy].localeCompare(a[sortBy]);
        }
        return a[sortBy].localeCompare(b[sortBy]);
      }),
      payload.search
    );
}

export { filterData, sortData };