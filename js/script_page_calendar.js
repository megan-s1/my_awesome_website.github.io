$(document).ready(function() {

	//hamburger menu
	$('#hamburger').click(function(){
		console.log('Hi');
		$('nav, #hamburger').toggleClass('open');
	});


    //scroll button

  $("#goHome").fadeOut(0);

  $("#goHome").click(function(){
  
  $('html, body').animate({
      scrollTop:$('#section1').offset().top}, 1000);
  });
  
  $(window).on('scroll',function(){
    
    if( $(window).scrollTop() > $('#section1').offset().top ){
       $("#goHome").fadeIn(1000);
    }else{
       $("#goHome").fadeOut(1000);}
  });
});



	//calendar	

const MonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MIN_DATE = new Date(-8640000000000000);
const MAX_DATE = new Date(8640000000000000);

const Events = {
  DATE_SELECTED: 'dateSelected',
};

const Selectors = {
  ROOT: '.calendar',
  MONTH: '.calendar__month',
  YEAR: '.calendar__year',
  PREV: '.calendar__btn_prev',
  NEXT: '.calendar__btn_next',
  TABLE_BODY: '.calendar__table-body',
};

const ClassNames = {
  CELL: 'calendar__table-cell',
  CELL_DISABLED: 'calendar__table-cell_disabled',
  BTN_DISABLED: 'calendar__btn_disabled',
};

class Calendar {
  constructor(root, {
    minDate,
    maxDate,
  }) {  
    this._monthElem = root.querySelector(Selectors.MONTH);
    this._yearElem = root.querySelector(Selectors.YEAR);
    this._tableBody = root.querySelector(Selectors.TABLE_BODY);
    this._prevBtn = root.querySelector(Selectors.PREV);
    this._nextBtn = root.querySelector(Selectors.NEXT);
    
    this._prevBtn.addEventListener('click', () => {
      this.prevMonth();
    });
    this._nextBtn.addEventListener('click', () => {
      this.nextMonth();
    });

    const today = new Date();
    this._month = today.getMonth();
    this._year = today.getFullYear();

    this._minDate = minDate ? minDate : MIN_DATE;
    this._maxDate = maxDate ? maxDate : MAX_DATE;

    this._tableBody.addEventListener('click', (event) => {
      const target = event.target;

      if (
        target.classList.contains(ClassNames.CELL) &&
        target.dataset.date
      ) {
        const event = new CustomEvent(Events.DATE_SELECTED, {
          detail: {
            date: new Date(
              this._year,
              this._month,
              target.dataset.date,
            ),
          },
        });
        
        root.dispatchEvent(event);
      }
    });
    
    this._render();
  }
  
  /*
   * Public
   */
  
  prevMonth() {
    if (this._isMinMonth()) {
      return;
    }
    
    if (--this._month < 0) {
      this._month += 12;
      this._year--;
    }
    
    this._render();
  }
  
  nextMonth() {
    if (this._isMaxMonth()) {
      return;
    }
    
    if (++this._month >= 12) {
      this._month -= 12;
      this._year++;
    }
    
    this._render();
  }
  
  /*
   * Private
   */
  
  _render() {
    this._monthElem.textContent = MonthNames[this._month];
    this._yearElem.textContent = this._year;

    if (this._isMinMonth()) {
      this._prevBtn.classList.add(ClassNames.BTN_DISABLED);
    } else {
      this._prevBtn.classList.remove(ClassNames.BTN_DISABLED);
    }
    
    if (this._isMaxMonth()) {
      this._nextBtn.classList.add(ClassNames.BTN_DISABLED);
    } else {
      this._nextBtn.classList.remove(ClassNames.BTN_DISABLED);
    }

    this._tableBody.innerHTML = '';
    
    const date = new Date(this._year, this._month, 1);
    date.setDate(1 - date.getDay());
    
    do {
      const row = document.createElement('tr');
      
      for (let i = 0; i < 7; i++) {
        const cell = document.createElement('td');
        cell.classList.add(ClassNames.CELL);
        
        if (date.getMonth() == this._month) {
          cell.textContent = date.getDate();
          
          if (
            (this._minDate.getTime() <= date.getTime()) &&
            (this._maxDate.getTime() >= date.getTime())
          ) {
            cell.dataset.date = date.getDate();
          } else {
            cell.classList.add(ClassNames.CELL_DISABLED);
          }
        }

        row.appendChild(cell);

        date.setDate(date.getDate() + 1);
      }
      
      this._tableBody.appendChild(row);
    } while (date.getMonth() == this._month);
  }
  
  _isMinMonth() {
    return (
      (this._month == this._minDate.getMonth()) &&
      (this._year == this._minDate.getFullYear())
    );
  }
  
  _isMaxMonth() {
    return (
      (this._month == this._maxDate.getMonth()) &&
      (this._year == this._maxDate.getFullYear())
    );
  }
}

window.onload = () => {
  const calendar = document.querySelector(Selectors.ROOT);
  if (calendar != null) {
    const today = new Date();
    
    new Calendar(calendar, {
      minDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )
    });
    
    calendar.addEventListener(Events.DATE_SELECTED, (event) => {
      const {date} = event.detail;
      
      const year = date.getFullYear();
      let month = (date.getMonth() + 1);
      if (month < 10) {
        month = '0' + month;
      }

      let day = date.getDate();
      if (day < 10) {
        day = '0' + day;
      }

      if ('#date' != undefined) {

        date_string = 'Date: ' + day + '/' + month + '/' + year
        $('#date').text(date_string);
      
      } else { 

       $('#date').replaceWith(`${day}/${month}/${year}`)
      }
    });
    }; 
};

  

