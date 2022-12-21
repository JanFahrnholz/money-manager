import { useState } from "react";
import toast from "react-hot-toast";
type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null);

    const copy: CopyFn = async (text) => {
        if (!navigator?.clipboard) {
            console.warn("Clipboard not supported");
            return false;
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard");
            setCopiedText(text);
            return true;
        } catch (error) {
            console.warn("Copy failed", error);
            toast.error("Could not copy to clipboard");
            setCopiedText(null);
            return false;
        }
    };

    return [copiedText, copy];
}

export default useCopyToClipboard;
