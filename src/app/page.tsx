import {getServerSession} from "next-auth";
import SignOutButton from "@/app/SignOutButton";
import {auth} from "@/app/api/auth/[...nextauth]/options";

const Home = async () => {

    const session = await auth();

    if (session) {
        console.log(session);
    }

    return <>
        {
            session?.user ? <>
                    <h1>{session.user.email} has logged in</h1>
                    <SignOutButton/>
                </>
                : <h1>Please Login</h1>
        }
    </>
}

export default Home;