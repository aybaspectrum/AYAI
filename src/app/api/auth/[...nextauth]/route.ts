import NextAuth from "next-auth";
import { authConfig } from "~/server/auth/config";

import type { NextApiHandler } from "next";
const handler: NextApiHandler = NextAuth(authConfig);
export { handler as GET, handler as POST };