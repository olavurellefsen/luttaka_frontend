import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const News = () => (
  <Layout>
    <SEO title="Archive" />
    <h1>Archive</h1>
    <p>Good old stuff</p>
    <Link to="/">Go back to the main menu</Link>
  </Layout>
)

export default News