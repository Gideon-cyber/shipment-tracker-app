import { Link, router, Stack } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputField from "@/components/InputField";
import { useState } from "react";
import AxiosInstance from "@/libs/configs/axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "@/types";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [usr, setUsr] = useState("");
  const [pwd, setPwd] = useState("");
  const [url, setUrl] = useState("");

  const storeData = async (value: UserType) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      // saving error
      Toast.show({
        type: "error",
        text1: "an error occurred please try again",
        props: {
          text1Style: {
            textAlign: "center",
          },
        },
      });
    }
  };

  const handleSubmit = () => {
    Keyboard.dismiss();

    setIsLoading(true);
    AxiosInstance.post("/login", { usr, pwd })
      .then((res: { data: UserType }) => {
        console.log("res", res.data);
        Toast.show({
          type: "success",
          text1: res?.data?.message,
          props: {
            text1Style: {
              textAlign: "center",
            },
          },
        });
        storeData(res.data);
      })
      .catch((err) => {
        console.log(err?.response);
        Toast.show({
          type: "error",
          text1: "an error occurred please try again",
          props: {
            text1Style: {
              textAlign: "center",
            },
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
        router.replace("/(home)");
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View
          style={[
            styles.container,
            {
              paddingHorizontal: 0,
            },
          ]}
        >
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={styles.backNav}
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={Colors.blue.background}
              />
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>Login</Text>
            <Text style={styles.descriptionText}>
              Please enter your First, Last name and your phone number in order
              to register
            </Text>
            <View style={styles.inputContainer}>
              <InputField
                label="URL"
                preText="https://"
                value={url}
                onChangeText={(text) => {
                  setUrl(text);
                }}
              />
              <InputField
                label="Username / Email"
                value={usr}
                onChangeText={(text) => {
                  setUsr(text);
                }}
                keyboardType="email-address"
              />
              <InputField
                label="Password"
                secureTextEntry={true}
                value={pwd}
                onChangeText={(text) => {
                  setPwd(text);
                }}
              />
            </View>
          </View>
          <CustomButton
            text="Login"
            disabled={usr.length === 0 || pwd.length === 0 || url.length === 0}
            onPress={() => {
              handleSubmit();
            }}
            loading={isLoading}
          />
        </View>
        <Toast />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
  },
  topContainer: {
    flex: 1,
  },
  backNav: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    maxWidth: 140,
  },
  cancelText: {
    color: Colors.blue.background,
    fontSize: 17,
    lineHeight: 22,
  },
  loginText: {
    fontSize: 34,
    lineHeight: 41,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 17,
    lineHeight: 24,
    color: Colors.grey.text,
    marginTop: 10,
    marginBottom: 38,
  },
  inputContainer: {
    gap: 24,
  },
});
