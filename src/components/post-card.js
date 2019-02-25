import React from "react";
import { Link } from "gatsby";
import BackgroundImage from "./background-image.js";

const PostCard = props => {
  let imageSrc = null;
  if (props.media && props.media.localFile)
    imageSrc = props.media.localFile.childImageSharp.fixed.src;

  const index = props.index;

  return (
    <div
      className={`column post-card ${
        index === 0 || index === 4
          ? "is-full"
          : "is-one-third-desktop is-full-mobile"
      }`}
    >
      <BackgroundImage src={imageSrc} index={index}>
        <Link to={`/${props.slug}`} />
      </BackgroundImage>
      <div className="post-excerpt">
        <p className="title">
          <Link
            dangerouslySetInnerHTML={{ __html: props.title }}
            to={`/${props.slug}`}
          />
        </p>
        <div className="excerpt">
          <div className="content">
            <p dangerouslySetInnerHTML={{ __html: props.excerpt }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
