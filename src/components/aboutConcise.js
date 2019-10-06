import React from 'react'
import { NavLink } from 'react-router-dom'
import { graphql, useStaticQuery } from 'gatsby'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { MARKS } from '@contentful/rich-text-types';


const AboutConcise = () => {
    const data = useStaticQuery(graphql`
        query AboutConciseQuery {
            allContentfulAboutConcise  {
                nodes {
                    id
                    title
                    body {
                        json
                    }
                }
            }
        }
    `)

    const options = {
        renderMark: {
            [MARKS.UNDERLINE]: text => `<span>${text}</span>`
        }
    }

    const { title, body } = data.allContentfulAboutConcise.nodes[0];
    const aboutLink = <NavLink activeClassName='active' to='/about'>Read more.</NavLink>

    return (
        <>
            <div className="about-concise" key={title} dangerouslySetInnerHTML={{ __html: documentToHtmlString(body.json.content[0], options) }} />

            <span>{aboutLink}</span>
        </>
    )
}

export default AboutConcise