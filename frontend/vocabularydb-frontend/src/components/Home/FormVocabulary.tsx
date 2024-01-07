import { Button, Grid, Textarea } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react";

// @ts-expect-error: props
export default function FormVocabulary(props) {
    return (
        <form onSubmit={props.handleVocabulary}>
            <Grid>
                <Grid.Col span={4}>
                    <Textarea
                    radius="md"
                    label="Word-Phrase-Sentence"
                    description="A list or collection of words or of words and phrases"
                    placeholder="Nice to meet you"
                    value={props.newVocab.vocab_name}
                    onChange={(event) => props.handleNewVocabChange('vocab_name', event.target.value)}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Textarea
                    radius="md"
                    label="Explanation"
                    description="A statement or account that makes something clear"
                    placeholder="The expression is used for greeting someone when you meet them for the first time, or for saying goodbye to them"
                    value={props.newVocab.vocab_definition}
                    onChange={(event) => props.handleNewVocabChange('vocab_definition', event.target.value)}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Textarea
                    radius="md"
                    label="Usage"
                    description="The way in which a word or phrase is normally and correctly used"
                    placeholder={"As she was being introduced to the new manager, she said, \"Very nice to meet you, sir\""}
                    value={props.newVocab.vocab_example}
                    onChange={(event) => props.handleNewVocabChange('vocab_example', event.target.value)}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    {/* Grid 4 */}
                </Grid.Col>
                <Grid.Col span={4}>
                    {/* Grid 5 */}
                </Grid.Col>
                <Grid.Col span={4}>
                <Button type="submit" className='absolute right-4 bg-gradient-to-r from-amber-200 to-emerald-300' variant='default' leftSection={<IconPlus size={14} />}>
                    Add
                </Button>
                </Grid.Col>
            </Grid>  
        </form>
    );
}