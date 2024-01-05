import * as React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';
import { Button, Container, Grid, ScrollArea, Table, TextInput, Textarea, Title, rem, Text, GridCol, Menu, Popover, Modal } from '@mantine/core';
import TableRowData from '../model/TableRowData';
import { IconEditCircle, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { sortData } from '../util/helper_table';
import TableTh from '../util/helper_table_th';
import Vocabulary from '../model/Vocabulary';
import { initialVocabState } from '../model/Vocabulary';
import { v4 as uuidv4} from 'uuid';
import { useDisclosure } from '@mantine/hooks';
import FormVocabulary from '../components/Home/FormVocabulary';

function Home() {
    const lambdaAPI = "https://4k6jq6ypdpxyzmdnxul6i6y4ke0krgjw.lambda-url.us-east-1.on.aws/";
    const emptyVocabularies: TableRowData[] = [{
        vocab_id: "2539c659-f318-454f-b285-18c31797aaa0",
        word_phrases_sentence: "Nice to meet you (Example)", 
        explanation: "The expression is used for greeting someone when you meet them for the first time, or for saying goodbye to them", 
        usage: "As she was being introduced to the new manager, she said, \"Very nice to meet you, sir\""}]


    ////////////////// Redux  /////////////////

    const userId = useSelector((state: RootState) => state.user.userId);

    ////////////////// AWS /////////////////
    

    /// GET ///
    const [queryData, setQueryData] = React.useState(emptyVocabularies);
    const [originalData, setOriginalData] = React.useState(emptyVocabularies);

    const getListVocabularies = async() => {
        const response = await (await fetch(`${lambdaAPI}/list-vocabulary-learned/${userId}`)).json();
        const vocabularies = response.vocabularies.map((vocab: Vocabulary) => (
            { vocab_id: vocab.vocab_id, word_phrases_sentence: vocab.vocab_name, explanation: vocab.vocab_definition, usage: vocab.vocab_example } as TableRowData
        ))
        setOriginalData(emptyVocabularies.concat(vocabularies));
        setQueryData(emptyVocabularies.concat(vocabularies));
    }

    /// PUT ///
    
    const [newVocab, setNewVocab] = React.useState<Vocabulary>({
        vocab_id: `vocab_${uuidv4()}`,
        vocab_name: "", 
        vocab_definition: "",
        vocab_example: "",
        isLearned: false,
        user_id: userId,
    });

    const handleNewVocabChange = (field: keyof Vocabulary, value: string) => {
        setNewVocab(prevVocab => ({ ...prevVocab, [field]: value }));
    } 

    const handleAddVocabulary = async(event: React.FormEvent) => {
        event.preventDefault();
        await fetch(`${lambdaAPI}/create-vocab`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newVocab),
        });
  
        getListVocabularies();
        setNewVocab(initialVocabState)
    }

    const handleUpdateVocabulary = async(update_vocab_id: string) => {
       
    }

    const handleDeleteVocabulary = async(delete_vocab_id: string) => {
        const newVocabList = originalData.filter((vocab) => vocab.vocab_id !== delete_vocab_id);
        setOriginalData(newVocabList);
        setQueryData(newVocabList);

        // Delete task from table.
        const response = await fetch(`${lambdaAPI}/delete-vocab/${delete_vocab_id}`, {
        method: "DELETE",
        });
        console.log(response);
    }

    ////////////////// Table  /////////////////
 
    const [search, setSearch] = React.useState('');
    const [sortBy, setSortBy] = React.useState<keyof TableRowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = React.useState(false);
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });
    const menuRef = React.useRef(null);
    const [opened, { open, close }] = useDisclosure(false);


    const setSorting = (field: keyof TableRowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setQueryData(sortData(originalData, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setQueryData(sortData(originalData, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    // @ts-expect-error: event 
    const handleClickOutside = (event) => {
         // @ts-expect-error: contains
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuVisible(false);
        }
    };

    // @ts-expect-error: event 
    const handleRowClick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setMenuPosition({
            top: rect.top + window.scrollY,
            left: rect.right + window.scrollX,
        });
        setIsMenuVisible(!isMenuVisible);
    };

    React.useEffect(() => {
        getListVocabularies();
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const tableRows = queryData.map((vocab: TableRowData) => (
        <Table.Tr 
        className="hover:bg-amber-100 active:bg-amber-200 cursor-pointer" 
        key={vocab.word_phrases_sentence} 
        onClick={(event) => handleRowClick(event)}>
            <Table.Td>{vocab.word_phrases_sentence}</Table.Td>
            <Table.Td>{vocab.explanation}</Table.Td>
            <Table.Td>{vocab.usage}</Table.Td>
            <Menu
            styles={{
                dropdown: { 
                    position: 'absolute',
                    top: `${menuPosition.top}px`, 
                    left: `${menuPosition.left}px`,
                }
            }}
            opened={isMenuVisible}>
                <Menu.Dropdown ref={menuRef}>
                    <Menu.Item
                        onClick={open}
                        leftSection={<IconEditCircle style={{ width: rem(14), height: rem(14) }} />}
                    >
                        Update
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => handleDeleteVocabulary(vocab.vocab_id)}
                        color="red"
                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    >
                        Delete
                    </Menu.Item>
                    
                    
                </Menu.Dropdown>
            </Menu>
        </Table.Tr>
    ));

    return (
        <div className='w-full h-full'>
            <Container className='rounded-lg bg-white'>
                <Title className='text-black' order={1}> Hi {userId} 👋!</Title>
            </Container>
            <Container fluid className='absolute top-24 rounded-lg bg-white w-8/12 h-5/6'>
                <Grid className="w-full h-full">
                    <Grid.Col span={12}>
                        <Container className='absolute top-12 right-9 w-11/12'>
                            <FormVocabulary newVocab={newVocab} handleVocabulary={handleAddVocabulary} handleNewVocabChange={handleNewVocabChange}/>
                        </Container>
                    </Grid.Col>
                    <Modal opened={opened} onClose={close} title="Authentication">
                        <FormVocabulary newVocab={newVocab} handleVocabulary={handleUpdateVocabulary} handleNewVocabChange={handleNewVocabChange}/>
                    </Modal>
                    <Grid.Col span={12} style={{ height: '220px' }}/>
                    <GridCol span={12}>
                        <Container className='overflow-auto max-h-80'>
                            <ScrollArea>
                                <TextInput
                                placeholder="Search by any field"
                                mb="md"
                                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                value={search}
                                onChange={handleSearchChange}
                                /> 
                                <Table className="h-16" horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                                    <Table.Tbody>
                                    <Table.Tr>
                                        <TableTh
                                        sorted={sortBy === 'word_phrases_sentence'}
                                        reversed={reverseSortDirection}
                                        onSort={() => setSorting('word_phrases_sentence')}
                                        >
                                        Word-Phrases-Sentence
                                        </TableTh>
                                        <TableTh
                                        sorted={sortBy === 'explanation'}
                                        reversed={reverseSortDirection}
                                        onSort={() => setSorting('explanation')}
                                        >
                                        Explanation
                                        </TableTh>
                                        <TableTh
                                        sorted={sortBy === 'usage'}
                                        reversed={reverseSortDirection}
                                        onSort={() => setSorting('usage')}
                                        >
                                        Usage
                                        </TableTh>
                                    </Table.Tr>
                                    </Table.Tbody>
                                    <Table.Tbody>
                                    {(tableRows.length > 0) ? (
                                        tableRows
                                    ) : (
                                        <Table.Tr>
                                        <Table.Td colSpan={Object.keys(emptyVocabularies[0]).length}>
                                            <Text fw={500} ta="center">
                                            Nothing found
                                            </Text>
                                        </Table.Td>
                                        </Table.Tr>
                                    )}
                                    </Table.Tbody>
                                </Table>
                            </ScrollArea>
                        </Container> 
                    </GridCol>
                </Grid>                   
            </Container>
        </div>
    )
}

export default Home;