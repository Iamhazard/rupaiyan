import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "../../../../utils/database";
import User from "../../../../models/user";
import bcrypt from "bcrypt";

console.log({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: "http://localhost:3000/api/auth/session/callback/google",
    }),
  ],

  callbacks: {
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
    async signUp({ email, password, username }) {
      // console.log("User Profile:", profile);
      try {
        await connectToDB().then(() => {
          console.log(`connected to db ${process.env.MONGO_URI}`);
        });
        const userExists = await User.findOne({ email });
        if (userExists) {
          throw new Error("email is already use");
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //create newUser

        const newUser = await User.create({
          email,
          password: hashedPassword,
          username,
        });
        return Promise.resolve(true);
      } catch (error) {
        console.log(error);
        return Promise.resolve(false);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
