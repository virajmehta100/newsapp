import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {


    static defaultProps = {
      country:'in',
      pageSize: 8,
      category: 'general'
    }

    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }

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
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4759245c9744ac1b4c2a7e52ba3a7ed&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults,
      loading:false})
    }

    handlePreviousClick = async () => {
      console.log("Previous")
      //console.log("Next");

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4759245c9744ac1b4c2a7e52ba3a7ed&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      //this.setState({articles: parsedData.articles})



     // console.log("Next")
      this.setState({
        page: this.state.page - 1,
        articles:parsedData.articles,
        loading:false
      })

    }

    handleNextClick = async () => {

      console.log("Next");
      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4759245c9744ac1b4c2a7e52ba3a7ed&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
      let parsedData = await data.json();
      //console.log(parsedData);
      //this.setState({loading:false});
      //this.setState({articles: parsedData.articles})



     // console.log("Next")
      this.setState({
        page: this.state.page + 1,
        articles:parsedData.articles,
        loading:false
      })
      }

      
    }


  render() {
    //console.log("render");
    return (
      <div className="container my-3 mx-30">
          <h2 style={{margin:"35px 0px"}}><center>The Hindu XC - Top Headlines</center></h2>
          {this.state.loading && <Spinner/>}
          <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
          })}
          
              
          
          
          
          

          
          </div>
          
            
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark mx-3" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>

      </div>
    )
  }
}

export default News