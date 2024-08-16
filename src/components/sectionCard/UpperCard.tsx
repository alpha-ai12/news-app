import { View, useWindowDimensions } from "react-native";

import { PrimeCard } from "./primeCard";
import { TopRightCard } from "./topRightCard";

export const UpperCard = ({ data, navigation }) => {
  const width = useWindowDimensions().width;
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginHorizontal: 10,
          flexWrap: "wrap",
          width: width > 800 ? "80%" : width - 40,
        },
        width < 800 && { alignSelf: "center" },
      ]}
    >
      {[data[0]].map((item, index) => {
        return <PrimeCard index={index} item={item} navigation={navigation} />;
      })}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: width > 800 ? "56%" : "100%",
        }}
      >
        {data.length > 0
          ? data?.slice(1, 5).map((item, index) => {
              return (
                <TopRightCard
                  index={index}
                  item={item}
                  navigation={navigation}
                />
              );
            })
          : [{}, {}, {}, {}].map((item, index) => {
              return (
                <TopRightCard
                  index={index}
                  item={item}
                  navigation={navigation}
                />
              );
            })}
      </View>
    </View>
  );
};
