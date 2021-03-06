import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import { connect } from "react-redux";
import { addTodo, removeTodo, getTodos } from "./actionCreators";
import { Route } from "react-router-dom";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getTodos();
  }
  handleSubmit(val) {
    this.props.addTodo(val);
  }
  removeTodo(id) {
    this.props.removeTodo(id);
  }
  render() {
    let todos = this.props.todos.map(val => (
      <Todo
        removeTodo={this.removeTodo.bind(this, val._id)}
        task={val.task}
        key={val._id}
      />
    ));
    return (
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-12 col-md-6 py-3">
            <Route
              path="/todos/new"
              component={props => (
                <NewTodoForm {...props} handleSubmit={this.handleSubmit} />
              )}
            />
            <ul id="list" className="list-unstyled">
              <Route exact path="/todos" component={() => <>{todos}</>} />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos
  };
}

export default connect(mapStateToProps, { addTodo, removeTodo, getTodos })(
  TodoList
);
