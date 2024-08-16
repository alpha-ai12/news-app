import React, { useRef } from "react";
import { View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

import CarouselItem from "./carouselItem";
import styles from "./styles";

const { width } = Dimensions.get("screen");

export const CustomSlider = ({ data, navigation }) => {
  const carouselRef = useRef(null);
  // const [slideIndex, setSlideIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        // onSnapToItem={(index) => setSlideIndex(index)}
        sliderWidth={width}
        sliderHeight={228}
        itemWidth={width - 60}
        data={data}
        renderItem={({ item, index }, parallaxProps) =>
          CarouselItem(
            {
              item,
              index,
              navigation,
            },
            parallaxProps,
          )
        }
        loop
        loopClonesPerSide={5}
        autoplay
        autoplayDelay={5}
        showSpinner
        hasParallaxImages
        keyExtractor={(item, index) => `carousel${index}`}
      />
    </View>
  );
};

export default CustomSlider;
