import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import * as Haptics from "expo-haptics";
import Svg, { Ellipse } from "react-native-svg";
import Colors from "@/constants/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const INITIAL_HEIGHT = SCREEN_HEIGHT * 0.35;
const FINAL_HEIGHT = SCREEN_HEIGHT * 0.58;

export default function BreathOutScreen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const heightAnim = React.useRef(new Animated.Value(INITIAL_HEIGHT)).current;

  const logoScaleAnim = React.useRef(new Animated.Value(1)).current;
  const logoPositionAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: FINAL_HEIGHT,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(logoScaleAnim, {
        toValue: 0.9,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(logoPositionAnim, {
        toValue: -SCREEN_HEIGHT * 0.03,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      setTimeout(() => {
        router.replace("/welcome");
      }, 500);
    });
  }, [fadeAnim, heightAnim, logoScaleAnim, logoPositionAnim, router]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: logoScaleAnim },
              { translateY: logoPositionAnim },
            ],
          },
        ]}
      >
        <Image
          source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/2gb6csr3j15jml6wu5vxm' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.archContainer,
          {
            height: heightAnim,
          },
        ]}
      >
        <View style={styles.rectangle} />
        <View style={styles.ellipseContainer}>
          <Svg
            width="100%"
            height="80"
            viewBox="0 0 400 80"
            style={styles.svg}
            preserveAspectRatio="none"
          >
            <Ellipse
              cx="200"
              cy="80"
              rx="200"
              ry="80"
              fill={Colors.primary}
            />
          </Svg>
        </View>
      </Animated.View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.15,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 2,
  },
  logo: {
    width: 100,
    height: 100,
  },
  archContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  rectangle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 80,
    backgroundColor: Colors.primary,
  },
  ellipseContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },

});
