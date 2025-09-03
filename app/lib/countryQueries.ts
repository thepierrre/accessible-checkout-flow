function getCountryMatchesForNames(
  countries: string[],
  query: string,
): string[] {
  const lqQuery = query.toLowerCase();

  return countries.filter((country) => {
    const lqCountry = country.toLowerCase();

    const countryQueryCombos: string[] = [];
    const splitCountry = lqCountry.split(" ");

    for (let i = 0; i < splitCountry.length; i++) {
      countryQueryCombos.push(
        splitCountry[i],
        splitCountry.slice(i).join(""),
        splitCountry.slice(i).join(" "),
      );
    }

    return countryQueryCombos.some((combo) => combo.startsWith(lqQuery));
  });
}

export { getCountryMatchesForNames };
