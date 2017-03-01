const tempDate = new Date()
const defdate = {
  year: tempDate.getFullYear(),             month: tempDate.getUTCMonth(),             day: tempDate.getDate(),
  toString: function () {
    return this.year + ' ' + this.month + ' ' + this.day
  }
}

function getSpecDate (str) {
  const as = str.split(' ')
  return new Date(as[0], as[1], as[2])
}

/**
 * @d1
 * @d2
 * @returns {number} 1 d1 big , -1  d2 big, 0 equal
 */
function compareDate (d1, d2) {
  let number = getSpecDate(d1).getTime() - getSpecDate(d2).getTime()
  return number > 0 ? 1 : number == 0 ? 0 : -1
}

function isInTheDateRange (startDate, endDate, date) {
  const startTime = getSpecDate(startDate).getTime()
  const endTime = getSpecDate(endDate).getTime()
  const time = getSpecDate(date).getTime()
  return (time < endTime && time > startTime)
}

function getDayIndex (year, month, day) {
  return new Date(year, month, day).getDay()
}

function cacuMixinMonthDays (year, month) {
  let trueYear = year
  let trueMonth = month
  if (month < 0) {
    trueYear = year - 1
    trueMonth = 12
  } else if (month == 12) {
    trueMonth = 1
    trueYear = year + 1
  } else {
    trueMonth = month + 1
  }
  return new Date(trueYear, trueMonth, 0)
}

function getALlElementsWithAttribute (doc, attribute) {
  const allElements = doc.getElementsByTagName('*')
  return [].slice.apply(allElements).filter(e => {
    return e.hasAttribute(attribute)
  })
}

function geneFullDate (year, month) {
  return `${year}年${month + 1}月`
}

function showFullDate (tdate) {
  const date = getSpecDate(tdate)
  console.info(date.getMonth(), tdate)
  // new Date(2017 1 12).getMonth() == 0 , so need plus 2 make it humanble
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

// model
function model (changeListener) {
  const selected_Date = Object.assign({}, defdate)
  let choice_date = [selected_Date.toString()]

  function selectYear (year) {
    selected_Date.year = year
    return selectDateChanged(Object.assign({}, selected_Date, {year: year}))
  }

  function selectMonth (month) {
    selected_Date.month = month
    return selectDateChanged(Object.assign({}, selected_Date, {month: month}))
  }

  function selectDate (selectedDate) {
    choice_date = selectedDate
  }

  function getChoiceDate () {
    return choice_date
  }

  function selectDateChanged (newDate) {
    changeListener(selected_Date.year, selected_Date.month, choice_date)
    return newDate
  }

  selectDateChanged(selected_Date)
  return {
    selectYear: selectYear,                 selectMonth: selectMonth,                 selectDate: selectDate,                 selected_Date: selected_Date,                 getChoiceDate: getChoiceDate
  }
}

// controller
function controller (viewListener, changeDayListener) {
  let rangeMode = true

  function modelListener (year, month, choiceDate) {
    viewListener(year, month, choiceDate)
  }

  const mo = model(modelListener)

  let m = mo.selected_Date

  function addMonth () {
    const m_month = m.month
    if (m_month == 11) {
      mo.selectYear(m.year + 1)
      m = mo.selectMonth(0)
    } else {
      m = mo.selectMonth(m_month + 1)
    }
  }

  function changeMode (toRange) {
    rangeMode = toRange
    return rangeMode
  }

  function decMonth () {
    const m_month = m.month
    if (m_month == 0) {
      mo.selectYear(m.year - 1)
      m = mo.selectMonth(11)
    } else {
      m = mo.selectMonth(m_month - 1)
    }
  }

  function selectDate (date, maxLength) {
    if (!rangeMode) {
      mo.selectDate([date])
    } else {
      // RangeMode
      const dates = mo.getChoiceDate()
      if (dates.length == 0) {
        mo.selectDate([date])
      } else if (dates.length == 1) {
        dates.push(date)
        mo.selectDate(dates.sort(compareDate))
      } else {
        const startTime = getSpecDate(dates[0]).getTime()
        const endTime = getSpecDate(dates[1]).getTime()
        const time = getSpecDate(date).getTime()
        let length
        if (time < startTime) {
          length = (endTime - time) / (1000 * 3600 * 24)
        } else if (time > endTime) {
          length = (time - startTime) / (1000 * 3600 * 24)
        }
        if (length > maxLength) {
          changeDayListener(null)
        } else {
          const middleTime = (startTime + endTime) / 2
          middleTime > time ? dates[0] = date : dates[1] = date
          mo.selectDate(dates)
        }
      }
    }

    changeDayListener(mo.getChoiceDate(), m.year, m.month)
  }

  changeDayListener(mo.getChoiceDate(), m.year, m.month)
  return {
    addMonth: addMonth,                 decMonth: decMonth,                 selectDate: selectDate,                 getchangeMode: changeMode,                 isRangeMode: rangeMode
  }
}

function showFullDateInput (date) {
  return `<input type="text" value="${showFullDate(date)}" id="_datepicker_show" readonly>`
}

function DatePickerView (container, multi, maxLength) {
  this.mainIsVisible = false
  this.datePiker = container
  this.multi = multi
  this.maxLength = maxLength
  this.init()
}

DatePickerView.prototype = {
  days: ['日', '一', '二', '三', '四', '五', '六'],
  isTheSelectedItem(date, choice_date) {
    return choice_date.indexOf(date) > -1 ? '_datepicker_selectedDay' : ''
  }, isTheRangeItem(date, choice_date, defClazz) {
    const isRangeMode = choice_date.length > 1
    return (isRangeMode ? isInTheDateRange(choice_date[0], choice_date[1], date) ? '_datepicker_range_item' : '' : (defClazz || ''))
  }, renderVisibleSpans(choicedate, year, month) {
    const datepicker_body = this.datePiker.querySelector('#_datepicker_body')
    return getALlElementsWithAttribute(datepicker_body, 'data-date').map(e => {
      const date = e.dataset.date
      const specDate = getSpecDate(date)
      const isActive = specDate.getFullYear() == year && specDate.getMonth() == month
      e.classList = []
      const clazz = `${this.isTheSelectedItem(date, choicedate)} 
                       ${this.isTheRangeItem(date, choicedate)} ${isActive ? "_datepicker_active" : '_datepicker_unactive'}`
      clazz.split(' ').filter(c => c.length > 2).forEach((c) => {
        e.classList.add(c)
      })
      return e
    })
  }, init() {
    const body = `<div class="_datepicker">
                        <div id="_datepicker_show_container">
                        ${showFullDateInput(defdate.toString())}
                        </div>
                        <div class="_datepicker_main">
                            <div class="_datepicker_op">
                                <i id="_datepicker_decmonth"><-</i>
                                <span id="_datepicker_fulldate">
                                ${geneFullDate(defdate.year, defdate.month)}
                                </span>
                                <i id="_datepicker_addmonth">-></i>
                            </div>
                            <div class="_datepicker_style">
                                ${this.days.map(d => (spanItem(null, d))).join("")}
                            </div>
                            <div id="_datepicker_body" class="_datepicker_style"></div>
                        </div>
                    </div>`
    const datePiker = this.datePiker
    datePiker.innerHTML = body
    const fulldate_view = datePiker.querySelector('#_datepicker_fulldate')
    const datepicker_body = datePiker.querySelector('#_datepicker_body')
    const datepicker_main = datePiker.querySelector('._datepicker_main')
    const datepicker_show_container = datePiker.querySelector('#_datepicker_show_container')
    const datepicker_show = datePiker.querySelector('#_datepicker_show')

    function spanItem (date, day) {
      return `<span data-date="${date}">${day}</span>`
    }

    function renderBody (year, month) {
      const daysCount = cacuMixinMonthDays(year, month).getDate()
      const dayIndex = getDayIndex(year, month, 1)
      const currentMonthDays = new Array(daysCount).fill(0).map((_, index) => {
        const date = (year + ' ' + month + ' ' + (index + 1))
        return spanItem(date, index + 1)
      })
      const lastMonthDate = cacuMixinMonthDays(year, month - 1)
      const lastMonthDays = lastMonthDate.getDate()

      const beforeMonthDays = new Array(dayIndex).fill(lastMonthDays).map((total, index) => {
        const day = total - index
        const date = (lastMonthDate.getFullYear() + ' ' + lastMonthDate.getMonth() + ' ' + day)
        return spanItem(date, day)
      }).reverse()
      // new Date(,month begin 0)
      const bailDays = 6 - getDayIndex(year, month, daysCount)
      const nextMonthDate = cacuMixinMonthDays(year, month + 1)
      const afterMonthDays = new Array((bailDays > 0 ? bailDays : 0)).fill(0).map((_, index) => {
        const day = index + 1
        const date = (nextMonthDate.getFullYear() + ' ' + nextMonthDate.getMonth() + ' ' + day)
        return spanItem(date, day)
      })

      return beforeMonthDays.concat(currentMonthDays).concat(afterMonthDays).join('')
    }

    let that = this
    const c = controller(function (year, month, choice_date) {
      fulldate_view.innerHTML = geneFullDate(year, month)
      datepicker_body.innerHTML = renderBody(year, month)
      that.renderVisibleSpans(choice_date, year, month)
    }, function (choicedate, year, month) {
      if (choicedate == null) {
        alert('超出范围!!!')
        return
      }
      that.renderVisibleSpans(choicedate, year, month).filter(e => {
        const date = e.dataset.date
        return choicedate.indexOf(date) > -1
      }).forEach(e => {
        e.classList.add('_datepicker_selectedDay')
      })
      datepicker_show.value = choicedate.length > 1 ? showFullDate(choicedate[0]) + ' -- ' + showFullDate(choicedate[1]) : choicedate[0]
      that.allListener && that.allListener.forEach(lis => {
        lis(choicedate)
      })
    })
    c.getchangeMode(this.multi)
    datepicker_show_container.addEventListener('click', () => {
      let mainIsVisible = that.mainIsVisible
      if (!mainIsVisible) {
        datepicker_main.classList.add('_datepicker_visible')
      } else {
        datepicker_main.classList.remove('_datepicker_visible')
      }
      that.mainIsVisible = !mainIsVisible
    })

    datepicker_body.addEventListener('click', function (event) {
      const target = event.target
      const selectDate = target.dataset.date
      c.selectDate(selectDate, that.maxLength)
      event.preventDefault()
    })

    datePiker.querySelector('#_datepicker_decmonth').addEventListener('click', function () {
      c.decMonth()
    })

    datePiker.querySelector('#_datepicker_addmonth').addEventListener('click', function () {
      c.addMonth()
    })
  },             addSelectedListener: function () {
    this.allListener = this.addListener || []
    const args = [].slice.apply(arguments).filter(e => typeof e == 'function')
    this.allListener = this.allListener.concat(args)
  }
}
export default DatePickerView
