import React from 'react';
import * as ReactDOM from 'react-dom/client';
// import Reviews from './components/RatingsAndReviews/Reviews.jsx';
const Axios = require('axios');
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import Overview from './components/Overview.jsx';
import QandA from './components/QandA.jsx';
import RelatedItemsAndOutfits from './components/relateditemsandoutfit/RelatedItemsAndOutfits.jsx'

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curr_product_id: 71698,
      curr_product_name: 'Camo Onesie',
      c_url: 'http://localhost:8080/71968'
    }
    this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
    this.renderStarRating = this.renderStarRating.bind(this);
    this.sendReview = this.sendReview.bind(this);
    }

  // updateCurrentProduct(e) {
  //   this.setState({curr_product_id: e.event.product_id});
  // };

  updateCurrentProduct(p_id) {
    // let n_url = this.state.c_url.slice(0, -5) + p_id;
    // console.log('pid', p_id)
    console.log('o state', this.state.curr_product_id)
    this.setState({
      // c_url: n_url,
      curr_product_id: p_id
    });
    setTimeout(() => {
      console.log('n state', this.state)
    }, "1000")

    // console.log('pid2',this.state.curr_product_id)
    // location.assign(n_url);
  };

  renderStarRating(rating) {

    const stars = [];

    let halfStarPushed = false;

    for(let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i}/>);
       } else if (rating < i && rating > i - 1) {
        stars.push(<FaStarHalfAlt key='half' />)
        halfStarPushed = true
       } else {
        stars.push(<AiOutlineStar key={i} />)
       }

      for(let i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars.push(<FaStar key={i}/>);
        } else {
          stars.push(<AiOutlineStar key={i}/>)
        }
      }

      return stars.map((star) => {
        return star;
      })
    }
  }

  sendReview() {
    Axios.post('/addReview', {
      body: {
        product_id:71697,
        rating:5,
        summary:"It can't get better than this! Buy this one now!!",
        body:"Seriously. This is life changing. I have already ordered 73 more for all my family and friends.",
        recommend:true,
        name:"marysmith74",
        email:"mzmarys74@aol.com",
        photos:[]
      }
    })
  }

  componentDidMount() {
    // console.log('a', window.location.pathname.split('/')[1])
    // let u = parseInt(window.location.pathname.split('/')[1]);
    // console.log('u', u)
    // this.setState({
    //   curr_product_id: u
    // })
    // setTimeout(() => {
    //   console.log('new state', this.state)
    // }, "1000")
  }

  render() {
    return (
      <div>
      <Overview curr_product_id={this.state.curr_product_id} renderStars={this.renderStarRating}/>
      <QandA curr_product_id={ this.state.curr_product_id } curr_product_name={ this.state.curr_product_name }/>
      <RelatedItemsAndOutfits updateCurrentProduct={this.updateCurrentProduct} p_id={this.state.curr_product_id} currentProduct={this.state.curr_product_name} currentFeatures={[
        {
          "feature": "Sole",
          "value": "Rubber"
        },
        {
          "feature": "Material",
          "value": "FullControlSkin"
        },
        {
          "feature": "Stitching",
          "value": "Double Stitch"
        }
      ]}/>
      {/* <Reviews renderStarRating={this.renderStarRating} currProduct={this.state.curr_product_id} sendReview={this.sendReview}/> */}
    </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index/>);