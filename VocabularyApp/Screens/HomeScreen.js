import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';


export default function HomeScreen(){
    const URL = process.env.EXPO_PUBLIC_URL

    const [showTextInputBox, setShowTextInputBox] = useState(false);

    const [vocabList, setVocabList] = useState({loading: 'loading'}); 
    const [textContent, setTextContent] = useState(null)

    useState(() => {
                
                fetch(URL).then(
                    (response) => {
                        response.json().then((data) => {
                                setVocabList(data);
                                return data;
                            }
                        )
                    }        
                )
            


    },[]);

    


    return (
        <View>
                {/*
                --------------------------------
                Parent TextInput and Add button
                --------------------------------
                */}
                <View 
                    style={{
                        flexDirection: 'row',
                        padding: 10, 
                        marginBottom: 10,
                        position:'absolute', 
                        width:'100%',
                     }   
                    }>
                        {/* 
                        -----------------------
                        Textbox
                        -----------------------
                        */}
                        {showTextInputBox &&
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
                            }}/>
                        }

                        {/*
                        -----------------------
                            '+'  button
                        -----------------------
                        */}
                        <TouchableOpacity 
                            onPress={() => {
                                setShowTextInputBox(!showTextInputBox)
                                if(textContent !== null && textContent !== undefined && textContent !== ''){
                                    let [vocab, meaning] = (textContent).split(':');
                                    let newVocab = {[vocab]: meaning};
                                    if(vocab !== undefined && meaning !== undefined){
                                        
                                        setVocabList({...vocabList, [vocab]: meaning});
                                        UpdateVocabInDatabase(newVocab);
                                        setTextContent(null)
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
                               <Vocab 
                                keyWord={key.item} 
                                vocabList={vocabList} 
                                setVocab={setVocabList} 
                                textContent={textContent}
                                setTextContent={setTextContent} 
                                setShowTextInputBox={setShowTextInputBox}
                                />
                            );          
                    }}
                />
        </View>
    );
}

function UpdateVocabInDatabase(newVocab){
    const URL = process.env.EXPO_PUBLIC_URL

    fetch(URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newVocab)})

}

function DeleteVocabFromDatabase(vocab){
    const URL = process.env.EXPO_PUBLIC_URL

    fetch(URL, {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({word:vocab})})

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
        deleteVocab function
    -------------------------------*/
    function deleteVocab(){
        let newList = {...vocabList};
        delete newList[keyWord];
        console.log(keyWord);
        DeleteVocabFromDatabase(keyWord);
        setVocab(newList);
    }

    /*-------------------------------
        editVocab function
    -------------------------------*/
    function editVocab(){
        setTextContent(keyWord + ': ' + vocabList[keyWord]) 
        setShowTextInputBox(true);
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
                            onPress={editVocab}
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
                            onPress={deleteVocab}
                            
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