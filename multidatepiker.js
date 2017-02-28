const MultiDatePickerView = (function () {

    function defDate() {
        return new Date();
    }

    const tempDate = defDate();
    const defdate = {
        year: tempDate.getFullYear()
        , month: tempDate.getUTCMonth()
        , day: tempDate.getDate(),
        toString: function () {
            return this.year + ' ' + this.month + ' ' + this.day
        }
    };

    function getSpecDate(str) {
        const as = str.split(" ");
        return new Date(as[0], as[1], as[2])
    }

// model
    function model(changeListener) {

        const selected_Date = Object.assign({}, defdate);
        let choice_date = [selected_Date.toString()];

        function selectYear(year) {
            selected_Date.year = year;
            return selectDateChanged(Object.assign({}, selected_Date, {year: year}));
        }

        function selectMonth(month) {
            selected_Date.month = month;
            return selectDateChanged(Object.assign({}, selected_Date, {month: month}))
        }

        function selectDate(selectedDate) {
            choice_date = selectedDate
        }

        function getChoiceDate() {

            return choice_date

        }

        function selectDateChanged(newDate) {
            if (changeListener == null) {
                console.error("changeListener can't be null ");
                return;
            }
            changeListener(newDate, choice_date);
            return newDate
        }

        selectDateChanged(selected_Date);
        return {
            selectYear: selectYear
            , selectMonth: selectMonth
            , selectDate: selectDate
            , selected_Date: selected_Date
            , getChoiceDate: getChoiceDate
        }

    }

    /**
     *
     * @returns {number} 1 d1 big , -1  d2 big, 0 equal
     */
    function compareDate(d1, d2) {
        let number = getSpecDate(d1).getTime() - getSpecDate(d2).getTime();
        return number > 0 ? 1 : number == 0 ? 0 : -1
    }

    function isInTheDateRange(startDate, endDate, date) {
        const startTime = getSpecDate(startDate).getTime();
        const endTime = getSpecDate(endDate).getTime();
        const time = getSpecDate(date).getTime();
        return (time < endTime && time > startTime)
    }

// controller
    function getDayIndex(year, month, day) {
        return new Date(year, month, day).getDay()
    }

    function controller(viewListener, changeDayListener) {
        let rangeMode = true;
        if (viewListener == null) {
            console.error("viewListener can't be null ");
            return;
        }

        function modelListener(newDate, choiceDate) {
            viewListener(newDate, choiceDate)
        }

        const mo = model(modelListener);

        let m = mo.selected_Date;

        function addMonth() {
            const m_month = m.month;
            if (m_month == 11) {
                mo.selectYear(m.year + 1);
                m = mo.selectMonth(0);
            } else {
                m = mo.selectMonth(m_month + 1)
            }
        }

        function changeMode(toRange) {
            rangeMode = toRange;
            return rangeMode
        }

        function decMonth() {
            const m_month = m.month;
            if (m_month == 0) {
                mo.selectYear(m.year - 1);
                m = mo.selectMonth(11);
            } else {
                m = mo.selectMonth(m_month - 1)
            }
        }

        function selectDate(date) {
            if (!rangeMode) {
                mo.selectDate([date]);
            } else {
                // RangeMode
                const dates = mo.getChoiceDate();
                if (dates.length == 0) {
                    mo.selectDate([date])
                } else if (dates.length == 1) {
                    dates.push(date);
                    mo.selectDate(dates.sort(compareDate))
                } else {
                    const middleTime = (getSpecDate(dates[0]).getTime() + getSpecDate(dates[1]).getTime()) / 2;
                    if (middleTime > getSpecDate(date).getTime()) {
                        dates[0] = date
                    } else {
                        dates[1] = date
                    }
                    mo.selectDate(dates)
                }
            }
            changeDayListener(mo.getChoiceDate(), m.year, m.month);
        }

        changeDayListener(mo.getChoiceDate(), m.year, m.month);
        return {
            addMonth: addMonth
            , decMonth: decMonth
            , selectDate: selectDate
            , getchangeMode: changeMode
            , isRangeMode: this.rangeMode
        }
    }

    /**
     *  month auto + 1
     * @param newDate
     * @returns {*}
     */
    function cacuMonthDays(newDate) {
        if (typeof newDate == "string") {
            const date = getSpecDate(newDate);
            return cacuMixinMonthDays(date.getFullYear(), date.getMonth())
        }
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
        return new Date(trueYear, trueMonth, 0);
    }

    function getALlElementsWithAttribute(doc, attribute) {
        const allElements = doc.getElementsByTagName('*');
        return [].slice.apply(allElements).filter(e => {
            return e.hasAttribute(attribute)
        })
    }

    function geneFullDate(year, month) {
        return `${year}年${month + 1}月`
    }

    function showFullDate(tdate) {
        const date = getSpecDate(tdate);
        console.info(date.getMonth(), tdate);
        // new Date(2017 1 12).getMonth() == 0 , so need plus 2 make it humanble
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }


    function DatePickerView(doc, id) {
        let mainIsVisible = false;
        const datePiker = doc.getElementById(id);


        function showFullDateInput(date) {
            return `<input type="text" value="${showFullDate(date)}" id="_datepicker_show" readonly>`
        }

        const body = `
                    <div class="_datepicker">
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
                                <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                                </div>
                            <div id="_datepicker_body" class="_datepicker_style"></div>
                        </div>
                    </div>`;
        datePiker.innerHTML = body;
        const fulldate_view = datePiker.querySelector('#_datepicker_fulldate');
        const datepicker_body = datePiker.querySelector('#_datepicker_body');
        const datepicker_main = datePiker.querySelector('._datepicker_main');
        const datepicker_show_container = datePiker.querySelector('#_datepicker_show_container');
        const datepicker_show = datePiker.querySelector('#_datepicker_show');

        function isTheRangeItem(date, choice_date, defClazz) {
            const isRangeMode = choice_date.length > 1;
            return (isRangeMode ? isInTheDateRange(choice_date[0], choice_date[1], date) ? "_datepicker_range_item" : "" : (defClazz || ""));
        }

        function isTheSelectedItem(date, choice_date) {
            return choice_date.indexOf(date) > -1 ? '_datepicker_selectedDay' : "";
        }

        function geneBody(newDate, choice_date) {
            const daysCount = cacuMonthDays(newDate).getDate();
            const dayIndex = getDayIndex(newDate.year, newDate.month, 1);
            const isRangeMode = choice_date.length > 1;
            console.info('choice_date', choice_date);


            const currentMonthDays = new Array(daysCount).fill(0).map((_, index) => {
                const date = (newDate.year + " " + newDate.month + " " + (index + 1));
                const clazz = `${isTheSelectedItem(date, choice_date)} ${isTheRangeItem(date, choice_date)} _datepicker_active`;
                return `<span
                    class="${clazz}"
                    data-value="${index + 1}"
                    data-date="${date}">${index + 1}</span>`

            });
            const lastMonthDate = cacuMixinMonthDays(newDate.year, newDate.month - 1);
            const lastMonthDays = lastMonthDate.getDate();

            const beforeMonthDays = new Array(dayIndex).fill(lastMonthDays).map((total, index) => {
                const day = total - index;
                const date = (lastMonthDate.getFullYear() + " " + lastMonthDate.getMonth() + " " + day);
                const clazz = `${isTheSelectedItem(date, choice_date)} ${isTheRangeItem(date, choice_date, '_datepicker_unactive')}`;
                return `<span
                    class="${clazz}"
                    data-date="${date}">${day}</span>`
            }).reverse();
            // new Date(,month begin 0)
            const bailDays = 6 - getDayIndex(newDate.year, newDate.month, daysCount);
            const nextMonthDate = cacuMixinMonthDays(newDate.year, newDate.month + 1);
            const afterMonthDays = new Array((bailDays > 0 ? bailDays : 0)).fill(0).map((_, index) => {
                const day = index + 1;
                const date = (nextMonthDate.getFullYear() + " " + nextMonthDate.getMonth() + " " + day);
                const clazz = `${isTheSelectedItem(date, choice_date)} ${isTheRangeItem(date, choice_date, '_datepicker_unactive')}`;

                return `<span
                    class="${clazz}"
                    data-date="${date}">${day}</span>`

            });
            return beforeMonthDays.concat(currentMonthDays).concat(afterMonthDays).join("")
        }

        let prevTargetDayView;
        let that = this;
        const c = controller(function (newDate, choice_date) {
            fulldate_view.innerHTML = geneFullDate(newDate.year, newDate.month);
            datepicker_body.innerHTML = geneBody(newDate, choice_date);
            prevTargetDayView && prevTargetDayView.classList.remove('_datepicker_selectedDay');
            prevTargetDayView = null
        }, function (choicedate, year, month) {
            const isRangeMode = choicedate.length > 1;
            getALlElementsWithAttribute(doc, 'data-date').filter(e => {
                const date = e.dataset.date;

                const specDate = getSpecDate(date);
                const isActive = specDate.getFullYear() == year && specDate.getMonth() == month;
                e.classList = [];
                const clazz = `${isTheSelectedItem(date, choicedate)} ${isTheRangeItem(date, choicedate)} ${isActive ? "_datepicker_active" : '_datepicker_unactive'}`;

                clazz.split(" ").filter(c => c != "").forEach((c) => {
                    e.classList.add(c)
                });
                return choicedate.indexOf(date) > -1
            }).forEach(e => {
                e.classList.add('_datepicker_selectedDay');
            });

            datepicker_show.value = showFullDate(choicedate[0]);
            that.allListener && that.allListener.forEach(lis => {
                lis(choicedate)
            })

        });

        datepicker_show_container.addEventListener('click', (event) => {
            if (!mainIsVisible) {
                datepicker_main.classList.add('_datepicker_visible')
            } else {
                datepicker_main.classList.remove('_datepicker_visible')
            }
            mainIsVisible = !mainIsVisible;
        });

        datepicker_body.addEventListener('click', function (event) {
            const target = event.target;
            const selectDate = target.dataset.date;
            c.selectDate(selectDate);
            event.preventDefault();
        });

        datePiker.querySelector('#_datepicker_decmonth').addEventListener('click', function () {
            c.decMonth();
        });

        datePiker.querySelector('#_datepicker_addmonth').addEventListener('click', function () {
            c.addMonth();
        })
    }

    DatePickerView.prototype.addSelectedListener = function () {
        this.allListener = this.addListener || [];
        const args = [].slice.apply(arguments).filter(e => typeof e == 'function');
        this.allListener = this.allListener.concat(args)
    };

    return DatePickerView
}());