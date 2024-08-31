import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for checkmark icon
import { Colors } from "@/constants/Colors";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handlePress = () => {
    setIsChecked(!isChecked);
    onChange?.(!isChecked); // If onChange is provided, call it with the new state
  };

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={handlePress}>
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: isChecked ? Colors.blue.lightHover : "white",
            borderColor: isChecked ? Colors.blue.background : "#D0D5DD",
          },
        ]}
      >
        {isChecked && (
          <Ionicons name="checkmark" size={20} color={Colors.blue.background} />
        )}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#757281",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 4,
  },
  label: {
    fontSize: 16,
    color: Colors.blue.background,
  },
});

export default Checkbox;
