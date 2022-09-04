import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Overview from './components/Overview.jsx';
import QandA from './components/QandA.jsx';
import RelatedItemsAndOutfits from './components/relateditemsandoutfit/RelatedItemsAndOutfits.jsx'

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curr_product_id: 71701,
      curr_product_name: 'Camo Onesie',
    }
    this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
    this.renderStarRating = this.renderStarRating.bind(this);
  }

  updateCurrentProduct(e) {
    this.setState({curr_product_id: e.event.product_id});
  };

  renderStarRating(rating) {

    const stars = [];

    for(let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i}/>);
      } else {
        stars.push(<AiOutlineStar key={i}/>)
      }
    }

    return stars.map((star) => {
      return star
    })
  }

  render() {
    return (
    <div>
      <Overview curr_product_id={this.state.curr_product_id} renderStars={this.renderStarRating}/>
      <QandA curr_product_id={ this.state.curr_product_id } curr_product_name={ this.state.curr_product_name }/>
      <RelatedItemsAndOutfits p_id={this.state.curr_product_id} currentProduct={this.state.curr_product_name} currentFeatures={[
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
    </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index/>);