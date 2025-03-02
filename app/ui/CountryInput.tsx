"use client";

import { ChangeEvent } from "react";

interface Props {
  getCountries: (query: string) => Promise<string[]>;
}

export default function CountryInput({ getCountries }: Props) {
  function onCountryInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    console.log(getCountries(value));
  }

  return (
    <>
      <label htmlFor="country-name">Country or Territory</label>
      <input
        id="country-name"
        name="country-name"
        autoComplete="country-name"
        type="text"
        onChange={onCountryInputChange}
        className="border border-black"
      />
    </>
  );
}
