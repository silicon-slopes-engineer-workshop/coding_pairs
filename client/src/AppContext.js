import React, { Component } from "react";
import axios from "axios";
const todoAxios = axios.create();

todoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const AppContext = React.createContext();

export class AppContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      pairs: [],
      userTasks: [],
      user: JSON.parse(localStorage.getItem("user")) || {},
      token: localStorage.getItem("token") || ""
    };
  }

  componentDidMount() {
    this.getParticipants();
    this.getUsers();
  }

  getTasks = () => {
    return todoAxios.get("/api/task").then(response => {
      this.setState({ tasks: response.data });
      return response;
    });
  };

  getTask = id => {
    return todoAxios.get(`/api/task/${id}`).then(response => {
      this.setState({ userTasks: [...this.state.userTasks, response.data] });
      return response.data;
    });
  };

  getPreferences = id => {
    return todoAxios.get(`/api/preferences/${id}`).then(response => {
      this.setState({
        preferences: response.data
      });
      return response;
    });
  };

  getParticipants = () => {
    return todoAxios.get("/api/admin/participants").then(response => {
      console.log(response);
      this.setState({ participants: response.data });
      return response;
    });
  };

  getUsers = () => {
    return todoAxios.get("/api/user").then(response => {
      console.log(`the users from getUsers`, response);
      this.setState({ users: response.data });
      return response.data;
    });
  };

  updateUser = (userId, data) => {
    return todoAxios.put(`/api/user/${userId}`, data).then(response => {
      console.log(`Yo! New User data: `, response.data);
      this.setState((state, props) => {
        return { user: response.data };
      });
      return response;
    });
  };

  makePairs = newParticipants => {
    return todoAxios
      .post("/api/admin/pairs", newParticipants)
      .then(response => {
        this.setState(prevState => {
          return { pairs: [...prevState.pairs, response.data] };
        });
        return response;
      });
  };

  submitPreferences = preferences => {
    return todoAxios.post("/api/preferences", preferences).then(response => {
      console.log(`Preferences saved`);
      return response;
    });
  };

  signup = userInfo => {
    return todoAxios.post("/auth/signup", userInfo).then(response => {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      this.setState({
        user,
        token
      });
      return response;
    });
  };

  login = credentials => {
    return todoAxios.post("/auth/login", credentials).then(response => {
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      this.setState({
        user,
        token
      });
      this.getTasks();
      return response;
    });
  };

  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.setState({
      user: {},
      token: ""
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          getTasks: this.getTasks,
          getTask: this.getTask,
          getUsers: this.getUsers,
          submitPreferences: this.submitPreferences,
          getPreferences: this.getPreferences,
          updateUser: this.updateUser,
          signup: this.signup,
          login: this.login,
          logout: this.logout,
          ...this.state
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const withContext = Component => {
  return props => {
    return (
      <AppContext.Consumer>
        {globalState => {
          return <Component {...globalState} {...props} />;
        }}
      </AppContext.Consumer>
    );
  };
};
