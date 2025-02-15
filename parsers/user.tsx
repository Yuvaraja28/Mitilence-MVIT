import { Timestamp } from "firebase/firestore";

export default function parseEventUser(id: string, data: any): EventUser {
  return {
    id: id,
    name: data?.name,
    enrollNo: data?.enrollNo,
    emailId: data?.emailId,
    phoneNo: data?.phoneNo,
    college: data?.college,
    department: data?.department,
    imageUrl: data?.imageUrl,
    gender: data?.gender,
    year: data?.year,
    paymentStatus: data?.paymentStatus,
    createdTime: (data.createdTime instanceof Timestamp ? data.createdTime.toDate() : new Date(data.createdTime)).toISOString()
  }
}