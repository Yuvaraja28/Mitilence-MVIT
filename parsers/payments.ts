import parseEventUser from "./user";

export default function parsePayments(
  id: string,
  paymentData: any
): EventUserPayments {
  // Helper function to safely parse timestamps
  const parseTimestamp = (time: any): string | null => {
    if (!time) return null; // Return null for null/undefined values

    if (typeof time.toDate === "function") {
      return time.toDate().toISOString();
    }
    if (typeof time.toMillis === "function") {
      return new Date(time.toMillis()).toISOString();
    }
    if (typeof time === "string" || typeof time === "number") {
      try {
        return new Date(time).toISOString();
      } catch {
        return null; // Return null if invalid date
      }
    }

    return null; // Fallback for unsupported types
  };

  const mitilence = Object.keys(paymentData?.mitilence || {}).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: {
        paymentStatus: paymentData.mitilence[curr]?.paymentStatus || false,
        departmentId: paymentData.mitilence[curr]?.departmentId || "",
        participantType: paymentData.mitilence[curr]?.participantType || "",
        paymentVerifiedBy: paymentData.mitilence[curr]?.paymentVerifiedBy || "",
        paymentVerifiedByName: paymentData.mitilence[curr]?.paymentVerifiedByName || "",
        paymentTime: parseTimestamp(paymentData.mitilence[curr]?.paymentTime),
        registeredTime: parseTimestamp(paymentData.mitilence[curr]?.registeredTime),
        registrationStatus: paymentData.mitilence[curr]?.registrationStatus || false
      },
    }),
    {}
  );

  const events = Object.keys(paymentData?.events || {}).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: {
        eventId: curr,
        departmentId: paymentData.events[curr]?.departmentId || "",
        checkedInBy: paymentData.events[curr]?.checkedInBy || "",
        checkedInByName: paymentData.events[curr]?.checkedInByName || "",
        checkedInTime: parseTimestamp(paymentData.events[curr]?.checkedInTime),
        checkedInStatus: Boolean(paymentData.events[curr]?.checkedInStatus), // Ensures true/false
        // registeredTime: parseTimestamp(paymentData.events[curr]?.registeredTime),
      },
    }),
    {}
  );

  const user = parseEventUser(id, paymentData?.user);

  return { id, mitilence, events, user };
}