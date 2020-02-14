import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Post from "./Post";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
      padding: 10
    }
  },
  paper: {
    width: 500
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function App() {
  const classes = useStyles();

  const [state, setState] = useState({
    title: "",
    body: ""
  });

  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios
      .get("/api")
      .then(response => {
        const data = response.data;
        data.forEach(e => {
          setPosts(posts => [...posts, e]);
        });
      })
      .catch(err => console.log("Internal Server Error"));
  };

  const handleChange = event => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { title, body } = state;

    const payload = {
      title,
      body
    };

    axios
      .post("/api/posts", payload)
      .then(data => {
        if (data) {
          setPosts([]);
          getPosts();
          setState({
            title: "",
            body: ""
          });
        }
      })
      .catch(err => console.log("Internal Server Error"));
  };

  useEffect(getPosts, []);

  return (
    <div>
      <h2>Blog Post</h2>
      <Paper elevation={3} className={classes.paper}>
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Title"
            name="title"
            value={state.title}
            onChange={handleChange}
            required
          />
          <br />
          <TextField
            label="Write your post..."
            name="body"
            value={state.body}
            onChange={handleChange}
            multiline
            required
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </form>
      </Paper>
      <br />
      <Post posts={posts} />
    </div>
  );
}

export default App;
