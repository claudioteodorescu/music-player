import { MdQueueMusic } from "react-icons/md";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <h1>VibeCloud</h1>
      <button
        onClick={() => setLibraryStatus(!libraryStatus)}
        className={`button ${libraryStatus ? "active-button" : ""} `}
      >
        <MdQueueMusic className="lb" />
      </button>
    </nav>
  );
};

export default Nav;
