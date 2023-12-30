import * as React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';
import { Button, Container, Grid, ScrollArea, Table, TextInput, Textarea, Title, rem, Text, GridCol } from '@mantine/core';
import { useForm } from '@mantine/form';
import TableRowData from '../model/TableRowData';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { sortData } from '../util/helper_table';
import TableTh from '../util/helper_table_th';
import Vocabulary from '../model/Vocabulary';

function Home() {
    const lambdaAPI = "https://4k6jq6ypdpxyzmdnxul6i6y4ke0krgjw.lambda-url.us-east-1.on.aws/";
    const emptyVocabularies: TableRowData[] = [{
        word_phrases_sentence: "Nice to meet you", 
        explanation: "The expression is used for greeting someone when you meet them for the first time, or for saying goodbye to them", 
        usage: "As she was being introduced to the new manager, she said, \"Very nice to meet you, sir\""}]

    // AWS Data
    const [queryData, setQueryData] = React.useState(emptyVocabularies);
    const [originalData, setOriginalData] = React.useState(emptyVocabularies);

    // User ID
    const userId = useSelector((state: RootState) => state.user.userId);

    // MantineDev Table 
    const [search, setSearch] = React.useState('');
    const [sortBy, setSortBy] = React.useState<keyof TableRowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = React.useState(false);

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
    
    const getListVocabularies = async() => {
        const response = await (await fetch(`${lambdaAPI}/list-vocabulary-learned/${userId}`)).json();
        const vocabularies = response.vocabularies.map((vocab: Vocabulary) => (
            { word_phrases_sentence: vocab.vocab_name, explanation: vocab.vocab_definition, usage: vocab.vocab_example } as TableRowData
        ))
        setOriginalData(emptyVocabularies.concat(vocabularies));
        setQueryData(emptyVocabularies.concat(vocabularies));
    }

    const addVocabulary = async() => {

    }

    React.useEffect(() => {
        getListVocabularies();
    }, []);

    const tableRows = queryData.map((vocab: TableRowData) => (
        <Table.Tr key={vocab.word_phrases_sentence}>
            <Table.Td>{vocab.word_phrases_sentence}</Table.Td>
            <Table.Td>{vocab.explanation}</Table.Td>
            <Table.Td>{vocab.usage}</Table.Td>
        </Table.Tr>
    ));

    const form = useForm({
        initialValues: {
          vocabulary: '',
          definition: '',
          usage: '',
        },
    });

    return (
        <div className='w-full h-full'>
            <Container className='rounded-lg bg-white'>
                <Title className='text-black' order={1}> Hi {userId} 👋!</Title>
            </Container>
            <Container fluid className='absolute top-24 rounded-lg bg-white w-8/12 h-5/6'>
                <Grid className="w-full h-full">
                    <Grid.Col span={12}>
                        <Container className='absolute top-12 right-9 w-11/12'>
                            <form onSubmit={form.onSubmit(() => console.log('LOL'))}>
                                <Grid>
                                    <Grid.Col span={4}>
                                        <Textarea
                                        radius="md"
                                        label="Word-Phrase-Sentence"
                                        description="A list or collection of words or of words and phrases"
                                        placeholder="Nice to meet you"
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        <Textarea
                                        radius="md"
                                        label="Explanation"
                                        description="A statement or account that makes something clear"
                                        placeholder="The expression is used for greeting someone when you meet them for the first time, or for saying goodbye to them"
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        <Textarea
                                        radius="md"
                                        label="Usage"
                                        description="The way in which a word or phrase is normally and correctly used"
                                        placeholder={"As she was being introduced to the new manager, she said, \"Very nice to meet you, sir\""}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        {/* Grid 4 */}
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        {/* Grid 5 */}
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                    <Button className='absolute right-4 bg-gradient-to-r from-amber-200 to-emerald-300' variant='default' leftSection={<IconPlus size={14} />}>
                                        Add
                                    </Button>
                                    </Grid.Col>
                                </Grid>  
                            </form>
                        </Container>
                    </Grid.Col>
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