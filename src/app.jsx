import React from 'react';
import ReactDOM from 'react-dom';
import data from "./db/data.json";
require('./scss/main.scss');
import pagination from './pagination';

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
        const Rows = this.state.data.map((rowData) => <Row {...rowData} />);

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
            </div>
        );

    }



}



class App extends React.Component {
   constructor(props){
     super(props);

   }
   render() {
     return (
         <div>
     <Table/>
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

