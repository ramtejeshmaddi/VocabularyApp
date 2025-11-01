import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import {useEffect, useState } from 'react';
import { useFetch} from '../Intermediary Functions/Hooks';
import { TextInputBox } from '../Components/TextInputBox';
import { AddButton } from '../Components/AddButton';
import { Vocab } from '../Components/Vocab';
import { useAudioPlayer } from 'expo-audio';


export default function HomeScreen(){
    const URL = process.env.EXPO_PUBLIC_URL

    const [showTextInputBox, setShowTextInputBox] = useState(false);

    const [vocabList, setVocabList] = useState({loading: 'loading'}); 
    
    const [textContent, setTextContent] = useState(" ")


    const SoundSource = require('../assets/audio/adriantnt_bubble_clap.mp3')
    const player = useAudioPlayer(SoundSource, {downloadFirst: true})
    useEffect(() =>{
        player.seekTo(0)
        player.play()
    })


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




