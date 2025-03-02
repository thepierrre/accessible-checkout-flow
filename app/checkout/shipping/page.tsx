import { getCountryNamesForQuery } from "@/app/checkout/actions";
import CountryInput from "@/app/ui/CountryInput";

export default function ShippingPage() {
  return (
    <div>
      <h1>Address Form</h1>
      <form id="address-form" name="address-form">
        <section>
          <label htmlFor="full-name">Full Name</label>
          <input
            id="full-name"
            name="full-name"
            autoComplete="name"
            type="text"
            className="border border-black"
          />
        </section>
        <section>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            autoComplete="street-address"
            type="textarea"
            className="border border-black"
          />
        </section>
        <section>
          <label htmlFor="postal-code">ZIP or Postal Code</label>
          <input
            id="postal-code"
            name="postal-code"
            autoComplete="postal-code"
            type="text"
            className="border border-black"
          />
        </section>
        <section>
          <label htmlFor="region">State, Region, or Province (optional)</label>
          <input
            id="region"
            name="region"
            autoComplete="address-level1"
            type="text"
            className="border border-black"
          />
        </section>
        {/*TODO: Add a note: "Why do we need that?"*/}
        <section>
          <CountryInput getCountries={getCountryNamesForQuery} />
        </section>
        <section>
          <input
            id="billing-address"
            name="billing-address"
            type="checkbox"
            className="border border-black"
          />
          <label htmlFor="billing-address">Use as Billing Address</label>
        </section>
      </form>
    </div>
  );
}
