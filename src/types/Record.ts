import { Record as PocketbaseRecord } from "pocketbase";

type Record<T> = PocketbaseRecord & T;

export default Record;
