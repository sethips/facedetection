import React, { Component } from "react";
import { Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions";

export default class CameraComponent extends Component {
  state = {
    faceSquare: {}
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <Camera
          type={Camera.Constants.Type.front}
          style={{ flex: 1, width: "100%" }}
          onFacesDetected={res => {
            console.log(res);
            if (res.faces[0]) {
              this.setState({
                faceSquare: {
                  width: res.faces[0].bounds.size.width,
                  height: res.faces[0].bounds.size.height,
                  marginLeft: res.faces[0].bounds.origin.x,
                  marginTop: res.faces[0].bounds.origin.y
                }
              });
            }
            if (res.faces.length == 0) {
              this.setState({
                faceSquare: {}
              });
            }
            // else {
            //   this.setState({
            //     faceSquare: {}
            //   });
            // }
          }}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 100,
            tracking: true
          }}
        >
          {Object.keys(this.state.faceSquare) ? (
            <View
              style={{
                borderWidth: 1,
                borderColor: "red",
                borderStyle: "solid",
                width: this.state.faceSquare.width,
                height: this.state.faceSquare.height,
                marginLeft: this.state.faceSquare.marginLeft,
                marginTop: this.state.faceSquare.marginTop
              }}
            ></View>
          ) : null}
        </Camera>
      </View>
    );
  }
}
