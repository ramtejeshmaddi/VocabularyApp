import { useAudioPlayer } from 'expo-audio'
import {Audio} from 'expo-av'
import { useState } from 'react'
import { TextInput} from 'react-native'

export function TextInputBox({setTextContent, textContent=" "}){
    const audioSource = require('../assets/audio/adriantnt_bubble_clap.mp3')
    const player = useAudioPlayer(audioSource)
    return(
        <TextInput 
            placeholder='word : meaning' 
            placeholderTextColor={'gray'}
            value={textContent}
            onChangeText={(inputText) => {
                player.seekTo(0)
                player.play()
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