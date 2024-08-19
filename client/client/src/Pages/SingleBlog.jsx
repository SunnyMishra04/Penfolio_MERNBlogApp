import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/get/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleBlog();
  }, [id, token]);

  const handleDelete = async () => {
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
          navigate("/");
        } else {
          alert("Failed to delete blog");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <main className="page-background">
        <div className="container shadow my-3 p-4">
          <div className="row">
            <div className="col-md-12 d-flex flex-column align-items-center bg-light p-4">
              <h1 className="my-3">{blog.title}</h1>
              <img
                src={`http://localhost:3000/${blog.thumbnail}`}
                className="img-fluid img-rounded my-3"
                alt={blog.title || "Blog thumbnail"}
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
              <p className="my-3">{blog.description}</p>
              <p className="card-category">
                <strong>Category:</strong> {blog.categoryTitle}
              </p>
              {token && (
                <i
                  className="bi bi-trash text-danger mt-3"
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  onClick={handleDelete}
                ></i>
              )}
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/")}
              className="btn btn-primary"
              style={{ backgroundColor: "#535bf2", color: "#ffffff" }}
            >
              Back To Post
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default SingleBlog;
