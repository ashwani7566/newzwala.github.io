import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
 const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  useEffect(() => {
    document.title=`Newz Wala-${capitalizeFirstLetter(props.category)}`
    updateNews()
    // eslint-disable-next-line
  },[])
  
  
  const updateNews=()=>{
    setLoading(true)
    props.setProgress(20)
    fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`).then((response)=>response.json()).then((data)=>{
      props.setProgress(99.9)
      setArticles(data.articles)
      setTotalResults(data.totalResults)
      setLoading(false)
    })
    props.setProgress(100)
  }

  const fetchMoreData = async() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`).then((response)=>response.json()).then((data)=>{
      setPage(page+1)
      setArticles(articles.concat(data.articles))
      setTotalResults(data.totalResults)
      setLoading(false)
    })
  };

    return (
      <>
        <h2 className="text-center my-3" style={{paddingTop:'60px'}}>Newz Wala-Top {capitalizeFirstLetter(props.category)} Headlines</h2>
         {loading&&<Spinner/>} 
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length<totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
              {articles?.map((element)=>{ 
              return <div className="col-md-4 my-2" key={element.url}>
                  <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
              })}
          </div>
          </div>
        </InfiniteScroll>
        </>
    )
}

News.defaultProps={
  country:'in',
  pageSize:15,
  category:"general"
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News