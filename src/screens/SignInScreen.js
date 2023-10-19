import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignInScreen() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            <Text style={styles.title}>Hidden<Text style={{ color: "#006FFD"}}>Text</Text></Text>
            <Text style={styles.subtitle}>Bem-vindo!</Text>
            <KeyboardAvoidingView behavior="position" style={styles.inputsContainer}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#B1B1B1"
                    placeholder="E-mail"
                />
                <TextInput
                style={{ ...styles.input, marginTop: 17 }}
                    placeholderTextColor="#B1B1B1"
                    placeholder="Senha"
                    secureTextEntry
                />
                <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Audio")}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.registerButtonText}>Não tem uma conta? <Text style={{ color: "#006FFD" }}>Crie uma agora!</Text></Text>
        </View>
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
  subtitle: {
    width: 200,
    textAlign: "center",
    marginTop: 10,
    fontSize: 20
  },
  inputsContainer: {
    marginTop: 224,
    paddingBottom: 30
  },  
  input: {
    width: 330,
    height: 50,
    borderRadius: 16,
    display: "flex",
    paddingHorizontal: 16, 
    color: "#fff",
    borderWidth: 1.5,           
    borderColor: '#DFDFE2',    
    borderStyle: 'solid',
    color: "#B1B1B1"
  },
  forgotPasswordText: {
    color: "#006FFD",
    fontSize: 13,
    marginTop: 12,
    alignSelf: "flex-start",
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
    fontWeight: "bold"
  },
  registerButtonText: {
    fontSize: 13,
    color: "#585966",
    marginTop: 15
  },
});