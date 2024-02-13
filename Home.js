// Home.js

import React, { useState, useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [commentedBlogId, setCommentedBlogId] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState('');
  const [addCommentMsg, setAddCommentMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const { email } = location.state || {};

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, [commentedBlogId, deleteMsg, addCommentMsg]);

  const handleLike = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === blogId ? { ...blog, likes: updatedBlog.likes } : blog
          )
        );
      } else {
        console.error('Failed to like the blog');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = (blogId) => {
    setCommentedBlogId(commentedBlogId === blogId ? null : blogId);
    setDeleteMsg('');
    setAddCommentMsg('');
  };

  const submitComment = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: email, text: commentInput }),
      });

      if (response.ok) {
        setCommentInput('');
        setCommentedBlogId(blogId);
        setAddCommentMsg('Comment added successfully');
      } else {
        console.error('Failed to submit the comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (blogId, commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comment/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCommentedBlogId(blogId);
        setDeleteMsg('Comment deleted successfully');
      } else {
        console.error('Failed to delete the comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='navbar-Home'>
        <img id="icon" src={require("../icons/movie-logo.png")} alt="Icon" />
        
        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            id="searchInput" 
            name="searchInput" 
            autoComplete="off"
            placeholder="Search Blogs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <ul>
          <li><Link to='/Write'>Write</Link></li>
          <li><Link to='/'><img className='logout-icon' src={require("../icons/logout.png")} alt="Icon" /></Link></li>
        </ul>
      </div>
      <ul className='blog-list'>
        {filteredBlogs.map((blog) => (
          <li key={blog._id} className='blog-item'>
            <Link className='blog-link' to={`/blog/${blog._id}`}>
              <h2>{blog.title}</h2>
              <img
                src={`data:image/jpeg;base64,${blog.image}`}
                alt="Blog"
                className='blog-image'
              />
              <p>{blog.content.split('\n').slice(0, 4).join('\n')}</p>
            </Link>
            <div className='blog-icons'>
              <img
                src={require('../icons/like.png')}
                alt="Like"
                className='like'
                onClick={() => handleLike(blog._id)}
              />
              <span className='like-count'>{blog.likes}</span>
              <img
                src={require('../icons/comment-alt-middle.png')}
                alt="Comment"
                className='comment'
                onClick={() => handleComment(blog._id)}
              />
              {commentedBlogId === blog._id && (
                <div>
                  {deleteMsg && <p className="success-msg">{deleteMsg}</p>}
                  {blog.comments.map((comment, index) => (
                    <div key={index}>
                      <p>
                        {comment.user}: {comment.text}
                        {comment.user === email && (
                          <button onClick={() => deleteComment(blog._id, comment._id)}>
                            Delete
                          </button>
                        )}
                      </p>
                    </div>
                  ))}
                  <textarea
                    id="commentInput"
                    className='home-comment-textarea'
                    rows="4"
                    cols="50"
                    placeholder="Enter your comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  ></textarea>
                  <button onClick={() => submitComment(blog._id)}>Submit</button>
                  {addCommentMsg && <p className="success-msg">{addCommentMsg}</p>}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
