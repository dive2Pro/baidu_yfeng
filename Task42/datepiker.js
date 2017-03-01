const DatePickerView = (function () {

    function defDate() {
        return new Date();
    }

    const tempDate = defDate();
    const defdate = {
        year: tempDate.getFullYear()
        , month: tempDate.getUTCMonth()
        , day: tempDate.getDate()
    };
// model
    function model(changeListener) {


        const selected_Date = Object.assign({}, defdate, {
            toString: function () {
                return this.year + '' + this.month + '' + this.day
            }
        });
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

        function getChoiceDate() {
            return Object.assign({}, selected_Date)
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
            , getChoiceDate: getChoiceDate
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
                mo.selectYear(m.year + 1);
                m = mo.selectMonth(0);
            } else {
                m = mo.selectMonth(m_month + 1)
            }
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

        function selectDay(day) {
            mo.selectDay(day);
            changeDayListener(mo.getChoiceDate());
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

    function geneFullDate(year, month) {
        return `${year}年${month + 1}月`
    }

    function showFullDate(date) {
        return `${date.year}-${date.month + 1}-${date.day}`
    }


    function DatePickerView(doc, id, listener) {
        let mainIsVisible = false;
        const datePiker = doc.getElementById(id);


        function showFullDateInput(date) {
            return `<input type="text" value="${showFullDate(date)}" id="_datepicker_show" readonly>`
        }

        const body = `
                    <div class="_datepicker">
                        <div id="_datepicker_show_container">
                        ${showFullDateInput(defdate)}
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
        const fulldate_view = doc.getElementById('_datepicker_fulldate');
        const datepicker_body = doc.getElementById('_datepicker_body');
        const datepicker_main = doc.getElementsByClassName('_datepicker_main')[0];
        const datepicker_show_container = doc.getElementById('_datepicker_show_container');
        const datepicker_show = doc.getElementById('_datepicker_show');

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
        let that = this;
        const c = controller(function (newDate, dayIndex, choice_date) {
            console.info(newDate);
            fulldate_view.innerHTML = geneFullDate(newDate.year, newDate.month);
            geneBody(newDate, datepicker_body, dayIndex, choice_date);
            prevTargetDayView && prevTargetDayView.classList.remove('_datepicker_selectedDay');
            prevTargetDayView = null

        }, function (choicedate) {
            if (prevTargetDayView == null) {
                console.info('prevTargetDayView = ' + prevTargetDayView);
                prevTargetDayView = doc.querySelector('._datepicker_selectedDay');
            }
            console.info(choicedate, datepicker_show);
            datepicker_show.value = showFullDate(choicedate);
            listener && listener(choicedate);
            console.info('that = ', that);
            that.allListener && that.allListener.forEach(lis => {
                lis(choicedate)
            })
        });

        datepicker_show_container.addEventListener('click', (event) => {
            console.log(event);
            if (!mainIsVisible) {
                datepicker_main.classList.add('_datepicker_visible')
            } else {
                datepicker_main.classList.remove('_datepicker_visible')
            }
            mainIsVisible = !mainIsVisible;
        });

        datepicker_body.addEventListener('click', function (event) {
            const target = event.target;
            prevTargetDayView = doc.querySelector('._datepicker_selectedDay');
            if (prevTargetDayView != null) {
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

    DatePickerView.prototype.addSelectedListener = function () {
        this.allListener = this.addListener || [];
        const args = [].slice.apply(arguments).filter(e => typeof e == 'function');
        this.allListener = this.allListener.concat(args)
    };

    return DatePickerView
}());