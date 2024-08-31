import { Link, router, Stack } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";

export default function LandingScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/Logo.png")}
            style={styles.Logo}
          />
        </View>
        <CustomButton
          text="Login"
          onPress={() => {
            router.push("/login");
          }}
          variant="secondary"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.blue.background,
  },
  button: {
    marginBottom: 25,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  Logo: {
    width: 207,
    height: 36,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 17,
    color: Colors.blue.background,
    fontWeight: "bold",
  },
});
