import { useAudioPlayer } from "expo-audio"
import { TouchableOpacity, Text } from "react-native"
import { useEffect, useState } from "react"
import { addToSupabase, updateSupabase } from "../backend/db"
import { onAddButtonPress } from "../Intermediary Functions/ComponentFunctions"

export function AddButton({setShowTextInputBox, showTextInputBox, textContent, setTextContent, vocabList,
     setVocabList}){    
    return(
        <TouchableOpacity 
                            onPress={() => {
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