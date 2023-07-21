import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/RSVP", "/RSVP/(.*)", "our-story", "/api/(.*)", "/events", "/photos", "/wedding-party", "/travel-and-lodging" ]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
