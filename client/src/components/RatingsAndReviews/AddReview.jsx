import React, { useState, useEffect } from "react";
import Characteristics from "./Characteristics.jsx";
import OverallRating from "./OverallRating.jsx";
import UploadPhotos from "./UploadPhotos.jsx";
const axios = require("axios");

export default function AddReview({ productId, toggleShowReview, metaData, getReviews, productName }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [recommend, setRecommend] = useState(false);
  const [overall, setOverall] = useState(3);
  const [comfort, setComfort] = useState("");
  const [fit, setFit] = useState("");
  const [length, setLength] = useState("");
  const [quality, setQuality] = useState("");
  const [fieldsComplete, setFieldsComplete] = useState(true);


  const backgroundStyling = {
    display: "flex",
    position: "fixed",
    top: "0%",
    left: "0%",
    zIndex: "13",
    backgroundColor: "rgba(100,100,100,0.5)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "overlay"
  };

  const formStyling = {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    width: "50vw",
    backgroundColor: "white",
    position: "fixed",
    paddingTop: "40px",
    overflow: "overlay"
  };

  const reviewData = {
    product_id: parseInt(metaData.product_id),
    rating: overall,
    summary: summary,
    body: body,
    recommend: recommend,
    name: name,
    email: email,
    photos: [],
    characteristics: {
    }
  }

  function sendReview(e) {
      e.preventDefault();
      var fieldsComplete = true;

      if(reviewData.body.length < 50 || reviewData.body.length > 1000) {
        alert("Review body must be between 50 and 1000 characters in length");
      }

        for (let field in reviewData) {
          if(typeof reviewData[field] === "string") {
            if(reviewData[field] === "") {
              alert("Please ensure " + field + " is entered properly");
              fieldsComplete=false;
            }
          }
        }

      if(fieldsComplete){
        toggleShowReview();
        axios.post('/addReview', reviewData)
        .then((res) => {
          getReviews('newest');
        })
        .catch((err) => {
          console.log(err);
        })
      }
  };

  return (
    <form style={backgroundStyling}>
      <div style={formStyling}>
        <p style={{position: "absolute", top: "0px", right: "20px"}} onClick={() => {toggleShowReview()}}>X</p>
        <h2 style={{position: "absolute", top: "0px", left: "20px"}}>Write Your Review</h2>
        <h3 style={{marginLeft: "20px", marginBottom: "0"}}>About the {productName}</h3>
        <div className="review-form-fields" style={{display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "30px", width: "500px"}}>
        <div className="review-nickname" style={{display: "flex", flexDirection: "row", padding: "5px 25px"}}>
        <label style={{paddingRight: "3px"}}>Nickname: </label>
        <input
          type="text"
          placeholder="Example: jackson11!"
          value={name}
          maxLength="60"
          onChange={(e) => setName(e.target.value)}
        ></input>
        </div>
        <p style={{marginLeft: "25px"}}>For privacy reasons, do not use your full name or email address</p>
        <div className="review-email" style={{display: "flex", flexDirection: "row", padding: "5px 25px"}}>
        <label style={{paddingRight: "3px"}}>Email: </label>
        <input
          type="email"
          placeholder="Example: jackson11@email.com"
          value={email}
          maxLength="60"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        </div>
        <p style={{marginLeft: "25px"}}>For authentication reasons, you will not be emailed</p>
        <div className="review-summary" style={{display: "flex", flexDirection: "row", padding: "5px 25px"}}>
        <label style={{paddingRight: "3px"}}>Summary: </label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        ></input>
        </div>
        <div className="review-body" style={{display: "flex", flexDirection: "row", padding: "5px 25px", height: "100px"}}>
        <label style={{paddingRight: "3px"}}>Review: </label>
        <textarea
          type="text"
          rows="10"
          cols="30"
          wrap="hard"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        </div>
        <div className="review-recommend" style={{display: 'flex', flexDirection: "row", padding: "5px 25px"}}>
        <label style={{paddingRight: "3px"}}>Would you Recommend? </label>
        <input
          type="checkbox"
          value={recommend}
          onChange={() => {setRecommend(true)}}
        ></input>
        </div>
        </div>
        <div className="ratings-overall" style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "5px 25px"}}>
        <label style={{paddingRight: "10px"}}>Overall Rating: </label>
        <OverallRating rating={overall} setRating={setOverall}/>
        </div>
        <div className="review-characteristics-container" style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "flex-start", padding: "5px 25px"}}>
        <Characteristics metaData={metaData} reviewData={reviewData}/>
        </div>
        <UploadPhotos photos={reviewData.photos}/>
        <button type="submit" style={{width: "75px", marginLeft: "10px"}} onClick={sendReview}>Submit</button>
      </div>
    </form>
  );
}

/*
Required paramaters:

product_id
rating
summary
body
recommend
name
email1
photos
characteristics

Review object

{
    "product_id": 71697,
    "rating": 2,
    "summary": "this thing is BAD",
    "body": "I really did not like this product. It had nothing I enjoyed.",
    "recommend": false,
    "name": "user",
    "email": "user@gmail.com",
    "photos": [],
    "characteristics": {"240582": 5, "240583": 5, "240584": 5, "240585": 5 }
}

*/