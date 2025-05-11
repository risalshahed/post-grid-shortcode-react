import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('lcw-react-root');

if (rootElement) {
  const props = {
    postType: rootElement.dataset.post_type || 'posts',
    columns: parseInt(rootElement.dataset.columns) || 3,
    postsPerPage: parseInt(rootElement.dataset.posts_per_page) || 6,
    taxonomy: rootElement.dataset.taxonomy || '',
    terms: rootElement.dataset.terms || '',
    readMoreText: rootElement.dataset.read_more_text || 'Read More',
  };

  const root = createRoot(rootElement);
  root.render(<App {...props} />);
}