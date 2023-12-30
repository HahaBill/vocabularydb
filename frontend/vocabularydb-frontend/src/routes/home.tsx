import * as React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';
import { Container, Table, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Vocabulary from '../model/Vocabulary';

function Home() {
    const lambdaAPI = "https://4k6jq6ypdpxyzmdnxul6i6y4ke0krgjw.lambda-url.us-east-1.on.aws/";

    const userId = useSelector((state: RootState) => state.user.userId);
    const [listVocabularies, setListVocabularies] = React.useState([]);

    const getListVocabularies = async() => {
        const response = await (await fetch(`${lambdaAPI}/list-vocabulary-learned/${userId}`)).json();
        setListVocabularies(response.vocabularies);
    }

    const addVocabulary = async() => {

    }

    React.useEffect(() => {
        getListVocabularies();
    }, []);

    const tableRows = listVocabularies.map((vocab: Vocabulary) => (
        <Table.Tr key={vocab.vocab_id}>
            <Table.Td>{vocab.vocab_name}</Table.Td>
            <Table.Td>{vocab.vocab_definition}</Table.Td>
            <Table.Td>{vocab.vocab_example}</Table.Td>
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
        <div>
            <Container>
                <Title className='text-white' order={1}> Hi {userId} 👋!</Title>
            </Container>
            <Container>
                <Table withTableBorder className='bg-amber-200'>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Td>Vocabulary</Table.Td>
                            <Table.Td>Definition</Table.Td>
                            <Table.Td>Usage</Table.Td>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{tableRows}</Table.Tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Home;