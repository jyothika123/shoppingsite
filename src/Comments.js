import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext"; // Import the authentication context

function CommentsPage() {
  const { isLoggedIn } = useAuth(); // Now this will reflect the user's login state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [photo, setPhoto] = useState(null);

  // Load comments from localStorage when component mounts
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(storedComments);
  }, []);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    const newEntry = {
      text: newComment,
      rating,
      photo,
      date: new Date().toLocaleString(),
    };

    // Update comments state
    setComments([newEntry, ...comments]);

    // Reset input fields
    setNewComment("");
    setRating(1);
    setPhoto(null);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result); // Convert image to Base64
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Comments</h1>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full border rounded p-2"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>

          <div className="flex items-center space-x-4">
            <label className="font-semibold">Rating:</label>
            <select
              className="border rounded p-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Upload a photo (optional):</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Comment
          </button>
        </form>
      ) : (
        <p className="text-red-500">You need to log in to add a comment.</p>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">All Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="border rounded p-4 mb-4">
              <div className="flex justify-between items-center">
                <span>{comment.rating} Star{comment.rating > 1 ? "s" : ""}</span>
              </div>
              <p>{comment.text}</p>
              {comment.photo && (
                <img
                  src={comment.photo}
                  alt="User uploaded"
                  className="w-32 h-32 object-cover mt-2"
                />
              )}
              <span className="text-sm text-gray-500">{comment.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentsPage;
