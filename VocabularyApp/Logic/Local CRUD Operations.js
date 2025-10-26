import { updateSupabase, deleteFromSupabase } from "../backend/db"

export function UpdateVocabInDatabase(word, meaning){
    //const URL = process.env.EXPO_PUBLIC_URL

    //fetch(URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newVocab)})

    updateSupabase(word, meaning)

}

export function DeleteVocabFromDatabase(vocab){
    //const URL = process.env.EXPO_PUBLIC_URL

    //fetch(URL, {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({word:vocab})})
    deleteFromSupabase(vocab)
}

export function deleteVocab(vocabList, setVocab, keyWord){
    let newList = {...vocabList};
    delete newList[keyWord];
    console.log(`deleted the keyWord: '${keyWord} ' from the database`);
    DeleteVocabFromDatabase(keyWord);
    setVocab(newList);
}

export function editVocab(vocabList, keyWord, setTextContent, setShowTextInputBox){
    setTextContent(keyWord + ': ' + vocabList[keyWord]) 
    setShowTextInputBox(true);
}

