import { Record } from "pocketbase";

type Contact = Record & {
    id: string;
    name: string;
    balance: number;
    user: string;
    owner: string;
};

export default Contact;

// {
//     "page": 1,
//     "perPage": 30,
//     "totalItems": 2,
//     "items": [
//       {
//         "@collectionId": "fumljdwbo5l74ep",
//         "@collectionName": "contacts",
//         "id": "RECORD_ID",
//         "created": "2022-01-01 01:00:00",
//         "updated": "2022-01-01 23:59:59",
//         "name": "test",
//         "balance": 123,
//         "user": "test",
//         "owner": "test"
//       },
//       {
//         "@collectionId": "fumljdwbo5l74ep",
//         "@collectionName": "contacts",
//         "id": "RECORD_ID",
//         "created": "2022-01-01 01:00:00",
//         "updated": "2022-01-01 23:59:59",
//         "name": "test",
//         "balance": 123,
//         "user": "test",
//         "owner": "test"
//       }
//     ]
//   }
