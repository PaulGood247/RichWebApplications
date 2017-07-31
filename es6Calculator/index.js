import {Observable} from 'rxjs/Rx';

/*const display = document.getElementById("display");
const incButton = document.getElementById("increment");
const decButton = document.getElementById("decrement");
const rstButton = document.getElementById("reset");

let counter = {value:0};
const incr = acc => ({value: acc.value +1});
const decr = acc => ({value: acc.value -1});
const rstr = acc => ({value: 0});

const button$ = Observable.merge(
	Observable.fromEvent(incButton, 'click').mapTo(incr),
	Observable.fromEvent(decButton, 'click').mapTo(decr),
	Observable.fromEvent(rstButton, 'click').mapTo(rstr)
);

button$
	.scan((acc, update)=> update(acc),counter)
	.subscribe(counter => {
		display.innerHTML = counter.value;
	});*/
	
const keys = document.querySelectorAll('.flex-container button');

for(var i=0; i<keys.length; i++){
  keys[i].onclick= function(e){
	  
    var btnVal= this.innerHTML;
    var screen = document.querySelector('input[type=text]');
    
    if(btnVal != '=' && btnVal != '±'){
      screen.value+=btnVal;
    }
    
    if(screen.value[0]=='+' || screen.value[0]=='x' || screen.value[0]=='÷'){
      screen.value='';
    }
    
    if(btnVal == '±'){
      screen.value = screen.value - (screen.value * 2);
    }else if(btnVal == 'C' ){
      screen.value='';
    }else if(btnVal=='='){
      if(screen.value[screen.value.length-1]=='+' || screen.value[screen.value.length-1]=='-' || screen.value[screen.value.length-1]=='x' || screen.value[screen.value.length-1]=='÷'){
      screen.value='';
    } 
    if(screen.value === '')return;
    screen.value = screen.value.replace(/x/g, '*').replace(/÷/g, '/');
    var x=eval(screen.value);
    screen.value= x;
    }
    
  }
}

