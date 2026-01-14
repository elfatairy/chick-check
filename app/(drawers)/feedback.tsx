import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ref, push } from "firebase/database";
import { db } from '@/firebaseConfig';
import { normalize } from '@/constants/normalizer';

const feedback = () => {
    const [message, setMessage] = useState("");

    const sendMsg = async () => {
        try {
            const dataRef = ref(db, 'feedback');
            await push(dataRef, message);
            alert("Feedback has been submitted successfully");
        } catch (e) {
            console.log('error');
            console.log(e);
        }
    }

    return (
        <View style={{
            paddingTop: 100,
            gap: 15,
            paddingHorizontal: 20,
            alignItems: 'center'
        }}>
            <Text style={{
                textAlign: 'center',
                fontWeight: '500',
                fontSize: normalize(28),
                width: '100%',
                marginBottom: 10
            }}>Give us your feedback</Text>

            <TextInput onChangeText={text => setMessage(text)}
                multiline={true}
                textAlignVertical="top"
                placeholder='Your opinion...'
                style={{
                    backgroundColor: "#eee",
                    width: '100%',
                    borderRadius: 10,
                    padding: 15,
                    height: 120,

                }} />

            <TouchableOpacity style={{
                backgroundColor: "rgb(135, 79, 31)",
                paddingVertical: 10,
                paddingHorizontal: 50,
                borderRadius: 10,
                width: 'auto'
            }} onPress={sendMsg}>
                <Text style={{
                    color: "#fff",
                    fontSize: normalize(17),
                    fontWeight: "500"
                }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default feedback