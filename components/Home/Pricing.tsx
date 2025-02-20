import React from "react";
import { StyleSheet, Pressable, ViewStyle, TextStyle } from "react-native";
import { Link } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

interface Tier {
  title: string;
  price: string;
  description: string;
  features: string[];
}

const tiers: Tier[] = [
  {
    title: "ALL ACCESS COACHING",
    price: "€300 p/ 4 weeks",
    description: "The most in-depth coaching experience that we offer. For individuals that wish to be highly invested in the coaching process.",
    features: [
      "Daily one on one support with your coach via your communication medium of choice.",
      "Daily technical training analysis.",
      "Optional video conference after each block for a full debrief with coach.",
      "Full access to community groups and support structures.",
      "Meet day handling included.",
    ],
  },
  {
    title: "COACHING",
    price: "€150 p/ 4 weeks",
    description: "An individualized coaching experience. For athletes that are looking for a truly individualized style of coaching.",
    features: [
      "Weekly check-in with your coach via your communication medium of choice.",
      "Weekly technical training analysis.",
      "Optional video conference after each block for a full debrief with coach.",
      "Full access to community groups and support structures.",
    ],
  },
  {
    title: "PROGRAMMING",
    price: "€70 p/ 4 weeks",
    description: "A fully individualized programming option for those who are limited by budget but interested in implementing our bottom's up approach to their training.",
    features: [
      "Block to block video breakdown which includes a full debrief of previous training block and guidance on following training block.",
      "Access to Programming Consultation support groups and discord server.",
      "Not suitable for beginners.",
      "Student discount available!",
    ],
  },
  {
    title: "PERFORMANCE MENTALITY COACHING",
    price: "Weekly / Biweekly Pricing",
    description: "Build resilience and focus to tackle your toughest lifts.",
    features: [
      "Create and achieve personalist performance goals while overcoming mental barriers and enhancing your competitive edge.",
      "Integrate psychological strategies to maximise your lifting potential.",
    ],
  },
];

export default function Pricing() {
  return (
    <ThemedView style={styles.container as ViewStyle}>
      <ThemedText style={styles.header as TextStyle}>BEGIN YOUR ODYSSEY TODAY.</ThemedText>
      <ThemedView style={styles.tiersContainer as ViewStyle}>
        {tiers.map((tier, index) => (
          <ThemedView key={index} style={styles.tier as ViewStyle}>
            <ThemedText style={styles.title as TextStyle}>{tier.title}</ThemedText>
            <ThemedText style={styles.price as TextStyle}>{tier.price}</ThemedText>
            <ThemedText style={styles.description as TextStyle}>{tier.description}</ThemedText>
            {tier.features.map((feature, i) => (
              <ThemedText key={i} style={styles.feature as TextStyle}>
                {feature}
              </ThemedText>
            ))}
            <Link href="/(pages)/sign-up/page" asChild>
              <Pressable style={styles.button as ViewStyle}>
                <ThemedText style={styles.buttonText as TextStyle}>APPLY NOW</ThemedText>
              </Pressable>
            </Link>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: "#000",
  },
  header: {
    fontSize: 36,
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
  },
  tiersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    maxWidth: 1400,
    marginHorizontal: "auto",
  },
  tier: {
    backgroundColor: "#fff",
    padding: 30,
    width: "23%",
    minWidth: 280,
    alignItems: "center",
    justifyContent: "space-between",
    height: 600,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  price: {
    fontSize: 20,
    marginBottom: 20,
    color: "#000",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
    color: "#000",
  },
  feature: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 20,
    color: "#000",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: "auto",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
}); 