import React from 'react';
const Axios = require ('axios');

function reportReview(id) {
  Axios.put('/report', {
    params: {
      reviewId: e.target.id
    }
  })
}

export default function Report({ review_id }) {
  return (
    <div id={review_id} onClick={(e) => {

      Axios({
        method: 'put',
        url: '/report',
        params: {
          reviewId: e.target.id
        }
      })
      .then(()=> {
        return;
      })
      .catch((error) => {
        throw error;
      })
    }}>
      Report
    </div>
  )
}