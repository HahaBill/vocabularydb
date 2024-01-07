import { ScrollArea, Table, TextInput, rem, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import TableTh from "../../util/helper_table_th";
import { useEffect } from "react";

// @ts-expect-error: props
export default function TableVocabulary(props) {

    useEffect (() => {

    }, [props.tableRows])
    return (
        <ScrollArea>
            <TextInput
            placeholder="Search by any field"
            mb="md"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            value={props.search}
            onChange={props.handleSearchChange}
            /> 
            <Table className="h-16" horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                <Table.Tbody>
                <Table.Tr>
                    <TableTh
                    sorted={props.sortBy === 'word_phrases_sentence'}
                    reversed={props.reverseSortDirection}
                    onSort={() => props.setSorting('word_phrases_sentence')}
                    >
                    Word-Phrases-Sentence
                    </TableTh>
                    <TableTh
                    sorted={props.sortBy === 'explanation'}
                    reversed={props.reverseSortDirection}
                    onSort={() => props.setSorting('explanation')}
                    >
                    Explanation
                    </TableTh>
                    <TableTh
                    sorted={props.sortBy === 'usage'}
                    reversed={props.reverseSortDirection}
                    onSort={() => props.setSorting('usage')}
                    >
                    Usage
                    </TableTh>
                </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                {(props.tableRows.length > 0) ? (
                    props.tableRows
                ) : (
                    <Table.Tr>
                    <Table.Td colSpan={Object.keys(props.emptyVocabularies[0]).length}>
                        <Text fw={500} ta="center">
                        Nothing found
                        </Text>
                    </Table.Td>
                    </Table.Tr>
                )}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
}