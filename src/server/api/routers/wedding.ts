import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const FormValuesItemSchema = z.object({
  fullname: z.string(),
  mealselection: z.string(),
  songpreference: z.string(),
  response: z.string(),
  guestId: z.number(),
});


export const weddingRouter = createTRPCRouter({

    postRSVPGroup: publicProcedure
        .input(
            z.object({
                group: z.array(FormValuesItemSchema),
            })
        )
        .mutation(async ({ ctx, input }) => {
        
            const createRsvps = input.group.map((guest) => ({
                mealselection: guest.mealselection,
                songpreference: guest.songpreference,
                responce: guest.response == "Accept" ? true : false,
                guestId: guest.guestId
            }))

            const rsvps = await ctx.prisma.rSVP.createMany({data: createRsvps});
            return rsvps;
        }),

    getAllGuests: publicProcedure
        .query(async ({ ctx }) => {
            const allGuests = await ctx.prisma.guest.findMany();
            const guests = allGuests.map(guest => guest.fullname.toLowerCase());
            if (!guests || guests == undefined) {
                throw new TRPCError({ code: "NOT_FOUND", message: "No guests found" });
            }
            return {
                guests,
            }
        }),

    getGuestByGuestName: publicProcedure
        .input(z.object({ fullName: z.string() }))
        .query(async ({ ctx, input }) => {
            const guest = await ctx.prisma.guest.findUnique({
                where: { fullname: input.fullName },
            });
            if (!guest) {
                throw new Error("Guest not found");
            }
            return {
                guest: guest,
            }
        }),


    getGroupByGroupId: publicProcedure
        .input(z.object({ groupId: z.number() }))
        .query(async ({ ctx, input }) => {
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
