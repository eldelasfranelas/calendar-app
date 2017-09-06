/**
 * Created by eldelasfranelas on 06/09/2017.
 */
import React, {Component} from 'react';
import moment from 'moment'
import Month from './Month'

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: '',
            day: '',
            code: '',
            months: []
        };

        this.calcDays = this.calcDays.bind(this)
        this.onChangeInput = this.onChangeInput.bind(this)
    }

    /**
     *
     * @param startDate
     * @param endDate
     * @returns {{dates: Array, months: Array}}
     */

    enumerateDaysBetweenDates(startDate, endDate) {
        let now = startDate, dates = [], months = [];

        while (now.isBefore(endDate) || now.isSame(endDate)) {

            if (now.format('MM') === moment(endDate).format("MM")) {
                dates.push({day: now.format('DD'), month: now.format("MM")})
                console.log("index of", months.indexOf(now.format('MM')))

                if (months.indexOf(now.format('MM')) === -1) {
                    months.push(now.format('MM'))
                }

            } else {
                dates.push({day: now.format('DD'), month: now.format("MM")})
                console.log("index of2", months.indexOf(now.format('MM')))

                if (months.indexOf(now.format('MM')) === -1) {
                    months.push(now.format('MM'))
                }
            }

            now.add('days', 1);
        }
        console.log(dates)
        console.log(months)
        return {dates, months}
    };


    /**
     * @function calcDays - agroup the days with his month each one on a individual array
     */
    calcDays() {

        let startDay = moment(this.state.date)
        let endDay = moment(moment(this.state.date).add(parseInt(this.state.day), 'd'))
        console.log(endDay)

        let results = this.enumerateDaysBetweenDates(startDay, endDay);
        let montArr = []
        results.months.forEach((item, index) => {
            montArr.push(results.dates.filter((obj, index) => {
                return obj.month == item
            }))
        })

        // console.log(monthly)

        console.log(montArr);
        console.log(results);
    }

    onChangeInput(event) {
        // console.log("event", event.target.name)
        this.setState({[event.target.name]: event.target.value}, () => {
            console.log(this.state)
        })

    }


    _renderMonthComponent() {
        if (this.state.months.length === 0) {
            return <div>
                <h1> Please, complete the info and then press "Get dates" :)</h1>
            </div>
        }

        return <Month/>
    }

    render() {
        return (
            <div>
                <h1>Calendar App</h1>
                <input type="text" placeholder="Start date" value={this.state.date}
                       name="date"
                       onChange={this.onChangeInput}/>
                <br/>
                <input type="text" placeholder="Number of days" value={this.state.day}
                       name="day"
                       onChange={this.onChangeInput}
                />
                <br/>
                <input type="text" placeholder="Country code" value={this.state.code}
                       name="code"
                       onChange={this.onChangeInput}
                />
                <br/>
                <button type="button" onClick={this.calcDays}>Get dates</button>


                <br/>
                <br/>
                <br/>

                {this._renderMonthComponent()}
            </div>
        );
    }
}

export default Calendar;