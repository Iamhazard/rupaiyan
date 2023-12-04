import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/utils/database";
import GoogleProvider from "next-auth/providers/google";

const generateRandomPassword = () => {
  const length = 12; // Adjust the length of the password as needed
  const saltRounds = 10;

  // Generate a random string
  const randomString = Math.random().toString(36).slice(2);

  // Hash the random string using bcrypt
  const hashedPassword = bcrypt.hashSync(randomString, saltRounds);

  return hashedPassword;
};
const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log("Credentials:", credentials);
        try {
          await connectToDB();
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return Promise.resolve(user);
            }
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("CredentialsSignin");
        }

        return Promise.resolve(null);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: "http://localhost:3000/api/auth/session/callback/google",
    }),
  ],

  callbacks: {
    callbacks: {
      async session({ session }) {
        if (typeof window !== "undefined") {
          try {
            if (session.user && session.user.email) {
              const sessionUser = await User.findOne({
                email: session.user.email,
              }).maxTimeMS(30000);
              if (sessionUser) {
                session.user.id = sessionUser._id.toString();
              }
            }
            return session;
          } catch (error) {
            if (
              error.name === "MongooseError" &&
              error.message.includes("buffering timed out")
            ) {
              console.error("Retrying findOne operation...");
            } else {
              console.error("Database query error:", error);
            }
          }
        }
        return session;
      },
    },

    async signIn({ account, user, credentials }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "google") {
        console.log("user account", account);
        console.log("user ", user);

        await connectToDB();
        try {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const randomPassword = generateRandomPassword();
            await User.create({
              email: user.email,
              username: user.name.replace(" ", "").toLowerCase(),
              password: randomPassword,
            });
          }

          return true;
        } catch (error) {
          console.error("Error during signIn callback:", error);
          return false;
        }
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/app/login",
  },
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
