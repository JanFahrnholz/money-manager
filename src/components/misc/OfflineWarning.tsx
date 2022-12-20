import { AnimatePresence, motion } from "framer-motion";
import React, { FC } from "react";
import { Detector } from "react-detect-offline";

const OfflineWarning: FC = () => {
    return (
        <>
            <Detector
                render={({ online }: { online: boolean }) => (
                    <AnimatePresence>
                        {!online && (
                            <motion.div
                                initial={{ y: -30 }}
                                animate={{ y: 0 }}
                                exit={{ y: -30 }}
                                className="text-center text-sm p-1 mx-2 rounded-b bg-danger
                        "
                            >
                                you are offline
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            />
        </>
    );
};

export default OfflineWarning;
