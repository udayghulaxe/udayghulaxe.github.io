import React, { useState, useRef } from "react";

const AddPayments = () => {
  interface Errors {
    customerName: string;
    routingNumber: string;
    accountNumber: string;
    confirmAccountNumber: string;
    accountNickname: string;
  }
  const accountRef = useRef<HTMLInputElement>(null);
  const confirmAccountRef = useRef<HTMLInputElement>(null);
  let alphaRegex = /^[a-z A-Z]+$/;
  const errors: Errors = {
    customerName: "",
    routingNumber: "",
    accountNumber: "",
    confirmAccountNumber: "",
    accountNickname: "",
  };
  const [errorsState, setErrorsState] = useState<Errors>(errors);
  const [formState, setFormState] = useState<Errors>(errors);
  const [valid, setValid] = useState(false);
  const [routingMessage, setRoutingMessage] = useState<string>('');

  const handleChange = (event: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    event.preventDefault();
    const { name, value } = event.target;
    const newData = { ...formState, [name]: value };
    setFormState(newData);
    const tempErrors = JSON.parse(JSON.stringify(errorsState));

    // Validate for empty values
    tempErrors[name] = value.length === 0 ? "Please enter a value" : "";

    // Validate for only alphabates
    if (
      (name === "customerName" || name === "accountNickname") &&
      value.length > 0
    ) {
      tempErrors[name] = !alphaRegex.test(value)
        ? "Only alphabates allowed"
        : "";
    }

    // Validate for and fetch routing number details
    if (name === "routingNumber" && value.length > 0) {
      if (value.length === 9) {
        // Empty out any previous bank name
        setRoutingMessage('');
        validateRoutingNumber(value);
      } else {
        tempErrors[name] = "Routing number should be 9 digits";
      }
    }

    // Validate account number and confirm account number
    if (name === "accountNumber" || name === "confirmAccountNumber") {
      tempErrors[name] =
        value.length < 5 || value.length > 17
          ? "Length should be between 5 to 17"
          : "";
      if (
        confirmAccountRef.current?.value !== "" &&
        accountRef.current?.value !== ""
      ) {
        tempErrors["accountNumber"] = tempErrors["accountNumber"] = "";
        tempErrors[name] =
          confirmAccountRef.current?.value !== accountRef.current?.value
            ? "Account number and confirm account number should match"
            : "";
      }
    }

    let tempValid = false;
    // Loop through errors and check if we have any
    for (const key in tempErrors) {
      tempValid = false;
      if (tempErrors[key].length > 0) {
        tempValid = true;
        break;
      }
    }
    setErrorsState(tempErrors);
    const isFormEmpty =
      newData.customerName.length > 0 &&
      newData.routingNumber.length > 0 &&
      newData.accountNumber.length > 0 &&
      newData.confirmAccountNumber.length > 0 &&
      newData.accountNickname.length > 0;
    setValid(!tempValid && isFormEmpty);
  };

  /**
   * Function to validate and fetch routing number
   * @param value - Routing Number
   */
  const validateRoutingNumber = (value: string) => {
    fetch(`https://www.routingnumbers.info/api/name.json?rn=${value}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
            setRoutingMessage(`Bank Name: ${data.name}`);
        } else {
            const newData = { ...errorsState, routingNumber: data.message };
            setErrorsState(newData);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="add-payments__container">
      <div className="mt-10 sm:mt-0">
        <div className="mb-3 xl:w-96">
          <label
            htmlFor="customerName"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Customer Name*
          </label>
          <input
            type="text"
            name="customerName"
            value={formState.customerName}
            onChange={handleChange}
            className="form-control block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-600 rounded focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-indigo-600"
            placeholder="Customer Name"
          />
          {errorsState.customerName.length > 0 && (
            <span className="error">{errorsState.customerName}</span>
          )}
        </div>

        <div className="mb-3 xl:w-96">
          <label
            htmlFor="routingNumber"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Routing Number*
          </label>
          <input
            type="text"
            name="routingNumber"
            value={formState.routingNumber}
            onChange={handleChange}
            className="form-control block w-full px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-600 rounded focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-indigo-600"
            placeholder="Routing Number ex: 122242597"
          />
          {errorsState.routingNumber.length > 0 && (
            <span className="error">{errorsState.routingNumber}</span>
          )}
          {routingMessage.length > 0 && !(errorsState.routingNumber.length > 0) && <span className="success">{routingMessage}</span>}
        </div>

        <div className="mb-3 xl:w-96">
          <label
            htmlFor="accountNumber"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Bank Account Number*
          </label>
          <input
            type="text"
            name="accountNumber"
            ref={accountRef}
            value={formState.accountNumber}
            onChange={handleChange}
            className="form-control block w-full px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-600 rounded focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-indigo-600"
            placeholder="Bank Account Number"
          />
          {errorsState.accountNumber.length > 0 && (
            <span className="error">{errorsState.accountNumber}</span>
          )}
        </div>

        <div className="mb-3 xl:w-96">
          <label
            htmlFor="confirmAccountNumber"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Re-enter Bank Account Number*
          </label>
          <input
            type="text"
            name="confirmAccountNumber"
            ref={confirmAccountRef}
            value={formState.confirmAccountNumber}
            onChange={handleChange}
            className="form-control block w-full px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-600 rounded focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-indigo-600"
            placeholder="Re-enter Bank Account Number"
          />
          {errorsState.confirmAccountNumber.length > 0 && (
            <span className="error">{errorsState.confirmAccountNumber}</span>
          )}
        </div>

        <div className="mb-3 xl:w-96">
          <label
            htmlFor="accountNickname"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Account Nickname*
          </label>
          <input
            type="text"
            name="accountNickname"
            value={formState.accountNickname}
            onChange={handleChange}
            className="form-control block w-full px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-600 rounded focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-indigo-600"
            placeholder="Account Nickname"
          />
          {errorsState.accountNickname.length > 0 && (
            <span className="error">{errorsState.accountNickname}</span>
          )}
        </div>
        <div className="mb-3 xl:w-96 mt-5">
          <button
            {...(!valid && { disabled: true })}
            className="bg-indigo-700 hover:bg-indigo-900 w-full text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPayments;
