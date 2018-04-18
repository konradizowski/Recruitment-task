import React from 'react';
import ReactDOM from 'react-dom';
import data from "./db/data.json";
import {HashRouter, Router, Route, Link} from 'react-router-dom';
require('./scss/main.scss');

const Row = ({id, firstName, lastName, dateOfBirth, company, note}) => (
    <div className="row">
        <div className="id">{id}</div>
        <div className="firstName">{firstName}</div>
        <div className="lastName">{lastName}</div>
        <div className="dateOfBirth">{dateOfBirth}</div>
        <div className="company">{company}</div>
        <div className="note">{note}</div>
    </div>
);


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            firstName: undefined ,
            lastName: undefined,
            dateOfBirth: undefined,
            company: undefined,
            note: undefined,
            data: data

        };

        this.compareBy.bind(this);
        this.sortBy.bind(this);
    }



    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy(key) {
        let arrayCopy = [...this.state.data];
        arrayCopy.sort(this.compareBy(key));
        this.setState({data: arrayCopy});
    }

    render() {
        console.log(this.props.page);
        const paged = this.state.data.filter((val, i) => i < this.props.page * 5 && i >= (this.props.page - 1)*5)
        const Rows = paged.map((rowData) => <Row {...rowData} />);

        let navs = this.state.data.map((e,i) => {
            if(i%5 == 0) {
                return <Link to={"/" + (i / 5 + 1)}>{i/5+1}</Link>
            }
        });

        return (
            <div className="table">
                <div className="header">
                    <div onClick={() => this.sortBy('id')}>ID</div>
                    <div onClick={() => this.sortBy('firstName')}>First Name</div>
                    <div onClick={() => this.sortBy('lastName')}>Last Name</div>
                    <div onClick={() => this.sortBy('dateOfBirth')}>Date of Birth</div>
                    <div onClick={() => this.sortBy('company')}>Company</div>
                    <div onClick={() => this.sortBy('note')}>Note</div>
                </div>
                <div className="body">
                    {Rows}
                </div>
                <nav>
                    {navs}
                </nav>
            </div>
        );

    }

}


class Page extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
            <div>
                <Table page={this.props.match.params.page ? this.props.match.params.page : 1}/>
            </div>
        )
    }
}



class App extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
            <div>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Page}></Route>
                        <Route path="/:page" component={Page}></Route>
                    </div>
                </HashRouter>
            </div>
        )
    }
}

document.addEventListener("DOMContentLoaded", function(){

    ReactDOM.render(
        <App />,
        document.querySelector('#app')
    )

});
