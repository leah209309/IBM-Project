import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IBMService } from 'src/app/Services/IBM.service';

@Component({
  selector: 'app-ibm',
  templateUrl: './ibm.component.html',
  styleUrls: ['./ibm.component.css']
})
export class IBMComponent implements OnInit {

  constructor(private ibmService:IBMService) { }
  timeSeries:[{}]
  datesKeysArray:Array<string>; 
  pagesNumber=[]
  currentPage=1;
  pageRecords:Array<string>;
  searchDate:string;
 sortedListWorthBuingDay;
 sortedListWorthSellingDay;
 sortedListProfit=0;
 worthBuingDay;
 worthSellingDay;
 profit=0;
  ngOnInit() {
    //שליפת המדדים ועדכון הרשימה לתצוגה
    this.ibmService.getTimeSeries().subscribe(data=>{
      let time_series='Time Series (Daily)';
      this.timeSeries=data[time_series];
      this.datesKeysArray=Object.keys(data[time_series]);
      this.pagesNumber=new Array(this.datesKeysArray.length/20);
      this.getPageRecords();
      this.getProfitsbySortedList();
      this.getProfitsbyNotSortedList();
    });
  }
  //שליפת הרשומות לעמוד המתאים
  //(במידה וישנה אפשרות שליפת רשומות בודדות מהאתר ישנה עדיפות לעשות את זה ע"מ לקצר את זמן השליפה)
  getPageRecords(page=1)
  {
    if(page>=1&&page<=this.pagesNumber.length)
    {
    this.currentPage=page;
    let startIndex=(this.currentPage-1)*20;
    //הרשומות לתצוגה ב UI
    this.pageRecords=this.datesKeysArray.slice(startIndex,startIndex+20);
    }
  }
  //מיון עפ"י מחירים
  sort(colName='1. open') {
    this.datesKeysArray.sort((a, b) =>this.timeSeries[a][colName] > this.timeSeries[b][colName] ? 1 : this.timeSeries[a][colName] < this.timeSeries[b][colName] ? -1 : 0)
    //חזרה לעמוד הראשון
    this.getPageRecords();
  }
  //מיון עפ"י הפרש מחיר פתיחה וסגירה
sortDifferences() {
  this.datesKeysArray.sort((a, b) =>
    ((this.timeSeries[a]['1. open']-this.timeSeries[a]['4. close']) >(this.timeSeries[b]['1. open']-this.timeSeries[b]['4. close'])) ? 1 :
  ((this.timeSeries[a]['1. open']-this.timeSeries[a]['4. close']) < (this.timeSeries[b]['1. open']-this.timeSeries[b]['4. close'])) ? -1 : 0
   );
   //חזרה לעמוד הראשון
   this.getPageRecords();
}
//חיפוש רשומה עפ"י תאריך
searchtimeSeriesbyDate()
{
  this.pageRecords=this.datesKeysArray.filter(d=>d==this.searchDate);
}
//פונקציות לחישוב רווח מקסימלי. כלומר: מציאת ההפרש  הגדול ביותר בין מחיר גבוה ונמוך של שתי תאריכים מתאימים
//כלומר: התאריך של המחיר הגבוה צריך להיות גדול או זהה לתאריך של המחיר הנמוך ע"מ שיוכלו לקנות ולמכור

//חישוב רווח מקסימלי לרשימה ממויינת לפי תאריך מהגבוה לנמוך
getProfitsbySortedList()
{
  let lowPrice;
  let highPrice;
  // מעבר על כל אחת מהרשומות
  for(let i=0;i<this.datesKeysArray.length;i++)
  {
    let x=this.datesKeysArray[i];
    highPrice=this.timeSeries[x]['2. high'];
    let subArray=this.datesKeysArray.slice(i);
    //מעבר על כל אחד מהרשומות מרשומה זו והלאה ושליפת המחיר הנמוך ביותר 
    let y=subArray.reduce((prev, current) => (+this.timeSeries[prev]['3. low'] < +this.timeSeries[current]['3. low']) ? prev : current)
    lowPrice=this.timeSeries[y]['3. low'];
    // בדיקה האם הרווח גדול מהרווח המקסימלי עד כה
    if(this.sortedListProfit< highPrice-lowPrice)
    {
      this.sortedListWorthBuingDay=y;
      this.sortedListWorthSellingDay=x;
      this.sortedListProfit =highPrice-lowPrice;        
    }
  }
}
//חישוב רווח מקסימלי לרשימה לא ממויינת באמצעות תאריך
getProfitsbyNotSortedList()
{
  let lowPrice;
  let highPrice;
  //מעבר על כל אחת מהרשומות
  this.datesKeysArray.forEach(x => {
    //עבור כל רשומה - מעבר נוסף על כל אחת מהרשומות ע"מ למצוא את המחיר המינימלי המתאים לתאריך זה  
   let y=this.datesKeysArray.reduce((prev, current) => (+this.timeSeries[prev]['3. low'] < +this.timeSeries[current]['3. low']&&prev<=x) ? prev : current)
   highPrice=this.timeSeries[x]['2. high'];
   lowPrice=this.timeSeries[y]['3. low'];
   // בדיקה האם הרווח גדול מהרווח המקסימלי עד כה 
   if(this.profit< highPrice-lowPrice)
   {
     this.worthBuingDay=y;
     this.worthSellingDay=x;
     this.profit =highPrice-lowPrice;        
   }
  });
}
}
