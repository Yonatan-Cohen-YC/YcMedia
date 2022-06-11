import { useEffect, useState } from "react";
import NewUsers from "../NewUsers/NewUsers";
import UsersSearch from "../UsersSearch/UsersSearch";
import "./RightSide.css";

const RightSide = ({ users }) => {
  const [userValue, setUserValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

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
    <div className="rightSideContainer">
      <UsersSearch filterUsers={setUserValue} />
      {filteredUsers &&
        filteredUsers
          ?.slice(0, 4)
          .map((user, key) => (
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
  );
};

export default RightSide;
