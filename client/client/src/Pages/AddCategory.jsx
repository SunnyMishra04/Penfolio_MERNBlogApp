import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
    }); 

    const handleCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/api/v1/add/category", {
                method: "POST",
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("token")}`,    
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });
            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                navigate("/");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
        <main className="page-background">
            <div
                className="container shadow mt-5 mb-4 p-4"
                style={{ maxWidth: "500px", backgroundColor: "#ffffff" }}
            >
                <h2 className="text-center my-3">Add new category</h2>

                <div className="col-md-12 my-3 d-flex items-center justify-content-center">
                    <div className="row">
                        <form onSubmit={handleCategory}>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="formGroupExampleInput"
                                    placeholder="Enter Title"
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#535bf2', color: '#ffffff' }}>
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
        </>
        
    );
};

export default AddCategory;
