export function calculator(screen, button) {
  if ( Number(button.innerText) || button.innerText == "0" ) { // If the button is a number
 
    // Numbers
    if (Number(screen.value) == 0){
      screen.value = button.innerText; // When screen is 0, replace it with the number
    }else{
      screen.value = screen.value + button.innerText;
    }

  }else{ // If the button is not a number

    // Operadores
    switch (button.innerText) {
      case "=":{
        const evaluateString$ = eval(screen.value);
        screen.value = eval(evaluateString$);
        break;
      }
      case "X":{
        screen.value = screen.value + "*";
        break;
      }
      case "-":{ 
        screen.value = screen.value + button.innerText;
        break;
      }
      case "+":{ 
        screen.value = screen.value + button.innerText;
        break;
      }
      case "C":{
        screen.value = "0";
        break;
      }
      default:{ 
        return false;
      }
    } // End switch

  }
}