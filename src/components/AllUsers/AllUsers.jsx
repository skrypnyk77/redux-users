import React, { Component } from "react";

class AllUsers extends Component {
  constructor(props) {
    super(props);
    //only for pagination
    this.state = {
      currentPage: 1,
      userPerPage: 5,
      index: 0,
      seconds: null,
      biography: this.props.users
    };
    this.handleClick = this.handleClick.bind(this);
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  //imitation of request
  fetchData() {
    console.log("Our data is fetched");
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      //.then(json => console.log("json", json))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchData();

    //logic for changing state every 8 sec
    this.timer = setInterval(() => {
      this.setState(({ biography, index }) => {
        index = (index + 1) % biography.length;
        return {
          index
        };
      });
    }, 8000);
  }

  render() {
    const { currentPage, userPerPage } = this.state;
    const { users } = this.props;
    const indexOfLastTodo = currentPage * userPerPage;
    const indexOfFirstTodo = indexOfLastTodo - userPerPage;
    const currentUsers = users.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderUsers = currentUsers.map((user, id, desc, name, surname) => {
      return (
        <div className="user-profile">
          <div className="main-info">
            <img src={require("../../images/user.jpeg")} alt="" />
            <p key={name}>Name : {user.name}</p>
            <p key={surname}>Surname : {user.surname}</p>
          </div>
          <div className="description">
            <p key={id}>Id : {user.id}</p>
            <p key={desc}>Description : {user.desc}</p>
          </div>
        </div>
      );
    });

    //Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i < Math.ceil(users.length / userPerPage + 1); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    return (
      <div className="main-wrapper">
        <div className="main-container">
          <div className="users-list">{renderUsers}</div>
          <div className="ordered-persons">
            <div className="ordered-persons__title">User: </div>
            <div>{users[this.state.index].id}</div>
            <div>{users[this.state.index].name}</div>
            <div>{users[this.state.index].surname}</div>
          </div>
        </div>

        <div className="page-numbers">{renderPageNumbers}</div>
      </div>
    );
  }
}

export default AllUsers;
