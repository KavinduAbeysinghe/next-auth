import {auth} from "@/app/api/auth/[...nextauth]/options";

const Module2 = async () => {

    const session = await auth();

    if (session) {
        console.log(session.accessToken);
    }

    return <>
        <h1>Module 2</h1>
    </>
}

export default Module2;