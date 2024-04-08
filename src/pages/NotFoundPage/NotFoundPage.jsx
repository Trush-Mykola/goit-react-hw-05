import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>Page you want found, doesn&apos;t exist.</h1>
      <Link to="/">Go to main page</Link>
    </div>
  );
};

export default NotFoundPage;
