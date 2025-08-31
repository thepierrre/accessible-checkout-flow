import {RefObject, Ref, ComponentPropsWithRef} from "react";

// interface Props {
//     ref?: Ref<HTMLInputElement | null>;
//     //checked: boolean;
//     //onChange: () => void;
// }

type Props = ComponentPropsWithRef<"input">;

export default function BillingCheckbox(props: Props) {
    return (
        <section className="relative flex gap-2 my-4">
            <input
                {...props}
                id="billing-same-checkbox"
                type="checkbox"
                //checked={checked}
                //onChange={onChange}
                className="relative peer shrink-0 self-center appearance-none w-6 h-6 border-2 border-blue-primary rounded-md bg-white checked:bg-blue-primary checked:border-0 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-primary"
            />
            <label htmlFor="billing-same-checkbox" className="font-medium text-xl">
                Use for billing
            </label>
            <svg
                className="absolute w-4 h-4 mt-1.5 ml-1 hidden peer-checked:block pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </section>
    );
}
