import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        content: z.string().min(1),
        author: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          content: input.content,
          author: ctx.session.user.name ?? input.author,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  deleteById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: {
          id: input.id,
          createdBy: { id: ctx.session.user.id },
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),

  getAllByUser: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        createdBy: { id: ctx.session.user.id },
      },
    });

    return post ?? null;
  }),
});
