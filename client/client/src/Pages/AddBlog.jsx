import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [file, setFile] = useState(); // Use null for single file uploads
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/get/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        setCategories(data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchAllCategories();
  }, []);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("category", input.category);
    formData.append("description", input.description);
    if (file) {
      formData.append("thumbnail", file);
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/add/blog", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Blog created successfully");
        navigate("/");
      } else {
        throw new Error(data.message || "Failed to create blog");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="page-background">
    <div
      className="container shadow mt-5 mb-4 p-4"
      style={{ maxWidth: "500px", backgroundColor: "#ffffff" }}
    >
      <h2 className="text-center my-3">Create a Blog</h2>

      <div className="col-md-12 my-3 d-flex items-center justify-content-center">
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={handleInputChange}
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Blog Title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Category
              </label>
              <select
                className="form-control"
                name="category"
                value={input.category}
                onChange={handleInputChange}
              >
                <option disabled>Select category</option>
                {categories &&
                  categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={handleInputChange}
                placeholder="Blog Description"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Thumbnail
              </label>
              <input
                name="thumbnail"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Choose Thumbnail"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={{ backgroundColor: '#535bf2', color: '#ffffff' }}
              >
                Create Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </main>
  );
};

export default AddBlog;
