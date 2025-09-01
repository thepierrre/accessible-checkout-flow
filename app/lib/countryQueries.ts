import type { CountriesWithCodes } from "@/app/checkout/models";

function getCountryMatchesForNames(
  suggestedCountriesWithCodes: CountriesWithCodes,
  query: string,
): CountriesWithCodes {
  return Object.keys(suggestedCountriesWithCodes).length > 0
    ? Object.fromEntries(
        Object.keys(suggestedCountriesWithCodes)
          .filter((country) => {
            query = query.toLowerCase();
            country = country.toLowerCase();

            const countryNameQueryCombos: string[] = [];
            const splitCountry = country.split(" ");
            for (let i = 0; i < splitCountry.length; i++) {
              countryNameQueryCombos.push(
                splitCountry[i],
                splitCountry.slice(i).join(""),
                splitCountry.slice(i).join(" "),
              );
            }
            return countryNameQueryCombos.some((combo) =>
              combo.startsWith(query),
            );
          })
          .map((country) => [country, suggestedCountriesWithCodes[country]]),
      )
    : {};
}

function getCountryMatchesForPhoneCodes(
  suggestedCountriesWithCodes: CountriesWithCodes,
  query: string,
): CountriesWithCodes {
  return Object.keys(suggestedCountriesWithCodes).length > 0
    ? Object.fromEntries(
        Object.keys(suggestedCountriesWithCodes)
          .filter((country) => {
            if (query.charAt(0) === "+") {
              query = query.substring(1);
            }
            return suggestedCountriesWithCodes[country]
              .toString()
              .startsWith(query);
          })
          .map((country) => [country, suggestedCountriesWithCodes[country]]),
      )
    : {};
}

export { getCountryMatchesForNames, getCountryMatchesForPhoneCodes };
