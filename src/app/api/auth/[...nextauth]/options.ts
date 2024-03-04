import {getServerSession, NextAuthOptions} from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {decode} from "next-auth/jwt";
import {decodeJwt} from "jose";

const refreshAccessToken = async (token: any) => {
    try {
        const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;
        const response = await axios.post(url,
            `grant_type=refresh_token`
            + `&client_secret=${process.env.AZURE_AD_CLIENT_SECRET}`
            + `&refresh_token=${token.refreshToken}`
            + `&client_id=${process.env.AZURE_AD_CLIENT_ID}`
            , {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });
        const res = response.data;
        // console.log("RES ->", res);
        return {
            ...token,
            accessToken: res.id_token,
            accessTokenExpires: Date.now() + res.expires_in * 1000,
            refreshToken: res.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }
    } catch (error) {
        console.error(error);
    }
}

const options: NextAuthOptions = {
    providers: [
        AzureAD({
            clientId: process.env.AZURE_AD_CLIENT_ID as string,
            tenantId: process.env.AZURE_AD_TENANT_ID as string,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: 'offline_access openid profile email',
                },
            },
        })
    ],
    callbacks: {
        jwt: async ({token, user, account}) => {
            if (account && account.access_token && account.id_token && account.expires_at) {
                // console.log("ACCOUNT ->", account);
                // token.accessToken = account.id_token;
                token.accessToken = account.access_token;
                token.accessTokenExpires = account.expires_at * 1000;
                token.refreshToken = account.refresh_token;
            }
            console.log("TOKEN ->", token);
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }
            return refreshAccessToken(token);
        },
        session: async ({session, token}) => {
            const decodedToken = decodeJwt(token.accessToken as string);
            return {...session, accessToken: token.accessToken, roles: decodedToken.roles};
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signIn",
    },
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