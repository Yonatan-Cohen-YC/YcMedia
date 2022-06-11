import { BiSearch } from "react-icons/bi";
import "./UsersSearch.css";

const UsersSearch = ({ filterUsers }) => {
  const handleOnChange = (e) => {
    filterUsers(e.target.value);
  };
  return (
    <div className="usersSearchContainer">
      <div className="usersSearchHeader">
        <h2>New Users</h2>
      </div>
      <div className="searchBox">
        <BiSearch />
        <input onChange={(e) => handleOnChange(e)} placeholder="Search..." />
      </div>
    </div>
  );
};

export default UsersSearch;
