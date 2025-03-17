import { getEvent } from "@/Firestore/events";
import { parseDateOnly, parseTimeOnly } from "@/utils/parseDate";

type Params = Promise<{ eventId: string }> 

export async function generateMetadata({ params }: { params: Params }) {
  try {
    const eventData = await getEvent((await params).eventId)
    const eventDate = parseDateOnly(eventData.startTime)
    const startTime = parseTimeOnly(eventData.startTime)
    const endTime = parseTimeOnly(eventData.endTime)
    let eventData_logoUrl = eventData?.logoUrl

    return {
      title: `${eventData.name} • ${eventData.departmentId.toUpperCase()}`,
      description: `Join us at the Mitilence event for ${eventData.name} happening in ${eventData?.departmentId?.toUpperCase()} Dept - in ${eventData.place.toUpperCase()} on ${eventDate} from ${startTime} to ${endTime}. Team size: ${eventData.teamSize}`,
      icons: {
        icon: eventData_logoUrl || '',
        apple: eventData_logoUrl || ''
      },
      openGraph: {
        type: "website",
        title: `${eventData.name} • ${eventData.departmentId.toUpperCase()}`,
        description: `Join us at the Mitilence event for ${eventData.name} happening in ${eventData?.departmentId?.toUpperCase()} Dept - in ${eventData.place.toUpperCase()} on ${eventDate} from ${startTime} to ${endTime}. Team size: ${eventData.teamSize}`,
        siteName: "Mitilence • MVIT",
        images: [{
          url: eventData_logoUrl || '',
        }],
      },
      twitter: {
        card: `Join us at the Mitilence event for ${eventData.name} happening in ${eventData?.departmentId?.toUpperCase()} Dept - in ${eventData.place.toUpperCase()} on ${eventDate} from ${startTime} to ${endTime}. Team size: ${eventData.teamSize}.`,
        images: eventData_logoUrl || '',
        creator: 'Yuvaraja'
      }
    }
  } catch {}
}

export default function EventELayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}