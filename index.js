import { fromEvent } from "rxjs";
import { map, filter, pluck } from "rxjs/operators";
import { calculatorClass } from "./calculatorClass"; // Importing the calculator class

// Calculator Class
var calculator$ = new calculatorClass();

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
      return calculator$._validateItem(_item, screen$); // Validate item pressed
    })
  ).subscribe( (event) => {
    calculator$._processItem(screen$, event.btn); // Process button pressed
  });

  // keyboard
  const keyboard$ = fromEvent(document, "keydown");
  keyboard$.pipe(
    pluck("key"),
    filter( (key) => {
      return calculator$._validateItem(key, screen$); // Validate key pressed
    }),
  ).subscribe((key) => {
    if (key === "*") { key = "X" };
    if (key === "Enter") { key = "equal" };
    const btn = document.getElementById("btn_"+key);
    calculator$._processItem(screen$, btn); // Process button pressed
  });