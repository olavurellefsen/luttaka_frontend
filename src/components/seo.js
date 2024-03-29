/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"

function SEO({ description, lang, meta, image: metaImage, title, pathname, href  }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )
  const location = useLocation()
  const metaDescription = description
  const isMediaAward = location.pathname.split(`/`)[2]?.match("awards" ) ? true : false
  const image =
    metaImage && metaImage.src
      ? `${isMediaAward ? `` : process.env.GATSBY_PUBLIC_URL}${metaImage.src}`
      : null

  const canonical = pathname ? `${process.env.GATSBY_PUBLIC_URL}${pathname}` : null
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={
        canonical
          ? [
            {
              rel: "canonical",
              href: canonical,
            },
          ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(
        metaImage
          ? [
            {
              property: "og:image",
              content: image
            },
            {
              property: "og:image:width",
              content: metaImage.width,
            },
            {
              property: "og:image:height",
              content: metaImage.height,
            },
            {
              name: "twitter:card",
              content: "summary_large_image",
            },
          ]
          : [
            {
              name: "twitter:card",
              content: "summary",
            },
          ]
      ).concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  pathname: PropTypes.string,
  href: PropTypes.string,
}

export default SEO
