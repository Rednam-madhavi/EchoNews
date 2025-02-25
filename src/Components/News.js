import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loader from './Loader';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        setProgress: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - EchoNews`;
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    async fetchNews(page = 1, append = false) {
        try {
            this.props.setProgress(10);
            this.setState({ loading: true });

            const apiKey = process.env.NEWS_API_KEY; 
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${page}&pageSize=${this.props.pageSize}`;

            let response = await fetch(url);
            this.props.setProgress(50);

            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }

            let data = await response.json();
            this.props.setProgress(80);

            this.setState((prevState) => ({
                articles: append ? prevState.articles.concat(data.articles) : data.articles,
                totalResults: data.totalResults,
                loading: false,
                page,
            }));

            this.props.setProgress(100);
        } catch (error) {
            console.error('Error fetching news:', error);
            this.setState({ loading: false });
            this.props.setProgress(100);
        }
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchMoreData = () => {
        this.fetchNews(this.state.page + 1, true);
    };

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '70px 0px 15px' }}>
                    EchoNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
                </h1>

                {this.state.loading && <Loader />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Loader />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element?.title || 'No Title'}
                                        description={element?.description || 'No description available'}
                                        imageUrl={element?.urlToImage}
                                        newsUrl={element?.url}
                                        author={element?.author || 'Unknown'}
                                        date={element?.publishedAt}
                                        source={element?.source?.name || 'Unknown Source'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}

export default News;
