import { useSelector } from "react-redux";
import { selectUserIds } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const User = ({ userId }) => {
    const user = useSelector((state) => selectUserIds(state, userId));

    const navigate = useNavigate();

    if (user) {
        const userRoles = user.roles.toString();
        const status = user.active ?? "UNactive";

        return user;
    } else return null;
};

export default User;
