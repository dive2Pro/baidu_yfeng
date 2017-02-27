const datePickerView = (function () {

    function defDate() {
        return new Date();
    }

    const defdate = defDate();
// model
    function model(changeListener) {


        const selected_Date = {
            year: defdate.getFullYear()
            , month: defdate.getUTCMonth()
            , day: defdate.getDate()
            , toString: function () {
                return this.year + '' + this.month + '' + this.day
            }
        };
        let choice_date = Object.assign({}, selected_Date);

        function selectYear(year) {
            selected_Date.year = year;
            return selectDateChanged(Object.assign({}, selected_Date, {year: year}));
        }

        function selectMonth(month) {
            selected_Date.month = month;
            return selectDateChanged(Object.assign({}, selected_Date, {month: month}))
        }

        function selectDay(day) {
            selected_Date.day = day;
            choice_date = Object.assign({}, selected_Date)
        }

        function selectDateChanged(newDate) {
            if (changeListener == null) {
                console.error("changeListener can't be null ");
                return;
            }
            console.info(newDate, choice_date);
            changeListener(newDate, choice_date);
            return newDate
        }

        selectDateChanged(selected_Date);
        return {
            selectYear: selectYear
            , selectMonth: selectMonth
            , selectDay: selectDay
            , selected_Date: selected_Date
            , choice_date: choice_date
        }

    }

// controller
    function getDayIndex(year, month, day) {
        return new Date(year, month, day).getDay()
    }

    function controller(viewListener, changeDayListener) {
        if (viewListener == null) {
            console.error("viewListener can't be null ");
            return;
        }

        function modelListener(newDate, choiceDate) {
            const dayIndex = getDayIndex(newDate.year, newDate.month, 1);
            viewListener(newDate, dayIndex, choiceDate)
        }

        const mo = model(modelListener);

        let m = mo.selected_Date;

        function addMonth() {
            const m_month = m.month;
            if (m_month == 11) {
                m = mo.selectYear(m.year + 1);
                m = mo.selectMonth(0);
            } else {
                m = mo.selectMonth(m_month + 1)
            }
        }

        function decMonth() {
            const m_month = m.month;
            if (m_month == 0) {
                m = mo.selectYear(m.year - 1);
                m = mo.selectMonth(11);
            } else {
                m = mo.selectMonth(m_month - 1)
            }
        }

        function selectDay(day) {
            mo.selectDay(day);
            changeDayListener(mo.choice_date);
        }

        changeDayListener(m);
        return {
            addMonth: addMonth
            , decMonth: decMonth
            , selectDay: selectDay
        }
    }

    /**
     *  month auto + 1
     * @param newDate
     * @returns {*}
     */
    function cacuMonthDays(newDate) {
        return cacuMixinMonthDays(newDate.year, newDate.month)
    }

    function cacuMixinMonthDays(year, month) {
        let trueYear = year;
        let trueMonth = month;
        if (month < 0) {
            trueYear = year - 1;
            trueMonth = 12;
        } else if (month == 12) {
            trueMonth = 1;
            trueYear = year + 1;
        } else {
            trueMonth = month + 1
        }
        return new Date(trueYear, trueMonth, 0).getDate()
    }

    function getALlElementsWithAttribute(doc, attribute) {
        const allElements = doc.getElementsByTagName('*')
        return [].slice.apply(allElements).filter(e => {
            e.hasAttribute(attribute)
        })
    }

    function datePickerView(doc, id, listener) {
        const datePiker = doc.getElementById(id);

        function geneFullDate(year, month) {
            return `${year}年${month + 1}月`
        }

        const body = `
    <div class="_datepicker_op">
        <i id="_datepicker_decmonth"><-</i>
        <span id="_datepicker_fulldate">
        ${geneFullDate(defdate.getFullYear(), defdate.getUTCMonth())}
        </span>
        <i id="_datepicker_addmonth">-></i>
    </div>
    <div class="_datepicker_style">
        <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
        </div>
    <div id="_datepicker_body" class="_datepicker_style"></div>`
            ;
        datePiker.innerHTML = body;
        const fulldate_view = doc.getElementById('_datepicker_fulldate');
        const datepicker_body = doc.getElementById('_datepicker_body');

        function geneBody(newDate, body, dayIndex, choice_date) {
            console.info('dayIndex = ', dayIndex);
            const daysCount = cacuMonthDays(newDate);
            console.info('geneBody ', newDate);

            const currentMonthDays = new Array(daysCount).fill(0).map((_, index) => {

                console.info(choice_date.toString(), newDate.toString());
                return `<span class="_datepicker_active ${(choice_date.toString() == newDate.toString() && (index + 1) == newDate.day ) ? '_datepicker_selectedDay' : ''}"
 data-value="${index + 1} ">${index + 1}</span>`
            });


            const lastMonthDays = cacuMixinMonthDays(newDate.year, newDate.month - 1);
            console.info('lastMonthDays ', lastMonthDays);

            const beforeMonthDays = new Array(dayIndex).fill(lastMonthDays).map((total, index) => {
                return `<span class="_datepicker_unactive">${total - index}</span>`
            }).reverse();
            // new Date(,month begin 0)
            const bailDays = 6 - getDayIndex(newDate.year, newDate.month, daysCount);

            console.info('bailDays = ' + bailDays);
            const afterMonthDays = new Array((bailDays > 0 ? bailDays : 0)).fill(0).map((_, index) => {
                return `<span class="_datepicker_unactive">${index + 1}</span>`
            });
            body.innerHTML = beforeMonthDays.concat(currentMonthDays).concat(afterMonthDays).join("")

        }

        let prevTargetDayView;

        const c = controller(function (newDate, dayIndex, choice_date) {
            console.info(newDate);
            fulldate_view.innerHTML = geneFullDate(newDate.year, newDate.month);
            geneBody(newDate, datepicker_body, dayIndex, choice_date);
            prevTargetDayView && prevTargetDayView.classList.remove('_datepicker_selectedDay');
            prevTargetDayView = null

        }, function (choicedate) {
            if (prevTargetDayView == null) {
                console.info('prevTargetDayView = ' + prevTargetDayView)
                prevTargetDayView = doc.querySelector('._datepicker_selectedDay');
            }

            listener && listener(choicedate)
        });

        datepicker_body.addEventListener('click', function (event) {
            const target = event.target;
            prevTargetDayView = doc.querySelector('._datepicker_selectedDay');
            if (prevTargetDayView == null) {
                prevTargetDayView = target;
            } else {
                prevTargetDayView.classList.remove('_datepicker_selectedDay')
            }
            prevTargetDayView = target;
            target.classList.add('_datepicker_selectedDay');
            const day = event.target.dataset.value;
            c.selectDay(day);
            event.preventDefault();
        });

        doc.getElementById('_datepicker_decmonth').addEventListener('click', function () {
            c.decMonth();
        });

        doc.getElementById('_datepicker_addmonth').addEventListener('click', function () {
            c.addMonth();
        })
    }

    return datePickerView
}());