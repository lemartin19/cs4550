(() => {
    // HELPERS
    const doOperation = ({ currentVal, prevVal, operation }) => {
        // if you press two operation keys in a row, don't throw an error
        // (required to press equal sign and then use the result)
        if (isNaN(currentVal)) return prevVal;
    
        const prev = Number(prevVal);
        const curr = Number(currentVal);
        return `${operation(prev, curr)}`;
    };
    
    const add = (a, b) => a + b;
    
    const subtract = (a, b) => a - b;
    
    const multiply = (a, b) => a * b;
    
    const divide = (a, b) => {
        // dividing by zero will not throw an error
        if (b === 0) return 0;
        return a / b;
    };

    const handleDecimal = (currentVal, val) => {
        if (isNaN(currentVal)) return '0.';
        if (currentVal.includes('.')) return currentVal;
        return currentVal + val;
    }

    const handleNumber = (currentVal, val) => 
        isNaN(currentVal) ? val : currentVal + val;

    const handleOperation = val => {
        switch (val) {
            case '+': return add;
            case '-': return subtract;
            case '*': return multiply;
            case '/': return divide;
            default:
                throw new Error(`unexpected operation - received: ${val}`);
        }
    };

    const setResultText = ({ currentVal, prevVal }) => {
        const result = document.getElementById('result');
        result.innerText = isNaN(currentVal) ? Number(prevVal) : Number(currentVal);
    };

    // STATE
    const state = { currentVal: '0', prevVal: '0', operation: add };
    const updateState = (val) => {
        switch (val) {
            case '.':
                state.currentVal = handleDecimal(state.currentVal, val);
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                state.currentVal = handleNumber(state.currentVal, val);
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                state.prevVal = doOperation(state);
                state.operation = handleOperation(val);
                state.currentVal = val;
                break;
            case 'C':
                state.currentVal = '0';
                state.prevVal = '0';
                state.operation = add;
                break;
            default:
                throw new Error("unexpected calculator value");
        }
        setResultText(state);
    };
    
    // SETUP
    const keys = document.getElementsByClassName('key');
    for (let idx = 0; idx < keys.length; idx++) {
        const el = keys[idx];
        el.onclick = () => updateState(el.id);
    }
    setResultText(state);
})();
