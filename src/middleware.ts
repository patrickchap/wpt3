import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/","/faq","/things-to-do", "/registry", "/RSVP", "/RSVP/(.*)", "our-story", "/api/(.*)", "/events", "/photos", "/wedding-party", "/travel-and-lodging" ]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
