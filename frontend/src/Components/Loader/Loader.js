import { HashLoader } from "react-spinners";
import "./Loader.css";
const override = `
  display: block;
  margin: 50px auto;
  border-color: red;
`;
const Loader = () => {
  return (
    <div className="loader">
      <HashLoader color="#fafafa" size={100} css={override} />
    </div>
  );
};

export default Loader;
