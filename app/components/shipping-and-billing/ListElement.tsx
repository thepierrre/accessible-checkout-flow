import { clsx } from "clsx";
import { AddressType } from "@/app/checkout/models";
import useFocus from "@/app/hooks/useFocus";

interface Props {
  country: string;
  datalistIsShown: boolean;
  setDatalistIsShown: (arg: boolean) => void;
  addressType: AddressType;
  onCountryClick: (country: string, addressType: AddressType) => void;
  activeIndex: number;
  index: number;
}

export default function ListElement({
  country,
  datalistIsShown,
  setDatalistIsShown,
  addressType,
  onCountryClick,
  activeIndex,
  index,
}: Props) {
  const ref = useFocus(index === activeIndex);

  return (
    <li
      ref={ref}
      tabIndex={0}
      value={country}
      onMouseDown={() => {
        onCountryClick(country, addressType);
        console.log("after country click");
        setDatalistIsShown(false);
        console.log("after hiding datalist: ", datalistIsShown);
      }}
      className={clsx("focus: px-4 py-2 hover:bg-gray-100 focus:bg-gray-100")}
    >
      {country}
    </li>
  );
}
