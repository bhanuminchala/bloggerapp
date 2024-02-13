import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import './BlogDetail.css';

function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [addCommentMsg, setAddCommentMsg] = useState('');
  const [commentedBlogId, setCommentedBlogId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const fetchBlogDetail = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blog/${blogId}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
      } else {
        console.error('Failed to fetch blog details');
      }
    } catch (error) {
      console.error(error);
    }
  }, [blogId]);

  useEffect(() => {
    fetchBlogDetail();
  }, [fetchBlogDetail]);

  const handleLike = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlog((prevBlog) => ({ ...prevBlog, likes: updatedBlog.likes }));
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
        body: JSON.stringify({ user: 'John Doe', text: commentInput }),
      });

      if (response.ok) {
        setCommentInput('');
        setCommentedBlogId(blogId);
        setAddCommentMsg('Comment added successfully');
        fetchBlogDetail();
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
        fetchBlogDetail();
      } else {
        console.error('Failed to delete the comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;

      if (synth.speaking && isSpeaking) {
        synth.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(blog.content);
        synth.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };

  return (
    <div>
      <nav className="blog-detail-nav">
        <img className="blog-icon" src={require("../images/Blogger-App.png")} alt="Icon" />
        <Link to={'/Home'}>Home</Link>
      </nav>

      <div className="blog-detail-container">
        <div className="blog-detail-background-shodow">
          <div className="container-blogdetail">
            {blog ? (
              <>
                <h2 className="title-blog">{blog.title}</h2>
                <img
                  src={`data:image/jpeg;base64,${blog.image}`}
                  alt="Blog"
                  className="blogdata-image"
                />
                <p className="blog-content">{blog.content}</p>
                <img
                  className='voice-icon'
                  src={require('../icons/speaker.png')}
                  alt='Voice'
                  onClick={handleSpeech}
                />
                <div className='blog-icons'>
                  <img
                    src={require('../icons/like.png')}
                    alt="Like"
                    className='blog-detail-like'
                    onClick={() => handleLike(blog._id)}
                  />
                  <span className='like-count'>  Likes {blog.likes}</span>
                  
                  <img
                    src={require('../icons/comment-alt-middle.png')}
                    alt="Comment"
                    className='blog-detail-comment'
                    onClick={() => handleComment(blog._id)}
                  />
                  {commentedBlogId === blog._id && (
                    <div>
                      {deleteMsg && <p className="success-msg">{deleteMsg}</p>}
                      {blog.comments.map((comment, index) => (
                        <div key={index}>
                          <p>
                            {comment.user}: {comment.text}
                            {comment.user === 'John Doe' && (
                              <button onClick={() => deleteComment(blog._id, comment._id)}>
                                Delete Comment
                              </button>
                            )}
                          </p>
                        </div>
                      ))}
                      <textarea
                        id="commentInput"
                        className='blogdetail-textarea'
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
              </>
            ) : (
              <p className="loading">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
