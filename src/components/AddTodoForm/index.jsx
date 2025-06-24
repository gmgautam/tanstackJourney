import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const AddTodoForm = () => {
  // Initialize formData with the expected structure
  const [formData, setFormData] = useState({ title: "", body: "" });

  const AddPost = async (data) => {
    console.log(data);
    const res = await axios.post("http://localhost:4000/todos", data);
    return res.data;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: MutateAddPost } = useMutation({
    mutationFn: AddPost,
    onSuccess: (res) => {
      console.log(res, "response on the success field");
      setFormData({ title: "", body: "" });
    },
    onError: (err) => {
      // Display a meaningful error message
      alert(err.response?.data?.message || err.message || "An error occurred");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Must be the FIRST line

    try {
      // Validate fields (using trim() to ignore whitespace)
      if (!formData.title.trim() || !formData.body.trim()) {
        alert("Please fill in both title and body");
        return;
      }

      MutateAddPost(formData);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center !p-3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start !p-7 h-[200px] border border-white gap-3"
      >
        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          type="text"
          placeholder="Add your todo name"
          className="outline-1 rounded-[10px]"
        />
        <label>Body</label>
        <input
          name="body"
          value={formData.body}
          onChange={handleChange}
          type="text"
          placeholder="Add what you have done so far..."
          className="outline-1 rounded-[10px]"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
