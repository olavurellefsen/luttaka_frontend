import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const News = () => (
  <Layout>
    <SEO title="signup" />
    <h1>Sign up</h1>
    <p>Sign up for amazing events</p>
    <Link to="/">Go back to the main menu</Link>
  </Layout>
)

export default News