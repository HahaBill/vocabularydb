import * as React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';
import { Container, Grid, Table, Title, rem, GridCol, Menu, Modal } from '@mantine/core';
import TableRowData from '../model/TableRowData';
import { IconEditCircle, IconTrash } from '@tabler/icons-react';
import { sortData } from '../util/helper_table';
import Vocabulary from '../model/Vocabulary';
import { initialVocabState } from '../model/Vocabulary';
import { v4 as uuidv4} from 'uuid';
import { useDisclosure } from '@mantine/hooks';
import FormVocabulary from '../components/Home/FormVocabulary';
import TableVocabulary from '../components/Home/TableVocabulary';

function Home() {
    const lambdaAPI = "https://4k6jq6ypdpxyzmdnxul6i6y4ke0krgjw.lambda-url.us-east-1.on.aws/vocab_crud";
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
        vocab_id: `vocabulary_${uuidv4()}`,
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

    const handleUpdateVocabulary = async(event: React.FormEvent) => {
        event.preventDefault();
        console.log(`UPDATE-Clicked Vocab ID: ${clickedVocabId}`)
        console.log(`USER ID: ${userId}`)
        console.log(newVocab)
        // const updatedVocab = {
        //     ...newVocab,
        //     vocab_id: clickedVocabId
        // };
        console.log(newVocab)
        

        const response = await fetch(`${lambdaAPI}/update-vocabulary`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newVocab),
        })
        console.log(response);
        getListVocabularies()
        setNewVocab(initialVocabState)
        setClickedVocabId("")
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
    const [clickedVocabId, setClickedVocabId] = React.useState("")


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
    const handleRowClick = (event, vocab_id) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setMenuPosition({
            top: rect.top + window.scrollY,
            left: rect.right + window.scrollX,
        });
        setIsMenuVisible(!isMenuVisible);
        setClickedVocabId(vocab_id)
        console.log(`ROW-Clicked Vocab ID: ${clickedVocabId}`)
    };

    const openUpdateVocab = () => {
        open();
        setNewVocab({...newVocab, vocab_id: clickedVocabId})
    }

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
        key={vocab.vocab_id} 
        onClick={(event) => handleRowClick(event, vocab.vocab_id)}>
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
                        onClick={openUpdateVocab}
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
                    <Modal className='absolute left-80 h-5/5' opened={opened} onClose={close} size="xl" title="Update the Vocabulary">
                        <FormVocabulary newVocab={newVocab} handleVocabulary={handleUpdateVocabulary} handleNewVocabChange={handleNewVocabChange}/>
                    </Modal>
                    <Grid.Col span={12} style={{ height: '220px' }}/>
                    <GridCol span={12}>
                        <Container className='overflow-auto max-h-80'>
                            <TableVocabulary 
                            search={search} 
                            handleSearchChange={handleSearchChange} 
                            sortBy={sortBy} 
                            reverseSortDirection={reverseSortDirection}
                            setSorting={setSorting}
                            emptyVocabularies={emptyVocabularies}
                            tableRows={tableRows}
                            />
                        </Container> 
                    </GridCol>
                </Grid>                   
            </Container>
        </div>
    )
}

export default Home;