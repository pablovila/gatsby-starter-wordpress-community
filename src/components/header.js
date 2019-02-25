import React, { Component } from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import logo from "../images/logo.svg";

class Header extends Component {
  componentDidMount() {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(el => {
        el.addEventListener("click", () => {
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          {
            wordpressWpSettings {
              title
              description
            }
            allWordpressPage {
              edges {
                node {
                  title
                  wordpress_id
                  slug
                }
              }
            }
          }
        `}
        render={data => {
          const wordpressPages = data.allWordpressPage.edges;
          const wordpressMetadata = data.wordpressWpSettings;
          return (
            <section className="hero is-primary is-medium">
              <div className="hero-head">
                <nav className="navbar is-primary">
                  <div className="container">
                    <div className="navbar-brand">
                      <Link
                        to="/"
                        className="navbar-item"
                        title="Gatsby Starter WordPress Community"
                      >
                        <img
                          src={logo}
                          alt="Gatsby Starter WordPress Community"
                          style={{ width: "88px" }}
                        />
                      </Link>
                      <div
                        className="navbar-burger burger"
                        data-target="navMenu"
                      >
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                    <div id="navMenu" className="navbar-menu">
                      <div className="navbar-end has-text-centered">
                        {wordpressPages.map(page => (
                          <Link
                            className="navbar-item"
                            to={`/${page.node.slug}`}
                            key={page.node.wordpress_id}
                          >
                            {page.node.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h1 className="title">{wordpressMetadata.title}</h1>
                  <h2 className="subtitle">{wordpressMetadata.description}</h2>
                </div>
              </div>
            </section>
          );
        }}
      />
    );
  }
}

export default Header;
