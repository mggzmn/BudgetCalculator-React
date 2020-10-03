import React from "react";
import { MdSend } from "react-icons/md";
const Form = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            id="charge"
            name="charge"
            value={charge}
            onChange={handleCharge}
            className="form-control"
            placeholder="e.g. rent"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmount}
            className="form-control"
            placeholder="e.g. 300"
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? "Edit" : "Submit"} <MdSend className="btn-icon" />
      </button>
    </form>
  );
};
export default Form;
