import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface ICustomButtonProps {
  text: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton = ({
  text,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}: ICustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor:
            variant === "primary"
              ? disabled
                ? Colors.blue.inactive
                : pressed
                ? Colors.blue.backgroundHover
                : Colors.blue.background
              : disabled
              ? Colors.blue.secondaryInactive
              : pressed
              ? Colors.blue.lightHover
              : "#FFFFFF",
        },
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#FFFFFF" : Colors.blue.background}
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            {
              color:
                variant === "primary"
                  ? disabled
                    ? Colors.blue.inactiveText
                    : "#FFFFFF"
                  : disabled
                  ? Colors.blue.secondaryInactiveText
                  : Colors.blue.background,
            },
          ]}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    marginBottom: 25,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
