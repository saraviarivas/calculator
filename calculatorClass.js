export class calculatorClass {

    // ********************************************************************************************************************
    // Local Variables 
    // ********************************************************************************************************************
    operators$ = new Array();
    keyboardKeys$ = new Array();
    lastItem$ = "";

    // ********************************************************************************************************************
    // Constructor
    // ********************************************************************************************************************
    constructor() {
        this.operators$ = ["+","*", "-", "C","Enter"];
        this.keyboardKeys$ = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+","*", "-", "C","Enter"];
    }

    // ********************************************************************************************************************
    // Function to validate if the button is an number or an operator
    // ********************************************************************************************************************
    _validateItem(_item, screen$) {
        if ( this.keyboardKeys$.includes(_item) ){
          if ( this.operators$.includes(_item)) { // If key is an operator
            const digito$ = screen$.value.substring(screen$.value.length-1, screen$.value.length); // Get the last digit
            if ( this.operators$.includes(digito$)) { // If last character is an operator
              return false; 
            }else{ // If last character is not an operator
              return true;
            }
          }else{ // If key is a number
            if ( this.lastItem$ == "=" ) { screen$.value = "0"; } // If last item was an equal sign
            if ( Number(screen$.value) === 0 ) { // If screen is 0
              return true;
            }else{
              const tempString = screen$.value + _item;
              const digitos = tempString.substring(screen$.value.length-2, screen$.value.length); // Get the last two digits
              if ( digitos == "+0" || digitos == "-0" || digitos == "*0" ){  // Verify if the last number was +0, -0 or *0
                return false;
              }else{
                return true;
              }
            }
          }
        }else{ 
          return false;
        }
    }
    // ********************************************************************************************************************    
    // End function
    // ********************************************************************************************************************

    // ********************************************************************************************************************
    // Function to process the key pressed
    // ********************************************************************************************************************
    _processItem(screen, button) {

        if ( Number(button.innerText) || button.innerText == "0" ) { // If the button is a number
       
          // Numbers
          if (Number(screen.value) == 0){
            screen.value = button.innerText; // When screen is 0, replace it with the number
          }else{
            screen.value = screen.value + button.innerText;
          }
      
        }else{ // If the button is not a number
      
          // Operadores
          switch (button.innerText) { // Switch case to process the operator
            case "=":{
              const evaluateString$ = eval(screen.value); // Evaluate the string with EVAL function
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
      
        } // End else

        this.lastItem$ = button.innerText;
    
    }
    // ********************************************************************************************************************
    // End function
    // ********************************************************************************************************************

} // End class