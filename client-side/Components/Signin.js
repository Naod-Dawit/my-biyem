import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


export default Signin=()=>{


const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const navigation=useNavigation();


  const URL = `http://192.168.17.148:8000/api`;
  

  const handleInputs = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${URL}/login`, formData); // Corrected the URL
      if (response.data.success) {
        Alert.alert("Login Successful", "Welcome Admin!");
        navigation.navigate("Homepage")
      } else {
        Alert.alert("Login Failed", "Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "An error occurred while trying to log in.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BIYEM GYM</Text>

      <View>
        <TextInput
          value={formData.name.trim()}
          placeholder="name"
          style={styles.input}
          onChangeText={(text) => handleInputs("name", text)}
        />
        <TextInput
          value={formData.password.trim()}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => handleInputs("password", text)}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    backgroundColor: "#eee",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    width: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
})