import PostGrid from './components/PostGrid';

const App = ({ postType, columns, postsPerPage, taxonomy, terms, readMoreText }) => {
  return (
    <div className="lcw-app-wrapper">
      <PostGrid
        postType={postType}
        columns={columns}
        postsPerPage={postsPerPage}
        taxonomy={taxonomy}
        terms={terms}
        readMoreText={readMoreText}
      />
    </div>
  );
};

export default App;