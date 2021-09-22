import { fromEvent } from "rxjs";
import { map, filter, pluck } from "rxjs/operators";
import { calculator } from "./calculator";

// Variables
var operators$ = ["+","*", "-", "C","Enter"];
var keyboardKeys$ = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+","*", "-", "C","Enter"];
var lastItem$ = "";

// Functions
function _Validate(_item, screen$) {
  if ( keyboardKeys$.includes(_item) ){
    if ( operators$.includes(_item)) { // If key is an operator
      const digito$ = screen$.value.substring(screen$.value.length-1, screen$.value.length);
      if ( operators$.includes(digito$)) { // If last character is an operator
        return false; 
      }else{ // If last character is not an operator
        return true;
      }
    }else{ // If key is a number
      if ( lastItem$ == "=" ) { screen$.value = "0"; } // If last item was an equal sign
      if ( Number(screen$.value) === 0 ) { // If screen is 0
        return true;
      }else{
        const tempString = screen$.value + _item;
        const digitos = tempString.substring(screen$.value.length-2, screen$.value.length);
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

// Elements
var screen$ = document.getElementById("screen");

// Stream

  // Buttons
  const btnsClick$ = fromEvent( Array.from(document.querySelectorAll("[class^=buttons]")) , "click" );
  btnsClick$.pipe(
    map( (btnObject) => ({
      btn : btnObject.target,
    })),
    filter( (event) => {
      var _item = event.btn.innerHTML;
      if ( _item === "X") { _item = "*" };
      if ( _item === "=") { _item = "Enter" };
      return _Validate(_item, screen$);
    })
  ).subscribe( (event) => {
    lastItem$ = event.btn.innerHTML; // Getting last item
    calculator(screen$, event.btn);
  });

  // keyboard
  const keyboard$ = fromEvent(document, "keydown");
  keyboard$.pipe(
    pluck("key"),
    filter( (key) => {
      return _Validate(key, screen$);
    }),
  ).subscribe((key) => {
    if (key === "*") { key = "X" };
    if (key === "Enter") { key = "equal" };
    const btn = document.getElementById("btn_"+key);
    lastItem$ = btn.innerHTML; // Getting last item
    calculator(screen$, btn);
  });