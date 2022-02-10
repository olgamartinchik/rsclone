import { TSettings } from "./types"

class DateManager{
    userSettings:TSettings
    arrayDates:Array<string>
    duration:number
    startDate:string
constructor(userSettings:TSettings){
    this.userSettings=userSettings
    this.duration=this.userSettings.duration
    this.startDate=this.userSettings.startDate
    this.arrayDates=[]
}
getArrayDate(){
    const allDaysWeek=7
    const allDaysProgramme=this.duration*allDaysWeek
    const startDate=new Date(Number(this.startDate))
    const lastDay= this.getLastDay (startDate, allDaysProgramme)
    // let today =new Date()
//    console.log("today", today.getDay(),startDate.getDay())
 //   ?new Date(startDate.getTime())+'startDate':new Date(today.getTime())+'today' 

//  let userDate=today.getDay()===startDate.getDay()? startDate.getTime():today.getTime()
//  console.log('userDate', today.getDay()===startDate.getDay())

   while( startDate.getTime()< lastDay.getTime()) {
       this.arrayDates.push(''+ this.padStart(startDate.getMonth()+1) +'-'+ this.padStart(startDate.getDate())+ '-' + startDate.getFullYear());
       startDate.setDate( startDate.getDate()+1);
     }
//    console.log('date',allDaysProgramme,this.arrayDates,lastDay)
//    console.log('todayDate', this.rememberDateToday())
   return this.arrayDates
}
dateToday() {
    const day = new Date();
    const dd = String(day.getDate()).padStart(2, '0');
    const mm = String(day.getMonth() + 1).padStart(2, '0');
    const yyyy = day.getFullYear();
    let today = mm + '-' + dd + '-' + yyyy;
    return today;
}
getLastDay (date:Date, days:number) {
    let dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + days);
    return dateCopy;
}
padStart(s:number){
     return ('00' + s).slice(-2)
  }
  getNumWeek(){
      let week=0
      let arrayDate=this.getArrayDate()
      let dayToday=this.dateToday()
      let num=arrayDate.indexOf(dayToday)
      console.log('num', num)
      if(num<=7){
         week=0
      }else if(num<=14){
        week= 1
      }else if(num<21){
        week= 2
      }else if(num <28){
        week=3
      }else if(num<=35){
        week= 4
      }else if(num<=42){
        week= 5
    }else if(num<49){
        week= 6
    }else if(num <56){
        week= 7
    }else if(num<=63){
        week= 8
    }else if(num <70){
        week= 9
    }

    return week
  }

}
export default DateManager
