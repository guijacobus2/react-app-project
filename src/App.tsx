import React, { useEffect } from "react";
import "./App.css";

function App() {
  const [investorName, setInvestorName] = React.useState("");
  const [borrowerName, setBorrowerName] = React.useState("");
  const [interestRate, setInterestRate] = React.useState("");
  const [contractAmount, setContractAmount] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [contracts, setContracts] = React.useState<any[]>([]);

  const databaseObject = {
    investorName: investorName,
    borrowerName: borrowerName,
    interestRate: interestRate,
    contractAmount: contractAmount,
  };

  const getDataApi = async () => {
    const response = await fetch(`http://localhost:7071/api/HttpTrigger2`)
    const data = await response.json();
    setContracts(data);
  };

  useEffect(() => {
    getDataApi()
  }, [])

  const postDataFromApi = async (e: any) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(databaseObject),
    };

    const databaseData = await fetch(
      `http://localhost:7071/api/HttpTrigger1`,
      options
    ).then((data) => {
      return data.json();
    });

    if (databaseData.message) {
      setMessage(databaseData.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Rest API: React App with Azure Function API</p>
        <form
          id="form1"
          className="App-form"
          onSubmit={(e) => postDataFromApi(e)}
        >
          <div>
            <input
              type="text"
              id="investorName"
              className="App-input"
              placeholder="Investor Name"
              value={investorName}
              onChange={(e) => setInvestorName(e.target.value)}
            />
            <br />
            <input
              type="text"
              id="borrowerName"
              className="App-input"
              placeholder="Borrower Name"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
            />
            <br />
            <input
              type="text"
              id="interestRate"
              className="App-input"
              placeholder="Interest Rate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
            <br />
            <input
              type="text"
              id="contractAmount"
              className="App-input"
              placeholder="Contract Amount"
              value={contractAmount}
              onChange={(e) => setContractAmount(e.target.value)}
            />
            <br />
            <button type="submit" className="App-button">
              Submit
            </button>
          </div>
        </form>
        <div>
          <h5>Message: {message} </h5>
        </div>
        <div>Contracts Table</div>
        <div>{contracts.length > 0 && (
          <table>
            {contracts.map(contracts => (
              <tr key={contracts.id}>
                <td>{contracts.investorName}</td>
                <td>{contracts.borrowerName}</td>
                <td>{contracts.interestRate}</td>
                <td>{contracts.contractAmount}</td>
              </tr>
            ))}
          </table>
        )}</div>
      </header>
    </div>
  );
}

export default App;
