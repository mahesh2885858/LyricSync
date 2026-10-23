import * as Device from "expo-device";
import { FlatList, Platform, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import {
  Album,
  AssetField,
  AssetInfo,
  MediaType,
  Query,
  usePermissions,
} from "expo-media-library";
import { useEffect, useState } from "react";
import { getTracksAsync, Track } from "@nodefinity/react-native-music-library";
import { Image } from "expo-image";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import MusicPlayer from "@/components/player";

export default function HomeScreen() {
  const [permissionResponse, requestPermission] = usePermissions({
    granularPermissions: ["audio"],
  });
  const [mediaList, setMediaList] = useState<Track[]>([]);
  const [openPlayer, setOpenPlayer] = useState(null);

  const getAudioFiles = async () => {
    try {
      const permission = await requestPermission();
      if (permission.granted) {
        const tracks = await getTracksAsync({ first: 500 });
        const audioInfo: Track[] = [];
        console.log(tracks.totalCount);
        tracks.items.forEach((track) => {
          audioInfo.push(track);
        });

        setMediaList(audioInfo);
      } else {
        console.log({ ...permission });
      }
    } catch (err) {
      console.log("Error while reading audio files: " + err);
    }
  };
  useEffect(() => {
    console.log({ permissionResponse });
    getAudioFiles();
  }, []);
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText>Files</ThemedText>
        <ThemedView>
          <FlatList
            data={mediaList}
            ListEmptyComponent={<ThemedText>No audio found!!</ThemedText>}
            renderItem={({ item }) => {
              console.log(item.artwork, item.title);
              return (
                <Pressable
                  onPress={() => {
                    setOpenPlayer(item);
                  }}
                  style={styles.listItem}
                >
                  {item.artwork ? (
                    <Image
                      source={item.artwork}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <MaterialDesignIcons
                      name="music"
                      size={40}
                      color={"white"}
                    />
                  )}
                  <ThemedText>{item.title}</ThemedText>
                </Pressable>
              );
            }}
          />
        </ThemedView>
      </SafeAreaView>
      {openPlayer && (
        <MusicPlayer
          visible={!!openPlayer}
          onClose={() => setOpenPlayer(null)}
          track={openPlayer}
        />
      )}
    </ThemedView>
  );
}

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
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  listItem: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    borderColor: "#ffffff40",

    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    marginBottom: Spacing.two,
    height: Spacing.six,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
});
