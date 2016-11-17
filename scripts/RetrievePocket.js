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
		  "consumer_key": "",
		  "request_token": "",
		  "access_token": ""
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