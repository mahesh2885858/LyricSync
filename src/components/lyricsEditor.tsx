import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Spacing } from "@/constants/theme";
type TProps = {
  lyrics: string;
  setLyrics: (lyrics: string) => void;
};
const LyricsEditor = (props: TProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={props.lyrics}
        onChangeText={props.setLyrics}
        style={styles.input}
        textAlignVertical="top"
        placeholder="Enter your lyrics here.."
        multiline
      />
    </View>
  );
};

export default LyricsEditor;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    borderColor: "white",
    flex: 1,
    fontSize: 18,
    color: "white",
  },
});
