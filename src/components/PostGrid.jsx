import React, { useEffect, useState } from 'react';
import Masonry from 'react-responsive-masonry';

const PostGrid = ({ postType, columns, postsPerPage, taxonomy, terms, readMoreText }) => {
  const [posts, setPosts] = useState([]);
  const [featuredImages, setFeaturedImages] = useState({});
  const [showExcerpt, setShowExcerpt] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  
  const toggleExcerpt = postId => {
    setShowExcerpt(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  // Fetch Featured Images for Different Posts
  const fetchImages = async () => {
    const imageMap = {};

    await Promise.all(
      posts?.map(async (post) => {
        const mediaLink = post._links?.['wp:featuredmedia']?.[0]?.href;
        if (mediaLink) {
          try {
            const res = await fetch(mediaLink);
            const data = await res.json();
            imageMap[post.id] = data.source_url;
          } catch (err) {
            console.warn(`Failed to fetch image for post ${post.id}`, err);
          }
        }
      })
    );

    setFeaturedImages(imageMap);
  };

  useEffect(() => {
    fetchImages();
  }, [posts]);

  // fetch All Posts
  useEffect(() => {
    const url = new URL(`${window.wpApiSettings.root}wp/v2/${postType}`);
    url.searchParams.append('per_page', postsPerPage);

    if (taxonomy && terms) {
      url.searchParams.append(taxonomy, terms);
    }

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': window.wpApiSettings.nonce,
      },
    })
      .then(res => res.json())
      .then(data => setPosts(data));
  }, [postType, postsPerPage, taxonomy, terms]);

  if (!posts.length) return <p>No posts found.</p>;

  // Filtering posts
  const filteredPosts = posts?.filter(post => {
    const title = post.title.rendered.toLowerCase();
    const excerptVisible = showExcerpt[post.id];
    const excerpt = excerptVisible && post.excerpt.rendered.toLowerCase();
    const search = searchTerm.toLowerCase();
    return (
      title.includes(search) ||
      (excerptVisible && excerpt.includes(search))
    );
  });

  // Sorting posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === 'title-asc') {
      return a.title.rendered.localeCompare(b.title.rendered);
    } else if (sortOption === 'title-desc') {
      return b.title.rendered.localeCompare(a.title.rendered);
    } else if (sortOption === 'date-asc') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === 'date-desc') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  return (
    <>
      {/* Search & Sort */}
      <div className='lcw-search-sort'>
        <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="title-asc">Title (A → Z)</option>
          <option value="title-desc">Title (Z → A)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="date-desc">Date (Newest First)</option>
        </select>
        <input
          type="text"
          placeholder="Search by title or visible excerpt..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Post Grid */}
        <Masonry gutter='16px' className={`lcw-posts-grid columns-${columns}`}>
          {
            // posts?.map(post => (
            sortedPosts?.map(post => (
              <div
                key={post.id}
                className="lcw-post-item"
              >
                {/* <p>
                  Posted on: {
                    new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  }
                </p> */}
                <a href={post.link} className="lcw-post-thumb">
                  {featuredImages[post.id] && (
                    <img
                      src={featuredImages[post.id]}
                      alt={post.title.rendered}
                    />
                  )}
                </a>
                <h3 className="lcw-post-title">
                  <a href={post.link} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </h3>
                <button onClick={() => toggleExcerpt(post.id)}>
                  {showExcerpt[post.id] ? 'Hide' : 'Show'} Excerpt
                </button>
                {showExcerpt[post.id] && (
                  <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                )}
                <a href={post.link} className="lcw-readmore-btn">{readMoreText}</a>
              </div>
            ))
          }
        </Masonry>
      {/* </Masonry> */}
    </>
  );
};

export default PostGrid;