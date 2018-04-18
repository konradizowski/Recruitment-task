import React from 'react';
import ReactDOM from 'react-dom';
import data from "./db/data.json";
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




class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: ['a','b','c','d','e','f','g','h','i','j','k'],
            currentPage: 1,
            todosPerPage: 3
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { todos, currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((todo, index) => {
            return <li key={index}>{todo}</li>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });

        return (
            <div>
                <ul>
                    {renderTodos}
                </ul>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
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
             <TodoApp/>
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

