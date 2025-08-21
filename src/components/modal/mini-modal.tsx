import { CircleX } from "lucide-react";
import React from "react";
import { createPortal } from 'react-dom';


type ModalType = {
    open?: boolean,
    children: React.ReactNode,
    setClose: () => any,
    title?: string
}

const MiniModal = ({
    open = false,
    children,
    setClose,
    title,
}: ModalType) => {
    

    return (
        <>
            {open && createPortal(
                <div>
                    <div className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[1000] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                        <div className="relative w-full max-w-lg max-h-full p-4">
                            <div className="relative bg-white rounded-lg shadow">
                                <h2 className="font-bold  pl-5 pt-2">
                                    <span className="capitalize">{title}</span>
                                </h2>
                                <div className="p-5">{children}</div>
                                <span className="cursor-pointer absolute top-2 right-5 text-[#E74C3C]" onClick={setClose}><CircleX size={20}/></span>
                            </div>
                        </div>
                    </div>
                    <div className={`fixed inset-0 z-50 bg-gray-900/50`}></div>
                </div>, document.body)}
        </>
    );
}

export default MiniModal