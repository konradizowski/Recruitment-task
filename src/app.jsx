import React from 'react';
import ReactDOM from 'react-dom';

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
        };

        fetch("/db/data.json")
            .then( function(response) {
                return response
            })
            .then( function(data) {
                data.setState({
                    id: data.id,

                });
            })
            .catch( function() {
                data.setState({
                    infoStatus: 'error'
                });
            })


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
        const rows = this.state.data.map((rowData) => <Row {...rowData} />);

        return (
            <div className="table">
                <div className="header">
                    <div onClick={() => this.sortBy('id')}>ID</div>
                    <div onClick={() => this.sortBy('title')}>Title</div>
                    <div onClick={() => this.sortBy('priority')}>Priority</div>
                    <div onClick={() => this.sortBy('type')}>Issue Type</div>
                    <div onClick={() => this.sortBy('complete')}>% Complete</div>
                </div>
                <div className="body">
                    {rows}
                </div>
            </div>
        );

    }


    ComponentDidMount() {
        fetch('./db/data.json')
            .then(r => r.json())
            .then(data => {
                return (
                    console.log(data),
                        this.setState({
                                id: this.state.id,
                                firstName: this.state.firstName,
                                lastName: this.state.lastName,
                                dateOfBirth: this.state.dateOfBirth,
                                company: this.state.company,
                                note: this.state.note
                            },
                        )

                )
            });
    }

}




class App extends React.Component {
   constructor(props){
     super(props);

   }
   render() {
     return (
     <Table />
     )
   }
 }

document.addEventListener("DOMContentLoaded", function(){

  ReactDOM.render(
      <App />,
    document.querySelector('#app')
  )

});

