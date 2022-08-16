import { createRouter } from "./context";
import { z } from "zod";
import crypto from "crypto";

const hashMd5 = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex");

export const authRouter = createRouter().mutation("login", {
  input: z.object({
    username: z.string(),
    password: z.string(),
  }),
  async resolve({ input: { username, password }, ctx: { prisma } }) {
    const hashedPassword = hashMd5(hashMd5(password));
    const existingUser = await prisma.user.findFirst({
      where: { email: username, password: hashedPassword },
    });

    return existingUser;
  },
});
