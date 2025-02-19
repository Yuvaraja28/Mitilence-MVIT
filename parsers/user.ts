import { Timestamp } from "firebase/firestore";

export default function parseEventUser(id: string, data: any, firestore = true): EventUser {
  const returnData: any = {
    id: id,
    name: data?.name,
    enrollNo: data?.enrollNo,
    emailId: data?.emailId,
    phoneNo: data?.phoneNo,
    college: data?.college,
    department: data?.department,
    imageUrl: data?.imageUrl,
    gender: data?.gender,
    gradYear: data?.gradYear,
  }
  if (firestore) {
    returnData['createdTime'] = (data?.createdTime == null) ? null : (data.createdTime instanceof Timestamp ? data.createdTime.toDate() : new Date(data.createdTime)).toISOString()
    returnData['updatedTime'] = (data?.updatedTime == null) ? null : (data.updatedTime instanceof Timestamp ? data.updatedTime.toDate() : new Date(data.updatedTime)).toISOString()
  } else {
    returnData['createdTime'] = (data?.createdTime == null) ? null : new Date(data?.createdTime.toMillis()).toISOString()
    returnData['updatedTime'] = (data?.updatedTime == null) ? null : new Date(data?.updatedTime.toMillis()).toISOString()
  }
  return returnData;
}