import React, {Component} from 'react';
import NewsItems from "./NewsItems";
import img from "./image/alt_img.jpg"
import Spiner from "./Spiner";
import PropTypes from "prop-types";

class News extends Component {
    static defaultProps = {
        country: "in",
        category: "general"
    }
    static propType = {
        country: PropTypes.string,
        category: PropTypes.string
    }

    constructor() {
        super();
        // console.log("log from news")
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    // static time(publishedAt) {
    //     const d = new Date(publishedAt);
    //     return d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
    // }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08ef0bd4fb4c4a2abeaa5f21acf314cc&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})


    }

    pagehandelerpriv = async () => {
        // console.log("previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08ef0bd4fb4c4a2abeaa5f21acf314cc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    pagehandelernext = async () => {
        // console.log("next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08ef0bd4fb4c4a2abeaa5f21acf314cc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true})
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData)
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    render() {
        return (

            <div className="container my-3">
                <h2 className="justify-content-center align-items-start d-flex flex-column text-capitalize">NewsTime
                    - Top {this.props.category} News</h2>
                {this.state.loading && <Spiner/>}
                <div className="row ">
                    {!this.state.loading && this.state.articles.map((element) => {
                            return <div
                                className="col-12 col-lg-4 col-md-6 my-3 justify-content-center align-items-center d-flex flex-column"
                                key={element.url}>
                                <NewsItems title={element.title ? element.title.slice(0, 15) : ""}
                                           description={element.description ? element.description.slice(0, 66) : ""}
                                           image={element.urlToImage ? element.urlToImage : img} newsurl={element.url}
                                           author={element.author ? element.author : "Unknown"} //pubdate={News.time(element.publishedAt)}
                                           pubdate={element.publishedAt}
                                />
                            </div>
                        }
                    )
                    }
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary"
                            onClick={this.pagehandelerpriv}>&larr; Privies
                    </button>
                    <button
                        disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
                        type="button"
                        className="btn btn-primary"
                        onClick={this.pagehandelernext}>Next &rarr;</button>
                </div>
            </div>

        );
    }
}

export default News;