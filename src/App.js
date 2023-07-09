import './App.css';
import { useState } from 'react';
import usePasswordGenerator from './hooks/usePasswordGenerator';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import PasswordStrengthIndicator from './components/StrengthChecker';


export default function App() {
  const [length , setLength] = useState(12);
  const [checkBoxData, setCheckBoxData] = useState([
    {
      title: "Include Uppercase Letters", state: false
    },
    {
      title: "Include Lowercase Letters", state: false
    },
    {
      title: "Include Numbers", state: false
    },
    {
      title: "Include Symbols", state: false
    }
  ]);
  const [copied, setCopied] = useState(false)

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData
 = [...checkBoxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckBoxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword} = usePasswordGenerator();
  
  return (
    <div className='container'>
      {/* Password Text and Copy */}
      {password && (
        <div className='header'>
          <div className='title'>{password}</div>
          <Button
            text={copied ? "Copied" : "Copy"}
            onClick={handleCopy}
            customClass="copyBtn"
          />
        </div>
        )}

        {/* Chracter Length */}
        <div className='char-length'>
          <span>
            <label>Character Length</label>
            <label>{length}</label>
          </span>
          <input 
            type='range'
            min='12'
            max='25'
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        {/* Checkboxes*/}
        <div className='checkboxes'>
          {checkBoxData.map((checkbox, index) => {
            return (
              <Checkbox
                key={index}
                title={checkbox.title}
                onChange={() => handleCheckboxChange(index)}
                state={checkbox.state}
              />
            );
          })}
        </div>

        {/* Strength Checker*/}
        <PasswordStrengthIndicator password={password}/>
        
        {/* Error Handling */}
        {errorMessage && <div className='error-message'>{errorMessage}</div>}
        
        {/* Generate password button */}
        <Button
          text="Generate Password"
          onClick={() => generatePassword(checkBoxData, length)}
          customClass="generateBtn"
        />
      
      
    </div>
  )
}
