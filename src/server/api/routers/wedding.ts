import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const FormValuesUpdateItemSchema = z.object({
    id: z.number(),
    fullname: z.string(),
    mealselection: z.string(),
    songpreference: z.string(),
    response: z.string(),
    guestId: z.number(),
});

const FormValuesItemSchema = z.object({
    id: z.number().nullable(),
    fullname: z.string(),
    mealselection: z.string(),
    songpreference: z.string(),
    response: z.string(),
    guestId: z.number(),
});

export const weddingRouter = createTRPCRouter({

    updateRSVP: publicProcedure
        .input(
            z.object({
                group: z.array(FormValuesUpdateItemSchema),
            })
        )
        .mutation(({ ctx, input }) => {

            console.log("input: ", input);
            const updateRsvps = input.group.map((guest) => ({
                id: guest.id,
                mealselection: guest.mealselection,
                songpreference: guest.songpreference,
                responce: guest.response == "Accept" ? true : false,
                guestId: guest.guestId
            }))

            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            updateRsvps.forEach(async (rsvp) => {
                console.log("router update: ", rsvp);
                await ctx.prisma.rSVP.update({
                    where: {
                        id: rsvp.id,
                    },
                    data: rsvp
                });
            });
        }),

    postRSVP: publicProcedure
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

            const rsvps = await ctx.prisma.rSVP.createMany({ data: createRsvps });
            return rsvps;
        }),

    getRSVPByGuestId: publicProcedure
        .input(z.object({ guestId: z.number() }))
        .query(async ({ ctx, input }) => {
            const rsvp = await ctx.prisma.rSVP.findUnique({
                where: { guestId: input.guestId },
            });
            if (!rsvp) {
                throw new Error("Guest not found");
            }
            return {
                rsvp: rsvp,
            }
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

    getGuestAndGroupByGuestName: publicProcedure
        .input(z.object({ fullName: z.string() }))
        .query(async ({ ctx, input }) => {
            const guest = await ctx.prisma.guest.findUnique({
                where: { fullname: input.fullName },
                include: { RSVP: true, group: { include: { guests: { include: { RSVP: true } } } } }
            });
            if (!guest) {
                throw new Error("Guest not found");
            }

            return {
                guest: guest,
            }
        }),
    getGuestByGuestName: publicProcedure
        .input(z.object({ fullName: z.string() }))
        .query(async ({ ctx, input }) => {
            const guest = await ctx.prisma.guest.findUnique({
                where: { fullname: input.fullName },
                include: { RSVP: true }
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
