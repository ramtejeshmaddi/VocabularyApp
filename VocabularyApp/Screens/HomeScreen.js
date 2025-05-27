import { View, Text, TextInput, Touchable, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useState } from 'react';
export default function HomeScreen(){
    const URL = process.env.EXPO_PUBLIC_URL
    const [showTextInputBox, setShowTextInputBox] = useState(false);
    const [vocabList, setVocabList] = useState({loading: 'loading'}); 
    let text = null;
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

                {/* Parent TextInput and Add button*/}
                <View 
                    style={{
                        flexDirection: 'row',
                        padding: 10, 
                        position:'absolute', 
                        width:'100%',
                        borderWidth: 1,}
                    }>
                    
                        {showTextInputBox &&
                        <TextInput 
                            placeholder='Add Vocab: meaning' 
                            placeholderTextColor={'gray'}
                            onChangeText={(inputText) => {
                                text = inputText
                                console.log(text);
                            }}
                            style={{
                                flex: 1,
                                marginHorizontal:10,
                                textAlign:'center',
                                borderWidth:1,
                                borderRadius:10
                            }}/>
                        }


                        <TouchableOpacity 
                            onPress={() => {
                                setShowTextInputBox(!showTextInputBox)
                                if(text !== null && text !== undefined && text !== ''){
                                    let [vocab, meaning] = text.split(':');
                                    let newVocab = {[vocab]: meaning};
                                    if(vocab !== undefined && meaning !== undefined){
                                        
                                        if(vocabList[vocab] === undefined){
                                            setVocabList({...vocabList, [vocab]: meaning});
                                            fetch(URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newVocab)})
                                            text = null;
                                        }else{
                                            alert('Vocab already exists');
                                        }
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
                {/* List of Vocab */}
                <FlatList
                    style={{
                        marginTop: 60,
                        marginHorizontal: 10,
                        borderWidth:1,
                    }} 
                    data={Object.keys(vocabList)}
                    renderItem = {(key) => {
                            return(
                               <Vocab item={key.item} vocabList={vocabList}/>
                            );          
                    }}
                />
        </View>
    );
}

function Vocab(key){
    const [showMeaning, setShowMeaning] = useState(false); 
    return(
        <TouchableOpacity 
            style={{
                marginVertical: 5,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: 'lightgray'
            }}
            onPress={() => setShowMeaning(!showMeaning)}
            >

                <Text style={{margin: 10}}>{key.item}</Text>

                {showMeaning && 
                <Text style={{paddingLeft:20, marginBottom:20, fontStyle:'italic'}}>{key.vocabList[key.item]}</Text>
                }
        </TouchableOpacity>
    );
}