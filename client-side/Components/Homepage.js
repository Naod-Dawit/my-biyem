import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
const URL = `http://192.168.17.148:8000/api`;

const AdminMenu = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchword, setSearchword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/getdata`);
        setData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        console.error("Fetch data error:", err.response || err.message);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  
    const intervalId = setInterval(fetchData, 30000);
  
    return () => clearInterval(intervalId);
  
  }, [useNavigation()]);
  

  const handleSearch = (text) => {
    setSearchword(text);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ALL USERS</Text>
      <TextInput
        placeholder="Enter name"
        style={styles.input}
        value={searchword}
        onChangeText={handleSearch}
      />

      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Phone</Text>
        <Text style={styles.headerText}>Expiry Date</Text>
      </View>

      {filteredData.length > 0 ? (
        filteredData.map((member, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.cellText}>
              {index + 1} {member.name}
            </Text>
            <Text style={styles.cellText}>{member.phone}</Text>
            <Text style={styles.cellText}>{formatDate(member.expiryDate)}</Text>
          </View>
        ))
      ) : (
        <Text>No data available</Text>
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Addmember");
        }}
        style={styles.iconButton}
      >
        <FontAwesomeIcon icon={faPlus} style={styles.iconStyle} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cellText: {
    flex: 1,
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  iconStyle: {
    position: "absolute",
    top: 350,
    right: 20,
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});

export default AdminMenu;
