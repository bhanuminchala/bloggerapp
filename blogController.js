const BlogData = require('../../models/blogModel');

const createBlog = async (req, res) => {
  const { title, content, image } = req.body;

  try {
    const newBlog = new BlogData({ title, content, image });
    await newBlog.save();
    res.status(201).json({ message: 'Blog data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogData.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getBlogById = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await BlogData.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handleLike = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await BlogData.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment the likes count
    blog.likes += 1;

    // Save the updated blog
    await blog.save();

    // Respond with success and the updated likes count
    res.status(200).json({ message: 'Liked blog successfully', likes: blog.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handleComment = async (req, res) => {
  const { blogId } = req.params;
  const { user, text } = req.body;

  try {
    const blog = await BlogData.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Add the new comment to the blog
    blog.comments.push({ user, text });

    // Save the updated blog
    await blog.save();

    // Respond with success and the updated comments
    res.status(200).json({ message: 'Comment added successfully', comments: blog.comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handleDeleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;

  try {
    const blog = await BlogData.findOneAndUpdate(
      { _id: blogId, 'comments._id': commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog or Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully', comments: blog.comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogById, handleLike, handleComment, handleDeleteComment };
