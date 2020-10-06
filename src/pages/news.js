import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const News = () => (
  <Layout>
    <SEO title="news" />
    <h1>News</h1>
    <p>List of news</p>
    <Link to="/">Go back to the main menu</Link>
  </Layout>
)

export default News