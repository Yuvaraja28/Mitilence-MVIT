import { Timestamp } from "firebase/firestore";

export default function parseEventUser(id: string, data: any): EventUser {
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
    createdTime: null,
    updatedTime: null
  }
  if (data?.createdTime instanceof Timestamp) {
    returnData['createdTime'] = data.createdTime.toDate()
  } else if (typeof data?.createdTime === "string") {
    returnData['createdTime'] = new Date(data.createdTime).toISOString()
  } else if (data?.createdTime != null) {
    returnData['createdTime'] = new Date(data?.createdTime.toMillis()).toISOString()
  }
  if (data?.updatedTime instanceof Timestamp) {
    returnData['updatedTime'] = data.updatedTime.toDate()
  } else if (typeof data?.updatedTime === "string") {
    returnData['updatedTime'] = new Date(data.updatedTime).toISOString()
  } else if (data?.updatedTime != null) {
    returnData['updatedTime'] = new Date(data?.updatedTime.toMillis()).toISOString()
  }
  return returnData;
}