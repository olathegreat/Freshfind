import { Link } from "react-router-dom";
import ErrorImage from "../assets/errorimg.png";
import "./Error404.css";

export default function Error404() {
  return (
    <div className="notfound-page">
      <div className="breadcrumb-banner" />
      <section className="notfound-content">
        <div className="illustration-wrap">
          <img className="errorimage" src={ErrorImage} alt="" />
        </div>
        <h1>Oops! page not found</h1>
        <p>
          Looks like this page wandered off while looking for the freshest
          produce!
          <br />
          The page you&apos;re looking for doesn&apos;t exist, may have been
          moved, or the link might be incorrect.
        </p>
        <Link to="/" className="btn-home">
          Back to Home
        </Link>
      </section>
    </div>
  );
}
