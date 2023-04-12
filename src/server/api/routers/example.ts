import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
    getAllTodos: publicProcedure.query(async ({ ctx }) => {
        const todos = await ctx.prisma.todo.findMany();
        return todos;
    }),

    createNewTodo: publicProcedure
        .input(z.object({
            newText: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            console.log({input});

            const newTodo = await ctx.prisma.todo.create({
                data: {
                    task: input.newText,
                },
            });

            console.log({newTodo});
        }),
});
