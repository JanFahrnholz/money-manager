import CrudAction from "@/types/CrudAction";
import toast from "react-hot-toast";

const transactionToast = (p: Promise<any>, action: CrudAction) => {
	action === "CREATE" &&
		toast.promise(p, {
			loading: "creating...",
			success: () => "Transaction successfully created",
			error: (err) => `Error: ${err.message}`,
		});

	action === "DELETE" &&
		toast.promise(p, {
			loading: "deleting...",
			success: () => "Transaction successfully deleted",
			error: (err) => `Error: ${err.message}`,
		});
};

export { transactionToast };
