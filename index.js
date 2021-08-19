const moment = require('moment'); // require
const format = (data) => data.format('YYYY-MM-DD hh:mm A')

function isLeapYear(year){
     return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
function days_of_a_year(year){   
  return isLeapYear(year) ? 366 : 365;
}

// type can be week, month, year
const timeRange = (type) => {
  if (type == 'day') {
    let start = format(moment().startOf('day'));
    let end = format(moment().endOf('day'));
    return { start, end }
  } else if (type === 'week') {
    let weekrange=[]
    let weekStart = format(moment().startOf('week'))
    let weekEnd = format(moment().endOf('week'))
    const daysOfTheWeek = ["sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]
    let j = 0;
    for (let i = 0; i <= 6; i++) {
      let timerange = {
        [daysOfTheWeek[j++]]: {
          start: format(moment().startOf('week').add(i, 'days')),
          end: format(moment().endOf('week').subtract(6 - i, 'days'))
        }
      } 
      weekrange.push(timerange)
    }
    return weekrange
  } else if (type === 'month') {
        let monthrange=[]
    let monthStart = format(moment().startOf('month'))
    let monthEnd = format(moment().endOf('month'))
    let enddate = monthEnd.split(" ")[0].split("-")
    enddate = parseInt(enddate[enddate.length - 1])
    for (let i = 1; i <= enddate; i++) {
      let timerange={
        [i]: {
          start: format(moment().date(i).hours(0).minutes(0).seconds(0).milliseconds(0)),
          end: format(moment().endOf('month').subtract(enddate - i, 'days'))
        }
      }
      monthrange.push(timerange)
    }
    return monthrange
  } else if (type == "year") {
    const result = {}
    let noOfDays= days_of_a_year(new Date().getFullYear())
    let yearrange=[]
    let yearStart = format(moment().startOf('year'));
    let yearEnd = format(moment().endOf('year'));
    let monthsInAYear=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let j=0
    for (let i = 0; i <noOfDays; i++) {
      j++
      let timerange = {
          start: format(moment().startOf('year').add(i, 'days')),
          end: format(moment().endOf('year').subtract(noOfDays-j, 'days'))
        } 
      yearrange.push(timerange)
    }
    monthsInAYear.forEach((month, monthIndex) => {
      const monthData= yearrange.filter(item => {
       return item.start.split('-')[1] == monthIndex + 1
      })
      result[month] = monthData
      result[month] = monthData.reduce((acc,val,index)=>{
        if(index===0){
          return {start:val.start}
        }
        if(index===monthData.length-1){
          return {
            ...acc,
            end:val.end
          }
        }
        return acc
      },{})

    })
    return result
  }
}
console.log(timeRange("week"))
