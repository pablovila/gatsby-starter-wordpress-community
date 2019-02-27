import React from "react";
import { StaticQuery, graphql } from "gatsby";

const StockImages = props => (
  <StaticQuery
    query={graphql`
      fragment fluidImage on File {
        childImageSharp {
          fluid(maxWidth: 700) {
            src
          }
        }
      }
      query {
        image1: file(relativePath: { eq: "stock-blogger-1.jpg" }) {
          ...fluidImage
        }
        image2: file(relativePath: { eq: "stock-blogger-2.jpg" }) {
          ...fluidImage
        }
        image3: file(relativePath: { eq: "stock-blogger-3.jpg" }) {
          ...fluidImage
        }
        image4: file(relativePath: { eq: "stock-blogger-4.jpg" }) {
          ...fluidImage
        }
        image5: file(relativePath: { eq: "stock-blogger-5.jpg" }) {
          ...fluidImage
        }
      }
    `}
    render={data => {
      const images = {
        0: data.image1.childImageSharp.fluid.src,
        1: data.image2.childImageSharp.fluid.src,
        2: data.image3.childImageSharp.fluid.src,
        3: data.image4.childImageSharp.fluid.src,
        4: data.image5.childImageSharp.fluid.src
      };
      const imgSrc = images[props.index];
      return (
        <div
          className="post-cover"
          style={{ backgroundImage: `url(${imgSrc})` }}
        >
          {props.children}
        </div>
      );
    }}
  />
);
export default StockImages;
