import * as React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';
import { Button, Container, Grid, Table, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Vocabulary from '../model/Vocabulary';
import TableRowData from '../model/TableRowData';
import { IconPlus } from '@tabler/icons-react';
import { sortData, filterData } from '../util/helper_table';

function Home() {
    const lambdaAPI = "https://4k6jq6ypdpxyzmdnxul6i6y4ke0krgjw.lambda-url.us-east-1.on.aws/";
    const emptyVocabularies: TableRowData[] = [{
        word_phrases_sentence: "Nice to meet you", 
        explanation: "The expression is used for greeting someone when you meet them for the first time, or for saying goodbye to them", 
        usage: "As she was being introduced to the new manager, she said, \"Very nice to meet you, sir\""}]

    // AWS Data
    const [listVocabularies, setListVocabularies] = React.useState([]);

    // User ID
    const userId = useSelector((state: RootState) => state.user.userId);

    const [search, setSearch] = React.useState('');
    const [sortedData, setSortedData] = React.useState(emptyVocabularies);
    const [sortBy, setSortBy] = React.useState<keyof TableRowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = React.useState(false);

    const setSorting = (field: keyof TableRowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(listVocabularies, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(listVocabularies, { sortBy, reversed: reverseSortDirection, search: value }));
    };
    

    const getListVocabularies = async() => {
        const response = await (await fetch(`${lambdaAPI}/list-vocabulary-learned/${userId}`)).json();
        setListVocabularies(response.vocabularies);
    }

    const addVocabulary = async() => {

    }

    React.useEffect(() => {
        getListVocabularies();
    }, []);

    const tableRows = sortedData.map((vocab: TableRowData) => (
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
                <Container className='absolute top-12 right-9 w-11/12'>
                    <form onSubmit={form.onSubmit(() => console.log('LOL'))}>
                        <Grid>
                            <Grid.Col span={4}>
                                <Textarea
                                radius="md"
                                label="Word-Phrase-Sentence"
                                description="Definition"
                                placeholder="Nice to meet you"
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Textarea
                                radius="md"
                                label="Explanation"
                                description="Input description"
                                placeholder="The expression is used for greeting someone when you meet them for the first time, or for saying goodbye to them"
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Textarea
                                radius="md"
                                label="Usage"
                                description="Input description"
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
{/*                 
                <Table withTableBorder className='bg-amber-200 w-60'>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Td>Vocabulary</Table.Td>
                            <Table.Td>Definition</Table.Td>
                            <Table.Td>Usage</Table.Td>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{tableRows}</Table.Tbody>
                </Table> */}
                    
            </Container>
        </div>
    )
}

export default Home;