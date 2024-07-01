import {PayWithFlutterwave} from 'flutterwave-react-native';
import {View, TextInput, Text} from "react-native";
import {useState} from "react";
import {router} from "expo-router"
interface RedirectParams {
    status: 'successful' | 'cancelled';
    transaction_id?: string;
    tx_ref: string;
  }
export default function Payment(){
  const flutterKey = process.env.EXPO_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? "";
  const[email, setEmail]=useState("");
  const[total, setAmount]=useState("");
  const[name, setName]=useState("");
  const handleOnRedirect = (data: RedirectParams) => {
      console.log(data);
setAmount("");
setEmail("");
setName("");
    };

  const generateTransactionRef = (length: number) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };
return(
  <View style={{flex:1,justifyContent:"center"}}>
    <View style={{margin:20}}>
    <Text style={{marginBottom:20,fontSize:18}}>Fill in the following details to proceed with paying</Text>
    <TextInput style={{width:"100%",marginBottom:20 ,borderWidth:1, borderColor:"gray", borderRadius:10,padding:8}} placeholder="enter your email" value={email} onChangeText={(val)=>setEmail(val)}></TextInput>
    <TextInput style={{width:"100%",marginBottom:20 ,borderWidth:1, borderColor:"gray", borderRadius:10,padding:8}} placeholder="enter your name" value={name} onChangeText={(val)=>setName(val)}></TextInput>
    <TextInput style={{width:"100%" ,marginBottom:20,borderWidth:1, borderColor:"gray", borderRadius:10,padding:8}} placeholder="enter amount " value={total} onChangeText={(val)=>setAmount(val)} keyboardType='numeric'></TextInput>
<PayWithFlutterwave
  onRedirect={handleOnRedirect}
  options={{
    tx_ref: generateTransactionRef(10),
    authorization:flutterKey,
    customer: {
      email,
      name
    },
    amount:parseFloat(total),
    currency: 'RWF',
    payment_options: 'card'
  }}
/>
</View>
</View>)
}