import { Record as PocketbaseRecord } from "pocketbase";

type Record<T> = PocketbaseRecord & {
    expand: any;
} & T;

export default Record;
