import {getServerSession, NextAuthOptions} from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";

const options: NextAuthOptions = {
    providers: [
        AzureAD({
            clientId: process.env.AZURE_AD_CLIENT_ID as string,
            tenantId: process.env.AZURE_AD_TENANT_ID as string,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        jwt: async ({token, user, account}) => {
            if (account && account.access_token) {
                token.accessToken = account.access_token;
            }
            console.log("TOKEN ->",token);
            return token;
        },
        session: async ({session, token}) => {
            return {...session, token: token.accessToken};
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signIn",
    }
}

function auth(  // <-- use this function to access the jwt from React components
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, options)
}

export {options, auth}