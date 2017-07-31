import {Observable} from 'rxjs/Rx';

const display = document.getElementById("display");
const minsDis = document.getElementById("mins");
const secsDis= document.getElementById("secs");
const tensDis = document.getElementById("milis");


let time = { mins: 0, secs: 0, tens: 0 };

const merged$ = Observable.merge(
		Observable.interval(1000*60).mapTo(x => ({mins: x.mins + 1, secs: x.secs, tens: x.tens}) ),
		Observable.interval(1000   ).mapTo(x => ({mins: x.mins, secs: x.secs + 1, tens: x.tens}) ),
		Observable.interval(100    ).mapTo(x => ({mins: x.mins, secs: x.secs, tens: x.tens + 1}) )
	);
	
const btns = document.querySelectorAll('button');

let subscribed = false;

console.log(time.secs);

let merged_subscription = null;

const clicks$ = Observable.fromEvent(btns, 'click');
clicks$.subscribe(
	ev    => {
		if(ev.target.id === 'start') start();
		if(ev.target.id === 'stop' ) stop();
		if(ev.target.id === 'reset') reset();
		if(ev.target.id === 'split') split();
	},
	error => { console.log(error)     },
	()    => { console.log('Done')    }
);

const start = () => {
		//started(true);
		// Return if subscribed already.
		if(subscribed) return;
		// Subscribe to the merged Observables.
		merged_subscription = merged$
		.startWith(time) // Start with the time object.
		.scan( (acc, update) => update(acc) )
		.subscribe(x => {
			subscribed = true;         // Set the subscribed state.
			time = x;                  // Update the time object.
			console.log(x);
			
		});
	}
	
	// Stop the Stopwatch.
const stop = () => {
	// Return if not subscribed already.
	if(!subscribed) return;
	//started(false);
	// Unsubscribe from the merged Observables.
	merged_subscription.unsubscribe();
	// Keep track of the subscription.
	subscribed = false;
}

// Reset the Stopwatch.
const reset = () => {
	stop();
	time = { mins: 0, secs: 0, tens: 0 };
	digitalTimer.reset();
	analogTimer.update(time);
	splits.reset();
	btns[3].disabled = true;
}

// Add a split to the Stopwatch.
const split = () => {
	// Return if not subscribed already.
	if(!subscribed) return false;
	// Add the time to the splits array.
	splits.addSplit(time);
}
	
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
	
/*var timer = {mins:0, secs: 0,  milis:0};

const display = document.getElementById("display");
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");
const milis = document.getElementById("milis");

const timer$ =Observable.merge(
	Observable.interval(10).subscribe(x => timer.milis =x).mapTo(milisT);
	Observable.interval(1000).subscribe(x => timer.secs =x).mapTo(secsT);
	Observable.interval(60000).subscribe(x => timer.mins =x).mapTo(minsT);
);

timer$.subscribe(
	milis.innerHTML=timer.milis;
	secs.innerHTML=timer.secs;
	mins.innerHTML=timer.mins;
);*/


//Observable.interval(10).subscribe(x => mili.innerHTML =x);

/*Observable.interval(60000).subscribe(x => mins.innerHTML =x);
Observable.interval(1000).subscribe(x => secs.innerHTML =x);
Observable.interval(10).subscribe(x => milis.innerHTML =x);*/

//let counter = {value:0};
	
//Observable.interval(10).subscribe(x => milis.innerHTML =x);

/*const milis$ = Observable.interval(10);
milis$.subscribe(
	x => {
		console.log(x);
		milis.innerHTML=x;
		
	},
	err => {
		console.log(err);
	},
	complete => {
		console.log('Completed');
	});
	
const secs$ = Observable.interval(1000);
secs$.subscribe(
	x => {
		console.log(x);
		secs.innerHTML=x;
		
	},
	err => {
		console.log(err);
	},
	complete => {
		console.log('Completed');
	});
	
const mins$ = Observable.interval(30000);
mins$.subscribe(
	x => {
		console.log(x);
		mins.innerHTML=x;
		
	},
	err => {
		console.log(err);
	},
	complete => {
		console.log('Completed');
	});


/*const sec$ = new Observable(observer => {
	setTimeout(() => {
		observer.next(2);
	},1000);	
	
});

sec$.subscribe(
	x => {
		sec.innerHTML+=x;
		console.log(x);
	},
	err => {
		console.log(err);
	},
	complete => {
		console.log('Completed');
	});*/

	
/*const display = document.getElementById("display");
const min = document.getElementById("mins");
const sec= document.getElementById("secs");
const mili = document.getElementById("milis");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const splitBtn= document.getElementById("split");
const rstBtn = document.getElementById("reset");


const start$ = Observable.fromEvent(startBtn, 'click');
const stop$ = Observable.fromEvent(stopBtn, 'click');

const tick$ = Observable.interval(10);

start$
  .switchMapTo(tick$);
  
const tickThatStops$ = tick$
  .takeUntil(stop$);
  

start$
  .switchMapTo(tickThatStops$)
  .subscribe(x => {
	var str=x;
	mili.innerHTML="Mili: "+ (x+1);
	
	//min.innerHTML="Min: "+ (x*60);
	//mili.innerHTML="Mili: "+ ((x\110)+1);
  });*/

//const min$ =Observable.interval(60000);//.map(x => min.innerHTML="Mins: "+(x+1));
//const sec$ =Observable.interval(1000);//.map(x => sec.innerHTML="Secs: "+(x+1));
//const mili$ =Observable.interval(10);//.map(x => mili.innerHTML="Milis: "+(x+1));

//Observable.fromEvent(startBtn, 'click').merge(min$, sec$, mili$).subscribe(x => console.log(x));
/*Observable.fromEvent(stopBtn, 'click').merge(min$, sec$, mili$).subscribe(x => {
		min.innerHTML ="Mins: "+0;
		sec.innerHTML ="Secs: "+0;
		mili.innerHTML ="Milis: "+0;
		console.log(x);
		});*/
/*const button$ = Observable.merge(
	Observable.fromEvent(startBtn, 'click').merge(min$, sec$, mili$).subscribe(x => console.log(x)),
	Observable.fromEvent(stopBtn, 'click').merge(min$, sec$, mili$).subscribe(x => {
		min.innerHTML =0;
		sec.innerHTML =0;
		mili.innerHTML =0;
		})
	//Observable.fromEvent(splitBtn, 'click').mapTo(splitr),
	//Observable.fromEvent(rstBtn, 'click').mapTo(rstr)
);*/

/*button$
	.subscribe(x => {
		//display.innerHTML = counter.value;
	});*/
	
	

/*Observable.merge(min$, sec$, mili$)
	.subscribe(x => console.log(x));*/
