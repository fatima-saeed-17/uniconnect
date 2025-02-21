import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);
  const [universityOpen, setUniversityOpen] = useState(false);
  const [departmentValue, setDepartmentValue] = useState(null); // Single selection
  const [interestValue, setInterestValue] = useState(null); // Single selection
  const [universityValue, setUniversityValue] = useState(null); // Single selection

  const searchResults = [
    { id: "1", name: "Alice Johnson", department: "Software Engineering", university: "ABC University", interest: "AI" },
    { id: "2", name: "Bob Smith", department: "Computer Science", university: "XYZ University", interest: "Blockchain" },
    { id: "3", name: "Jane Doe", department: "Information Technology", university: "ABC University", interest: "Cloud Computing" },
    { id: "4", name: "Mike Brown", department: "Psychology", university: "XYZ University", interest: "Mental Health" },
  ];

  const handleSearch = () => {
    let filteredResults = searchResults.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.department.toLowerCase().includes(searchText.toLowerCase()) ||
        item.university.toLowerCase().includes(searchText.toLowerCase())
    );

    // Apply single-selection filters
    if (departmentValue) {
      filteredResults = filteredResults.filter((item) => item.department === departmentValue);
    }

    if (interestValue) {
      filteredResults = filteredResults.filter((item) => item.interest === interestValue);
    }

    if (universityValue) {
      filteredResults = filteredResults.filter((item) => item.university === universityValue);
    }

    setResults(filteredResults);
  };

  const resetFilters = () => {
    setDepartmentValue(null);
    setInterestValue(null);
    setUniversityValue(null);
    setResults(searchResults);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Ionicons name="arrow-back" size={28} color="#00509E"/>
        </TouchableOpacity>
        <Image
          source={require("../assets/logo1.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Filters */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Filters</Text>

        {/* Department Dropdown */}
        <DropDownPicker
          open={departmentOpen}
          value={departmentValue}
          items={[
            { label: "Software Engineering", value: "Software Engineering" },
            { label: "Computer Science", value: "Computer Science" },
            { label: "Information Technology", value: "Information Technology" },
            { label: "Psychology", value: "Psychology" },
          ]}
          setOpen={setDepartmentOpen}
          setValue={setDepartmentValue}
          multiple={false} // Single selection
          placeholder="Select Department"
          searchable={true}
          searchPlaceholder="Search Departments"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          zIndex={3000} // Fix overlapping
          zIndexInverse={2000}
        />

        {/* Interest Dropdown */}
        <DropDownPicker
          open={interestOpen}
          value={interestValue}
          items={[
            { label: "AI", value: "AI" },
            { label: "Blockchain", value: "Blockchain" },
            { label: "Cloud Computing", value: "Cloud Computing" },
            { label: "Mental Health", value: "Mental Health" },
          ]}
          setOpen={setInterestOpen}
          setValue={setInterestValue}
          multiple={false} // Single selection
          placeholder="Select Interest"
          searchable={true}
          searchPlaceholder="Search Interests"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          zIndex={2000} // Fix overlapping
          zIndexInverse={1000}
        />

        {/* University Dropdown */}
        <DropDownPicker
          open={universityOpen}
          value={universityValue}
          items={[
            { label: "ABC University", value: "ABC University" },
            { label: "XYZ University", value: "XYZ University" },
          ]}
          setOpen={setUniversityOpen}
          setValue={setUniversityValue}
          multiple={false} // Single selection
          placeholder="Select University"
          searchable={true}
          searchPlaceholder="Search Universities"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          zIndex={1000} // Fix overlapping
          zIndexInverse={500}
        />

        {/* Reset Filters Button */}
        <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Results Section */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Text style={styles.resultDetails}>
              {item.department} | {item.university} | {item.interest}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 2,
  },
  logoImage: {
  
    width: 100,
    height: 80,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchInput: { flex: 1, height: 50 },
  filterSection: { margin: 10 },
  filterTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10,color:"#00509E" },
  dropdown: {
    marginBottom: 15,
    borderColor: "#00509E",
    borderRadius: 12,
  },
  dropdownList: {
    backgroundColor: "#fff",
  },
  resetButton: {
    backgroundColor: "#00509E",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,

  },
  resultList: {
    paddingBottom: 10,
    
  },
  resultItem: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    elevation: 1,
  },
  resultName: { fontSize: 16, fontWeight: "bold" },
  resultDetails: { fontSize: 14, color: "#555" },
});

export default SearchScreen;
