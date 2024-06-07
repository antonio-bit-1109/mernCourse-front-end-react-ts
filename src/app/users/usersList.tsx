import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";

const usersList = () => {
    const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();

    let content;

    if (isLoading) content = <p>loading...</p>;

    if (isError) {
        content = <p>{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids } = users;

        const tableContent = ids?.length ? ids.map((userId) => <User key={userId} userId={userId} />) : null;
        content = <div>{tableContent}</div>;
    }

    return content;
};

export default usersList;
