import { useState } from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView } from "react-native";

export default function AudioScreen() {
  const [option, setOption] = useState("code");

  const isActive = (optionType) => {
    return optionType === option ? "#006FFD" : "#fff"; 
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="position" style={styles.container}>
            <Text style={styles.title}>Hidden<Text style={{ color: "#006FFD"}}>Text</Text></Text>
            <View style={styles.optionsContainer}>
                <Text style={styles.subtitle}>Escolha a opção desejada:</Text>
                <TouchableOpacity style={{...styles.option, marginTop: 30 }} onPress={() => setOption("code")}>
                <View style={{...styles.optionIcon, backgroundColor: isActive("code") }} />
                    <Text style={styles.optionText}>
                        Codificar um texto
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.option, marginTop: 10 }} onPress={() => setOption("decode")}>
                    <View style={{...styles.optionIcon, backgroundColor: isActive("decode") }} />
                    <Text style={styles.optionText}>
                        Decodificar um áudio
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                {
                    option === "code"
                    ?
                    <View>
                    <Text style={{ ...styles.subtitle, marginTop: 30 }}>Insira o texto desejado:</Text> 
                    <TextInput
                            style={styles.input}
                            placeholderTextColor="#B1B1B1"
                            textAlignVertical="top"
                            placeholder="Segredos..."
                            multiline={true}
                        />
                        <TouchableOpacity style={styles.loginButton} onPress={() => null}>
                            <Text style={styles.loginButtonText}>Criptografar para áudio</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <Text style={{ ...styles.subtitle, marginTop: 30 }}>Insira o arquivo desejado:</Text> 
                        <TouchableOpacity style={styles.loginButton} onPress={() => null}>
                            <Text style={styles.loginButtonText}>Adicionar arquivo de áudio</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#B1B1B1"
                            textAlignVertical="top"
                            placeholder="O texto criptografo aparecerá aqui..."
                            multiline={true}
                        />
                    </View>
                }
            </View>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
    },
  title: {
    color: "#000",
    fontSize: 54,
    marginTop: 110,
    fontWeight: "bold"
  },
  optionsContainer: {
    marginTop: 40
  },
  subtitle: {
    color: "#000",
    fontSize: 17,
    fontWeight: "bold"
  },
  option: {
    width: 330,
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 16, 
    color: "#fff",
    borderWidth: 1.5,           
    borderColor: '#DFDFE2',    
    borderStyle: 'solid',
    color: "#B1B1B1",
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  },
  optionIcon: {
    width: 20, 
    height: 20, 
    borderRadius: 10,
    borderWidth: 1,           
    borderColor: '#DFDFE2',    
    borderStyle: 'solid',
    color: "#B1B1B1",
  },
  optionText: {
    color: "#585966",
    fontSize: 13,
    fontWeight: "400",
    marginLeft: 10
  },
  loginButton: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#006FFD",
    width: 330,
    height: 49,
    borderRadius: 11,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },
  loginButtonText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
    textAlignVertical: "top"
  },
  input: {
    width: 330,
    height: 280,
    borderRadius: 16,
    paddingHorizontal: 16, 
    color: "#fff",
    borderWidth: 1.5,           
    borderColor: '#DFDFE2',    
    borderStyle: 'solid',
    color: "#B1B1B1",
    marginTop: 15
  }
});