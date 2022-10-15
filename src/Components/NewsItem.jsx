import React from "react";
import BI from "../brokenImage.png";

const NewsItem = ({ title, description, imageUrl, newsUrl, date, author }) => {
  return (
    <div className="my-3">
      <div className="card">
        <img
          src={imageUrl}
          className="card-img-top text-center fw-bold fs-3"
          alt=""
        />

        <div className="card-body">
          <p className="card-title fw-bold">
            {title?.length > 60 ? title.slice(0, 60) + "...." : title}
            <small className="fs-6 fw-semibold">
              {title == null
                ? `No HeadLine Found go to "Read more" for more Info`
                : ""}
            </small>
          </p>
          <p className="card-text fw-light mt-3">
            {description?.length > 150
              ? description.slice(0, 150) + "...."
              : description}
            <small className="fs-6 fw-semibold">
              {description == null
                ? `No Description Found go to "Read more" for more Info`
                : ""}
            </small>
          </p>
          <p className="cardd-text">
            <small className="text-muted">
              By {!author ? "unknown" : author} on
              {new Date(date).toLocaleString()}
            </small>
          </p>
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

/* Class Based Components 

import React, { Component } from "react";

class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, date, author } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="cardd-text">
              <small className="text-muted">
                By {!author ? "unknown" : author} on{" "}
                {new Date(date).toLocaleString()}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
*/
