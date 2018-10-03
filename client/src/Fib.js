import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndices: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndices();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndices() {
        const seenIndices = await axios.get('/api/values/all');
        this.setState({
            seenIndices: seenIndices.data
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        await axios.postMessage('/api/values', {
            index: this.state.index
        });
        this.setState({ index: '' });
    }

    renderSeenIndices() {
        return this.state.seenIndices.map(({ number }) => number).join(', ');
    }

    renderValues() {
        return Object.keys(this.state.values).map(key => (
            <div key={key}>
                For index {key}, I calculated {this.state.values[key]}
            </div>
        ));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter you index:</label>
                    <input
                        type="text"
                        value={this.state.index}
                        onChange={event => this.setState({ index: event.target.value })}
                    />
                    <button>Submit</button>
                </form>

                <h3>Indices Seen:</h3>
                {this.renderSeenIndices()}

                <h3>Calculated Values:</h3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Fib;