import { useState, useEffect } from "react";
import "../src/Home.scss";

const Home = () => {
  const [postsData, setPostsData] = useState([]);
  const [newPostName, setNewPostName] = useState("");
  const [newPostAge, setNewPostAge] = useState("");

  const fetchPostsData = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPostsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!confirmDelete) {
        return;
      }

      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setPostsData(postsData.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleAddPost = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newPostName, age: newPostAge }),
      });
      if (!response.ok) {
        throw new Error("Failed to add post");
      }

      setNewPostName("");
      setNewPostAge("");

      fetchPostsData();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="Homes">
      <div className="Home">
        <div className="container">
          <div className="home">
            <div className="logo">
              <h1>LOGO</h1>
            </div>
            <div className="title">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Shop</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="all">
            <div className="add-post">
              <h2>Add New Post</h2>
              <input
                type="text"
                placeholder="Name"
                value={newPostName}
                onChange={(e) => setNewPostName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Age"
                value={newPostAge}
                onChange={(e) => setNewPostAge(e.target.value)}
              />
              <button onClick={handleAddPost}>Add Post</button>
            </div>

            <div className="all-api">
              {postsData.map((post) => (
                <div className="post" key={post.id}>
                  <div className="alls card">
                    <h2>{post.name}</h2>
                    <p>{post.age}</p>
                    <button onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
