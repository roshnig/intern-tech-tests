import { products } from "../AdditionalFiles/mockData";

// You can use this calculateProfit function as a way of testing your algorithm,
// just put your implementation in and the tests will pass if it is correct.

// To run the test, call "npm run test" in the terminal.

const calculateProfit = ({ soldPrice, quantitySold, costToBusiness }) => {
  let profit = 0;
  const TAX_RATE = 0.08;
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

describe('Tax Calculation', () => {
  it('calculates the correct amount of tax when product is under tax threshold', () => {
    const possibleAnswers = ['16384.464', '£16,384.464', '£16,384.46', '£16384.46', '£16384.464', 16384.464, 16384.46];

    expect(possibleAnswers).toContain(calculateProfit(products[0]))
  })

  it('calculates the correct amount of tax when product is over tax threshold', () => {
    const possibleAnswers = ['833.54', '£833.54', 833.54];

    expect(possibleAnswers).toContain(calculateProfit(products[36]))
  })

})
