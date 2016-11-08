import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import './style.css'

class SiteNav extends React.Component {
    render() {
        const {location} = this.props
        return (
            <nav className='blog-nav'>
              <ul>
                <li>
                  <Link to="/" className={ location.pathname === prefixLink('/') ? "current" : null }> Home
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/education/')} className={ location.pathname === prefixLink('/education/') ? "current" : null }> Education
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/projects/')} className={ location.pathname === prefixLink('/projects/') ? "current" : null }> Projects
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/publications/')} className={ location.pathname === prefixLink('/publications/') ? "current" : null }> Publications
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/about/')} className={ location.pathname === prefixLink('/about/') ? "current" : null }> About me
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/contact/')} className={ location.pathname === prefixLink('/contact/') ? "current" : null }> Contact me
                  </Link>
                </li>
              </ul>
            </nav>
            );
    }
}

SiteNav.propTypes = {
    location: React.PropTypes.object,
}

export default SiteNav