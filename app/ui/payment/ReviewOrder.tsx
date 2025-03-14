export default function ReviewOrder() {
  return (
    <section className="w-1/2 h-full px-20 py-28 bg-gray-50">
      <div></div>
      <h1 className="text-4xl text-gray-700 mb-8">Review order</h1>
      <section className="flex flex-col gap-8">
        <section>
          <div className="flex border-b-2 border-gray-700 text-gray-700 pb-2 mb-4">
            <h2 className="grow text-2xl uppercase ">Delivery</h2>
            <button className="bg-gray-700 text-gray-100 px-4 py-1 text-sm rounded-md self-end">
              Change
            </button>
          </div>

          <p>Max Mustermann</p>
          <p>Berliner Str. 71</p>
          <p>82556 Munich</p>
          <p>GERMANY</p>
        </section>
        <section>
          <div className="flex border-b-2 border-gray-700 text-gray-700 pb-2 mb-4">
            <h2 className="text-2xl flex gap-2 grow">
              <span className="uppercase">Summary</span>
              <span>(3 items)</span>
            </h2>
            <button className="bg-gray-700 text-gray-100 px-4 py-1 text-sm rounded-md self-end">
              Change
            </button>
          </div>

          <table className="w-full">
            {/*<thead>*/}
            {/*  <tr>*/}
            {/*    <th>Name</th>*/}
            {/*    <th>Price</th>*/}
            {/*  </tr>*/}
            {/*</thead>*/}
            <tbody className="w-full">
              <tr className="flex w-full">
                <td className="w-1/2">Kenia</td>
                <td className="w-1/2">€15.99</td>
              </tr>
              <tr className="flex">
                <td>Ethiopia</td>
                <td>€14.99</td>
              </tr>
              <tr className="flex">
                <td>Costa Rica</td>
                <td>€14.49</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Shipping</td>
                <td>XXX</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>XXX</td>
              </tr>
            </tfoot>
          </table>
        </section>
      </section>
    </section>
  );
}
