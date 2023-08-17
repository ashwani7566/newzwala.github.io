import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div>
      <div className="card" >
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className=" rounded-pill bg-danger" >{source}<span className="visually-hidden">unread messages</span></span>
        </div>
        <img src={imageUrl ? imageUrl : "https://news.cgtn.com/news/2023-08-15/12-killed-at-petrol-station-fire-in-Russia-s-Dagestan-1mhmx2fJ5CM/img/957a4a8461424840bb637528ab55376d/957a4a8461424840bb637528ab55376d-1280.jpeg"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()} </small></p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem