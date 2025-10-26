import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { use, useEffect, useState } from 'react';
import { useFetch} from '../Logic/Hooks';
import { editVocab, deleteVocab } from '../Logic/Local CRUD Operations';
import { addToSupabase, updateSupabase } from '../backend/db';


export default function HomeScreen(){
    const URL = process.env.EXPO_PUBLIC_URL

    const [showTextInputBox, setShowTextInputBox] = useState(false);

    const [vocabList, setVocabList] = useState({loading: 'loading'}); 
    
    const [textContent, setTextContent] = useState(null)

    useFetch(setVocabList);

    return (
        <View>
                {/*
                --------------------------------
                Parent TextInput and Add button
                --------------------------------
                */}
                <View 
                    style={{ flexDirection: 'row', padding: 10, marginBottom: 10,position:'absolute', 
                             width:'100%',}}
                >
                        {showTextInputBox && 
                            <TextInputBox setTextContent={setTextContent} textContent={textContent}/>
                        }

                        <AddButton 
                            setShowTextInputBox={setShowTextInputBox} 
                            showTextInputBox={showTextInputBox} textContent={textContent} 
                            setTextContent={setTextContent} vocabList={vocabList} 
                            setVocabList={setVocabList}
                        />
                </View>
                {/*
                --------------------------------
                List of Vocab
                --------------------------------
                */}
                <FlatList
                    style={{
                        marginTop: 60,
                        marginHorizontal: 10,
                    }} 
                    data={Object.keys(vocabList)}
                    renderItem = {(key) => {
                            return(
                               <Vocab keyWord={key.item} vocabList={vocabList} setVocab={setVocabList} 
                                    textContent={textContent} setTextContent={setTextContent} 
                                    setShowTextInputBox={setShowTextInputBox}
                                />
                            );          
                    }}
                />
        </View>
    );
}

function TextInputBox({setTextContent, textContent=" "}){
    return(
        <TextInput 
            placeholder='word : meaning' 
            placeholderTextColor={'gray'}
            value={textContent}
            onChangeText={(inputText) => {
                setTextContent(inputText)
            }}
            style={{
                flex: 1,
                marginRight:10,
                textAlign:'center',
                borderWidth:1,
                borderRadius:10
            }}
        />
    )
}

function AddButton({setShowTextInputBox, showTextInputBox, textContent, setTextContent, vocabList,
     setVocabList}){
    return(
        <TouchableOpacity 
                            onPress={() => {
                                setShowTextInputBox(!showTextInputBox)
                                if(textContent != null && textContent != ""){
                                    let [vocab, meaning] = (textContent).split(':');
                                    let newVocab = {[vocab]: meaning};
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
                                        //Update MongoDB
                                        //UpdateVocabInDatabase(newVocab);

                                        setTextContent(" ")
                                    }
                                    else{
                                        alert('Please enter a valid \"vocab : meaning\"');
                                    }
                                }
                            }}
                            style={{
                                backgroundColor: 'black',
                                flexBasis:40,
                                padding: 8,
                                borderRadius: 5,
                                justifyContent:'flex-end'
                            }}
                        >

                                <Text style={{
                                    textAlign:'center',
                                    paddingBottom: 3,
                                    color:'white',
                                    }}>+</Text>
                        
                        </TouchableOpacity>
    )
}
function Vocab({keyWord, vocabList, setVocab, textContent, setTextContent, setShowTextInputBox}){
    const [showMeaning, setShowMeaning] = useState(false); 
    const [showEditDelete, setShowEditDelete] = useState(false); 
    let editDeleteStyle = {
                            
                            borderColor:'black',
                            borderWidth:1,
                            borderRadius:5,
                            flexBasis:80,
                            backgroundColor:'white',
                            
                        }

      
    /*-------------------------------
        Render Vocab component
    -------------------------------*/
    return(
                <View
                style={{
                    marginVertical: 5,
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor:'black',
                        
                    }}
                >

                    {/*-------------------------------
                            Voacabulary word and '...'
                    -------------------------------*/}
                    <View 
                    style={{
                        display:'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    }}>

                        {/*-------------------------------
                            Vocab word
                        -------------------------------*/}
                        <TouchableOpacity 
                        style={{
                            flexGrow: 1,
                        }}
                        onPress={() => {
                            setShowMeaning(!showMeaning)
                            setShowEditDelete(false);
                        }}
                            >

                                <Text style={{
                                    margin: 10,
                                    color: 'white',
                                    }}>{keyWord}</Text>
                        </TouchableOpacity>
                        {/*-------------------------------
                                    '...'
                        -------------------------------*/}
                        <TouchableOpacity
                            onPress={() => {
                                setShowEditDelete(!showEditDelete)
                                setShowMeaning(false);
                                }}>
                            <Text style={{
                                margin:10,
                                marginRight: 20,
                                color: 'white',
                                }}>...</Text>
                        </TouchableOpacity>
                    </View>
                    

                    {/*-------------------------------
                            Show Meaning
                    -------------------------------*/}
                    {
                        showMeaning &&
                        <Text                 
                            style={{
                                margin: 10,
                                fontStyle:'italic',
                                borderWidth: 1,
                                color: 'white',
                            }}>


                                {vocabList[keyWord]}


                        </Text>
                    }

                    {/*-------------------------------
                        Show Edit and Delete buttons
                    -------------------------------*/}
                    {
                        showEditDelete &&
                        <View style={{
                            display:'flex',
                            flexDirection: 'row',
                            justifyContent:'space-evenly',
                            alignItems:'center',
                             margin: 10,
                            }}>
                            {/*-------------------------------
                                Edit button
                            -------------------------------*/}
                            <TouchableOpacity 
                            style={editDeleteStyle}
                            onPress={() => editVocab(vocabList, keyWord, setTextContent, setShowTextInputBox)}
                            >
                                <Text style={{
                                    textAlign:'center',
                                    color:'black'
                                    }}>Edit</Text>
                            </TouchableOpacity>
                            {/*-------------------------------
                                Delete button
                            -------------------------------*/}
                            <TouchableOpacity 
                            style={editDeleteStyle}
                            onPress={() => {
                                deleteVocab(vocabList, setVocab, keyWord)
                            }}                            
                            >
                                <Text style={{
                                    textAlign:'center',
                                    color:'black',
                                    }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
    );
}