import { useState } from "react";
import axios from "axios";
import { encode, decode } from "base-64";
import { Buffer } from "buffer";

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView } from "react-native";

export default function AudioScreen() {
  const [option, setOption] = useState("code");
  const [textToEcrypt, setTextToEcrypt] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [loading, setLoading] = useState(false);

  const isActive = (optionType) => {
    return optionType === option ? "#006FFD" : "#fff"; 
  };

  async function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1]; // Extraindo a parte de dados da URL
        resolve(base64data);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(blob);
    });
  };

  const encryptToAudio = async () => {
    setLoading(true);
    try {
      const url = "http://192.168.0.166:5000/encodeWAV";

      const body = {
        encodeMsg: textToEcrypt,
        mode: 0
      };

      const response = await axios.post(url, body, { responseType: "blob" });
      const base64data = await convertBlobToBase64(response.data);

      console.log('Tipo de response.data:', typeof response.data);
      console.log('Formato de response.data:', response.data);

      // Obter o caminho do diretório de documentos do aplicativo
      const documentoDir = FileSystem.documentDirectory;

      // Gerar um nome de arquivo único (pode ser aprimorado)
      const nomeArquivo = 'audio.wav';

      // Caminho completo do arquivo original
      const fileUri = documentoDir + nomeArquivo;

      // Salvar o arquivo no sistema de arquivos
      await FileSystem.writeAsStringAsync(fileUri, base64data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(fileUri);
    } catch (erro) {
      console.error('Erro na requisição:', erro.message);
    } finally {
      setLoading(false);
      setTextToEcrypt("");
    };
  };

  const sendFile = async (fileUri) => {
    try {  
      const data = await FileSystem.readAsStringAsync(fileUri, { 
        encoding: FileSystem.EncodingType.Base64 
      });
      console.log("data", data)

      const decodedData = Buffer.from(data, "base64").toString("utf-8");
      console.log("decodedData", decodedData, "decodedData")

      const formData = new FormData();
      formData.append("wavFile", data);
      formData.append("mode", 0);

      const response = await axios.post("http://192.168.0.166:5000/decodeWAV", formData);
      console.log('Resposta do backend:', response.data);

      setEncryptedText(response.data);
    } catch (error) {
      console.error("Erro ao enviar o arquivo para o backend:", error);
    };
  };

  const getEncryptedAudio = async () => {
    setLoading(true);
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: false
      });
      console.log(result.assets[0].uri)

      await sendFile(result.assets[0].uri);
    } catch(error) {
      console.error("Erro na requisição:", error.message);
    } finally {
      setLoading(false);
    };
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="position" style={styles.container}>
            <Text style={styles.title}>Hidden<Text style={{ color: "#006FFD" }}>Text</Text></Text>
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
                        value={textToEcrypt}
                        onChangeText={(newText) => setTextToEcrypt(newText)}
                      />
                      <TouchableOpacity disabled={loading} style={styles.loginButton} onPress={encryptToAudio}>
                          <Text style={styles.loginButtonText}>{loading ? "Carregando..." : "Criptografar para áudio"}</Text>
                      </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <Text style={{ ...styles.subtitle, marginTop: 30 }}>Insira o arquivo desejado:</Text> 
                        <TouchableOpacity style={styles.loginButton} onPress={getEncryptedAudio}>
                          <Text style={styles.loginButtonText}>{loading ? "Carregando..." : "Adicionar arquivo de áudio"}</Text>
                        </TouchableOpacity>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor="#B1B1B1"
                          textAlignVertical="top"
                          placeholder="O texto criptografo aparecerá aqui..."
                          multiline={true}
                          disabled
                          value={encryptedText}
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