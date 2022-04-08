import '../AdditionalFiles/App.css';
import * as React from "react";

//This is the API url to fetch from
const API_URL = 'https://matchesfashion.com/api/products';
const TAX_RATE = 0.08;

function YourSolution() {
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [lastPage, setLastPage] = React.useState(0);

  React.useEffect(() => {
    fetch(`${API_URL}?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
        setCurrentPage(currentPage);
        let count = data.count;
        if (data.products.length) {
          let last = Math.ceil(count / data.products.length);
          setLastPage(last);
        }
      });
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage !== lastPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const calculateProfit = ({ soldPrice, quantitySold, costToBusiness }) => {
    let profit = 0;
    let profitPerItem = soldPrice - costToBusiness;
    // calculate profit for 10 or less than 10 quantities
    if (quantitySold < 10) {
      profit = quantitySold * profitPerItem;
    } else {
      profit = 10 * profitPerItem;
    }
    // calculate profit for remaining quantities
    if (quantitySold > 10) {
      let remainingProfit = (quantitySold - 10) * profitPerItem;
      let paidTax = remainingProfit * TAX_RATE;
      remainingProfit = remainingProfit - paidTax;
      profit += remainingProfit;
    }
    profit = profit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `£${profit}`;
  }

  return (
    <div className="App">
      <table id="products">
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Name</th>
            <th>Quantity Sold</th>
            <th>Sold Price</th>
            <th>Cost To Business</th>
            <th>Profit after Tax</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, key) => {
            return (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.brand}</td>
                <td>{val.name}</td>
                <td>{val.quantitySold}</td>
                <td>£{val.soldPrice}</td>
                <td>£{val.costToBusiness}</td>
                <td>{calculateProfit(val)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button disabled={currentPage === 0} onClick={() => { setCurrentPage(0) }}>First Page</button>
      <button disabled={currentPage === 0} onClick={handlePrevious}>Previous Page</button>
      <button disabled={currentPage === lastPage} onClick={handleNext}>Next Page</button>
      <button disabled={currentPage === lastPage} onClick={() => { setCurrentPage(lastPage) }}>Last Page</button>
    </div>
  );
}

export default YourSolution;
