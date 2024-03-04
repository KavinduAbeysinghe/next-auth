import {auth} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

export default function IsAuthServer(Component: any, allowedRoles: string[]) {
    return async function WithAuthServer(props: any) {
        const session = await auth();
        if (session) {
            const allowed = allowedRoles?.some(role => session?.roles?.includes(role));
            if (!session.user) {
                redirect("/signIn");
            }
            if (allowedRoles.length) {
                if (!allowed) {
                    redirect("/signIn");
                }
            }
        }
        return <Component {...props}/>
    }
}