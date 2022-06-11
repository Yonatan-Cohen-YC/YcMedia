import "./Navbar.css";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewUsers from "../NewUsers/NewUsers";

const Navbar = () => {
  const { users } = useSelector((state) => state.allUsers);
  const [userValue, setUserValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState("");

  useEffect(() => {
    if (!userValue.length) {
      setFilteredUsers(users);
    }
    const filtered = users?.filter((user) => {
      return user.name.toLowerCase().includes(userValue.toLowerCase());
    });
    setFilteredUsers(filtered);
  }, [userValue, users]);
  return (
    <nav>
      <div className="container">
        <div className="logoImage">
          <Link to="/">
            <h2>YC Media</h2>
          </Link>
        </div>
        <div className="searchBox largeWidth">
          <BiSearch />
          <input
            placeholder="Search..."
            className="largeWidth"
            onChange={(e) => setUserValue(e.target.value)}
            value={userValue}
          />
        </div>
      </div>
      <div
        onClick={() => setUserValue("")}
        className={userValue.length > 0 ? "usersList" : ""}
      >
        {userValue.length > 0 &&
          filteredUsers?.map((user, key) => (
            <NewUsers
              userName={user.name}
              userFollowers={user.followers}
              userFollowing={user.following}
              userId={user._id}
              userAvatar={user.avatar.url}
              key={key}
            />
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
