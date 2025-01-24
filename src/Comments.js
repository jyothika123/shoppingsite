import React, { useState } from "react";

function Comments() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [commentsList, setCommentsList] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        comment,
        rating,
        photo,
      };
      setCommentsList([newComment, ...commentsList]);
      setComment("");
      setRating(1);
      setPhoto(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Comments</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-2"
          placeholder="Write your comment here..."
          value={comment}
          onChange={handleCommentChange}
        ></textarea>

        <div className="flex items-center space-x-4">
          <label className="font-semibold">Rating:</label>
          <select
            className="border rounded p-2"
            value={rating}
            onChange={handleRatingChange}
          >
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>
                {rate} Star{rate > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-semibold">Upload a photo (optional):</label>
          <input
            type="file"
            accept="image/*"
            className="border rounded p-2"
            onChange={handlePhotoChange}
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Comment
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">User Comments</h2>
        {commentsList.length === 0 ? (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        ) : (
          commentsList.map((item, index) => (
            <div key={index} className="border p-4 mb-4 rounded">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-semibold">Rating:</span>
                <span>{item.rating} Star{item.rating > 1 ? "s" : ""}</span>
              </div>
              <p>{item.comment}</p>
              {item.photo && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(item.photo)}
                    alt="Uploaded"
                    className="w-32 h-32 object-cover mt-2"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;