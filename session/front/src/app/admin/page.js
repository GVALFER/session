import { getLocalSession, getSession } from "../../utils/auth/getSession";
import { get } from "../../utils/api/api";
import Logout from "./_logout";

const testAuthFetch = async () => {
    const data = await get("/users");
    return data;
};

const Page = async () => {
    const dataFromCookie = await getLocalSession();
    const dataFromDatabase = await getSession();
    const { users } = await testAuthFetch();

    return (
        <div>
            <h1>Admin Page</h1>
            <hr />
            <Logout />
            <hr />
            <pre>
                This is my session from cookies:
                {JSON.stringify(dataFromCookie.user, null, 2)}
            </pre>
            <hr />
            <pre>
                This is my session from server database:
                {JSON.stringify(dataFromDatabase.user, null, 2)}
            </pre>
            <hr />
            <pre>
                This is the list of users:
                {JSON.stringify(users, null, 2)}
            </pre>
        </div>
    );
};

export default Page;
