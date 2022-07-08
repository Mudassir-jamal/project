import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Audio, Sound } from "expo-av";
// import * as Sharing from 'expo-sharing';

export default function AudioPlay({recordings,setRecordings}) {

  
  const [recording, setRecording] = React.useState();
  const [message, setMessage] = React.useState("");
  const [Length, setLength] = React.useState(true);
  const [recStarted, setRecStarted] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false)


  async function startRecording() {
    setDisableButton(true)
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

         setRecStarted(true)
         setDisableButton(false)

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );



        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
        setDisableButton(false)

      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }



  async function stopRecording() {
    setDisableButton(true)
    setRecording(undefined);
    await recording.stopAndUnloadAsync().then((res) => console.log(res))
    setRecStarted(false)
    setDisableButton(false)

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
  
    setRecordings(updatedRecordings);
    if (recordings.length == 0) {
      return setLength(false);
    }
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    const RecordingDlt = async (index) => {
      const temp = [...recordings];
      temp.splice(index, 1);
      setRecordings(temp);
      setLength(true);

      const sound = new Audio.Sound();
      await sound.unloadAsync(recordings.uri);

      // const  sound = await Audio.Sound.createAsync(
      //   { uri: recordings.uri },
      //   { shouldPlay: false },
      //   );
    };

    return recordings.map((recordingLine, index) => {
      
      console.log(recordingLine);
      return (
        <View key={index} style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => recordingLine.sound.replayAsync()}
          >
            <Image
              style={{ width: 20, height: 20, resizeMode: "contain" }}
              source={require("../assets/play-icon.png")}
            />
          </TouchableOpacity>

          <Text style={styles.fill}>{recordingLine.duration} - </Text>

          <View style={styles.btnsBorder}>
            <TouchableOpacity
              style={styles.button}
              disabled
            >
              <Image
                style={{width: 20, height: 20, resizeMode: "contain",opacity:0.4 }}
                source={require("../assets/mic-icon.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.btnsBorder}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                recordingLine.sound.unloadAsync(), RecordingDlt(index);
              }}
            >
              <Image
                style={{ width: 20, height: 20, resizeMode: "contain" }}
                source={require("../assets/cancel-icon.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  }

  return (
    <View style={styles.topSections}>
      <View style={styles.container}>
        <Text>{message}</Text>

        {Length ? (
      
          <View style={[styles.row]}>
            <TouchableOpacity style={[styles.button, styles.opacity]} disabled>
              <Image
                style={{ width: 20, height: 20, resizeMode: "contain" }}
                source={require("../assets/play-icon.png")}
              />
            </TouchableOpacity>

            <Text style={styles.fill}> ---- </Text>

            <View style={styles.btnsBorder}>
              <TouchableOpacity
              disabled={disableButton}
                style={styles.button}
                onPress={recStarted ? stopRecording :  startRecording}
              >
                {recStarted ? (
                  <Image 
                  style={{ width: 20, height: 20, resizeMode: "contain",borderWidth:6,borderColor:"darkred",borderRadius:100, }}
                   source={require("../assets/record.png")}
                  />
                ) : (
                  <Image
                    style={{ width: 20, height: 20, resizeMode: "contain" }}
                    source={require("../assets/mic-icon.png")}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.btnsBorder}>
              <TouchableOpacity
                style={[styles.button, styles.opacity]}
                disabled >
                <Image
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                  source={require("../assets/cancel-icon.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {getRecordingLines()}
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rowTwo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 8,
    width: "100%",
    padding: 14,
    backgroundColor: "red",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 8,
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 20,
  },
  btnsBorder: {
    border: "none",
    borderColor: "#d9d9d9",
    borderLeftWidth: 0.5,
  },
  topSections: {},

  stopBtn: {
    backgroundColor: "red",
    color: "white",
    fontWeight: "bold",
  },

  startBtn: {
    backgroundColor: "green",
    color: "white",
    fontWeight: "bold",
  },

  opacity: {
    opacity: 0.4,
  },
});
