import { useAudioPlayer } from "expo-audio"
import { TouchableOpacity, Text } from "react-native"
import { addToSupabase, updateSupabase } from "../backend/db"
import { onAddButtonPress } from "../Intermediary Functions/ComponentFunctions"

export function AddButton({setShowTextInputBox, showTextInputBox, textContent, setTextContent, vocabList,
     setVocabList}){

    const player = useAudioPlayer(require("../assets/audio/adriantnt_bubble_clap.mp3"))
    
    return(
        <TouchableOpacity 
                            onPress={() => {
                                player.seekTo(0)
                                player.play()
                                onAddButtonPress(setShowTextInputBox, showTextInputBox, textContent,
                                    setTextContent, vocabList, setVocabList)
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