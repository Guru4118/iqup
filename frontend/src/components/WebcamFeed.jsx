// src/components/WebcamFeed.jsx
import Webcam from "react-webcam";

function WebcamFeed() {
  return (
    <div className="w-full flex justify-center">
      <Webcam
        audio={false}
        height={360}
        screenshotFormat="image/jpeg"
        width={480}
        videoConstraints={{ facingMode: "user" }}
      />
    </div>
  );
}

export default WebcamFeed;