import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";
import Colors from "@/constants/colors";
import { Lock, Calendar, Star } from "lucide-react-native";

export default function FreeTrialScreen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleStartTrial = () => {
    console.log("Starting free trial...");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <GuidanceLogo size={80} color={Colors.white} />
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>Start with a free trial</Text>

            <View style={styles.benefitsContainer}>
              <BenefitItem
                icon={<Calendar size={20} color={Colors.primary} />}
                title="Today"
                description="Get full access and start understanding your money mindset."
              />

              <BenefitItem
                icon={<Calendar size={20} color={Colors.primary} />}
                title="Day 5"
                description="Receive a reminder that your free trial ends in 2 hours."
              />

              <BenefitItem
                icon={<Star size={20} color={Colors.primary} />}
                title="After Day 3"
                description="Your free trial ends and your subscription begins. Cancel anytime before — no charges."
              />
            </View>

            <TouchableOpacity
              style={styles.startButton}
              activeOpacity={0.8}
              onPress={handleStartTrial}
            >
              <Text style={styles.startButtonText}>
                Start 7-days free trial now
              </Text>
            </TouchableOpacity>

            <View style={styles.securityNote}>
              <Lock size={14} color={Colors.textSecondary} />
              <Text style={styles.securityText}>
                Secure payment • Cancel anytime
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By starting, you agree to our{" "}
            <Text style={styles.footerLink}>Terms</Text> and{" "}
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

function BenefitItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.benefitItem}>
      <View style={styles.benefitIcon}>{icon}</View>
      <View style={styles.benefitContent}>
        <Text style={styles.benefitTitle}>{title}</Text>
        <Text style={styles.benefitDescription}>{description}</Text>
      </View>
    </View>
  );
}

function GuidanceLogo({
  size = 80,
  color = Colors.primary,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={color}
        strokeWidth="6"
      />
      <Path
        d="M 35 35 Q 50 25, 65 35 L 65 50 Q 65 65, 50 70 L 50 55 L 60 55 L 60 40 Q 55 35, 50 35 Q 40 35, 35 45 L 35 55 Q 35 70, 50 75 Q 65 70, 70 55"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 28,
  },
  benefitsContainer: {
    marginBottom: 28,
  },
  benefitItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
  securityNote: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  securityText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  footer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.8,
    textAlign: "center",
    lineHeight: 18,
  },
  footerLink: {
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
