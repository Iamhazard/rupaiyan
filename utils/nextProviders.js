"use client";

import { SessionProvider } from "next-auth/react";

const nextAuthProvider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default nextAuthProvider;
