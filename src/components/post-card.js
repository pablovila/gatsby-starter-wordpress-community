import React from "react";
import { Link } from "gatsby";

const PostCard = props => (
  <div>
    <h1>
      <Link
        dangerouslySetInnerHTML={{ __html: props.title }}
        to={`/${props.slug}`}
      />
    </h1>
    <p dangerouslySetInnerHTML={{ __html: props.excerpt }} />
  </div>
);

export default PostCard;
