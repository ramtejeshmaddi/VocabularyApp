import { View, Text, TextInput, Touchable, TouchableOpacity, FlatList } from 'react-native';
import React, { useRef } from 'react';
import { useState } from 'react';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS} from 'react-native-reanimated';



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
                        position:'absolute', 
                        width:'100%',}
                    }>
                        {/* 
                        -----------------------
                        Textbox
                        -----------------------
                        */}
                        {showTextInputBox &&
                        <TextInput 
                            placeholder='Add Vocab: meaning' 
                            placeholderTextColor={'gray'}
                            value={textContent}
                            onChangeText={(inputText) => {
                                setTextContent(inputText)
                            }}
                            style={{
                                flex: 1,
                                marginHorizontal:10,
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
                                backgroundColor: 'blue',
                                flexBasis:40,
                                padding: 8,
                                borderRadius: 5,
                                justifyContent:'flex-end'
                            }}
                        >

                                <Text style={{textAlign:'center'}}>+</Text>
                        
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
                        borderWidth:1,
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
    function deleteVocab(){
        let newList = {...vocabList};
        delete newList[keyWord];
        console.log(keyWord);
        DeleteVocabFromDatabase(keyWord);
        setVocab(newList);
    }

    function editVocab(){
        setTextContent(keyWord + ': ' + vocabList[keyWord]) 
        setShowTextInputBox(true);
    }
    const [showMeaning, setShowMeaning] = useState(false); 
    const [showEditDelete, setShowEditDelete] = useState(false); 

    let editDeleteStyle = {
                            margin: 10,
                            padding: 10,
                            borderColor:'black',
                            borderWidth:1,
                            borderRadius:5,
                            flexBasis:80
                            
                        }

    return(
                <View
                    style={{
                        marginVertical: 5,
                        borderWidth: 1,
                        borderRadius: 10,
                    }}
                >


                    <View 
                        style={{
                            display:'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: 'lightgray',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}>

                        <TouchableOpacity 
                            style={{
                               
                            }}
                            onPress={() => {
                                setShowMeaning(!showMeaning)
                                setShowEditDelete(false);
                            }}
                            >

                                <Text style={{margin: 10}}>{keyWord}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setShowEditDelete(!showEditDelete)
                                setShowMeaning(false);
                                }}>
                            <Text style={{margin:10, marginRight: 20}}>...</Text>
                        </TouchableOpacity>
                    </View>

                    {showMeaning &&
                    <Text                 
                        style={{
                            padding: 30, 
                            fontStyle:'italic',
                            borderWidth: 1,
                        }}>


                            {vocabList[keyWord]}


                    </Text>
                    }
                    {
                        showEditDelete &&
                        <View style={{
                            display:'flex',
                            flexDirection: 'row',
                            justifyContent:'space-evenly',
                            alignItems:'center',
                            }}>
                            <TouchableOpacity 
                            style={editDeleteStyle}
                            onPress={editVocab}
                            >
                                <Text style={{textAlign:'center'}}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                            style={editDeleteStyle}
                            onPress={deleteVocab}
                            
                            >
                                <Text style={{textAlign:'center'}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
    );
}