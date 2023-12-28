import * as React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';
import { Table } from '@mantine/core';
import Vocabulary from '../model/Vocabulary';

function Home() {
    const lambdaAPI = "https://4k6jq6ypdpxyzmdnxul6i6y4ke0krgjw.lambda-url.us-east-1.on.aws/";

    const userId = useSelector((state: RootState) => state.user.userId);
    const [listVocabularies, setListVocabularies] = React.useState([]);

    const getListVocabularies = async() => {
        const response = await (await fetch(`${lambdaAPI}/list-vocabulary-learned/${userId}`)).json();
        setListVocabularies(response.vocabularies);
    }

    React.useEffect(() => {
        getListVocabularies();
    }, []);

    const displayTasks = (
        <div>
            {listVocabularies.map((vocab: Vocabulary) => (
                vocab.vocab_name
            ))}
        </div>
    );

    const tableRows = listVocabularies.map((vocab: Vocabulary) => (
        <Table.Tr key={vocab.vocab_id}>
            <Table.Td>{vocab.vocab_name}</Table.Td>
            <Table.Td>{vocab.vocab_definition}</Table.Td>
            <Table.Td>{vocab.vocab_example}</Table.Td>
        </Table.Tr>
    ));


    return (
        <div>
            <h1>
                Hi {userId}, welcome back!
            </h1>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Td>Vocabulary</Table.Td>
                        <Table.Td>Definition</Table.Td>
                        <Table.Td>Usage</Table.Td>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{tableRows}</Table.Tbody>
            </Table>
        </div>
    )
}

export default Home;