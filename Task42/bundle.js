/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var tempDate = new Date();
var defdate = {
  year: tempDate.getFullYear(), month: tempDate.getUTCMonth(), day: tempDate.getDate(),
  toString: function toString() {
    return this.year + ' ' + this.month + ' ' + this.day;
  }
};

function getSpecDate(str) {
  var as = str.split(' ');
  return new Date(as[0], as[1], as[2]);
}

/**
 * @d1
 * @d2
 * @returns {number} 1 d1 big , -1  d2 big, 0 equal
 */
function compareDate(d1, d2) {
  var number = getSpecDate(d1).getTime() - getSpecDate(d2).getTime();
  return number > 0 ? 1 : number == 0 ? 0 : -1;
}

function isInTheDateRange(startDate, endDate, date) {
  var startTime = getSpecDate(startDate).getTime();
  var endTime = getSpecDate(endDate).getTime();
  var time = getSpecDate(date).getTime();
  return time < endTime && time > startTime;
}

function getDayIndex(year, month, day) {
  return new Date(year, month, day).getDay();
}

function cacuMixinMonthDays(year, month) {
  var trueYear = year;
  var trueMonth = month;
  if (month < 0) {
    trueYear = year - 1;
    trueMonth = 12;
  } else if (month == 12) {
    trueMonth = 1;
    trueYear = year + 1;
  } else {
    trueMonth = month + 1;
  }
  return new Date(trueYear, trueMonth, 0);
}

function getALlElementsWithAttribute(doc, attribute) {
  var allElements = doc.getElementsByTagName('*');
  return [].slice.apply(allElements).filter(function (e) {
    return e.hasAttribute(attribute);
  });
}

function geneFullDate(year, month) {
  return year + '\u5E74' + (month + 1) + '\u6708';
}

function showFullDate(tdate) {
  var date = getSpecDate(tdate);
  console.info(date.getMonth(), tdate);
  // new Date(2017 1 12).getMonth() == 0 , so need plus 2 make it humanble
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

// model
function model(changeListener) {
  var selected_Date = Object.assign({}, defdate);
  var choice_date = [selected_Date.toString()];

  function selectYear(year) {
    selected_Date.year = year;
    return selectDateChanged(Object.assign({}, selected_Date, { year: year }));
  }

  function selectMonth(month) {
    selected_Date.month = month;
    return selectDateChanged(Object.assign({}, selected_Date, { month: month }));
  }

  function selectDate(selectedDate) {
    choice_date = selectedDate;
  }

  function getChoiceDate() {
    return choice_date;
  }

  function selectDateChanged(newDate) {
    changeListener(selected_Date.year, selected_Date.month, choice_date);
    return newDate;
  }

  selectDateChanged(selected_Date);
  return {
    selectYear: selectYear, selectMonth: selectMonth, selectDate: selectDate, selected_Date: selected_Date, getChoiceDate: getChoiceDate
  };
}

// controller
function controller(viewListener, changeDayListener) {
  var rangeMode = true;

  function modelListener(year, month, choiceDate) {
    viewListener(year, month, choiceDate);
  }

  var mo = model(modelListener);

  var m = mo.selected_Date;

  function addMonth() {
    var m_month = m.month;
    if (m_month == 11) {
      mo.selectYear(m.year + 1);
      m = mo.selectMonth(0);
    } else {
      m = mo.selectMonth(m_month + 1);
    }
  }

  function changeMode(toRange) {
    rangeMode = toRange;
    return rangeMode;
  }

  function decMonth() {
    var m_month = m.month;
    if (m_month == 0) {
      mo.selectYear(m.year - 1);
      m = mo.selectMonth(11);
    } else {
      m = mo.selectMonth(m_month - 1);
    }
  }

  function selectDate(date, maxLength) {
    if (!rangeMode) {
      mo.selectDate([date]);
    } else {
      // RangeMode
      var dates = mo.getChoiceDate();
      if (dates.length == 0) {
        mo.selectDate([date]);
      } else if (dates.length == 1) {
        dates.push(date);
        mo.selectDate(dates.sort(compareDate));
      } else {
        var startTime = getSpecDate(dates[0]).getTime();
        var endTime = getSpecDate(dates[1]).getTime();
        var time = getSpecDate(date).getTime();
        var length = void 0;
        if (time < startTime) {
          length = (endTime - time) / (1000 * 3600 * 24);
        } else if (time > endTime) {
          length = (time - startTime) / (1000 * 3600 * 24);
        }
        if (length > maxLength) {
          changeDayListener(null);
        } else {
          var middleTime = (startTime + endTime) / 2;
          middleTime > time ? dates[0] = date : dates[1] = date;
          mo.selectDate(dates);
        }
      }
    }

    changeDayListener(mo.getChoiceDate(), m.year, m.month);
  }

  changeDayListener(mo.getChoiceDate(), m.year, m.month);
  return {
    addMonth: addMonth, decMonth: decMonth, selectDate: selectDate, getchangeMode: changeMode, isRangeMode: rangeMode
  };
}

function showFullDateInput(date) {
  return '<input type="text" value="' + showFullDate(date) + '" id="_datepicker_show" readonly>';
}

function DatePickerView(container, multi, maxLength) {
  this.mainIsVisible = false;
  this.datePiker = container;
  this.multi = multi;
  this.maxLength = maxLength;
  this.init();
}

DatePickerView.prototype = {
  days: ['日', '一', '二', '三', '四', '五', '六'],
  isTheSelectedItem: function isTheSelectedItem(date, choice_date) {
    return choice_date.indexOf(date) > -1 ? '_datepicker_selectedDay' : '';
  },
  isTheRangeItem: function isTheRangeItem(date, choice_date, defClazz) {
    var isRangeMode = choice_date.length > 1;
    return isRangeMode ? isInTheDateRange(choice_date[0], choice_date[1], date) ? '_datepicker_range_item' : '' : defClazz || '';
  },
  renderVisibleSpans: function renderVisibleSpans(choicedate, year, month) {
    var _this = this;

    var datepicker_body = this.datePiker.querySelector('#_datepicker_body');
    return getALlElementsWithAttribute(datepicker_body, 'data-date').map(function (e) {
      var date = e.dataset.date;
      var specDate = getSpecDate(date);
      var isActive = specDate.getFullYear() == year && specDate.getMonth() == month;
      e.classList = [];
      var clazz = _this.isTheSelectedItem(date, choicedate) + ' \n                       ' + _this.isTheRangeItem(date, choicedate) + ' ' + (isActive ? "_datepicker_active" : '_datepicker_unactive');
      clazz.split(' ').filter(function (c) {
        return c.length > 2;
      }).forEach(function (c) {
        e.classList.add(c);
      });
      return e;
    });
  },
  init: function init() {
    var body = '<div class="_datepicker">\n                        <div id="_datepicker_show_container">\n                        ' + showFullDateInput(defdate.toString()) + '\n                        </div>\n                        <div class="_datepicker_main">\n                            <div class="_datepicker_op">\n                                <i id="_datepicker_decmonth"><-</i>\n                                <span id="_datepicker_fulldate">\n                                ' + geneFullDate(defdate.year, defdate.month) + '\n                                </span>\n                                <i id="_datepicker_addmonth">-></i>\n                            </div>\n                            <div class="_datepicker_style">\n                                ' + this.days.map(function (d) {
      return spanItem(null, d);
    }).join("") + '\n                            </div>\n                            <div id="_datepicker_body" class="_datepicker_style"></div>\n                        </div>\n                    </div>';
    var datePiker = this.datePiker;
    datePiker.innerHTML = body;
    var fulldate_view = datePiker.querySelector('#_datepicker_fulldate');
    var datepicker_body = datePiker.querySelector('#_datepicker_body');
    var datepicker_main = datePiker.querySelector('._datepicker_main');
    var datepicker_show_container = datePiker.querySelector('#_datepicker_show_container');
    var datepicker_show = datePiker.querySelector('#_datepicker_show');

    function spanItem(date, day) {
      return '<span data-date="' + date + '">' + day + '</span>';
    }

    function renderBody(year, month) {
      var daysCount = cacuMixinMonthDays(year, month).getDate();
      var dayIndex = getDayIndex(year, month, 1);
      var currentMonthDays = new Array(daysCount).fill(0).map(function (_, index) {
        var date = year + ' ' + month + ' ' + (index + 1);
        return spanItem(date, index + 1);
      });
      var lastMonthDate = cacuMixinMonthDays(year, month - 1);
      var lastMonthDays = lastMonthDate.getDate();

      var beforeMonthDays = new Array(dayIndex).fill(lastMonthDays).map(function (total, index) {
        var day = total - index;
        var date = lastMonthDate.getFullYear() + ' ' + lastMonthDate.getMonth() + ' ' + day;
        return spanItem(date, day);
      }).reverse();
      // new Date(,month begin 0)
      var bailDays = 6 - getDayIndex(year, month, daysCount);
      var nextMonthDate = cacuMixinMonthDays(year, month + 1);
      var afterMonthDays = new Array(bailDays > 0 ? bailDays : 0).fill(0).map(function (_, index) {
        var day = index + 1;
        var date = nextMonthDate.getFullYear() + ' ' + nextMonthDate.getMonth() + ' ' + day;
        return spanItem(date, day);
      });

      return beforeMonthDays.concat(currentMonthDays).concat(afterMonthDays).join('');
    }

    var that = this;
    var c = controller(function (year, month, choice_date) {
      fulldate_view.innerHTML = geneFullDate(year, month);
      datepicker_body.innerHTML = renderBody(year, month);
      that.renderVisibleSpans(choice_date, year, month);
    }, function (choicedate, year, month) {
      if (choicedate == null) {
        alert('超出范围!!!');
        return;
      }
      that.renderVisibleSpans(choicedate, year, month).filter(function (e) {
        var date = e.dataset.date;
        return choicedate.indexOf(date) > -1;
      }).forEach(function (e) {
        e.classList.add('_datepicker_selectedDay');
      });
      datepicker_show.value = choicedate.length > 1 ? showFullDate(choicedate[0]) + ' -- ' + showFullDate(choicedate[1]) : choicedate[0];
      that.allListener && that.allListener.forEach(function (lis) {
        lis(choicedate);
      });
    });
    c.getchangeMode(this.multi);
    datepicker_show_container.addEventListener('click', function () {
      var mainIsVisible = that.mainIsVisible;
      if (!mainIsVisible) {
        datepicker_main.classList.add('_datepicker_visible');
      } else {
        datepicker_main.classList.remove('_datepicker_visible');
      }
      that.mainIsVisible = !mainIsVisible;
    });

    datepicker_body.addEventListener('click', function (event) {
      var target = event.target;
      var selectDate = target.dataset.date;
      c.selectDate(selectDate, that.maxLength);
      event.preventDefault();
    });

    datePiker.querySelector('#_datepicker_decmonth').addEventListener('click', function () {
      c.decMonth();
    });

    datePiker.querySelector('#_datepicker_addmonth').addEventListener('click', function () {
      c.addMonth();
    });
  },
  addSelectedListener: function addSelectedListener() {
    this.allListener = this.addListener || [];
    var args = [].slice.apply(arguments).filter(function (e) {
      return typeof e == 'function';
    });
    this.allListener = this.allListener.concat(args);
  }
};
/* harmony default export */ __webpack_exports__["a"] = DatePickerView;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__multidatepiker__ = __webpack_require__(0);


new __WEBPACK_IMPORTED_MODULE_0__multidatepiker__["a" /* default */](document.getElementById('multidatePiker'), true, 30);

/***/ })
/******/ ]);