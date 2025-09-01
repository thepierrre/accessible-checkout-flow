"use client";

import {useId, useState} from "react";
import Image from "next/image";
import questionIcon from "../../../public/icons/questionIcon.svg";
import Tooltip from "@/app/components/shared/Tooltip";
import Modal from "@/app/components/shared/Modal";

export function ReturningCustomer() {
    const tooltipId = useId();
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <section
            className="w-144 flex flex-col gap-2 text-lg text-black-primary border-b pb-1 border-gray-primary px-6">
            <div className="flex gap-1">
                <button className="text-blue-primary font-medium focus:outline-blue-primary"
                        onClick={() => setIsModalOpen(true)}>
                    Log in
                </button>
                <p>or</p>
                <button className="text-blue-primary font-medium focus:outline-blue-primary"
                        onClick={() => setIsModalOpen(true)}>
                    sign up
                </button>
                <p>(optional)</p>
                <Tooltip
                    label="Log in to track your purchase history."
                    position="right"
                    id={tooltipId}
                >
                    {(triggerProps) => (
                        <Image
                            tabIndex={0}
                            src={questionIcon}
                            alt=""
                            {...triggerProps}
                        />
                    )}
                </Tooltip>
                <Modal
                    isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                    title="Demo"
                    description="This is just a demo. No real login or signup here!"/>
            </div>
        </section>
    );
}
