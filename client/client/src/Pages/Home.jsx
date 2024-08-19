import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/get/allBlogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        alert(error.message);
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllBlogs();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/delete/blog/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          alert("Blog deleted successfully");
          setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove deleted blog from state
        } else {
          alert("Failed to delete blog");
        }
      } catch (error) {
        alert(error.message);
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <>
      <main className="page-background">
        <div
          className="container shadow-lg p-4"
          style={{ maxWidth: "800px", backgroundColor: "#f5f5f5" }}
        >
          <section className="text-center">
            <h2 className="mb-5">
              <strong>Latest posts</strong>
            </h2>
            <div className="row">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => (
                  <div
                    key={item._id}
                    className="col-lg-6 col-md-8 mx-auto mb-4"
                  >
                    <div className="card">
                      <div className="bg-image hover-overlay ripple">
                        <img
                          src={`http://localhost:3000/${item.thumbnail}`}
                          className="img-fluid"
                          alt="Post Image"
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                          ></div>
                        </a>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        {/* <p className="card-text">{item.description}</p> */}
                        <p className="card-category">
                          <strong>Category:</strong> {item.categoryTitle}
                        </p>{" "}
                        <Link
                          to={`/blog/${item._id}`}
                          className="btn btn-primary"
                          style={{
                            backgroundColor: "#535bf2",
                            color: "#ffffff",
                          }}
                        >
                          Read More
                        </Link>
                        {token && (
                          <i
                            className="bi bi-trash text-danger mt-3 ms-3 float-end"
                            style={{ cursor: "pointer", fontSize: "1.5rem" }}
                            onClick={() => handleDelete(item._id)}
                          ></i>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No blogs available</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
