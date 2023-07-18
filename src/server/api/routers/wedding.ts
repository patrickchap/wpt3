import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure} from "~/server/api/trpc";


export const weddingRouter = createTRPCRouter({

    getAllGuests: publicProcedure
        .query(async ({ctx}) => {
            const allGuests = await ctx.prisma.guest.findMany();
            const guests = allGuests.map(guest => guest.fullname.toLowerCase()); 
            if (!guests || guests == undefined) {
                throw new TRPCError({code: "NOT_FOUND", message: "No guests found"});
            }
            return {
                guests,
            }
        }),

    getGuestAndGroupByName: publicProcedure
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

    getGuestByGuestName: publicProcedure
    .input(z.object({ fullName: z.string() }))
    .query(async ({ctx, input}) => {
        const guest = await ctx.prisma.guest.findUnique({
            where: { fullname: input.fullName },
        });
        if (!guest) {
            throw new Error("Guest not found");
        }
        return {
            guest: guest,
            group: guest.groupId,
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
