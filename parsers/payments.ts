import { Timestamp } from "firebase/firestore";

export default function parsePayments(id: string, paymentData: any, firestore = true): EventUserPayments {
  const mitilence = Object.keys(paymentData?.mitilence || {}).reduce((prev, curr) => ({...prev, [curr]: {
      departmentId: paymentData.mitilence[curr]?.departmentId,
      participantType: paymentData.mitilence[curr]?.participantType,
      paymentVerifiedBy: paymentData.mitilence[curr]?.paymentVerifiedBy,
      paymentVerifiedByName: paymentData.mitilence[curr]?.paymentVerifiedByName,
      paymentTime: (paymentData.mitilence[curr]?.paymentTime == null) ? null : 
        (!firestore) ? new Date(paymentData.mitilence[curr]?.paymentTime.toMillis()).toISOString() : (paymentData.mitilence[curr]?.paymentTime instanceof Timestamp ? paymentData.mitilence[curr]?.paymentTime.toDate() : new Date(paymentData.mitilence[curr]?.paymentTime)).toISOString()
    }
  }), {});
  const events = Object.keys(paymentData?.events || {}).reduce((prev, curr) => ({...prev, [curr]: {
      eventId: curr,
      eventName: paymentData.events[curr]?.eventName,
      departmentId: paymentData.events[curr]?.departmentId,
      checkedInBy: paymentData.events[curr]?.checkedInBy,
      checkedInByName: paymentData.events[curr]?.checkedInByName,
      checkedInTime: (paymentData.events[curr]?.checkedInTime == null) ? null :
        (!firestore) ? new Date(paymentData.events[curr]?.checkedInTime.toMillis()).toISOString() : (paymentData.events[curr].checkedInTime instanceof Timestamp ? paymentData.events[curr].checkedInTime.toDate() : new Date(paymentData.events[curr].checkedInTime)).toISOString(),
      checkedInStatus: paymentData.events[curr]?.checkedInStatus,
      registeredTime: (paymentData.events[curr]?.registeredTime == null) ? null : 
        (!firestore) ? new Date(paymentData.events[curr]?.registeredTime.toMillis()).toISOString() : (paymentData.events[curr].registeredTime instanceof Timestamp ? paymentData.events[curr].registeredTime.toDate() : new Date(paymentData.events[curr].registeredTime)).toISOString(),
    }
  }), {});
  return {
    id: id,
    mitilence, events
  };
}