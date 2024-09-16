import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, ScrollView, TextInput, Alert } from "react-native";
import axios from 'axios';

const URL = `http://192.168.17.148:8000/api`;



const AddMember = () => {
  const [memberData, setMemberData] = useState({
    name: "",
    email: "",
    date: "",
    duration: "",
    phone: "",
  });

  // Use useEffect to set the current date once when the component mounts
  useEffect(() => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();
    let currentDay = `${day}-${month}-${year}`;

    // Set the current date in the memberData only once when the component is first rendered
    setMemberData((prevData) => ({ ...prevData, date: currentDay }));
  }, []); // Empty dependency array ensures this runs only once

  const handleInputChange = (name, value) => {
    setMemberData((prevData) => ({ ...prevData, [name]: value }));
  };
  const calculateExpiryDate = (duration) => {
    if (!duration || isNaN(duration)) return "";

    const currentDate = new Date();
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + parseInt(duration))
    );
    return newDate.toLocaleDateString(); 
  };
  const handleSubmit = async () => {
    try {
        
      const expiryDate = calculateExpiryDate(memberData.duration);
      setMemberData((prevData) => ({ ...prevData, expiryDate: expiryDate }));
  
      const formattedData = {
        name: memberData.name,
        date: new Date(memberData.date).toISOString(), 
        duration: parseInt(memberData.duration), 
        phone: memberData.phone,
        expiryDate: expiryDate, 
      };
  
      const response = await axios.post(`${URL}/add-member`, formattedData);
  
      if (response.data.success) {
        Alert.alert("Success", "Member added successfully!");
      } else {
        Alert.alert("Error", "Failed to add member");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while adding the member");
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Name"
        keyboardType="default"
        style={styles.input}
        value={memberData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        value={memberData.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />
      <TextInput
        placeholder="Duration (1, 3, 6, 12 months)"
        keyboardType="numeric"
        style={styles.input}
        value={memberData.duration}
        onChangeText={(text) => handleInputChange("duration", text)}
      />
      <TextInput
        placeholder="Phone"
        keyboardType="phone-pad"
        style={styles.input}
        value={memberData.phone}
        onChangeText={(text) => handleInputChange("phone", text)}
      />
      <Button title="Add Member" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: "#eee",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    width: "100%",
    borderRadius: 5,
  },
});

export default AddMember;
