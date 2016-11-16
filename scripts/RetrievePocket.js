import React from 'react'

var simplepocket = require('simplepocket');
var polyfill = require('es6-promise').polyfill()

export default class Retrieve extends React.Component {
    constructor() {
        super()

        this.state = {}
        this.getPocketList()
    }

    getPocketList() {
    	var config = {
		  "consumer_key": "60557-4a9d6a18243a4774db40eb89",
		  "request_token": "21d1e565-0942-c452-4b6a-823543",
		  "access_token": "fc23705f-a06e-de49-3d08-1f5196"
		};
        console.log("getPocketList");
        var lib = new simplepocket.Pocket(config.consumer_key, config.access_token);
        console.log("generateLib");
		lib.request('/get', { count : 6 })
		.then(res => {
                return res.json()
            })
            .then(json => {
                this.setState(json)
                if (this.props.onSuccess) this.props.onSuccess(json)
            })
            .catch(error => {
                if (this.props.onError) this.props.onError(error)
            })
    }

    children() {
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, this.state)
        })
    }

    render() {
        return (
            <div>
              { this.children() }
            </div>
        )
    }
}