import {
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "../CheckBox";
import ShipmentItem from "./ShipmentItem";
import AxiosInstance from "@/libs/configs/axios";
import Toast from "react-native-toast-message";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface IShipments {
  search: string;
}

const Shipments = ({ search }: IShipments) => {
  const [markAll, setMarkAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState([]);
  const [shipmentStatus, setShipmentStatus] = useState([]);

  // console.log("shipmentData", shipmentData);

  const getShipmentList = () => {
    setIsLoading(true);
    AxiosInstance.get("/frappe.client.get_list", {
      params: {
        doctype: "AWB",
        fields: "*",
        filters: { name: [search] },
      },
    })
      .then((res: { data: any }) => {
        console.log("res", res.data?.message);

        setShipmentData(res.data.message);
      })
      .catch((err) => {
        console.log(err?.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getShipmentStatus = () => {
    setIsLoading(true);
    AxiosInstance.get("/frappe.client.get_list", {
      params: {
        doctype: "AWB Status",
        fields: "*",
      },
    })
      .then((res: { data: any }) => {
        // console.log("status", res.data?.message);

        setShipmentStatus(res.data.message);
      })
      .catch((err) => {
        console.log(err?.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getShipmentStatus();
    getShipmentList();
  }, []);

  // Function to get color based on status
  const getColorByStatus = (status: string) => {
    switch (status) {
      case "Received":
        return "#4CAF50"; // Green
      case "Putaway":
        return "#2196F3"; // Blue
      case "Delivered":
        return "#FFEB3B"; // Yellow
      case "Cancelled":
        return "#F44336"; // Red
      case "Rejected":
        return "#9C27B0"; // Purple
      case "Lost":
        return "#607D8B"; // Grey
      case "On Hold":
        return "#FF9800"; // Orange
      default:
        return "#000000"; // Black as default
    }
  };

  return (
    // <TouchableWithoutFeedback>
    <View style={styles.shipmentContainer}>
      <View style={styles.shipmentHeader}>
        <Text style={styles.shipmentHeaderText}>Shipments</Text>

        <View>
          <Checkbox label="Mark All" checked={markAll} />
        </View>
      </View>
      {/* <View
        style={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
        }}
      > */}
      {/* </View> */}
      <FlatList
        data={shipmentData}
        keyExtractor={(item: any) => item.name}
        renderItem={({ item }: any) => {
          const status = shipmentStatus.find(
            (status: any) => status.status === item.status
          );
          return (
            <TouchableWithoutFeedback>
              <ShipmentItem item={item} status={status} />
            </TouchableWithoutFeedback>
          );
        }}
        contentContainerStyle={styles.flatListContainer}
        // style={{ flex: 1, flexGrow: 1 }}
      />
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default Shipments;

const styles = StyleSheet.create({
  shipmentContainer: {
    // padding: 16,
    paddingTop: 42,
    height: "100%",
    width: "100%",
    // overflow: "scroll",
    // flex: 1,
    // flexGrow: 1,

    // alignItems: "flex-start",
    // position: "relative",
  },
  shipmentHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    paddingHorizontal: 16,
    left: 0,
  },
  shipmentHeaderText: {
    fontWeight: "bold",
    fontSize: 22,
  },
  flatListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    overflow: "hidden",
  },
});
