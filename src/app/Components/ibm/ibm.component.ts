import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IBMService } from 'src/app/Services/IBM.service';

@Component({
  selector: 'app-ibm',
  templateUrl: './ibm.component.html',
  styleUrls: ['./ibm.component.css']
})
export class IBMComponent implements OnInit {

  constructor(private ibmService:IBMService) { }
  timeSeries
  timeSeriesKeys
  currentPage=1;
  pagesNumber=[1]
 keysArray; 
 searchDate;
 worthBuingDayD;
 worthSellingDayD;
 profitD=0;
 worthBuingDay;
 worthSellingDay;
 profit=0;
  ngOnInit() {
    this.ibmService.getTimeSeries().subscribe(data=>{
      let time_series='Time Series (Daily)'
      this.timeSeries=data[time_series];
      this.keysArray=Object.keys(data[time_series]);
      this.getPageRecords();
      this.pagesNumber=new Array(this.keysArray.length/20);
      this.profitsofSortedbyDateList();
      this.profitsofNotSortedList();
    });
  }
  getPageRecords(page=1)
  {
    if(page>=1&&page<=this.pagesNumber.length)
    {
    this.currentPage=page;
    let start=(this.currentPage-1)*20;
     this.timeSeriesKeys=this.keysArray.slice(start,start+20);
    }
  }
  sort(colName='1. open') {
    this.keysArray.sort((a, b) =>this.timeSeries[a][colName] > this.timeSeries[b][colName] ? 1 : this.timeSeries[a][colName] < this.timeSeries[b][colName] ? -1 : 0)
    this.getPageRecords(this.currentPage);
  }
sortDifferences() {
  this.keysArray.sort((a, b) =>
    ((this.timeSeries[a]['1. open']-this.timeSeries[a]['4. close']) >(this.timeSeries[b]['1. open']-this.timeSeries[b]['4. close'])) ? 1 :
  ((this.timeSeries[a]['1. open']-this.timeSeries[a]['4. close']) < (this.timeSeries[b]['1. open']-this.timeSeries[b]['4. close'])) ? -1 : 0
   );
   this.getPageRecords(this.currentPage);
}
searchtimeSeriesbyDate()
{
  this.timeSeriesKeys=this.keysArray.filter(d=>d==this.searchDate);
  if(this.timeSeriesKeys.length==0)
  this.getPageRecords(this.currentPage);
}
profitsofSortedbyDateList()
{
  let lowPrice;
  let highPrice;
   for(let i=0;i<this.keysArray.length;i++)
   {
     for(let j=i;j<this.keysArray.length;j++)
     {
       let x=this.keysArray[i];
       let y=this.keysArray[j];
      highPrice=this.timeSeries[x]['2. high'];
      lowPrice=this.timeSeries[y]['3. low'];
      if(this.profitD< highPrice-lowPrice)
      {
        this.worthBuingDayD=y;
        this.worthSellingDayD=x;
        this.profitD =highPrice-lowPrice;        
      }
     }
   }
  
}
profitsofNotSortedList()
{
  let lowPrice;
  let highPrice;
  this.keysArray.forEach(x => {
    this.keysArray.forEach(y=>
      {
        highPrice=this.timeSeries[x]['2. high'];
        lowPrice=this.timeSeries[y]['3. low'];
        if(this.profit< highPrice-lowPrice&&x>=y)
        {
          this.worthBuingDay=y;
          this.worthSellingDay=x;
          this.profit =highPrice-lowPrice;        
        }
      })
    
  });
}
}
