/*
 * Tuds tDatepicker
 * Copyright 2018 tuds - crazychicken
 * Licensed under: LICENSE
 * Version: v1.0.4
 */
;
(function ($) {
  'use strict';
  // Init - Default options
  var Defaults = {
    // Action
    autoClose: true,
    durationArrowTop: 200,

    // Theme
    // Sá»‘ thÃ¡ng Ä‘Æ°á»£c hiá»ƒn thá»‹ - máº·c Ä‘á»‹nh 2 thÃ¡ng
    numCalendar: 2,


    titleCheckIn: 'Check In',
    titleCheckOut: 'Check Out',

    titleToday: 'Today',
    titleDateRange: 'night',
    titleDateRanges: 'nights',

    titleDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    titleMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'November', "December"],
    titleMonthsLimitShow: 3,
    replaceTitleMonths: null, // Thg
    showDateTheme: null, // dd-mm-yy

    iconArrowTop: true,
    iconDate: '&#x279C;',
    arrowPrev: '&#x276E;',
    arrowNext: '&#x276F;',
    // https://fontawesome.com/v4.7.0/icons/
    // iconDate: '<i class="li-calendar-empty"></i><i class="li-arrow-right"></i>',
    // arrowPrev: '<i class="fa fa-chevron-left"></i>',
    // arrowNext: '<i class="fa fa-chevron-right"></i>',

    toDayShowTitle: true, // true|false
    dateRangesShowTitle: true, // true|false
    dateRangesHover: true, // true|false

    toDayHighlighted: false, // true|false
    nextDayHighlighted: false, // true|false
    daysOfWeekHighlighted: [0, 6],
    // ### ####

    // FORMAT
    // Quy Ä‘á»‹nh ngÃ y hiá»ƒn thá»‹ ra input value
    // yyyy-dd-mm, yyyy-mm-dd, dd-mm-yyyy, mm-dd-yyyy
    formatDate: 'yyyy-mm-dd',
    // ### ####

    // DATE
    // Setup ngÃ y t-check-in vÃ  ngÃ y t-check-out khi Ä‘Ã£ cÃ³ ngÃ y, ngÃ y t-check-out khÃ´ng Ä‘Æ°á»£c lá»›n hÆ¡n t-check-in - máº·c Ä‘á»‹nh show ngÃ y toDay
    // dateCheckIn: '25/06/2018',  // DD/MM/YY
    // dateCheckOut: '26/06/2018', // DD/MM/YY
    dateCheckIn: null,
    dateCheckOut: null,
    startDate: null,
    endDate: null,

    // Sá»‘ thÃ¡ng Ä‘Æ°á»£c next hoáº·c prev trong pháº¡m vi show ra cá»§a calendar tÃ­nh tá»« ngÃ y toDay - máº·c Ä‘á»‹nh next 12 thÃ¡ng
    limitPrevMonth: 0,
    limitNextMonth: 11,

    // Sá»‘ ngÃ y giá»›i háº¡n cá»§a t-check-in -> t-check-out Ä‘á»ƒ thÃª hiá»‡n chuá»—i .t-range
    limitDateRanges: 31,
    showFullDateRanges: false, // true -> full days || false - 1 day
    // ### ###

    // DATA HOLIDAYS
    // Data holidays
    fnDataEvent: null,
    mergeDataEvent: false,
    // ### ###
    dateDisabled: [],
    valiDation: false
  };

  var update_options;
  $.fn.tDatePicker = function (pr_el, options) {
    // Get date Today

    var d = new Date();
    var m = d.getMonth(); // 0 - 11
    var y = d.getFullYear();
    var toDay = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()); // UTC
    function getToday() {
      return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    }
    // console.log(pr_el) // options first call
    // Check update options and Methods, Object or string
    if (options === undefined && typeof (pr_el) !== 'string') {
      update_options = pr_el;
    }
    // CÃ¡c giÃ¡ trá»‹ update pháº£i gÃ¡n trÆ°á»›c khi merge Object vÃ¬ sá»­ dá»¥ng convertFormatDf() format dd-mm-yyyy trÆ°á»›c.
    update_options.formatDate = update_options.formatDate || Defaults.formatDate;
    // setStart lÃ  ngÃ y Ä‘áº§u tiÃªn cá»§a cuá»‘n lá»‹ch, nhá»¯ng ngÃ y trÆ°á»›c nÃ³ sáº½ disbale,
    // náº¿u khÃ´ng set giÃ¡ trá»‹ default lÃ  toDay
    // Náº¿u ko startDate thÃ¬ sáº½ láº¥y ngÃ y toDay lÃ m máº·c Ä‘á»‹nh
    // Khi setStart Ä‘á»±a vÃ o limitNextMonth : 11, limitDateRanges: 31, Ä‘á»ƒ biáº¿t Ä‘Æ°á»£c ngÃ y getEndDate
    update_options.startDate = update_options.startDate || toDay;
    if (update_options.startDate === '' || update_options.startDate === 'null') {
      update_options.startDate = toDay;
    }
    update_options.startDate = convertDateUTC(convertFormatDf(update_options.startDate))
    var sd = new Date(update_options.startDate);
    var nextDay = Date.UTC(sd.getFullYear(), sd.getMonth(), sd.getDate() + 1); // UTC
    if (pr_el === 'setStartDate' && typeof (pr_el) === 'string') {
      update_options.startDate = convertDateUTC(convertFormatDf(options))
    }
    if (pr_el === 'setEndDate' && typeof (pr_el) === 'string') {
      update_options.endDate = convertDateUTC(convertFormatDf(options))
    }


    // Check giÃ¡ trá»‹ truyá»n vÃ o pháº£i lÃ  ngÃ y náº¿u === null or empty thÃ¬ tráº£ vá» null
    if (update_options.dateCheckIn === ''
      || update_options.dateCheckIn === 'null') {
      update_options.dateCheckIn = null;
    }
    if (update_options.dateCheckOut === ''
      || update_options.dateCheckOut === 'null') {
      update_options.dateCheckOut = null;
    }
    if (update_options.endDate === ''
      || update_options.endDate === 'null') {
      update_options.endDate = null;
    }

    if (options !== undefined) {
      update_options.numCalendar = update_options.numCalendar || 2;
      var num_Limit = update_options.limitDateRanges || 31;
      var num_month_Limit = update_options.limitNextMonth || 11;
      // get endDate Calendar phá»¥ thuá»™c vÃ o sá»‘ lÆ°á»£ng numCalendar Ä‘Æ°á»£c show vÃ  nextMonth
      var limitEndDate = new Date(sd.getFullYear(), sd.getMonth() + update_options.numCalendar + num_month_Limit - 1, sd.getDate());
      limitEndDate = convertDateUTC(convertFormatDf(limitEndDate))

      // Update for CI - CO
      if (pr_el === 'update') {
        // update_options.dateCheckIn  = convertDateUTC(convertFormatDf(options[0]));
        // update_options.dateCheckOut = convertDateUTC(convertFormatDf(options[1]));
        // Update for CI - CO
        if (options.length === 2) {
          checkCI(options[0]);
          checkCO(options[1]);
        } else {
          // Update for CI
          checkCI(options);
        }
        if (options === '') {
          update_options.dateCheckIn = null;
          update_options.dateCheckOut = null;
        }
      }
      // Update only for CI
      if (pr_el === 'updateCI') {
        checkCI(options);
      }
      // Update only for CO
      if (pr_el === 'updateCO') {
        checkCO(options)
      }
    }
    // Update for CI
    function checkCI(pr_options) {
      // XÃ©t default khi CI = ''
      if (pr_options === '') {
        update_options.dateCheckIn = null;
        update_options.dateCheckOut = null;
        return;
      }
      var CI = convertDateUTC(convertFormatDf(pr_options));
      var date = new Date(CI);
      var dateLimit = new Date(date.getFullYear(), date.getMonth(), date.getDate() + num_Limit);
      dateLimit = convertDateUTC(convertFormatDf(dateLimit))
      var op_CO = convertDateUTC(convertFormatDf(update_options.dateCheckOut));
      // - update CI nhá» hÆ¡n update_options.startDate thÃ¬ láº¥y ngÃ y update_options.startDate
      update_options.dateCheckIn = CI;
      if (CI < update_options.startDate) {
        update_options.dateCheckIn = update_options.startDate;
      }
      // Set day CI lá»›n hÆ¡n limit day tráº£ vá» ngÃ y cuá»‘i cÃ¹ng
      if (CI > limitEndDate) {
        update_options.dateCheckIn = limitEndDate;
      }

      // - update CI lá»›n hÆ¡n hoáº·c = CO thÃ¬ láº¥y ngÃ y update CO = null
      if (CI >= op_CO || op_CO > dateLimit) {
        update_options.dateCheckOut = null;
      }
    }
    // Update for CO
    function checkCO(pr_options) {
      var op_CI = convertDateUTC(convertFormatDf(update_options.dateCheckIn));
      // Báº¯t buá»™c pháº£i cÃ³ CI
      // - update CO nhá» hÆ¡n CI thÃ¬ CO = null -> CI = ngÃ y hiá»‡n táº¡i
      // - update CO khÃ´ng Ä‘Æ°á»£c === CI
      // - update CO khÃ´ng Ä‘Æ°á»£c lá»›n hÆ¡n limitDateRanges
      // XÃ©t default khi CO = ''
      if (pr_options === '') {
        update_options.dateCheckIn = op_CI;
        if (isNaN(op_CI)) {
          update_options.dateCheckIn = null;
        }
        update_options.dateCheckOut = null;
        return;
      }
      var CO = convertDateUTC(convertFormatDf(pr_options));
      var date = new Date(CO);
      var CO_dateLimit = new Date(date.getFullYear(), date.getMonth(), date.getDate() - num_Limit);
      CO_dateLimit = convertDateUTC(convertFormatDf(CO_dateLimit))
      // Lá»›n hÆ¡n ngÃ y giá»›i háº¡n
      // if (CO > limitEndDate) {
      //     update_options.dateCheckOut = limitEndDate;
      //     update_options.dateCheckIn = CO_dateLimit;
      //     return;
      // }

      if (CO > update_options.startDate) {
        // Set day CI lá»›n hÆ¡n limit day tráº£ vá» ngÃ y cuá»‘i cÃ¹ng
        // Gá»i láº§n Ä‘áº§u chÆ°a cÃ³ CI
        if (update_options.dateCheckIn === undefined || update_options.dateCheckIn === null) {
          update_options.dateCheckOut = CO;
          // Cá»‘ Ä‘á»‹nh chá»n CI
          if (update_options.startDate > CO_dateLimit) {
            update_options.dateCheckIn = update_options.startDate;
          } else {
            update_options.dateCheckIn = CO_dateLimit;
          }
        } else {
          // ÄÃ£ cÃ³ CI
          // update_options.startDate 10/10 - CO_dateLimit-31 = 15/10
          update_options.dateCheckOut = CO;
          // Náº±m trong pháº¡m vi limitDateRanges - default 31 ngÃ y
          // update_options.startDate Ä‘áº¿n CO lÃ  31 ngÃ y
          if (update_options.startDate > CO_dateLimit) {
            // Cáº§n xÃ¡c Ä‘á»‹nh CI luÃ´n luÃ´n = CI chá»‰ = update_options.startDate khi CO < CI
            update_options.dateCheckIn = op_CI;
            if (CO < op_CI) {
              update_options.dateCheckIn = update_options.startDate;
            }
          } else {
            // VÆ°á»£t khá»i pháº¡m vi limitDateRanges - default 31 ngÃ y so vá»›i update_options.startDate
            // VÆ°á»£t khá»i 31 ngÃ y mÃ  CO > CI - váº«n cÃ²n ngÃ y CI
            if (op_CI > CO_dateLimit) {
              update_options.dateCheckIn = op_CI;
            } else {
              update_options.dateCheckIn = CO_dateLimit;
            }
            // VÆ°á»£t khá»i 31 ngÃ y mÃ  CO < CI - khÃ´ng cÃ³ CI, xÃ¡c Ä‘á»‹nh CI
            if (op_CI > CO) {
              update_options.dateCheckIn = CO_dateLimit;
            }
          }
        }
      } else {
        update_options.dateCheckIn = update_options.startDate;
        update_options.dateCheckOut = nextDay;
      }
    }

    // Update data date for methods 'show', 'hide', startDate
    // getDate, getDateUTC, getDateInput Ä‘á»ƒ trÆ°á»›c Ä‘á»ƒ get Ä‘Æ°á»£c cáº£ giÃ¡ trá»‹ chÆ°a cÃ³ lÃ  'null'
    var findValueCI = this.find('.t-input-check-in').val();
    var findValueCO = this.find('.t-input-check-out').val();
    if (typeof (pr_el) === 'string') {
      if (pr_el === 'show' || pr_el === 'hide') {
        if (findValueCI !== 'null') {
          update_options.dateCheckIn = findValueCI;
        }
        if (findValueCO !== 'null') {
          update_options.dateCheckOut = findValueCO;
        }
      }

      // Method getDate, getDateUTC, getDateInput ...
      // Náº¿u CI khÃ´ng cÃ³ giÃ¡ trá»‹, set tá»«ng methods Ä‘á»ƒ tráº£ vá» káº¿t quáº£ null or [null, null]
      if (findValueCI === 'null') {
        if (pr_el === 'getDate' || pr_el === 'getDateInput' || pr_el === 'getDateUTC') {
          return null;
        }
        if (pr_el === 'getDates' || pr_el === 'getDateInputs' || pr_el === 'getDateUTCs') {
          return [null, null];
        }
      }
      // Náº¿u CI cÃ³ giÃ¡ trá»‹, set tá»«ng methods Ä‘á»ƒ tráº£ vá» kÃªt quáº£ cá»¥ thá»ƒ:
      if (findValueCI !== 'null') {
        if (findValueCO === 'null') {
          if (pr_el === 'getDates') {
            return [new Date(findValueCI), null]
          }
          if (pr_el === 'getDateInputs') {
            return [findValueCI, null]
          }
          if (pr_el === 'getDateUTCs') {
            var d_CI = convertDateUTC(convertFormatDf(findValueCI));
            return [d_CI, null]
          }
        }
        // getDate
        if (pr_el === 'getDate') {
          return new Date(findValueCI)
        }
        if (pr_el === 'getDates') {
          return [new Date(findValueCI), new Date(findValueCO)]
        }

        // getDateInput
        if (pr_el === 'getDateInput') {
          return findValueCI;
        }
        if (pr_el === 'getDateInputs') {
          return [findValueCI, findValueCO]
        }

        // getUTCDate
        if (pr_el === 'getDateUTC') {
          return convertDateUTC(convertFormatDf(findValueCI));
        }
        if (pr_el === 'getDateUTCs') {
          var d_CI = convertDateUTC(convertFormatDf(findValueCI));
          var d_CO = convertDateUTC(convertFormatDf(findValueCO));
          return [d_CI, d_CO]
        }
      }
    }


    // ### ###
    // ### MERGE OBJECT MAIN OPTIONS DEFAULT ####
    var this_el = this;
    var settings = $.extend({}, Defaults, update_options);
    // ### ###
    // Check Number
    settings.durationArrowTop = Number(settings.durationArrowTop)
    settings.limitPrevMonth = Number(settings.limitPrevMonth)
    settings.limitNextMonth = Number(settings.limitNextMonth)
    settings.numCalendar = Number(settings.numCalendar)
    settings.limitDateRanges = Number(settings.limitDateRanges)
    settings.titleMonthsLimitShow = Number(settings.titleMonthsLimitShow)


    // Get Start Date and get End Date Ä‘á»ƒ sau Object settings lÃ  vÃ¬ pháº£i chá» cÃ³ giÃ¡ trá»‹ mÃ  láº¥y
    if (typeof (pr_el) === 'string') {
      // getStartDate
      var get_startDate = settings.startDate || settings.dateCheckIn;
      if (pr_el === 'getStartDate') {
        return new Date(get_startDate)
      }
      if (pr_el === 'getStartDateUTC') {
        return convertDateUTC(convertFormatDf(get_startDate))
      }

      // getEndDate
      var get_endDate = settings.endDate || new Date(sd.getFullYear(), sd.getMonth() + settings.numCalendar + settings.limitNextMonth - 1, sd.getDate());
      if (pr_el === 'getEndDate') {
        return new Date(get_endDate);
      }
      if (pr_el === 'getEndDateUTC') {
        return convertDateUTC(convertFormatDf(get_endDate));
      }
    }


    // FUNCTION UTILITY
    // Check number first 0 - 01, 02, 03 ....
    function check_num_10(pr_el) {
      if (pr_el < 10) {
        return pr_el = '0' + pr_el
      } else {
        return pr_el;
      }
    }
    function convertArrayToString(pr_array) {
      pr_array = pr_array.toString();
      pr_array = pr_array.replace(/,/g, '');
      return pr_array;
    }
    // Function Parents
    function fnParents(pr_el_parent, pr_el_class) {
      var i = 0;
      while (pr_el_parent.className.match(pr_el_class) === null) {
        if (pr_el_parent.className === pr_el_class) {
          return pr_el_parent;
        }
        if (pr_el_parent.nodeName === 'HTML') {
          return pr_el_parent;
        }
        pr_el_parent = pr_el_parent.parentElement;
        // Kiá»ƒm tra pháº§n tá»­, alert khÃ´ng cÃ³ element bÃªn ngoÃ i thÃ¬ set default DOM ROOT
        if (pr_el_parent === null) {
          return document.body.parentElement;
        }
        // check stop while
        i++;
        if (i > 500) {
          return;
        }
        // return pr_el_parent;
      }
      return pr_el_parent;
    }
    // Function Append for toDay, hover day show num night
    function appendSpan(pr_el, pr_class, pr_class_span, pr_text_node) {
      if (pr_class != '') {
        pr_el.className = pr_el.className + ' ' + pr_class;
      } else {
        pr_el.className = pr_el.className + pr_class;
      }
      var node = document.createElement("span");
      node.className = pr_class_span;
      var textnode = document.createTextNode(pr_text_node);
      node.appendChild(textnode);
      pr_el.appendChild(node)
    }


    // GLOBAL VARIABLE
    // var aDays = [ 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN' ];
    var aDays = settings.titleDays;
    // var aMonths = ['ThÃ¡ng 01', 'ThÃ¡ng 02', 'ThÃ¡ng 03', 'ThÃ¡ng 04', 'ThÃ¡ng 05', 'ThÃ¡ng 06', 'ThÃ¡ng 07', 'ThÃ¡ng 08', 'ThÃ¡ng 09', 'ThÃ¡ng 10', 'ThÃ¡ng 11', "ThÃ¡ng 12"]
    // [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su' ];
    // Theme Function  set type day of week
    function setDayOfWeek() {
      for (var i = 0; i < aDays.length; i++) {
        if (aDays[i].indexOf('<th>') === -1) {
          aDays[i] = '<th>' + aDays[i] + '</th>';
        } else {
          aDays[i] = aDays[i];
        }
      }
      return convertArrayToString(aDays)
    }

    // Theme Function get HTML TABLE for calendar
    var setTemplate = '<div class="t-table-wrap"><table class="t-table-condensed">' +
      '<thead>' +
      '<tr>' +
      '<th class="t-arrow t-prev">' + settings.arrowPrev + '</th>' +
      '<th colspan="5" class="t-month"></th>' +
      '<th class="t-arrow t-next">' + settings.arrowNext + '</th>' +
      '</tr>' +
      '<tr>' +
      setDayOfWeek() +
      '</tr>' +
      '</thead>' +
      '<tbody></tbody>' +
      '</table></div>'
    // console.log(setTemplate)
    // options add theme
    var numCalendar = settings.numCalendar;
    // if ( numCalendar < 1 || isNaN( numCalendar )) {
    //     return console.log("'Thank you for using t-datepicker. Please, check numCalendar :'%c " + numCalendar + ' ', 'background: #f16d99; color: #fff');
    // }
    // .t-datepicker-days options have only one calendar
    var checkNumCalendar = '';
    if (Number(numCalendar) > 1) {
      var checkNumCalendar = ' t-datepicker-days'
    }

    var dataTheme = [];
    var setNumTheme = numCalendar;
    while (setNumTheme > 0) {
      dataTheme.push(setTemplate);
      setNumTheme--;
    }
    // Reset variable code 0,1,2,3 ...
    numCalendar = numCalendar - 1;

    // Theme Append html follow month tr > td dataDays/7
    function AppendDaysInMonth(pr_num) {
      var i = 0;
      var setTr = '';
      while (i < pr_num) {
        setTr = setTr + '<tr>' +
          '<td class="t-day">1</td>' +
          '<td class="t-day">2</td>' +
          '<td class="t-day">3</td>' +
          '<td class="t-day">4</td>' +
          '<td class="t-day">5</td>' +
          '<td class="t-day">6</td>' +
          '<td class="t-day">0</td>' +
          '</tr>';
        i++;
      }
      return setTr;
    }


    // Theme t-check-in && t-check-out default show for website
    function setThemeCheckDate(pr_title, pr_class, pr_data_utc, pr_input, pr_fm_input, pr_requied) {
      return '<div class="t-dates t-date-' + pr_class + '">' +
        // setInfoTitle(pr_title, 't-date-info-title')
        settings.iconDate +
        '<label class="t-date-info-title">' + pr_title + '</label>' +
        //      showThemeDate(pr_class, pr_data_utc)+
        '</div>' +
        '<input type="text" class="t-input t-input-' + pr_class + '"' + ' value="' + pr_fm_input + '" name="' + pr_input + '"' + pr_requied + '>'
      // '<input type="hidden" class="t-input-'+pr_class+'"'+' value="'+pr_fm_input+'" name="'+pr_input+'">'
      // +'<div class="datepicker"></div>'
    }
    function showThemeDate(pr_class, pr_data_utc) {
      if (pr_data_utc !== 0 && pr_data_utc !== null) {
        var d = new Date(pr_data_utc)
        var showMonths = settings.titleMonths[d.getMonth()].slice(0, settings.titleMonthsLimitShow); // 19 Jul 2018
        // Chá»‰nh sá»­a láº¡i ThÃ¡ng muá»‘n hiá»ƒn thá»‹ tá»± custom - 'ThÃ¡ng'
        if (settings.replaceTitleMonths !== null) {
          showMonths = settings.replaceTitleMonths + ' ' + check_num_10(d.getMonth() + 1);
        }
        // Set hiá»ƒn thá»‹ chá»‰ cÃ³ dd/mm hoáº·c dd/mm/yy khÃ´ng Ä‘á»•i formatShow
        if (settings.showDateTheme === 'dd') {
          return '<span class="t-day-' + pr_class + '"> ' + check_num_10(d.getDate()) + '</span>'
        } else if (settings.showDateTheme === 'dd/mm' || settings.showDateTheme === 'dd-mm') {
          return '<span class="t-day-' + pr_class + '"> ' + check_num_10(d.getDate()) + '</span>' +
            '<span class="t-month-' + pr_class + '"> ' + showMonths + ' </span>'
        } else {
          return '<span class="t-day-' + pr_class + '"> ' + check_num_10(d.getDate()) + '</span>' +
            '<span class="t-month-' + pr_class + '"> ' + showMonths + ' </span>' +
            '<span class="t-year-' + pr_class + '"> ' + check_num_10(d.getFullYear()) + '</span>'
        }
      } else {
        return '';
      }
    }
    // fn convert date_utc 2018/02/27 -> 1519689600000 // YY/MM/DD
    function convertDateUTC(pr_date_utc) {
      var date = new Date(pr_date_utc);
      var date_utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
      if (date_utc === 0) {
        date_utc = null
      }
      ;
      return date_utc;
    }
    function convertFormatDf(pr_date) {
      if (typeof (pr_date) === 'object' && pr_date !== null) {
        return pr_date = convertDateUTC(pr_date)
      }
      if (typeof (pr_date) === 'string' && pr_date !== 'null' && pr_date != '') {
        var yyyy_mm_dd;
        if (pr_date.indexOf('/') !== -1) {
          pr_date = pr_date.replace(/\//g, '-')
        }
        var dd = pr_date.split('-');
        // yyyy pháº£i lÃ  4 sá»‘ trá»Ÿ lÃªn, thÃ¡ng khÃ´ng Ä‘Æ°á»£c lá»›n hÆ¡n 13
        // GiÃ¡ trá»‹ tá»« input mm-dd-yyyy chuyá»ƒn Ä‘á»•i thÃ nh yyyy-mm-dd
        if (update_options.formatDate === 'mm-dd-yyyy'
          && dd[2].length === 4 && dd[0] < 13) {
          // console.log('mm-dd-yyyy')
          yyyy_mm_dd = dd[2] + '-' + dd[0] + '-' + dd[1];
        }

        if (update_options.formatDate === 'dd-mm-yyyy'
          && dd[2].length === 4 && dd[1] < 13) {
          // console.log('dd-mm-yyyy')
          yyyy_mm_dd = dd[2] + '-' + dd[1] + '-' + dd[0];
        }

        // GiÃ¡ trá»‹ tá»« input yyyy-dd-mm chuyá»ƒn Ä‘á»•i thÃ nh yyyy-mm-dd
        if (update_options.formatDate === 'yyyy-dd-mm'
          && dd[0].length === 4 && dd[2] < 13) {
          // console.log('yyyy-dd-mm')
          yyyy_mm_dd = dd[0] + '-' + dd[2] + '-' + dd[1];
        }
        // GiÃ¡ trá»‹ tá»« input mm-dd-yyyy chuyá»ƒn Ä‘á»•i thÃ nh yyyy-mm-dd
        // [yyyy, mm, dd]
        if (update_options.formatDate === 'yyyy-mm-dd'
          && dd[0].length === 4 && dd[1] < 13) {
          // console.log('mm-dd-yyyy')
          yyyy_mm_dd = dd[0] + '-' + dd[1] + '-' + dd[2];
        }
        // Gá»i sai format lÃ  return;
        if (isNaN(new Date(yyyy_mm_dd))) {
          console.log("'Thank you for using t-datepicker. Please, check formatDate :'%c " + settings.formatDate + ' ', 'background: #f16d99; color: #fff');
          return;
        }
        return yyyy_mm_dd; // Convert String '25/06/2018' - '2018/06/25'
      }
      return pr_date; // convert date_utc 2018/02/27 -> 1519689600000 -> Number
    }
    // Kiá»ƒm tra giÃ¡ trá»‹ Ä‘á»ƒ show ra input lÃ  dd-mm-yyyy
    function showValueInput(pr_date) {
      if (pr_date !== null) {
        var d = new Date(pr_date)
        // dd-mm-yyyy
        pr_date = check_num_10(d.getDate()) + '-' + (check_num_10(d.getMonth() + 1)) + '-' + d.getFullYear();
        if (settings.formatDate === 'mm-dd-yyyy') {
          pr_date = (check_num_10(d.getMonth() + 1)) + '-' + check_num_10(d.getDate()) + '-' + d.getFullYear();
        }
        if (settings.formatDate === 'yyyy-dd-mm') {
          pr_date = d.getFullYear() + '-' + check_num_10(d.getDate()) + '-' + (check_num_10(d.getMonth() + 1));
        }
        if (settings.formatDate === 'yyyy-mm-dd') {
          pr_date = d.getFullYear() + '-' + (check_num_10(d.getMonth() + 1)) + '-' + check_num_10(d.getDate());
        }
      }
      return pr_date;
    }
    // Function get && show default theme for website include (2018/02/27 || 1519689600000)
    function getDateUTC(pr_in, pr_out) {
      var Array_In_Out = ['check-in', 'check-out'];
      Array_In_Out.forEach(function (e) {
        var label_title = settings.titleCheckIn;
        var getDay = pr_in;
        var Input = 't-start'
        // Check CI cÃ³ giÃ¡ trá»‹ ngÃ y thÃ¬ remove label Nháº­n PhÃ²ng
        //                if (pr_in !== null) {
        //                    label_title = '';
        //                }
        if (e === 'check-out') {
          label_title = settings.titleCheckOut;
          getDay = pr_out;
          // GiÃ¡ trá»‹ CI lá»›n hÆ¡n 30 day giá»›i háº¡n, lá»›n hÆ¡n ngÃ y CO náº¿u Ä‘Ã£ cÃ³ CO -> CO sáº½ khÃ´ng cÃ³ chá»n ngÃ y á»Ÿ dates
          // Null khÃ´ng cÃ³ add dates vÃ  Dom
          if (pr_in === pr_out) {
            getDay = pr_in;
            Input = 't-end'
          } else
            //                    if (pr_out !== null) {
            //                        label_title = ''; // XoÃ¡ title khi cÃ³ giÃ¡ trá»‹
            //                    }
            Input = 't-end'
        }
        // console.log(getDay)
        getDay = convertFormatDf(getDay)
        var formatDate = showValueInput(getDay);
        var required = '';
        // Check validation HTML5 empty input
        if (settings.valiDation === true && formatDate === null) {
          formatDate = ''
          required = 'required'
        }
        // console.log(getDay)
        getDay = convertDateUTC(getDay);
        this_el.find('.t-' + e).html(setThemeCheckDate(label_title, e, getDay, Input, formatDate, required))
      })

      // Náº¿u khÃ´ng cÃ³ data, data default sáº½ lÃ  toDay vÃ  nextDays - null
      if (pr_in === null && pr_out === null) {
        pr_in = settings.startDate;
        // next Day form dataCheckIn
        var date = new Date(pr_in);
        pr_out = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        // console.log('a')
      }
      if (pr_in !== null && pr_out !== null) {
        // CÃ³ data, mÃ  CO < CI thÃ¬ Ä‘Æ°a check CO = CI
        if (convertDateUTC(convertFormatDf(pr_in)) > convertDateUTC(convertFormatDf(pr_out))) {
          pr_in = pr_out;
          // console.log('b')
        }
      }
      // Náº¿u CI cÃ³ giÃ¡ trá»‹ mÃ  CO khÃ´ng cÃ³ thÃ¬ gÃ´m chung lÃ  1
      if (pr_in !== null && pr_out === null) {
        pr_out = pr_in;
        // console.log('c')
      }
      // Náº¿u CO cÃ³ giÃ¡ trá»‹ mÃ  CI khÃ´ng cÃ³ thÃ¬ CI = CO
      if (pr_in === null && pr_out !== null) {
        pr_in = pr_out;
        // console.log('d')
      }

      // GiÃ¡ trá»‹ CI lá»›n hÆ¡n 30 day giá»›i háº¡n, lá»›n hÆ¡n ngÃ y CO náº¿u Ä‘Ã£ cÃ³ CO -> CO sáº½ khÃ´ng cÃ³ chá»n ngÃ y á»Ÿ dates
      // if ( pr_in === pr_out ) {
      //     $('.year-check-out').remove();
      //     $('.month-check-out').remove();
      //     $('.day-check-out').remove();
      // }

      // Convert String '25/06/2018' - '29/06/2018'
      pr_in = convertFormatDf(pr_in)
      pr_out = convertFormatDf(pr_out)
      // convert date_utc 2018/02/27 -> 1519689600000 // YY/MM/DD -> Number
      return [convertDateUTC(pr_in), convertDateUTC(pr_out)];
    }
    var dataUTC = getDateUTC(settings.dateCheckIn, settings.dateCheckOut);



    // Nháº­n vÃ o Elements [dates], date_utc = [1,2]
    function setDaysInMonth(pr_el, pr_data_utc) {
      // pr_el.parentElement.getElementsByClassName('datepicker')[0].innerHTML = convertArrayToString(dataTheme);
      // pr_el <=> this, define event for each calendar
      var tswitch = pr_el.find('.t-month');
      if (numCalendar >= 0) {
        for (var i_num = 0; i_num <= numCalendar; i_num++) {
          // Call title month
          var date = new Date(pr_data_utc)
          var newDate = new Date(Date.UTC(date.getFullYear(), (date.getMonth() + i_num)));
          // tswitch[i_num].innerHTML = 'ThÃ¡ng ' + (newDate.getMonth() + 1) + ' ' + newDate.getFullYear();
          tswitch[i_num].innerHTML = settings.titleMonths[newDate.getMonth()] + ' ' + newDate.getFullYear();

          // Global data days
          var dataDays = [];
          var dataUTCDate = [];
          var days = [];

          // Call data Next month follow number calendar
          var nextDate = Date.UTC(date.getFullYear(), (date.getMonth() + i_num));
          var date = new Date(nextDate)
          while (Date.UTC(date.getFullYear(), (date.getMonth())) === nextDate) {
            days.push(date.getDay());      // Day of week 0 - 6 tÃ¬m Ä‘Æ°á»£c vá»‹ trÃ­ ngÃ y Ä‘áº§u tiÃªn vÃ  cuá»‘i cÃ¹ng trong thÃ¡ng
            dataDays.push(date.getDate()); // Day of month 1 -31 tÃ¬m Ä‘Æ°á»£c sá»‘ ngÃ y cá»§a 1 thÃ¡ng
            dataUTCDate.push(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) // Number day ex: 1519257600000
            date.setDate(date.getDate() + 1); // So sÃ¡nh sá»‘ ngÃ y cá»§a thÃ¡ng
          }
          // console.log(days)

          // var days = [
          //     0,             // 1
          //     1,2,3,4,5,6,0, // 2
          //     1,2,3,4,5,6,0, // 2
          //     1,2,3,4,5,6,0, // 3
          //     1,2,3,4,5,6,0, // 4
          //     1,2,3,4,5,6,0, // 5
          //     1     // 6
          // ]

          // console.log(days)
          // Set Days before min in month
          var beforeDay = days[0];
          if (beforeDay === 0) {
            while (beforeDay < 6) {
              dataDays.unshift('');
              dataUTCDate.unshift('');
              beforeDay++;
            }
          } else {
            while (beforeDay > 1) {
              dataDays.unshift('');
              dataUTCDate.unshift('');
              beforeDay--;
            }
          }
          // Set Days after max in month
          var afterDay = days[days.length - 1];
          while (afterDay < 7) {
            dataDays.push('');
            dataUTCDate.push('');
            afterDay++;
          }
          setThemeData(dataDays, dataUTCDate, i_num, pr_el)
        }
      }
      // console.log(pr_data_utc)
      // Nháº­n vÃ o Elements [dates], date_utc = [1,2]
      getStyleDays(pr_el, pr_data_utc);
    }

    // Function setTheme show tablet date follow numCalendar 1,2,3 ...
    function setThemeData(dataDays, dataUTCDate, pr_num, pr_el) {
      var checkdataDays = dataDays.slice(-7)[0] // Kiá»ƒm tra thÃ¡ng cÃ³ ngÃ y cuá»‘i cÃ¹ng lÃ  30 vÃ  7 "" empty
      if (checkdataDays === '') {
        dataDays = dataDays.slice(0, -7) // Clear 7 empty
      }
      var getTH = pr_el.find('tbody')
      getTH[pr_num].innerHTML = AppendDaysInMonth(Math.round(dataDays.length / 7));
      var getTD = getTH[pr_num].querySelectorAll('td')
      for (var td = 0; td < getTD.length; td++) {
        getTD[td].setAttribute('data-t-date', dataUTCDate[td]);
        getTD[td].innerHTML = dataDays[td];
      }
    }

    function getStyleDays(pr_el, pr_data_utc) {
      // Call Function click Next | Prev
      // Nháº­n vÃ o Elements [dates], date_utc = [1,2]
      var limitdateN = clickEvent(pr_el, pr_data_utc)
      var limitEndDate = convertDateUTC(convertFormatDf(settings.endDate)) || limitdateN;
      var toDayElement = pr_el.find('td')

      var d_utc = new Date(dataUTC[0]);
      var d_utc_co = new Date(dataUTC[1]);
      var limitRange = Date.UTC(d_utc.getFullYear(), d_utc.getMonth(), d_utc.getDate() + settings.limitDateRanges);
      var limitRangeCO = Date.UTC(d_utc_co.getFullYear(), d_utc_co.getMonth(), d_utc_co.getDate() - settings.limitDateRanges);

      for (var i = 0; i < toDayElement.length; i++) {
        var dayselect = toDayElement[i].getAttribute('data-t-date');

        // t-disabled all days before toDay settings.startDate === toDay
        if (Number(dayselect) < settings.startDate) {
          toDayElement[i].className = 't-disabled';
        }

        // disable Before Day position t-Check-out
        if (pr_el.hasClass('t-check-out') === true) {

          if (Number(dayselect) < dataUTC[0]) {
            toDayElement[i].className = 't-disabled';
          }
          if (Number(dayselect) > dataUTC[1] || Number(dayselect) >= limitRange) {
            toDayElement[i].className = 't-disabled';
          }

          // Setlimit Range khi á»Ÿ t-check-out cÃ²n click Ä‘Æ°á»£c 31 ngÃ y default hoáº·c cÃ³ thá»ƒ set limitDateRanges
          if (Number(dayselect) != 0
            && Number(dayselect) > dataUTC[0]
            && Number(dayselect) < limitRange
            && Number(dayselect) != dataUTC[1]) {
            toDayElement[i].className = 't-day';
          }
          // disable button Arrow Prev when in check-out
          if (Number(dayselect) === dataUTC[0]) {
            var Arrow = pr_el.parent().find('.t-arrow');
            Arrow[0].className = Arrow[0].className.replace(' t-disabled', '') + ' t-disabled'
            Arrow[0].onclick = function () {
              return;
            }
          }
          // disable button Arrow Next when in check-out
          var CI_Arrow = settings.dateCheckIn || toDay; // Case CI = null
          var ci_d = new Date(CI_Arrow);
          var co_n = Date.UTC(ci_d.getFullYear(), ci_d.getMonth(), ci_d.getDate() + settings.limitDateRanges)
          if ($(pr_el).find('[data-t-date="' + co_n + '"]')[0] !== undefined) {
            var Arrow = pr_el.parent().find('.t-arrow');
            Arrow[Arrow.length - 1].className = Arrow[Arrow.length - 1].className.replace(' t-disabled', '') + ' t-disabled'
            Arrow[Arrow.length - 1].onclick = function () {
              return;
            }
          }
        }

        // tRange In --- Out
        if (Number(dayselect) > dataUTC[0]
          && Number(dayselect) < dataUTC[1]
          && dataUTC[0] >= settings.startDate
          && dataUTC[1] <= limitEndDate) {
          toDayElement[i].className = 't-range';
        }

        // Limit Day disable for t-check-in 1,2,3 .. months
        // limitEndDate <=> settings.endDate
        if (Number(dayselect) > limitEndDate) {
          toDayElement[i].className = 't-disabled';
        }

        // In - Ative t-check-in
        if (Number(dayselect) === dataUTC[0]) {
          var this_picker = $(toDayElement[i]).parents('.t-datepicker')
          if (this_picker.find('.t-input-check-in').val() !== 'null'
            || settings.toDayHighlighted !== false) {
            toDayElement[i].className = 't-start';
          }
        }
        // Out - Active t-Check-out
        if (Number(dayselect) === dataUTC[1]) {
          var this_picker = $(toDayElement[i]).parents('.t-datepicker')
          if (this_picker.find('.t-input-check-out').val() !== 'null'
            || settings.nextDayHighlighted !== false) {
            toDayElement[i].className = 't-end';
          }
        }

        // t-highlighted toDay
        if (Number(dayselect) === toDay) {
          if (settings.toDayShowTitle === true || settings.toDayShowTitle === 'true') {
            // cln = cln.replace('t-special-day', '');
            appendSpan(toDayElement[i], 't-hover-day', 't-hover-day-content', settings.titleToday)
            toDayElement[i].className = toDayElement[i].className.replace(' t-today', '') + ' t-today';
          }
        }
        // Select stype for day in calendar
        var Cn = new Date(Number(dayselect))
        Cn = Cn.getDay()
        // console.log(settings.daysOfWeekHighlighted) // [0,1,2,3,4,5,6]
        settings.daysOfWeekHighlighted.forEach(function (e) {
          if (Cn == e) {
            toDayElement[i].className = toDayElement[i].className.replace(' t-highlighted', '') + ' t-highlighted';
          }
        })

        // Click td event when td has been value
        toDayElement[i].onclick = function (e) {
          e.stopPropagation();
          // Check náº¿u lÃ m t-disabled khÃ´ng lÃ m gÃ¬ cáº£
          if ($(this).hasClass('t-disabled') === true) {
            return;
          }

          var data_utc_in, data_utc_out;
          var get_utc = $(this).attr('data-t-date') // ngÃ y click
          // Click calendar á»Ÿ t-check-out
          var datepicker = $(this).parents('.t-check-out');

          // get data UTC date
          get_utc = Number(get_utc)
          if ($(this).parents('.t-check-in').hasClass('t-check-in') === true) {
            // Check sá»‘ ngÃ y lá»›n hÆ¡n 12 thÃ¡ng hoáº·c limitNextMonth khÃ´ng cho click
            if (Number($(this).attr('data-t-date')) > limitEndDate) {
              return;
            }
            // selectedCI do something
            $(pr_el).trigger('selectedCI', Number(get_utc))
            // onChangeCI do something
            var setChangeDate = $(this).parents('.t-check-in').find('.t-input-check-in').val();
            if (convertDateUTC(convertFormatDf(setChangeDate)) != get_utc) {
              $(pr_el).trigger('onChangeCI', Number(get_utc))
            }

            var d = new Date(dataUTC[1]);
            // Giá»›i háº¡n 30 ngÃ y
            var limitdate = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() - settings.limitDateRanges);
            data_utc_in = get_utc;
            data_utc_out = dataUTC[1];

            // NgÄƒn update nextDate CO náº¿u click vÃ o ngÃ y toDay, startDatem
            // TrÆ°á»ng há»£p dateCheckIn nhá» hÆ¡n startDate
            if (get_utc === settings.startDate && $(this).hasClass('t-start') === false && dataUTC[0] >= settings.startDate) {
              data_utc_out = dataUTC[0];
            }
            if (get_utc > dataUTC[1] || get_utc === dataUTC[1] || get_utc <= limitdate) {
              // KhÃ´ng hiá»‡n ngÃ y t-check-out liá»n ká»
              data_utc_out = get_utc;
            }
            if ($(this).parents('.t-picker-only').hasClass('t-picker-only') === true) {
              data_utc_out = data_utc_in;
            }
            // Click calendar á»Ÿ t-check-in chuyá»ƒn element qua t-check-out
            datepicker = $(this).parents('.t-datepicker').find('.t-check-out')
            // Chuyá»ƒn Ä‘á»•i khi khÃ´ng cÃ³ t-check-out, only calendar for options dateRange === true
            if (datepicker.length === 0) {
              datepicker = $(this_el).find('.t-picker-only')
              // XoÃ¡ t-check-out sao khi chá»n ngÃ y
              setTimeout(function () {
                if ($('.t-datepicker-day').length !== 0 && settings.autoClose === true) {
                  $('.t-datepicker-day').remove()
                  $('.t-arrow-top').remove()
                }
              }, 10)
            }
          }

          if ($(this).parents('.t-check-out').hasClass('t-check-out') === true) {

            // if ($(this).hasClass('t-start') === true) {
            //   return;
            // }
            // ngÄƒn khÃ´ng cho click ngÃ y t-check-in khi Ä‘ang á»Ÿ t-check-out vÃ  khÃ´ng cÃ³ ngÃ y t-check-out
            // if ($(this).parents('.t-datepicker').find('.t-start').length === 0
            //   && $(this).hasClass('t-end') === true) {
            //   return;
            // }
            // selectedCO do something
            $(pr_el).trigger('selectedCO', Number(get_utc))
            // onChangeCO do something
            var setChangeDate = $(this).parents('.t-check-out').find('.t-input-check-out').val();
            if (convertDateUTC(convertFormatDf(setChangeDate)) != get_utc) {
              $(pr_el).trigger('onChangeCO', Number(get_utc))
            }
            data_utc_in = dataUTC[0];
            data_utc_out = get_utc;
            $(pr_el).trigger('afterCheckOut', [[data_utc_in, data_utc_out]])
            // XoÃ¡ t-check-out sao khi chá»n ngÃ y
            setTimeout(function () {
              if ($('.t-datepicker-day').length !== 0 && settings.autoClose === true) {
                $('.t-datepicker-day').remove()
                // $('.t-arrow-top').css({'display': 'none'})
                $('.t-arrow-top').remove()
              }
            }, 10)
          }

          // console.log(new Date(data_utc_in))
          // console.log(new Date(data_utc_out))

          dataUTC = getDateUTC(data_utc_in, data_utc_out)
          // eventClickDay do something
          $(pr_el).trigger('eventClickDay', [dataUTC])
          callEventClick(datepicker, dataUTC)
        }

        // Function khi hover vÃ o ngÃ y Ä‘áº·c biá»‡t DataEvent Holiday
        if ('ontouchstart' in window === false) {
          toDayElement[i].onmouseover = function (e) {
            // Append special day
            if ($(this).hasClass('t-special-day') === true && $(this).parents('.t-datepicker-day').length != 0) {
              $(this).parents('.t-datepicker-day').append('<p class="t-date-title">' + $(this).attr('t-date-title') + '</p>')
            }

            function checkNumNight(pr_el, pr_date_utc) {
              var el_hover = Number($(pr_el).attr('data-t-date'));
              var numDay = 0;

              if (e.target.className.indexOf('t-hover-day-content') !== -1
                || e.target.className.indexOf('t-disabled') !== -1) {
                return;
              }
              if ($(pr_el).parents('.t-check-in').hasClass('t-check-in') === true) {
                var nd = new Date(pr_date_utc[1]);
                // Off Hover show title náº¿u khÃ´ng cÃ³ set dateCheckIn or dateCheckOut
                if (el_hover === settings.startDate) {
                  if ($(pr_el).parents('.t-check-in').find('.t-end').length === 0
                    && $(pr_el).parents('.t-check-in').find('.t-start').length === 0) {
                    nd = new Date(pr_date_utc[0]);
                  }
                }

                var nd_1 = Date.UTC(nd.getFullYear(), nd.getMonth(), nd.getDate());
                var limitday = Date.UTC(nd.getFullYear(), nd.getMonth(), nd.getDate() - settings.limitDateRanges);
                // á»ž t-check-in nhá» hÆ¡n hoáº·c = 30 tÃ­nh tá»« ngÃ y t-check-out náº¿u Ä‘Ã£ cÃ³ t-check-out
                // Hover vÃ o today vÃ  end limitDateRanges
                if (el_hover <= limitday) {
                  return;
                }

                while (el_hover < nd_1) {
                  nd_1 = Date.UTC(nd.getFullYear(), nd.getMonth(), nd.getDate() - numDay);
                  var t_this = $(pr_el).parents('.t-check-in').find('[data-t-date="' + nd_1 + '"]')[0];
                  if (t_this != undefined) {
                    t_this.className = t_this.className.replace(' t-range-limit', '') + ' t-range-limit';
                  }

                  numDay++;
                  // console.log(numDay)
                  if (numDay > 1000) {
                    return;
                  }
                }
              }

              if ($(pr_el).parents('.t-check-out').hasClass('t-check-out') === true) {
                var nd = new Date(pr_date_utc[0]);
                var nd_1 = Date.UTC(nd.getFullYear(), nd.getMonth(), nd.getDate());
                var limitday = Date.UTC(nd.getFullYear(), nd.getMonth(), nd.getDate() + settings.limitDateRanges);
                if (el_hover >= limitday) {
                  return;
                }
                // á»ž t-check-out lá»›n hÆ¡n hoáº·c = 31 ngÃ y tiáº¿p theo stop
                while (el_hover != nd_1) {
                  nd_1 = Date.UTC(nd.getFullYear(), nd.getMonth(), nd.getDate() + numDay);
                  var t_this = $(pr_el).parents('.t-check-out').find('[data-t-date="' + nd_1 + '"]')[0];
                  if (t_this != undefined) {
                    t_this.className = t_this.className.replace(' t-range-limit', '') + ' t-range-limit';
                  }
                  numDay++;
                  // console.log(numDay)
                  if (numDay > 5000) {
                    return;
                  }
                }
                // console.log(numDay)
              }

              return numDay;
            }
            // Option dateRangesHover focus only date picker
            if (settings.dateRangesHover === true || settings.dateRangesHover === 'true') {
              var numDay = checkNumNight(this, dataUTC)
              // console.log(numDay)
              // options dateRangesShowTitle true|false
              if (settings.dateRangesShowTitle === true) {
                var num_full = 1;
                if (settings.showFullDateRanges === true) {
                  num_full = 0;
                  // Full day always are 2 days
                  settings.titleDateRange = settings.titleDateRanges;
                }
                if (numDay === 2) {
                  // console.log(numDay)
                  // fn Global - Hover khi á»Ÿ t-check-in vÃ  khi á»Ÿ t-check-out
                  appendSpan(this, 't-hover-day', 't-hover-day-content', ((numDay - num_full) + ' ' + settings.titleDateRange))
                } else if (numDay > 2) {
                  // fn Global - Hover khi á»Ÿ t-check-in vÃ  khi á»Ÿ t-check-out
                  appendSpan(this, 't-hover-day', 't-hover-day-content', ((numDay - num_full) + ' ' + settings.titleDateRanges))
                }
              }
            }


            this.onmouseout = function () {
              // XoÃ¡ táº¥t cáº£ cÃ¡c class t-hover-day trá»« ngÃ y toDay ra.
              if (this.getElementsByClassName('t-hover-day-content').length != 0) {
                // IE fix
                var node = this.getElementsByClassName('t-hover-day-content')[0]
                node.parentNode.removeChild(node);
                this.className = this.className.replace(' t-hover-day', '');
              }
              if (document.getElementsByClassName('t-range-limit').length != 0) {
                var a = document.getElementsByClassName('t-range-limit');
                a = [].slice.call(a)
                for (var i = 0; i < a.length; i++) {
                  a[i].className = a[i].className.replace(' t-range-limit', '');
                }
              }
              // Care conflict today vs num night
              if (this.className.indexOf('t-today') !== -1) {
                if (this.getElementsByClassName('t-hover-day-content').length != 0) {
                  // this.getElementsByClassName('t-hover-day-content')[0].removeChild();
                  // IE fix
                  var node = this.getElementsByClassName('t-hover-day-content')[0]
                  node.parentNode.removeChild(node);
                }
                appendSpan(this, 't-hover-day', 't-hover-day-content', settings.titleToday);
                this.className = this.className.replace(/\ t-hover-day/g, '') + ' t-hover-day';
              }
              // out hover hide special days
              if (fnParents(this, 't-datepicker').getElementsByClassName('t-date-title').length != 0) {
                var elem = fnParents(this, 't-datepicker').getElementsByClassName('t-date-title');
                elem = [].slice.call(elem)
                for (var i = 0; i < elem.length; i++) {
                  // elem[i].remove();
                  // IE fix
                  elem[i].parentNode.removeChild(elem[i]);
                }
              }
            }

          }
        }
      }

      // dateDisabled: ['2019-01-19', '2018-11-05', '2019-01-01',
      if (settings.dateDisabled != undefined && 'ontouchstart' in window === false) {
        var dataDis = settings.dateDisabled;
        // return;
        // Find number limit month options.numCalendar 1,2,3 ...
        for (var cl = 0; cl < settings.numCalendar; cl++) {
          var t = new Date(pr_data_utc).getMonth();
          var gMonth = t + 1 + cl;
          var gYear = new Date(pr_data_utc).getFullYear();

          if (gMonth === 13) {
            gMonth = gMonth - 12;
            gYear = gYear + 1;
          }

          for (var i = 0; i < toDayElement.length; i++) {
            // Sá»‘ ngÃ y cá»§a thÃ¡ng
            var getNum = Number(toDayElement[i].textContent)
            // Kiá»ƒm tra ngÃ y hiá»‡n táº¡i vá»›i ngÃ y disable
            if (isNaN(getNum)) {
              getNum = new Date(toDay).getDate();
            }
            // Sá»‘ ngÃ y cá»§a thÃ¡ng cáº§n so sÃ¡nh
            var getDays = Number(toDayElement[i].getAttribute('data-t-date'));
            var getMonths = new Date(getDays).getMonth() + 1;
            var key = gYear + '-' + check_num_10(gMonth) + '-' + check_num_10(getNum);
            if (dataDis.indexOf(key) !== -1 && getMonths === gMonth) {
              toDayElement[i].classList = toDayElement[i].className + ' t-disabled';
            }
          }
        }
      }
      // set DataEvent Holiday follow Days phai co setdate má»›i cháº¡y vÃ  khÃ´ng cho cháº¡y khi á»Ÿ tablet
      // window.innerWidth > 1024
      if (settings.fnDataEvent != undefined && 'ontouchstart' in window === false) {
        var data = settings.fnDataEvent;
        var mergeData = {};
        // return;
        // Find number limit month options.numCalendar 1,2,3 ...
        for (var cl = 0; cl < settings.numCalendar; cl++) {
          var t = new Date(pr_data_utc).getMonth();
          var gMonth = t + 1 + cl;
          var gYear = new Date(pr_data_utc).getFullYear();
          if (gMonth === 13) {
            gMonth = gMonth - 12;
            gYear = gYear + 1
          }
          // function mergeDataEvent use only month not year
          if (settings.mergeDataEvent === true || settings.mergeDataEvent === 'true') {
            Object.keys(settings.fnDataEvent).map(function (e) {
              var t = e.slice(e.length - 5, e.length)
              if (t.length < 6) {
                mergeData[t] = settings.fnDataEvent[e]
              }
            })
          }

          for (var i = 0; i < toDayElement.length; i++) {
            // Sá»‘ ngÃ y cá»§a thÃ¡ng
            var getNum = Number(toDayElement[i].textContent)
            // Kiá»ƒm tra ngÃ y hiá»‡n táº¡i vá»›i ngÃ y Ä‘áº·c biá»‡t Ä‘á»ƒ láº¥y ngÃ y today
            if (isNaN(getNum)) {
              getNum = new Date(toDay).getDate();
            }
            // Sá»‘ ngÃ y cá»§a thÃ¡ng cáº§n so sÃ¡nh
            var getDays = Number(toDayElement[i].getAttribute('data-t-date'));
            var getMonths = new Date(getDays).getMonth() + 1;
            var key = gYear + '-' + check_num_10(gMonth) + '-' + check_num_10(getNum);
            if (settings.mergeDataEvent === true || settings.mergeDataEvent === 'true') {
              key = check_num_10(gMonth) + '-' + check_num_10(getNum);
              data = mergeData;
            }
            if (data[key] != undefined && getMonths === gMonth) {
              var cln = toDayElement[i].className;
              // cln = cln.replace('t-disabled', '');
              toDayElement[i].className = toDayElement[i].className.replace(' t-special-day', '') + ' t-special-day';
              // console.log(new Date(getDays).getMonth() + 1)
              // console.log(getNum)
              toDayElement[i].setAttribute('t-date-title', check_num_10(getNum) + ' ' + settings.titleMonths[new Date(getDays).getMonth()] + ' - ' + data[key])
            }
          }
        }
      }
    }

    function clickEvent(pr_el, pr_data_utc) {
      // console.log(pr_el)
      // console.log(pr_data_utc)
      // console.log(new Date(pr_data_utc[0]) , new Date(pr_data_utc[1]))
      // console.log(pr_el)
      // console.log(this_el)
      var tArrow = pr_el.find('.t-arrow');
      // var df_toDay = new Date(toDay);
      // console.log(settings.startDate)
      var df_toDay = new Date(settings.startDate);               // náº¿u = null thÃ¬ láº¥y toDay lÃ m chuáº©ntuds_change
      var end_Date = new Date(convertFormatDf(settings.endDate)) // náº¿u = null thÃ¬ láº¥y setStart lÃ m chuáº©n
      var limitPrevMonth = Date.UTC(df_toDay.getFullYear(), df_toDay.getMonth() - settings.limitPrevMonth);
      var limitNextMonth = Date.UTC(end_Date.getFullYear(), end_Date.getMonth()) || Date.UTC(df_toDay.getFullYear(), df_toDay.getMonth() + numCalendar + settings.limitNextMonth);

      var newDate = new Date(pr_data_utc)
      var y = newDate.getFullYear();
      var m = newDate.getMonth();
      var d = newDate.getDate();

      if (tArrow.length != 0) {
        // XoÃ¡ cÃ¡c icons arrow trá»« 2 cÃ¡i Ä‘áº§u vÃ  cuá»‘i
        for (var i = 1; i < tArrow.length - 1; i++) {
          tArrow[i].innerHTML = '';
          tArrow[i].className = tArrow[i].className.replace(' t-disabled', '') + ' t-disabled';
        }
        tArrow[0].onclick = function (e) {
          e.stopPropagation()
          if (Date.UTC(y, m) > limitPrevMonth) {
            m = m - 1;
            // Nháº­n vÃ o Elements [dates], date_utc = [1,2]
            setDaysInMonth(pr_el, Date.UTC(y, m))
          }
        }
        // Next Calendar
        tArrow[tArrow.length - 1].onclick = function (e) {
          e.stopPropagation()
          if (Date.UTC(y, m + numCalendar) < limitNextMonth) {
            m = m + 1;
            // Nháº­n vÃ o Elements [dates], date_utc = [1,2]
            setDaysInMonth(pr_el, Date.UTC(y, m))
          }
        }
      }

      var Arrow_2 = pr_el.find('.t-arrow');
      // disable button Arrow when t-check-in limit month
      if (Date.UTC(y, m + numCalendar) != limitNextMonth && Date.UTC(y, m) === limitPrevMonth) {
        Arrow_2[Arrow_2.length - 1].className = 't-arrow t-next'
        Arrow_2[0].className = 't-arrow t-prev t-disabled'
      } else {
        Arrow_2[0].className = 't-arrow t-prev'
      }


      if (Date.UTC(y, m + numCalendar) === limitNextMonth
        || new Date(Date.UTC(y, m + numCalendar)).getMonth() === new Date(dataUTC[0]).getMonth() + 1) {
        Arrow_2[Arrow_2.length - 1].className = 't-arrow t-next t-disabled'
      }
      if (Date.UTC(y, m + numCalendar) < limitNextMonth) {
        // console.log('c')
        Arrow_2[Arrow_2.length - 1].className = 't-arrow t-next'
      }

      // return Date.UTC(df_toDay.getFullYear(), df_toDay.getMonth() + numCalendar + settings.limitNextMonth, df_toDay.getDate());
      return Date.UTC(df_toDay.getFullYear(), df_toDay.getMonth() + numCalendar + settings.limitNextMonth, df_toDay.getDate());
    }
    // newDataUTC = getDateUTC(options.dateCheckIn, 1522454400000);
    // Function show || Hide calendar [Date]
    function getTableCalendar(pr_el, pr_date_utc) {
      // console.log(pr_el)
      if ($(pr_el).find('.t-datepicker-day').length !== 0) {
        $('.t-datepicker-day').remove();
        $('.t-arrow-top').css({ 'display': 'none' })
        // Options autoClose
        $('html').removeClass('t-datepicker-open')
      } else {
        if ($(pr_el).parents('.t-datepicker').hasClass('t-datepicker').length !== 0) {
          $('.t-datepicker-day').remove();
          $('.t-arrow-top').css({ 'display': 'none' })
        }
        if (settings.iconArrowTop === true) {
          var this_el_arrow = $(pr_el).parents('.t-datepicker');
          if (this_el_arrow.find('.t-arrow-top').length === 0) {
            this_el_arrow.append('<span class="t-arrow-top"></span>')
          }
          var CI_CO_width = $(pr_el).position().left + $(pr_el).outerWidth() / 2
          var leftArrTop = this_el_arrow.find('.t-arrow-top').outerWidth() / 2

          if (this_el_arrow.find('.t-arrow-top').css('display') === 'block') {
            this_el_arrow.find('.t-arrow-top').css({
              'left': CI_CO_width - leftArrTop + 'px'
            })
          }
          this_el_arrow.find('.t-arrow-top').css({ 'display': 'block' })
          this_el_arrow.find('.t-arrow-top').animate({
            'left': CI_CO_width - leftArrTop + 'px'
          }, settings.durationArrowTop)
        }
        $(pr_el).find('.t-dates').parent().append('<div class="t-datepicker-day' + checkNumCalendar + '">' + convertArrayToString(dataTheme) + '</div>')
        // ThÃªm calendar vÃ o t-check-in hoáº·c t-check-out
        setDaysInMonth($(pr_el).find('.t-dates').parent(), pr_date_utc)

        // Options autoClose
        $('html').addClass('t-datepicker-open')
      }
    }

    var pr_callback = '';
    // var dataUTC = getDateUTC(options.dateCheckIn, options.dateCheckOut);
    function callEventClick(pr_callback, pr_date_utc) {
      this_el.find('.t-dates, .t-input').on('click', function (e) {
        // trigger CO or CI
        if ($(e.target).parents('.t-check-in').hasClass('t-check-in') === true) {
          $(e.target).trigger('clickDateCI', [pr_date_utc]);
        }
        if ($(e.target).parents('.t-check-out').hasClass('t-check-out') === true) {
          // console.log(pr_date_utc)
          $(e.target).trigger('clickDateCO', [pr_date_utc]);
        }
        // trigger lÃ m gÃ¬ trÆ°á»›c khi show calendar
        if ($('.t-datepicker-day').length === 0) {
          $(this).trigger('beforeShowDay');
        }
        // Kiá»ƒm tra giÃ¡ trá»‹ cá»§a CI === 'null' thÃ¬ luÃ´n show calendar á»Ÿ CI
        var click = $(this).parent(); // -> .class t-check-in or .t-check-out
        if ($(this).parents('.t-datepicker').find('.t-input-check-in').val() === 'null'
          && $(this).parents('.t-check-out').find('.t-input-check-out').val() === 'null') {
          click = $(e.target).parents('.t-datepicker').find('.t-check-in');
          $(e.target).trigger('clickDateCI', [pr_date_utc]);
        }
        // Click remove all theme calendar
        getTableCalendar(click, pr_date_utc[0])
        setTimeout(function () {
          if ($('.t-datepicker-day').length !== 0) {
            $(e.target).trigger('afterShowDay');
          } else {
            $(e.target).trigger('toggleAfterHideDay');
          }
        }, 1)
      })
      if (pr_callback != '') {
        getTableCalendar(pr_callback, pr_date_utc[0]);
      }
    }
    callEventClick(pr_callback, dataUTC)

    // Method show calendar
    // Call only
    setTimeout(function () {
      if (typeof (pr_el) === 'string' && pr_el === 'show') {
        if (this_el.find('.t-datepicker-day').length === 0) {
          this_el.each(function (e) {
            if (settings.iconArrowTop === true) {
              if ($(this).find('.t-arrow-top').length === 0) {
                $(this).append('<span class="t-arrow-top"></span>')
              }
              var CI_width = $(this).find('.t-check-in').outerWidth()
              $(this).find('.t-arrow-top').css({
                'left': CI_width / 2 - 10 + 'px',
                'display': 'block'
              })
            }
            // ThÃªm theme vÃ o Ä‘Ãºng calendar cáº§n
            $(this).find('.t-check-in').append('<div class="t-datepicker-day' + checkNumCalendar + '">' + convertArrayToString(dataTheme) + '</div>')
            // ThÃªm calendar vÃ o t-check-in hoáº·c t-check-out
            setDaysInMonth($(this).find('.t-check-in'), dataUTC[0])
            // Options autoClose
            $('html').addClass('t-datepicker-open')
          })
        }
      }
    }, 5)

    // Call hiden calendar table theme
    if (typeof (pr_el) === 'string' && pr_el === 'hide') {
      $('html').removeClass('t-datepicker-open')
      setTimeout(function () {
        $('html').addClass('t-datepicker-open')
      }, 5)
    }

    return this;
  }

  $('html').on('click', function (e) {
    // console.log('html')
    if ($(this).hasClass('t-datepicker-open') === true) {
      // console.log('html')
      setTimeout(function () {
        // Chá» class t-datepicker-open Ä‘Æ°á»£c khá»Ÿi táº¡o á»Ÿ method 'show'
        if ($(e.target).parents('.t-datepicker').hasClass('t-datepicker') === false
          && $('.t-datepicker-day').length > 0) {
          $('.t-datepicker-open').removeClass('t-datepicker-open')
          $('.t-datepicker-day').remove()
          // $('.t-arrow-top').css({'display': 'none'})
          $('.t-arrow-top').remove()
          // console.log('remove')
        }
      }, 1)
    }
  });


}(jQuery));