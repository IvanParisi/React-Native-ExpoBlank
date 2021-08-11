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


  React.useEffect(() =>{
    setConversTotal(conversTotal)
  })

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
         onChangeText={text => setInputN(text)}/>

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
        <h1>Conversion a:</h1>
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
      <Text style={styles.text}>Total: {(input * convert.conversion_rate).toFixed(2)}</Text>
      )}
      </View>

      <View style={styles.wrapperExch}> 
      <Text style={styles.textConversTotal}>Uso EXCHANGE un total de: {conversTotal}</Text>
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
      width: '100vw',
      height: '100vw',
    
    },
    logo: {
      width: '430px',
      height: '430px',
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
      marginTop: '10px',
    },
    inputNumber:
    {
      textAlign: 'center',
      height: 20,
      backgroundColor: 'white',
    },
    inputCoin:
    {
      marginLeft: '10px',
      paddingRight: '10px',
      borderRadius: 5,
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'black',

    },
    textTotal:
    {
      fontSize: 50,
      fontWeight: 'bold'
    },
    textConversTotal:
    {
      fontSize: 20,
      fontWeight: 'bold'
    }
  

}
);
