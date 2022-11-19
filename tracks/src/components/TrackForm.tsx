import React, { FC } from "react";
import { Input, Button } from "react-native-elements";

import VerticalSpacing from "./VerticalSpacing";

interface TrackFormProps {
  trackingName: string;
  changetrackingName: (text: string) => void;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const TrackForm: FC<TrackFormProps> = ({
  trackingName,
  changetrackingName,
  isRecording,
  onStartRecording,
  onStopRecording,
}) => {
  return (
    <>
      <VerticalSpacing>
        <Input
          value={trackingName}
          onChangeText={changetrackingName}
          placeholder="Enter Tracking name"
          autoCompleteType={undefined}
        />
      </VerticalSpacing>
      {isRecording ? (
        <Button title="Stop Recording" onPress={onStopRecording} />
      ) : (
        <Button title="Start Recording" onPress={onStartRecording} />
      )}
    </>
  );
};

export default TrackForm;
