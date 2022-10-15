import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const captailizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [country, setCountry] = useState("us");

  document.title = `News Monkey - ${captailizeFirstLetter(props.category)}`;

  // const handleChange = (e) => {
  //   setCountry(() => {
  //     e.target.value = country;
  //     console.log(e.target.value);
  //   });
  // };
  // console.log(country);

  const updateNews = async () => {
    setArticles([]);
    setTotalResults(0);
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    console.log(country);
  }, [country]);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${
      props.category
    }&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    const temp = [...articles, ...parsedData.articles];
    console.log(temp);
    setArticles(temp);
    console.log(articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "80px 0px 35px" }}>
        News Monkey - Top {captailizeFirstLetter(props.category)} Headlines
      </h1>
      <div className="country d-flex justify-content-center align-items-center mb-5">
        <label
          htmlFor="country"
          className="text-light text-center fs-5 fw-bold me-3"
        >
          Choose the Country
        </label>
        <select
          className="text-center"
          id="country"
          onChange={(e) => {
            const selectedCountry = e.target.value;
            console.log(selectedCountry);
            setCountry(selectedCountry.toLowerCase());
          }}
          value={country.toUpperCase()}
        >
          <option value="AR">Argentina</option>
          <option value="AT">Austria</option>
          <option value="AU">Australia</option>
          <option value="BE">Belgium</option>
          <option value="BG">Bulgaria</option>
          <option value="BR">Brazil</option>
          <option value="CA">Canada</option>
          <option value="CH">Switzerland</option>
          <option value="CN">China</option>
          <option value="CO">Colombia</option>
          <option value="CZ">Czech Republic</option>
          <option value="DE">Germany</option>
          <option value="EG">Egypt</option>
          <option value="FR">France</option>
          <option value="GB">United Kingdom</option>
          <option value="GR">Greece</option>
          <option value="HK">Hong Kong</option>
          <option value="HU">Hungary</option>
          <option value="ID">Indonesia</option>
          <option value="IE">Ireland</option>
          <option value="IL">Israel</option>
          <option value="IN">India</option>
          <option value="IT">Italy</option>
          <option value="JP">Japan</option>
          <option value="LT">Lithuania</option>
          <option value="LV">Latvia</option>
          <option value="MA">Morocco</option>
          <option value="MX">Mexico</option>
          <option value="MY">Malaysia</option>
          <option value="NG">Nigeria</option>
          <option value="NL">Netherlands</option>
          <option value="NO">Norway</option>
          <option value="NZ">New Zealand</option>
          <option value="PH">Philippines</option>
          <option value="PL">Poland</option>
          <option value="PT">Portugal</option>
          <option value="RO">Romania</option>
          <option value="RS">Serbia</option>
          <option value="RU">Russian Federation</option>
          <option value="SA">Saudi Arabia</option>
          <option value="SE">Sweden</option>
          <option value="SG">Singapore</option>
          <option value="SI">Slovenia</option>
          <option value="SK">Slovakia</option>
          <option value="TH">Thailand</option>
          <option value="TR">Turkey</option>
          <option value="TW">Taiwan, Province of China</option>
          <option value="UA">Ukraine</option>
          <option value="AE">United Arab Emirates</option>
          <option value="US">United States</option>
          <option value="VE">Venezuela</option>
          <option value="ZA">South Africa</option>
        </select>
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          {loading && <Spinner />}
          <div className="row">
            {articles.map((el) => {
              return (
                <div className="col-md-6 col-lg-4" key={el.url}>
                  <NewsItem
                    title={el.title}
                    description={el.description}
                    imageUrl={el.urlToImage}
                    newsUrl={el.url}
                    author={el.author}
                    date={el.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;

/*Class based Components
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  captailizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = { articles: [], loading: true, page: 1, totalResults: 0 };
    document.title = `News Monkey - ${this.captailizeFirstLetter(
      this.props.category
    )}`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          {`News Monkey - Top ${this.captailizeFirstLetter(
            this.props.category
          )} Headlines`}
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            {this.state.loading && <Spinner />}
            <div className="row">
              {this.state.articles.map((el) => {
                return (
                  <div className="col-md-4" key={el.url}>
                    <NewsItem
                      title={el.title}
                      description={el.description}
                      imageUrl={el.urlToImage}
                      newsUrl={el.url}
                      author={el.author}
                      date={el.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;



*/

// handlePrevious = async () => {
//   this.setState({ page: this.state.page - 1 });
//   this.updateNews();
// };
// handleNext = async () => {
//   this.setState({ page: this.state.page + 1 });
//   this.updateNews();
// };

/* <div className="container d-flex justify-content-between">
    <button
      disabled={this.state.page <= 1}
      type="button"
      onClick={this.handlePrevious}
      className="btn btn-dark"
    >
      &larr; Previous
    </button>
    <button
      type="button"
      disabled={
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      }
      onClick={this.handleNext}
      className="btn btn-dark"
    >
      Next &rarr;
    </button> 
       </div>*/
