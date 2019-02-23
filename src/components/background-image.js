import React from "react";
import StockImages from "./stock-images";

const BackgroundImage = props => {
  if (props.src) {
    return (
      <div
        className="post-cover"
        style={{ backgroundImage: `url(${props.src})` }}
      >
        {props.children}
      </div>
    );
  } else {
    return <StockImages index={props.index}>{props.children}</StockImages>;
  }
};

export default BackgroundImage;
