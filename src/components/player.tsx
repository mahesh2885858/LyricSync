import { View, Text, Modal, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "./themed-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Track } from "@nodefinity/react-native-music-library";
import { AudioStatus, useAudioPlayer } from "expo-audio";
import { ThemedText } from "./themed-text";
import { Pressable } from "react-native";
import LyricsEditor from "./lyricsEditor";
import LyricSync from "./lyricSync";
import { TLyricScreenMode } from "@/types";
type TProps = {
  visible: boolean;
  onClose: () => void;
  track: Track;
};
const MusicPlayer = (props: TProps) => {
  const player = useAudioPlayer(props.track.url);
  const [time, setTime] = useState(0);
  const [mode, setMode] = useState<TLyricScreenMode>("sync");
  const [lyrics, setLyrics] = useState("");
  const [status, setStatus] = useState<AudioStatus | null>(null);
  function formatLrcTimestamp(timeInSeconds: number): string {
    const totalMilliseconds = Math.round(timeInSeconds * 1000);

    const minutes = Math.floor(totalMilliseconds / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = totalMilliseconds % 1000;

    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    const xxx = String(milliseconds).padStart(3, "0");

    return `[${mm}:${ss}.${xxx}]`;
  }
  const togglePlay = () => {
    if (status?.playing) {
      player.pause();
    } else {
      player.play();
    }
  };
  const saveLyrics = (lyrics: string) => {
    setLyrics(lyrics);
  };
  // useEffect(() => {
  //   player.play();
  //   const listenerId = player.addListener("playbackStatusUpdate", (status) => {
  //     setStatus(status);
  //   });
  //   return () => {
  //     player.remove();
  //     listenerId.remove();
  //   };
  // }, []);
  return (
    <Modal visible={props.visible} onRequestClose={props.onClose}>
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.screen}>
            <View style={styles.top}>
              <View style={styles.header}>
                <MaterialDesignIcons
                  name="arrow-left"
                  size={30}
                  color="white"
                  onPress={props.onClose}
                />
                {mode === "edit" && (
                  <MaterialDesignIcons
                    name="content-save"
                    onPress={() => setMode("sync")}
                    size={30}
                    color="white"
                  />
                )}
              </View>
              {mode === "sync" ? (
                <LyricSync setMode={setMode} lyrics={lyrics} />
              ) : (
                <LyricsEditor lyrics={lyrics} setLyrics={saveLyrics} />
              )}
            </View>
            {mode === "sync" && (
              <View style={styles.player}>
                <ThemedText>{props.track.title}</ThemedText>
                <View style={styles.controls}>
                  <MaterialDesignIcons
                    name="rewind"
                    size={40}
                    color={"white"}
                  />
                  <MaterialDesignIcons
                    onPress={togglePlay}
                    name={status?.playing ? "pause" : "play"}
                    size={40}
                    color={"white"}
                  />
                  <MaterialDesignIcons
                    name="fast-forward"
                    size={40}
                    color={"white"}
                  />
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </ThemedView>
    </Modal>
  );
};

export default MusicPlayer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.two,
    alignItems: "center",
    gap: Spacing.three,
    // paddingBottom: BottomTabInset,
    maxWidth: MaxContentWidth,
  },
  screen: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  top: {
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.two,
  },
  player: {
    // borderWidth: 1,
    // borderColor: "#ffffff40",
    borderRadius: Spacing.one,

    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Spacing.four,
    backgroundColor: "#ffffff10",
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: Spacing.four,
  },
});
