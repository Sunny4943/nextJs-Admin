import React from 'react'

class Test extends React.Component {

    state = { loginid: "123" }


    static async getInitialProps(ctx) {
        return {
            props: this.state
        }
    }

    render() {
        return <p> {JSON.stringify(this.props)} </p>
    }
}
export default Test;
