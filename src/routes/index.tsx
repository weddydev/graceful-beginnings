import { createFileRoute } from "@tanstack/react-router";

import closedEnvelope from "@/assets/envelope-closed.png";
import { WeddingInvitationExperience } from "@/components/wedding-invitation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pranay & Binita | Luxury Wedding Invitation" },
      {
        name: "description",
        content:
          "A cinematic luxury wedding invitation website for Pranay and Binita with an envelope reveal, scratch-card names, and editorial invitation scenes.",
      },
      { property: "og:title", content: "Pranay & Binita | Luxury Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Enter a handcrafted wedding invitation experience with romantic motion, luxury paper styling, and editorial ceremony scenes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: closedEnvelope },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pranay & Binita | Luxury Wedding Invitation" },
      {
        name: "twitter:description",
        content:
          "A luxury romantic invitation website with envelope reveal, scratch-card names, and cinematic wedding sections.",
      },
      { name: "twitter:image", content: closedEnvelope },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: 'Pranay & Binita Wedding Invitation',
          description:
            'A luxury cinematic wedding invitation experience for Pranay and Binita.',
          image: [closedEnvelope],
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <WeddingInvitationExperience />;
}
