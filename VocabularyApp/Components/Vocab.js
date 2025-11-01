import { TouchableOpacity, View, Text } from "react-native";
import { editVocab, deleteVocab } from '../Intermediary Functions/ComponentFunctions';
import { useEffect, useState } from "react";
import { useAudioPlayer } from "expo-audio";


export function Vocab({keyWord, vocabList, setVocab, textContent, setTextContent, setShowTextInputBox}){
    const [showMeaning, setShowMeaning] = useState(false); 
    const [showEditDelete, setShowEditDelete] = useState(false); 
    const SoundSource = require("../assets/audio/adriantnt_bubble_clap.mp3")
    const player = useAudioPlayer(SoundSource, {downloadFirst: true})
    useEffect(() => {
        player.seekTo(0)
        player.play()
    },[showMeaning, showEditDelete])
    let editDeleteStyle = {
                            
                            borderColor:'black',
                            borderWidth:1,
                            borderRadius:5,
                            flexBasis:80,
                            backgroundColor:'white',
                            
                        }
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
                                borderWidth: 0,
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
                            onPress={() => {
                                player.seekTo(0)
                                player.play()
                                editVocab(vocabList, keyWord, setTextContent, setShowTextInputBox)
                            }
                            }
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
                                //setDeletedVocabCount(true)
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