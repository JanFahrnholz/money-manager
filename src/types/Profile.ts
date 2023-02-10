import Record from "@/types/Record";

type Profile = Record<{
    username: string;
    seller: boolean;
    enableStatistics: boolean;
}>;
export default Profile;
