import React, { Component } from 'react';
import {responseData} from './data/data'
import DataTable from './Tab';

class DridComp extends Component {
   constructor(props) {
       super(props);
      this.state = {
         data:responseData,
         headers:{},
         defaultSize:10,
         currentPageNo:0
      }
   }

 componentDidMount(){
       const cols =  responseData.length>0?responseData[0]:[];
       let data = responseData.length>this.state.defaultSize?responseData.slice(0,this.state.defaultSize):responseData;
       this.setState({headers:cols,data:data});
   }

  sortData = (e) =>{
    const sortBy = e.target.innerHTML;
    const dataProvider  = [...this.state.data].sort((a,b) => b[sortBy] - a[sortBy]);
    this.setState({data:dataProvider});
    
  }
  selectPageSize = (e) =>{
      const newPageSize = e.target.value;
      const start = this.state.currentPageNo*this.state.defaultSize;
      const tmp_end = (this.state.currentPageNo ==0?1:this.state.currentPageNo)*newPageSize + start;
      const end = responseData.length>tmp_end?tmp_end:responseData.length;
    this.setState({defaultSize:newPageSize,data:this.getDataInRage(start,end,responseData)});
  }
  
  getDataInRage = (start,end,data) =>{
    var rows = [];
    for (var i = start; i < end; i++) {
        rows.push(data[i]);
    }
    return rows;
  }

  nextPage = () =>{
      const startPage = (this.state.currentPageNo+1)*this.state.defaultSize;
      const tmp_endPage = (this.state.currentPageNo+2)*this.state.defaultSize
      const endPage = responseData.length>=tmp_endPage?tmp_endPage:responseData.length;

      this.setState((prevState) => ({
        data: this.getDataInRage(startPage,endPage,responseData),
        currentPageNo: (prevState.currentPageNo+1)
      }));
  }

  previousPage = () =>{
    const startPage = (this.state.currentPageNo-1)*this.state.defaultSize;
    const endPage = this.state.currentPageNo*this.state.defaultSize;
   

    if(this.state.currentPageNo > 0){
     this.setState((prevState) => ({
        data: this.getDataInRage(startPage,endPage,responseData),
        currentPageNo: (prevState.currentPageNo - 1)
      }));
    }
  }

 render() {
       const cols =  responseData.length>0?responseData[0]:[];
        return (
            <div>
              <div>
                  <button onClick={this.nextPage}>Next</button>
                  <button onClick={this.previousPage}>Prev</button>
                  
                  <label>Select Page Size</label>
                  <select onChange={this.selectPageSize}>
                      <option value='10'>10</option>
                      <option value='20'>20</option>
                      <option value='50'>50</option>
                      <option value='100'>100</option>
                  </select>
              </div>
               <DataTable cols={this.state.headers} dataProvider={this.state.data} sortData={this.sortData}/>
            </div>
        );
    }
}

export default DridComp;