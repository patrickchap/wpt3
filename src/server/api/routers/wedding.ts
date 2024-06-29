import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const FormValuesUpdateItemSchema = z.object({
    id: z.number(),
    fullname: z.string(),
    mealselection: z.string(),
    songpreference: z.string(),
    notes: z.string(),
    response: z.string(),
    guestId: z.number(),
});

const FormValuesGuestsSchema = z.object({
    fullname: z.string(),
    group: z.string(),
    id: z.number().nullish(),
});

const FormValuesItemSchema = z.object({
    id: z.number().nullable(),
    fullname: z.string(),
    mealselection: z.string(),
    songpreference: z.string(),
    notes: z.string(),
    response: z.string(),
    guestId: z.number(),
});

const GroupItemSchema = z.object({
    fullname: z.string(),
    mealselection: z.string(),
    songpreference: z.string(),
    notes: z.string(),
    response: z.string(),
    guestId: z.number(),
});

type Guest = {
    fullname: string;
    mealselection: string;
    songpreference: string;
    notes: string;
    response: string;
    guestId: number;
};
const resend = new Resend(process.env.RESEND_API_KEY);

export const weddingRouter = createTRPCRouter({

    postGuests: protectedProcedure
        .input(
            z.object({
                guests: z.array(FormValuesGuestsSchema),
            })
        )
        .mutation(async ({ ctx, input }) => {

            const allGroups = await ctx.prisma.group.findMany();
            const existingGroupNames = new Set(allGroups.map(group => group.groupname.trim().toLowerCase()));

            const inputGroups = [...new Set(input.guests.map(guest => guest.group.trim().toLowerCase()))]
                .filter(groupName => !existingGroupNames.has(groupName))
                .map(groupName => ({ groupname: groupName }));

            const newGroups = await ctx.prisma.group.createMany({
                data: inputGroups,
            });
            console.log("newGroups: ", newGroups);

            // Fetch all groups once
            const createGuests = input.guests.map(async (guest) => {
                // Normalize the group name
                const normalizedGroupName = guest.group.trim().toLowerCase();

                // Check if the group already exists in the fetched groups
                let group = await ctx.prisma.group.findUnique({
                    where: {
                        groupname: normalizedGroupName,
                    },
                });
                console.log(`Checking for group: ${normalizedGroupName}`);
                console.log("Found group: ", group);

                if (!group) {
                    //group does not exist, create it
                    group = await ctx.prisma.group.create({
                        data: {
                            groupname: normalizedGroupName,
                        },
                    });
                    console.log("Created new group: ", group);
                } else {
                    console.log(`Group ${normalizedGroupName} already exists.`);
                }

                console.log("groupID: ", group.id);

                return {
                    fullname: guest.fullname,
                    groupId: group.id,
                };
            });

            // Wait for all guest processing to complete
            const resolvedGuests = await Promise.all(createGuests);
            console.log("Processed guests: ", resolvedGuests);


            const guests = await ctx.prisma.guest.createMany({
                data: resolvedGuests,
            });
            console.log("guests");
            console.log(guests);

            return guests;
        }),



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
                notes: guest.notes,
                responce: guest.response === "Accept" ? true : false,
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
                mealselection: guest.response === "Accept" ? guest.mealselection : "",
                songpreference: guest.songpreference,
                notes: guest.notes,
                responce: guest.response === "Accept" ? true : false,
                guestId: guest.guestId
            }))

            try {
                const rsvps = await ctx.prisma.rSVP.createMany({ data: createRsvps });
                return rsvps;
            } catch (error) {
                console.error(error);
            }
        }),

    postRSVPConfirmation: publicProcedure
        .input(
            z.object({
                group: z.array(GroupItemSchema),
                email: z.string().email(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const createRsvps: Guest[] = input.group.map((guest) => ({
                fullname: guest.fullname,
                mealselection: guest.mealselection,
                songpreference: guest.songpreference,
                notes: guest.notes,
                response: guest.response,
                guestId: guest.guestId
            }))
            try {

                const { data, error } = await resend.emails.send({
                    from: 'Patrick and Chantil <wedding@patrickandchantilwedding.com>',
                    to: [input.email],
                    subject: 'Email confirmation',
                    text: "Thank you for confirming your RSVP!",
                    react: EmailTemplate({ rsvps: createRsvps }),
                });

                if (error) {
                    console.error(error);
                    throw new Error("Failed to send email");
                }
                console.log('data', data);
            } catch (error) {
                console.error(error);
            }
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

    getAllRsvps: protectedProcedure
        .query(async ({ ctx }) => {
            const allRsvps = await ctx.prisma.rSVP.findMany({
                include: { guest: true }
            });

            let rsvpData = allRsvps.map(rsvp => ({
                fullname: rsvp.guest.fullname,
                mealselection: rsvp.mealselection,
                songpreference: rsvp.songpreference,
                notes: rsvp.notes,
                response: rsvp.responce ? "Accept" : "Decline",
                id: rsvp.id
            }));

            if (!rsvpData || rsvpData === undefined) {
                rsvpData = [{ fullname: "", mealselection: "", songpreference: "", notes: "", response: "", id: -1 }]
            }
            return {
                rsvpData,
            }
        }),

    getAllGuests: protectedProcedure
        .query(async ({ ctx }) => {
            const allGuests = await ctx.prisma.guest.findMany({
                include: { group: true }
            });
            let guestData = allGuests.map(guest => ({
                fullname: guest.fullname,
                group: guest.group?.groupname ?? "",
                id: guest.id
            }));


            if (!guestData || guestData == undefined) {
                guestData = [{ fullname: "", group: "", id: -1 }]
            }
            return {
                guestData,
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
            console.log("guest: ", guest);

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
