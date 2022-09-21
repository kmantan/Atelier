import React from "react";
import * as ReactDOM from "react-dom/client";
import Reviews from "./components/RatingsAndReviews/Reviews.jsx";
const Axios = require("axios");
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import Overview from "./components/Overview.jsx";
import QandA from "./components/QandA.jsx";
import RelatedItemsAndOutfits from "./components/relateditemsandoutfit/RelatedItemsAndOutfits.jsx";
import clickWrapper from "./ClickWrapper.jsx";
import QuarterStar from "./components/RatingsAndReviews/QuarterStar.js";
import ThreeQuarterStar from "./components/RatingsAndReviews/ThreeQuarterStar.js";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curr_product_id: 71700,
      curr_product_name: "Slacker's Slacks",
      curr_product_features: [],
      curr_product_data: [],
      url_path: "/71700",
    };
    this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
    this.renderStarRating = this.renderStarRating.bind(this);
    this.getProductFeatures = this.getProductFeatures.bind(this);
  }

  getProductFeatures () {
    Axios.get('/products', {params: { p_id: this.state.curr_product_id }})
      .then((res) => {
        this.setState({
          curr_product_name: res.data.name,
          curr_product_features: res.data.features,
          curr_product_data: res.data
        });
      })
      .catch((err) => {
      console.log(err);
      });
  }

  updateCurrentProduct(p_id) {
    this.setState({
      url_path: p_id,
      curr_product_id: p_id,
    });
    window.history.pushState('', 'Atelier', p_id);

    Axios.get('/products', {params: { p_id: p_id }})
      .then((res) => {
        this.setState({
          curr_product_name: res.data.name,
          curr_product_features: res.data.features,
          curr_product_data: res.data
        });
      })
      .catch((err) => {
      console.log(err);
      });
  }

  renderStarRating(rating) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} />);
      } else if (i > rating && rating + 1 > i) {
        var ratingDifference = i - rating;
        if(ratingDifference < 0.5){
          stars.push(<ThreeQuarterStar className="reviews-QuarterStar" key={i} />);
        } else if (ratingDifference >= 0.75) {
          stars.push(<QuarterStar className="reviews-ThreeQuarterStar" key={i} />);
        } else {
          stars.push(<FaStarHalfAlt className="reviews-halfStar" key={i} />) ;
        }
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars.map((star) => {
      return star;
    });
  }

  componentDidMount() {
    window.history.pushState('', 'Atelier', this.state.url_path);
    this.getProductFeatures();
  }

  render() {
    const WrappedOverview = clickWrapper(Overview);
    const WrappedQandA = clickWrapper(QandA);
    const WrappedRelatedItemsAndOutfits = clickWrapper(RelatedItemsAndOutfits);
    const WrappedReview = clickWrapper(Reviews);

    return (
      <div>
        <WrappedOverview
          curr_product_id={this.state.curr_product_id}
          renderStars={this.renderStarRating}
          prodData = {this.state.curr_product_data}
        />
        <WrappedRelatedItemsAndOutfits
        renderStarRating={this.renderStarRating}
          updateCurrentProduct={this.updateCurrentProduct}
          p_id={this.state.curr_product_id}
          currentProduct={this.state.curr_product_name}
          currentFeatures={this.state.curr_product_features}
          renderStarRating={this.renderStarRating}
        />
        <WrappedQandA
          curr_product_id={this.state.curr_product_id}
          curr_product_name={this.state.curr_product_name}
        />
        <WrappedReview
          currProduct={this.state.curr_product_id}
          renderStarRating={this.renderStarRating}
          productName={this.state.curr_product_name}
        />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
