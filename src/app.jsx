import React from 'react';
import ReactDOM from 'react-dom';
import data from './db/data.json';

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

/*
  Table component written as an ES6 class
*/
class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            data:

                [
                    // {id: this.state.data.id, firstName: this.state.data.firstName, lastName: this.state.data.lastName, dateOfBirth: this.state.data.dateOfBirth, company: this.state.data.company, note: this.state.data.note},
                    // {id: 532, title: 'Task 532', priority: 'Medium', type: 'Improvement', complete: 30},
                    // {id: 240, title: 'Task 240', priority: 'High', type: 'Story', complete: 66},
                ],


        };
    }
    ComponentDidMount () {
        fetch('./db/data.json')
            .then(r => r.json())
            .then(data => {
                return(
                console.log(data),
                this.setState({id: this.state.data.id, firstName: this.state.data.firstName, lastName: this.state.data.lastName, dateOfBirth: this.state.data.dateOfBirth, company: this.state.data.company, note: this.state.data.note},
                )

                )
            });


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
        const rows = this.state.data.map( (rowData) => <Row {...rowData} />);

        return (
            <div className="table">
                <div className="header">
                    <div onClick={() => this.sortBy('id')} >ID</div>
                    <div onClick={() => this.sortBy('firstName')}>First Name</div>
                    <div onClick={() => this.sortBy('lastName')}>Last Name</div>
                    <div onClick={() => this.sortBy('dateOfBirth')}>Date of Birth</div>
                    <div onClick={() => this.sortBy('company')}>Company</div>
                    <div onClick={() => this.sortBy('note')}>Note</div>
                </div>
                <div className="body">
                    {rows}
                </div>
            </div>
        );

    }
}

/*
 * Render the above component into the div#app
 */
ReactDOM.render(
    <Table />,
    document.getElementById('app'));









/*

class App extends React.Component {
   constructor(props){
     super(props);

   }
   render() {
     return (
     <Hello />
     )
   }
 }

document.addEventListener("DOMContentLoaded", function(){

  ReactDOM.render(
      <App />,
    document.querySelector('#app')
  )

})
*/
