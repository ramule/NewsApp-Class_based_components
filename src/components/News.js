import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor(props) {
      super(props);

      this.state = {
          articles: [],
          loading: false,
          page: 1,
          totalResults: 0
      };

      document.title = `${this.props.category ? this.capitalizeFirstLetter(this.props.category) : 'General'}+ NewsMonkey`
  }

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async updateNews() {
    this.props.setProgress(10);
    this.setState({loading: true});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log("parsedData: ", parsedData);
    this.setState({ articles: parsedData.articles, loading: false, totalResults: parsedData.totalResults});
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  onPreviousClick = async () => {
    this.setState({ page: this.state.page - 1});
    this.updateNews();
  }

  onNextClick = async () => {
    this.setState({ page: this.state.page + 1});
    this.updateNews();
  }

  fetchMoreData = async() => {
    this.setState({ page: this.state.page + 1, loading: true});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("parsedData: ", parsedData);
    this.setState({ 
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      totalResults: parsedData.totalResults
    });
  }

  render() {
    return (
      <>
        {/* {this.state.loading && <Spinner />} */}
        <h2>News Monkey - Top headlines</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={ this.fetchMoreData }
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner />}
        >
          <div className="container">
            <div className='row my-3'>
              {this.state.articles.map((element, index) => {
                  return <div className="col-md-4" key={index}>
                  <NewsItem key={element.key} title={element.title ? element.title.slice(0, 88): "No Title"} description={element.description ? element.description.slice(0, 88) : "-"} imageUrl={element.urlToImage} newsUrl={element.url}/>
                  </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* {
        !this.state.loading && 
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1 } className="btn-dark" onClick={this.onPreviousClick}>&larr;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn-dark" onClick={this.onNextClick}>Next &rarr;</button>
        </div>
        } */}
      </>
    )
  }
}
