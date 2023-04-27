import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DatePicker from 'antd/lib/date-picker';
import styles from './styles.scss';

import moment from 'moment';
import { reserveDateMask } from 'utils/mask';

let FORMAT_DEFAULT = "DD/MM/YYYY";
let SHOW_TODAY_DEFAULT = false;
let ALLOW_CLEAR_DEFAULT = false;

class PeriodUnit {
    constructor(props) {
        this.value = props;
    }
}

export const PERIOD_UNIT_YEAR = new PeriodUnit('year');
export const PERIOD_UNIT_MONTH = new PeriodUnit('month');
export const PERIOD_UNIT_WEEK = new PeriodUnit('week');
export const PERIOD_UNIT_DAY = new PeriodUnit('day');

class RangePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periodValue: null,
            periodUnit: null,
            startDate: null,
            finalDate: null
        }
    }

    setAllPeriodState = (periodValue, periodUnit) => {
        this.setState({ periodValue, periodUnit });
    }

    setAllDateState = (startDate, finalDate) => {
        this.setState({ startDate, finalDate });
        this.props.onChange(reserveDateMask(startDate), reserveDateMask(finalDate));
    }

    definePeriodValue = periodValue => {
        if (!periodValue) {
            periodValue = 1;
        }
        return periodValue;
    };

    definePeriodUnit = periodUnit => {
        if (!periodUnit) {
            periodUnit = PERIOD_UNIT_MONTH;
        }
        return periodUnit.value;
    };

    getCalendarDateAsMoment() {
        return moment(this.props.configuracao.dataCalendario);
    }

    definePerPeriod = (periodValue, periodUnit) => {
        if (periodValue != this.state.periodValue || periodUnit != this.state.periodUnit) {
            this.setAllPeriodState(periodValue, periodUnit);
            let finalDate = this.getCalendarDateAsMoment();
            let startDate = this.getCalendarDateAsMoment().subtract(this.definePeriodValue(periodValue), this.definePeriodUnit(periodUnit));
            this.definePerDates(startDate, finalDate, false, periodValue, periodUnit);
        }
    }

    definePerDates = (startDate, finalDate, disabledCalendarDate, periodValue, periodUnit) => {
        const conditionByString = startDate != reserveDateMask(this.state.startDate) || finalDate != reserveDateMask(this.state.finalDate);
        const condigitonByMoment = (startDate instanceof moment && startDate != this.state.startDate) || (finalDate instanceof moment && finalDate != this.state.finalDate);
        if (conditionByString || condigitonByMoment) {
            if (startDate && finalDate) {
                let startDateAsMoment = moment(startDate);
                let finalDateAsMoment = moment(finalDate);
                this.setAllDateState(startDateAsMoment, finalDateAsMoment);
            } else if (!startDate) {
                let startDateAsMoment = moment(startDate);
                let finalDateAsMoment = startDateAsMoment.add(this.definePeriodValue(periodValue), this.definePeriodUnit(periodUnit));
                if (disabledCalendarDate) {
                    if (this.getCalendarDateAsMoment().isBefore(finalDateAsMoment)) {
                        finalDateAsMoment = this.getCalendarDateAsMoment();
                    }
                }
                this.setAllDateState(startDateAsMoment, finalDateAsMoment);
            } else if (!finalDate) {
                let finalDateAsMoment = moment(finalDate);
                let startDateAsMoment = finalDateAsMoment.subtract(this.definePeriodValue(periodValue), this.definePeriodUnit(periodUnit));
                this.setAllDateState(startDateAsMoment, finalDateAsMoment);
            }
        }
    }

    componentWillReceiveProps = (props) => {
        let {
            disabledCalendarDate,
            periodValue,
            periodUnit,
            startDate,
            finalDate
        } = props;

        if (!startDate && !finalDate) {
            this.definePerPeriod(periodValue, periodUnit);
        } else {
            this.definePerDates(startDate, finalDate, disabledCalendarDate, periodValue, periodUnit);
        }
    }

    disabledCalendarDateFunction = current => (current && current > this.getCalendarDateAsMoment().startOf('day'));

    render() {
        let {
            allowEditDate,
            disabledCalendarDate,
            startDescription,
            finalDescription
        } = this.props;

        let {
            startDate,
            finalDate,
        } = this.state;

        // inicializa as variaveis
        if (!startDescription) {
            startDescription = (<label className={styles.dateLabel}>De</label>);
        }

        if (!finalDescription) {
            finalDescription = (<label className={styles.dateLabel}>até</label>);
        }

        const onChangeStartDate = date => {
            if (finalDate.isBefore(date)) {
                finalDate = date;
            }
            this.definePerDates(date, finalDate);
        }

        const onChangeFinalDate = date => {
            if (startDate.isAfter(date)) {
                startDate = date;
            }
            this.definePerDates(startDate, date);
        }

        return (<div className={styles.container}>
            {startDescription}
            <DatePicker
                value={startDate}
                format={FORMAT_DEFAULT}
                onChange={onChangeStartDate}
                disabled={!allowEditDate}
                disabledDate={disabledCalendarDate ? this.disabledCalendarDateFunction : null}
                showToday={SHOW_TODAY_DEFAULT}
                allowClear={ALLOW_CLEAR_DEFAULT}
            />
            {finalDescription}
            <DatePicker
                value={finalDate}
                format={FORMAT_DEFAULT}
                onChange={onChangeFinalDate}
                disabled={!allowEditDate}
                disabledDate={disabledCalendarDate ? this.disabledCalendarDateFunction : null}
                showToday={SHOW_TODAY_DEFAULT}
                allowClear={ALLOW_CLEAR_DEFAULT}
            />
        </div>);
    }
}


const mapStateToProps = state => {
    return {
        configuracao: state.dataServices.configuracao.configuracao
    };
};

const mapDispatchToProps = {

};

RangePicker.propTypes = {
    allowEditDate: PropTypes.bool,
    disabledCalendarDate: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    startDescription: PropTypes.any,
    finalDescription: PropTypes.any,
    periodValue: PropTypes.number,
    periodUnit: PropTypes.instanceOf(PeriodUnit),
    startDate: PropTypes.string,
    finalDate: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(RangePicker);
