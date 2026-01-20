import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home (){
    const [value, setvalue] = useState("")
    const [animalName, setanimalName] = useState("")

    // เมื่อเปิดแอปฟังชั่นจะทำงาน
    useEffect(() => {
        loadAnimal()
    },[])

    // สั่งให้บันทึก 
    async function saveAnimal(){
        await AsyncStorage.setItem("animal",value)
        setanimalName(value)
        setvalue("") 
    }

    // สั่งให้โหลด
    async function loadAnimal(){
        const a = await AsyncStorage.getItem("animal")
        // setanimalName(a!.toString)
        // setvalue("")
        if(a === null){
            setanimalName("ยังไม่ได้บันทึกค่า")
        }else{
            setanimalName(a!)
        }
    }

    // สั่งให้ลบ
    async function removeAnimal() {
        await AsyncStorage.removeItem("animal")
        setanimalName("")
    }

    return (
        <View style = {mystyle.container}>
            {/* แสดงข้อความ */}
            <Text>
                Animals : {animalName}
            </Text>
            {/* กรอกค่า */}
            <TextInput style = {mystyle.input} onChangeText={setvalue} value={value}/>
            {/* ปุ่มกดบันทึก */}
            <TouchableOpacity style = {mystyle.button} onPress={saveAnimal}>
                <Text>บันทึก</Text>
            </TouchableOpacity>
            {/* ปุ่มลบ */}
             <TouchableOpacity style = {mystyle.button} onPress={removeAnimal}>
                <Text>ลบ</Text>
            </TouchableOpacity>
        </View>
    )
}

const mystyle = StyleSheet.create({
    container :{
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor:"lightpink"
    },
    input : {
        borderWidth : 1,
        width : "80%"
    },
    button :{
        alignItems:"center",
        marginTop:15,
        width:100,
        borderWidth:1,
        backgroundColor:"lightyellow"
    }
})