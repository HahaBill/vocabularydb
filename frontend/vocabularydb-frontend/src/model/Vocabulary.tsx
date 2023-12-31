export default interface Vocabulary {
    vocab_id: string,
    vocab_name: string,
    vocab_definition: string,
    vocab_example: string,
    user_id: string,
    isLearned: boolean,
}

export const initialVocabState = {
    vocab_id: "",
    vocab_name: "", 
    vocab_definition: "", 
    vocab_example: "",
    isLearned: false,
    user_id: "",
};
