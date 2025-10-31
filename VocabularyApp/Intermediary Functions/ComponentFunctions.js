import { updateSupabase, deleteFromSupabase, addToSupabase } from "../backend/db"



export function deleteVocab(vocabList, setVocab, keyWord){
    let newList = {...vocabList};
    delete newList[keyWord];
    console.log(`deleted the keyWord: '${keyWord} ' from the database`);
    deleteFromSupabase(keyWord)
    setVocab(newList);
}

/** Displays edit view of word : meaning in TextInput  */
export function editVocab(vocabList, keyWord, setTextContent, setShowTextInputBox){
    setTextContent(keyWord + ': ' + vocabList[keyWord]) 
    setShowTextInputBox(true);
}

/** This function takes care of updating existing vocab and adding new ones*/
export function onAddButtonPress(setShowTextInputBox, showTextInputBox, textContent, setTextContent,
     vocabList, setVocabList)
     {

        setShowTextInputBox(!showTextInputBox)
        textContent = textContent.trim()
        if(textContent != null && textContent != ""){
            let [vocab, meaning] = (textContent).split(':');
            if(vocab != undefined && meaning != undefined){
                
                //update Supabase if a word already exists
                if(Object.keys(vocabList).find((word) => word === vocab)){
                    console.log(`Updating an existing word: ${vocab}`)
                    updateSupabase(vocab, meaning)
                }
                else{
                    addToSupabase(vocab.trim(), meaning.trim());
                }

                setVocabList({...vocabList, [vocab]: meaning});
                setTextContent(" ")
            }
            else{
                alert('Please enter a valid \"vocab : meaning\"');
            }
        }
    }
