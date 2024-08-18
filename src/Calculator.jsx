import { BUTTONS, BOT_BUTTONS } from './buttons';

import { useState } from 'react';

import { evaluate } from 'mathjs';

const Calculator = () => {
    const [theme, setTheme] = useState('1');

    const [input, setInput] = useState('');

    const [result, setResult] = useState('');

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    const handleButtonClick = (value) => {
        setInput((prevInput) => prevInput + value);
    };

    const handleDelete = () => {
        setInput(input.slice(0, -1));
        setResult(result.slice(0, -1));
    };

    const handleEvaluate = () => {
        try {
            const evaluateResult = evaluate(input);
            setResult(evaluateResult.toString());
            setInput('');
        } catch (error) {
            setResult('Error');
        }
    };

    const handleReset = () => {
        setInput('');
        setResult('');
    };

    return (
        <div className={`container theme${theme}`}>
            <div className="calculator">
                <div className="header">
                    <h4>calc</h4>
                    <div>
                        <p>theme</p>
                        <div className="themeToggle">
                            <label htmlFor="theme_1">1</label>
                            <input
                                type="radio"
                                name="theme"
                                id="theme_1"
                                value="1"
                                defaultChecked
                                onClick={handleThemeChange}
                            />
                            <label htmlFor="theme_2">2</label>
                            <input type="radio" name="theme" id="theme_2" value="2" onClick={handleThemeChange} />
                            <label htmlFor="theme_3">3</label>
                            <input type="radio" name="theme" id="theme_3" value="3" onClick={handleThemeChange} />
                        </div>
                    </div>
                </div>

                <div className="display">
                    <span className="history"></span>
                    <p className="result">{input || result}</p>
                </div>

                <div className="btnContainer">
                    <div className="upBtn">
                        {BUTTONS.map((btn) => (
                            <button key={btn} onClick={btn !== 'DEL' ? () => handleButtonClick(btn) : handleDelete}>
                                {btn}
                            </button>
                        ))}
                    </div>
                    <div className="botBtn">
                        {BOT_BUTTONS.map((btn) => (
                            <button key={btn} onClick={btn === 'RESET' ? handleReset : handleEvaluate}>
                                {btn}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Calculator;
