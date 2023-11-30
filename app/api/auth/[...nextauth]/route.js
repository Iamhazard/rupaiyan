import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "../../../../utils/database";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

// console.log({
//   clientId: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: "http://localhost:3000/api/auth/session/callback/google",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectToDB();
          const user = await User.findOne({ email });

          if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
          }

          return {
            id: user._id,
            name: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "database",
  },

  callbacks: {
    credentials: async (user) => {
      return Promise.resolve(true);
    },
    async session({ session }) {
      try {
        if (session.user && session.user.email) {
          const sessionUser = await User.findOne(
            {
              email: session.user.email,
            },
            { maxTimeMS: 20000 }
          );
          if (sessionUser) {
            session.user.id = sessionUser._id.toString();
          }
        }
        return session;
      } catch (error) {
        console.error("Database query error:", error);
      }
    },
    async signIn({ profile, account, user, credentials }) {
      // console.log("User Profile:", profile);
      try {
        await connectToDB().then(() => {
          console.log(`connected to db ${process.env.MONGO_URI}`);
        });
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
