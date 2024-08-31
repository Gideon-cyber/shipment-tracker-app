import { Stack, router } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useRef, useEffect } from "react";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current; // For zooming in the image
  const translateYAnim = useRef(new Animated.Value(0)).current; // For moving the image up
  const viewHeightAnim = useRef(new Animated.Value(height / 2.5)).current; // Start with half the window's height
  const viewOpacityAnim = useRef(new Animated.Value(0)).current; // Start hidden
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fading in the login screen

  useEffect(() => {
    Animated.sequence([
      // Step 1: Zoom in the image
      Animated.timing(scaleAnim, {
        toValue: 2,
        duration: 2000,
        useNativeDriver: true, // Use native driver for scaling
      }),
      // Step 2: Make the view visible and move the image up while reducing the view height
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: width / 200, // Adjust to fit full width of the screen
          duration: 1500, // Extended duration
          useNativeDriver: true, // Use native driver for scaling
        }),
        Animated.timing(translateYAnim, {
          toValue: -height / 4, // Move the image up
          duration: 1500, // Extended duration
          useNativeDriver: true, // Use native driver for translation
        }),
        Animated.timing(viewOpacityAnim, {
          toValue: 1,
          duration: 300, // Instantly make it visible when starting the movement
          useNativeDriver: false, // JS driver needed for opacity animation
        }),
        Animated.timing(viewHeightAnim, {
          toValue: height / 5, // Reduce the view height to 1/4 of the window height
          duration: 1500, // Extended duration
          useNativeDriver: false, // JS driver needed for height animation
        }),
      ]),
      // Step 3: Fade in the new page (Login Screen)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true, // Use native driver for fade in
      }),
    ]).start();

    // Navigate to the login screen 2 seconds before the animations end
    const timeoutId = setTimeout(() => {
      router.replace("/landing");
    }, 3500); // 5000ms total animation duration - 2000ms delay for navigation

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId);
  }, [
    scaleAnim,
    translateYAnim,
    viewHeightAnim,
    viewOpacityAnim,
    fadeAnim,
    router,
  ]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.animatedView,
            {
              height: viewHeightAnim,

              opacity: viewOpacityAnim, // Start hidden, then appear
            },
          ]}
        />
        <Animated.View
          style={[
            styles.animatedImageContainer,
            {
              transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
            },
          ]}
        >
          <Image
            source={require("@/assets/images/LogoIcon.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // padding: 20,
    backgroundColor: "#FFFFFF",
  },
  animatedView: {
    position: "absolute",
    top: 0,
    // left: 0,
    // right: 0,
    zIndex: 100,
    width: "100%",
    backgroundColor: Colors.blue.background, // Same color as the image background
  },

  animatedImageContainer: {
    backgroundColor: "white", // Background color similar to the image
    width: 144,
    height: 144,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
