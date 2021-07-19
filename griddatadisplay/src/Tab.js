
const DataTable = (props) => {

    const columns = Object.entries(props.cols);
    const dataProvider = props.dataProvider;
    let index=0;
    
   return <table>
            <thead>
              <tr>
                {columns.length>0 && columns.map(([key,value]) => <th onClick={props.sortData} key={key}>{key}</th>)}  
              </tr> 
            </thead>
            <tbody>
                {  
                    dataProvider.length >0 && 
                    dataProvider.map( (row) => <tr key={index++}>
                        {columns.map(([key,value]) => <td key={key+(index -1 )}>{row[key]}</td>)}
                    </tr>)
                    
                }
            </tbody>
         </table>;
}
export default DataTable;