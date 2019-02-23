import React from "react";
import PropTypes from "prop-types";

import Navbar from "./navbar";
import Footer from "./footer";
import "../style/style.scss";

const SimpleLayout = ({ children }) => (
  <>
    <Navbar />
    <section className="section">
      <main className="container">{children}</main>
    </section>
    <Footer />
  </>
);

SimpleLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default SimpleLayout;
