import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
const { datesGenerator } = require('dates-generator');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Container = styled.div`
  width: 300px;
  border: 3px solid black;
  margin: 0 auto;
  box-shadow: 0px 0px 0px black;
`

const MonthContainer = styled.div`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
`

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [calendar, setCalendar] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });


  useEffect(() => {
    const body = {
      month: calendar.month,
      year: calendar.year
    };
    const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);

    setDates([ ...dates ]);
    setCalendar({
      ...calendar,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear
    });
  }, [])

  const onClickNext = () => {
    const body = { month: calendar.nextMonth, year: calendar.nextYear };
    const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);

    setDates([ ...dates ]);
    setCalendar({
      ...calendar,
      month: calendar.nextMonth,
      year: calendar.nextYear,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear
    });
  }

  const onClickPrevious = () => {
    const body = { month: calendar.previousMonth, year: calendar.previousYear };
    const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);

    setDates([ ...dates ]);
    setCalendar({
      ...calendar,
      month: calendar.previousMonth,
      year: calendar.previousYear,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear
    });
  }

  const onSelectDate = (date) => {
    setSelectedDate(new Date(date.year, date.month, date.date))
  }

  return (
    <div style={{ width: '100%', paddingTop: 50 }}>
      <Container>
        <div style={{ padding: 10 }}>
          <div onClick={onClickPrevious} style={{ float: 'left', width: '50%', cursor:'pointer' }}>
            Previous
          </div>
          <div onClick={onClickNext} style={{ float: 'left', width: '50%', textAlign: 'right', cursor:'pointer' }}>
            Next
          </div>
        </div>
        <MonthContainer>
          {months[calendar.month]}
        </MonthContainer>
        <div>
          
            <div>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    {days.map((day) => (
                      <td key={day} style={{ padding: '5px 0' }}>
                        <div style={{ textAlign: 'center', padding: '5px 0' }}>
                          {day}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {dates.length > 0 && dates.map((week) => (
                    <tr key={JSON.stringify(week[0])}>
                      {week.map((each) => (
                        <td key={JSON.stringify(each)} style={{ padding: '5px 0' }}>
                          <div onClick={() => onSelectDate(each)} style={{ textAlign: 'center', padding: '5px 0' }}>
							<button style = {{backgroundColor: (selectedDate.getDate() === each.date  && selectedDate.getMonth() === each.month ? "green" : "white")}}>
								{each.date}
							</button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         <div>
			<h2 style={{textAlign:"center"}}>{calendar.year}</h2>
		 </div>
        </div>
      </Container>
    </div>
  );
}

export default App;