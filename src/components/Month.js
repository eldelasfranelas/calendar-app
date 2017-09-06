/**
 * Created by eldelasfranelas on 06/09/2017.
 */

import React, {Component} from 'react';
import './css/Calendar.css'
import moment from 'moment'

const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


class Month extends Component {
    constructor(props) {
        super(props)
        this.state = {
            months: [],
            monthNumber: [],
            holidays: []

        }
        this.setMonths = this.setMonths.bind(this)
        this.getMonthName = this.getMonthName.bind(this)
    }

    setMonths(months, monthNumber, holidays) {
        this.setState({months: months, monthNumber: monthNumber, holidays: holidays})
    }

    getMonthName(monthN) {
        return mL[monthN - 1]
    }

    getHoliday(obj) {
        let {day, month} = obj
        this.state.holidays.find((item) => {
            console.log(((moment(item.date).format("DD") === day) && moment(item.date).format("MM") === month) ? "Equals" : "Not")
            return (moment(item.date).format("DD") === day && moment(item.date).format("MM") === month)
        })
    }

    componentWillReceiveProps(props) {
        this.setMonths(props.months, props.monthNumber, props.holidays)
        console.log("props", props)
    }

    componentWillMount() {
        this.setMonths(this.props.months, this.props.monthNumber, this.props.holidays)
        console.log("this.props", this.props)
    }

    render() {
        return (
            <div className="container">


                {this.state.months.map((item, index) => {
                    return <div key={index}>
                        <div className="month">
                            <ul>
                                <li>
                                    {this.getMonthName(index)}
                                    <br/>
                                    <span style={{fontSize: 14}}>XXXX !Missing year!</span>
                                </li>
                            </ul>
                        </div>

                        <ul className="weekdays">
                            <li>Su</li>
                            <li>Mo</li>
                            <li>Tu</li>
                            <li>We</li>
                            <li>Th</li>
                            <li>Fr</li>
                            <li>Sa</li>
                        </ul>
                        <ul className="days">
                            {item.days.map((item, index) => {
                                return <li key={index}
                                           style={ this.getHoliday(item) ?
                                               {backgroundColor: 'orange'} :
                                               {backgroundColor: 'red'}}>{item.day}</li>
                            })}
                        </ul>
                    </div>
                })}
            </div>
        );
    }
}

export default Month;