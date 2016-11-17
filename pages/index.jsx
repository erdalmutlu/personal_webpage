import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import moment from 'moment'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import SitePost from '../components/SitePost'
import SiteSidebar from '../components/SiteSidebar'
import PocketFeed from '../components/PocketFeed'

class SiteIndex extends React.Component {
    // componentDidMount() {
    //     const Retrieve = require('../scripts/RetrievePocket');

    //     const pfContainer = (
    //     <div>
    //       <Retrieve >
    //         <PocketFeed />
    //       </Retrieve>
    //     </div>
    //     )
    //     ReactDOM.render(pfContainer, ReactDOM.findDOMNode(this.refs.pocket))
    // }

    render() {
        const pageLinks = []
        // Sort pages.
        const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
        ).reverse()
        console.log(sortedPages)
        sortedPages.forEach((page) => {
            if (access(page, 'file.ext') === 'md' && page.path === '\/about\/') {
                const title = access(page, 'data.title') || page.path
                const description = access(page, 'data.description')
                const body = access(page, 'data.body')
                // const datePublished = access(page, 'data.date')
                // const category = access(page, 'data.category')

                // pageLinks.push(
                //     <div className='blog-post'>
                //       <time dateTime={ moment(datePublished).format('MMMM D, YYYY') }>
                //         { moment(datePublished).format('MMMM YYYY') }
                //       </time>
                //       <span style={ {    padding: '5px'} }></span>
                //       <span className='blog-category'>{ category }</span>
                //       <h2><Link style={ {    borderBottom: 'none',} } to={ prefixLink(page.path) } > { title } </Link></h2>
                //       <p dangerouslySetInnerHTML={ {    __html: description} } />
                //       <Link className='readmore' to={ prefixLink(page.path) }> Read
                //       </Link>
                //     </div>
                // )
                pageLinks.push(
                  <div className='blog-page'>
                    <div className='text'>
                      <h1>{ title }</h1>
                      <div dangerouslySetInnerHTML={ {    __html: body} } />
                    </div>
                  </div>
                )
            }
        })

        return (
            <DocumentTitle title={ config.siteTitle }>
              <div>
                <SiteSidebar {...this.props}/>
                <div className='content'>
                  <div className='main'>
                    <div className='main-inner'>
                      { pageLinks }
                    </div>
                  </div>
                </div>
              </div>
            </DocumentTitle>
        )
    }
}

SiteIndex.propTypes = {
    route: React.PropTypes.object,
}

export default SiteIndex