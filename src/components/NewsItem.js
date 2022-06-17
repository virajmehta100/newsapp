import React, { Component } from 'react'

export class NewsItem extends Component {
    
    /*myStyle = {
        width: "18rem"
    }*/
  render() {
     let {title,description,imageUrl,newsUrl}=this.props;
    return (
      <div className="my-3">
          <div className="card" /*style={this.myStyle}*/>
            <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem