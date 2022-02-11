import { TSettings } from './types';
import StorageManager from './storageManager';

class DateManager {
    // userSettings:TSettings
    arrayDates: Array<string>;

    // duration:number
    // startDate:string
    constructor() {
        // this.userSettings=userSettings
        // this.duration=this.userSettings.duration
        // this.startDate=this.userSettings.startDate
        this.arrayDates = [];
    }

    getArrayDate(userSettings: TSettings) {
        const allDaysWeek = 7;
        const allDaysProgramme = userSettings.duration * allDaysWeek;
        const startDate = new Date(Number(userSettings.startDate));
        const lastDay = this.getLastDay(startDate, allDaysProgramme);
        // let today =new Date()
        //    console.log("today", today.getDay(),startDate.getDay())
        //   ?new Date(startDate.getTime())+'startDate':new Date(today.getTime())+'today'

        //  let userDate=today.getDay()===startDate.getDay()? startDate.getTime():today.getTime()
        //  console.log('userDate', today.getDay()===startDate.getDay())

        while (startDate.getTime() < lastDay.getTime()) {
            this.arrayDates.push(
                '' +
                    this.padStart(startDate.getMonth() + 1) +
                    '-' +
                    this.padStart(startDate.getDate()) +
                    '-' +
                    startDate.getFullYear()
            );
            startDate.setDate(startDate.getDate() + 1);
        }

        return this.arrayDates;
    }

    dateToday() {
        const day = new Date();
        const dd = String(day.getDate()).padStart(2, '0');
        const mm = String(day.getMonth() + 1).padStart(2, '0');
        const yyyy = day.getFullYear();
        const today = mm + '-' + dd + '-' + yyyy;
        return today;
    }

    getLastDay(date: Date, days: number) {
        const dateCopy = new Date(date);
        dateCopy.setDate(date.getDate() + days);
        return dateCopy;
    }

    padStart(s: number) {
        return ('00' + s).slice(-2);
    }

    getNumWeek(userSettings: TSettings) {
        let numWeek = 0;
        const arrayDate = this.getArrayDate(userSettings);
        const dayToday = this.dateToday();
        const numDay = arrayDate.indexOf(dayToday);
        console.log('num', numDay);
        if (numDay <= 7) {
            numWeek = 0;
        } else if (numDay <= 14) {
            numWeek = 1;
        } else if (numDay < 21) {
            numWeek = 2;
        } else if (numDay < 28) {
            numWeek = 3;
        } else if (numDay <= 35) {
            numWeek = 4;
        } else if (numDay <= 42) {
            numWeek = 5;
        } else if (numDay < 49) {
            numWeek = 6;
        } else if (numDay < 56) {
            numWeek = 7;
        } else if (numDay <= 63) {
            numWeek = 8;
        } else if (numDay < 70) {
            numWeek = 9;
        }
        StorageManager.addItem('numWeek', numWeek, 'local');
        return numWeek;
    }
}
export default DateManager;
