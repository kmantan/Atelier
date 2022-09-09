import React, { useState, useEffect } from "react";
const axios = require("axios");
const FormData = require("form-data");
import { FaCheck } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";

export default function UploadPhotos({ photos }) {
  const [successful, setSuccessful] = useState(false);
  const [files, setFiles] = useState([]);
  const [pending, setPending] = useState(0);

  const uploadFiles = (images, index) => {
    var data = new FormData();

    data.append("file", images[index]);
    data.append("upload_preset", "ml_default");

    console.log(data);

    var config = {
      method: "post",
      url: "https://api.cloudinary.com/v1_1/dob8np3df/image/upload",
      headers: {},
      data: data,
    };

    axios(config)
      .then((res) => {
        photos.push(res.data.secure_url);
        if (res.status === 200) {
          if (files[index + 1]) {
            uploadFiles(files, index + 1);
          } else {
            setSuccessful(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RenderThumbnails = ({ thumbnails }) => {
    console.log(thumbnails)
    var counter = 0;

    if (thumbnails) {
      return thumbnails.map((photo) => {
        return (
          <div
            key={`"${counter}"`}
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "row",
            }}
          >
            <img
              src={URL.createObjectURL(photo)}
              width="50px"
              height="50px"
            ></img>
            <MdRemoveCircle
              key={files.length}
              style={{ color: "red" }}
              onClick={() => {
                setPending(pending - 1);
                setFiles(files.splice(0, pending - 1))
              }}
            />
          </div>
        );
      });
    }
    return null;
  };

  return (
    <>
      <div
        className="reviews-pending-uploads"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          style={{ margin: "5px 15px", display: "flex", flexDirection: "row" }}
        >
          {pending > 0 ? <RenderThumbnails thumbnails={files} /> : null}
        </div>
      </div>
      <div
        className="reviews-upload-photos"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <input
          type="file"
          name="photo"
          style={{
            paddingRight: "0px",
            width: "200px",
            display: "flex",
            flexDirection: "row",
          }}
          onChange={(e) => {
            if (e.target.files) {
              setFiles(files.concat(e.target.files[0]));
              setPending(pending + 1);
            }
          }}
        ></input>
        <div
          style={{
            fontSize: "12px",
            border: "solid black 2px",
            padding: "2px",
          }}
          onClick={() => uploadFiles(files, 0)}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "lightgray")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
        >
          {pending > 1 ? "Upload Photos" : "Upload Photo"}
        </div>
        {successful ? (
          <FaCheck
            style={{
              backgroundColor: "green",
              size: "10px",
              marginLeft: "10px",
            }}
          />
        ) : null}
      </div>
    </>
  );
}
