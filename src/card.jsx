import { useState } from 'react'
import PropTypes from 'prop-types'; // Importa PropTypes
import './Calculator.css';

function Calculator({ onCalculate }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  const handleNum1Change = (event) => {
    setNum1(parseInt(event.target.value));
  };

  const handleNum2Change = (event) => {
    setNum2(parseInt(event.target.value));
  };

 

  
  const handleCalculate = () => {
    onCalculate(num1, num2);
    setNum1(0); // Resetear num1 a 0
    setNum2(0); // Resetear num2 a 0
  };
  return (
    <div className="calculator-container">
           <h2 className="mb-4">
       
        Mi primera App con React
          </h2>

      <div className="form-group">
        <label htmlFor="num1">Número 1:</label>
        <input type="number" className="form-control" id="num1" value={num1} onChange={handleNum1Change} />
      </div>
      <div className="form-group">
        <label htmlFor="num2">Número 2:</label>
        <input type="number" className="form-control" id="num2" value={num2} onChange={handleNum2Change} />
      </div>
      <button className="btn btn-info" onClick={handleCalculate}>Multiplicar</button>
    </div>
  );
}

Calculator.propTypes = {
  onCalculate: PropTypes.func.isRequired, // Define PropTypes para onCalculate como una función requerida
};

export default Calculator;
