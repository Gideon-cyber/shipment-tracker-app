import { Colors } from "@/constants/Colors";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Animated,
  Easing,
  Text,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  preText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  preText,
  onChangeText,
  value,
  ...otherProps
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current; // Animation value

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || (value && value.length > 0) ? 1 : 0, // Animate to 1 when focused or has value
      duration: 300,
      useNativeDriver: false, // Cannot use native driver for layout properties
      easing: Easing.ease,
    }).start();
  }, [isFocused, value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Interpolating styles for label animation
  const labelStyle = {
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [27, 5], // Moves from center to top
    }),
    left: 16,
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 12], // Shrinks in size
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["grey", "black"],
    }),
    transform: [
      {
        translateY: animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0], // Fine-tuning vertical position
        }),
      },
    ],
  };

  // Interpolating opacity for preText
  const preTextOpacity = animatedIsFocused.interpolate({
    inputRange: [0.5, 1], // Start showing preText when halfway to fully focused
    outputRange: [0, 1], // Fade in effect
    extrapolate: "clamp",
  });

  return (
    <View style={styles.group}>
      {preText ? (
        <Animated.Text
          style={[
            styles.preText,
            {
              opacity: preTextOpacity, // Opacity controlled by animation
            },
          ]}
        >
          {preText}
        </Animated.Text>
      ) : null}
      <TextInput
        style={[
          styles.input,
          {
            paddingLeft: preText ? 80 : 16,
          },
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        value={value}
        {...otherProps}
      />
      {/* Always render the label, even if the value is present */}
      {label && (
        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    position: "relative",
  },
  input: {
    backgroundColor: "#F4F2F8",
    borderRadius: 10,
    color: Colors.blue.background,
    fontSize: 18,
    height: 56,
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 23,
    width: "100%",
  },
  label: {
    position: "absolute",
    left: 16, // Adjusted to align correctly
    textAlign: "left",
    color: Colors.grey.labelText,
  },
  preText: {
    position: "absolute",
    top: 23,
    left: 16,
    fontSize: 18,
    zIndex: 1,
    color: Colors.grey.labelText,
  },
});

export default InputField;
