import React, { useEffect, useState } from 'react';
import './blog.css';
import pb from '../../pocketbase'; // Adjust path as needed

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const records = await pb.collection('Blog').getFullList();
        const blogs = records.map((record) => ({
          id: record.id,
          category: record.category,
          title: record.title,
          date: record.date,
          author: record.author,
          image: pb.files.getURL(record, record.image),
        }));
        setPosts(blogs);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="blog container section" id="blog">
      <h2 className="section__title">Latest Posts</h2>

      <div className="blog__container grid">
        {posts.map(({ id, category, title, date, author, image }) => (
          <div className="blog__card" key={id}>
            <div className="blog__thumb">
              <a href="#"><span className="blog__category">{category}</span></a>
              <a href="#"><img src={image} alt={title} className="blog__img" /></a>
            </div>
            <div className="blog__details">
              <h3 className="blog__title">{title}</h3>
              <div className="blog__meta">
                <span>{date}</span>
                <span className="blog__dot">.</span>
                <span>{author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
