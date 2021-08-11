import React from 'react';
import { StyleSheet, Button, View, Image, TextInput,Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';





export default function App() 
{

  const options =["USD","ARS","EUR","GBP","BRL","CLP","UYU"];

  
  const [convert, setCoinPrice] = React.useState(null)
  
  const [input, setInputN] = React.useState();
  const [inputCP, setInputCP] = React.useState("USD");
  const [inputCS, setInputCS] = React.useState("USD");
  const [conversTotal, setConversTotal] = React.useState(0);
  

  function exchange()
  {
  
      fetch(`https://v6.exchangerate-api.com/v6/a97b187e9fac28de65b6a72c/pair/${inputCP}/${inputCS}`)
        .then((response) => response.json().then((data) => setCoinPrice(data)));
  }


 

  return (
    <View style={styles.container}>
      
      <View style={styles.wrapper}>
        <Image style={styles.logo}  source={require('./img/logo.png')}></Image>
      </View>

      <View style={styles.wrapperExch}>

        <TextInput style={styles.inputNumber}
        defaultValue="0"
         placeholder="Ingresa el monto"
         value={input}
         onChangeText={text => setInputN(text)} keyboardType="number-pad"/>

        <Picker style={styles.inputCoin}
        selectedValue={inputCP}
        onValueChange={(itemValue) =>
          setInputCP(itemValue)}>
            {options.map((item) => {
          return (<Picker.Item label={item} value={item} key={item}/>) 
            })}
          </Picker>
         
      </View>

      <View style={styles.wrapperExch}>
        <Text style={styles.textConversTotal}>Conversion a:</Text>
      </View>

      <View style={styles.wrapperExch}>
        <Picker style={styles.inputCoin}
        selectedValue={inputCS}
        onValueChange={(itemValue) =>
          setInputCS(itemValue)}>
            {options.map((item) => {
          return (<Picker.Item label={item} value={item} key={item}/>) 
            })}
          </Picker>
      </View>

      <View style={styles.wrapperExch}> 
        <Button  onPress={() => exchange()}title="Convertir" color='black'></Button>
      </View>

      <View style={styles.wrapperExch}> 
      {convert && (
      <Text style={styles.textTotal}>Total: {(input * convert.conversion_rate).toFixed(2)}</Text>
      )}
      </View>

   
    </View>
  );
}


const styles = StyleSheet.create(
  {
    container: 
    {
      flex: 1,
      backgroundColor: 'gray',
    },
    logo: {
      width: 430,
      height: 430,
    },
    wrapper:
    {
      display: 'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',

    },
    wrapperExch:
    {
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    inputNumber:
    {
      textAlign: 'center',
      height: 20,
      backgroundColor: 'white',
    },
    inputCoin:
    {
      marginLeft: 50,
      width: 100,
      height: 50,
      color: 'black',
      borderColor: 'black',

    },
    textTotal:
    {
      fontSize: 30,
      fontWeight: 'bold'
    },
   
  

}
);
