import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { ThemedText } from "./themed-text";
import { TLyricScreenMode } from "@/types";
import { Spacing } from "@/constants/theme";
import { ScrollView } from "react-native";
type TProps = {
  lyrics: string;
  setMode: React.Dispatch<React.SetStateAction<TLyricScreenMode>>;
};
const LyricSync = (props: TProps) => {
  return (
    <ScrollView style={styles.container}>
      {props.lyrics.trim().length === 0 ? (
        <View style={styles.emptyLyric}>
          <ThemedText>Click below to enter lyrics.</ThemedText>
          <Pressable
            onPress={() => props.setMode("edit")}
            style={styles.button}
          >
            <ThemedText>Enter Lyrics</ThemedText>
          </Pressable>
        </View>
      ) : (
        <ThemedText>{props.lyrics}</ThemedText>
      )}
    </ScrollView>
  );
};

export default LyricSync;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyLyric: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.four,
  },
  button: {
    backgroundColor: "#ffffff10",
    padding: Spacing.one,
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
});
