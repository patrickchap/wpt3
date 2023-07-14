import { z } from "zod";
import { createTRPCRouter, publicProcedure} from "~/server/api/trpc";


export const weddingRouter = createTRPCRouter({
    getGroupByGuestName: publicProcedure
    .input(z.object({ fullName: z.string() }))
    .query(async ({ctx, input}) => {
        const guest = await ctx.prisma.guest.findUnique({
        where: { fullname: input.fullName },
        });
        if (!guest) {
            throw new Error("Guest not found");
        }
        const group = await ctx.prisma.group.findUnique({
            where: { id: guest.groupId },
            include: { guests: true },
        });

        if (!group) {
            throw new Error("Group not found");
        }

        return {
            group: group.guests,
        }
    }),

    getGuestByGuestName: publicProcedure
    .input(z.object({ fullName: z.string() }))
    .query(async ({ctx, input}) => {
        const guest = await ctx.prisma.guest.findUnique({
            where: { fullname: input.fullName },
            include: { group: true },
        });
        if (!guest) {
            throw new Error("Guest not found");
        }
        return {
            guest: guest,
            group: guest.group,
        }
     }),


    getGroupByGroupId: publicProcedure 
    .input(z.object({ groupId: z.number() }))
    .query(async ({ctx, input}) => {
        const group = await ctx.prisma.group.findUnique({
            where: { id: input.groupId },
            include: { guests: true },
        });

        if (!group) {
            throw new Error("Group not found");
        }

        return {
            group: group.guests,
        }
    }),
});
