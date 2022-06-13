import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(){
        super();
        console.log("Hello I am a constructor from the News component");
        this.state = {
            articles: [],
            loading: false, //for the spinner or loading emoticon
            page:1
        }
    }

    //function to give you top headlines for that particular day
    async componentDidMount(){
      //This particular component will run after the render method will execute perfectly
      //console.log("cdm");
      let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=f4759245c9744ac1b4c2a7e52ba3a7ed&page=1&pageSize=20";
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults})
    }

    handlePreviousClick = async () => {
      console.log("Previous")
      //console.log("Next");

      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f4759245c9744ac1b4c2a7e52ba3a7ed&page=${this.state.page - 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      //this.setState({articles: parsedData.articles})



     // console.log("Next")
      this.setState({
        page: this.state.page - 1,
        articles:parsedData.articles
      })

    }

    handleNextClick = async () => {

      console.log("Next");
      if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

      }
      else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f4759245c9744ac1b4c2a7e52ba3a7ed&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      //this.setState({articles: parsedData.articles})



     // console.log("Next")
      this.setState({
        page: this.state.page + 1,
        articles:parsedData.articles
      })
      }

      
    }


  render() {
    //console.log("render");
    return (
      <div className="container my-3 mx-30">
          <h2><center>The Hindu XC - Top Headlines</center></h2>
          
          <div className="row">
          {this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage} newsUrl={element.url}/>
              </div>
          })}
          
              
          
          
          
          

          
          </div>
          
            
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
            <button className="btn btn-dark mx-3" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>

      </div>
    )
  }
}

export default News