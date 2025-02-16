import { getEvent } from "@/Firestore/events";

export async function generateMetadata({ params }: { params: Promise<{ event: string }> }) {
  try {
    const eventData = await getEvent((await params).event)
    const eventDate = new Date(eventData.startTime).toLocaleDateString('en-us', { month: 'short', year: 'numeric', day: '2-digit' });
    const startTime = new Date(eventData.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const endTime = new Date(eventData.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    return {
      title: `${eventData.name} • ${eventData.departmentId.toUpperCase()}`,
      description: `Join us at the Mitilence event in ${eventData.place.toUpperCase()} on ${eventDate} from ${startTime} to ${endTime}. Team size: ${eventData.teamSize}`,
      icons: {
        icon: eventData.logoUrl,
        apple: eventData.logoUrl
      },
      openGraph: {
        type: "website",
        title: `${eventData.name} • ${eventData.departmentId.toUpperCase()}`,
        description: `Join us at the Mitilence event in ${eventData.place.toUpperCase()} on ${eventDate} from ${startTime} to ${endTime}. Team size: ${eventData.teamSize}`,
        siteName: "Mitilence • MVIT",
        images: [{
          url: eventData.logoUrl,
        }],
      },
      twitter: {
        card: `Join us at the Mitilence event in ${eventData.place.toUpperCase()} on ${eventDate} from ${startTime} to ${endTime}. Team size: ${eventData.teamSize}.`,
        images: eventData.logoUrl,
        creator: 'Yuvaraja'
      }
    }
  } catch {}
}

export default function EventsIDLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children
}