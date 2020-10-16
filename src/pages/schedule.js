import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ScheduleItem from './../components/schedule/ScheduleItem';

const backend_schedule = graphql`
  query {
  allStrapiScheduleItem(sort: {fields: start_time, order: ASC}) {
    nodes {
      start_time
      title
      lecturer {
        name
        organisation
      }
      description
    }
  }
}`


const Schedule = () => (
  <Layout>
    <SEO title="schedule" />
    <h1>Schedule</h1>
    <p>Schedule of all events</p>
    <Link to="/">Go back to the main menu</Link>
    <StaticQuery 
      query={backend_schedule} 
      render={
        data=>(
          <div>
            {data.allStrapiScheduleItem.nodes.map(item => {
              console.log("item: ", item)
              return(
              <ScheduleItem 
                title={item.title}
                start_time={item.start_time}
                lecturer_name={item.lecturer?.name}
                lecturer_organisation={item.lecturer?.organisation}
                description={item.description}
              />
            )})}
          </div>
        )
      }
    />
  </Layout>
)

export default Schedule