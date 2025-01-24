import React from "react";

function Comments() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Comments</h1>
      <form className="space-y-4">
        <textarea
          className="w-full border rounded p-2"
          placeholder="Write your comment here..."
        ></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Comment
        </button>
      </form>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">User Comments</h2>
        <p className="text-gray-600">Comments from other users will appear here.</p>
      </div>
    </div>
  );
}

export default Comments;