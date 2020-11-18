import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {tableProps,DataProps} from '../tyscripst.model'
import { forwardRef } from 'react';
//แก้ไข  import {AddBox,ArrowUpward} from '@material-ui/icons';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
export default function ReportTable() {
  const tableIcons = {
    Add: forwardRef<SVGSVGElement>((props, ref) => (
      <AddBox {...props} ref={ref} />
    )),
    Check: forwardRef<SVGSVGElement>((props, ref)=> (
      <Check {...props} ref={ref} />
    )),
    Clear: forwardRef<SVGSVGElement>((props, ref) => (
      <Clear {...props} ref={ref} />
    )),
    Delete: forwardRef<SVGSVGElement>((props, ref) => (
      <DeleteOutline {...props} ref={ref} />
    )),
    DetailPanel: forwardRef<SVGSVGElement>((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef<SVGSVGElement>((props, ref) => (
      <Edit {...props} ref={ref} />
    )),
    Export: forwardRef<SVGSVGElement>((props, ref) => (
      <SaveAlt {...props} ref={ref} />
    )),
    Filter: forwardRef<SVGSVGElement>((props, ref)=> (
      <FilterList {...props} ref={ref} />
    )),
    FirstPage: forwardRef<SVGSVGElement>((props, ref) => (
      <FirstPage {...props} ref={ref} />
    )),
    LastPage: forwardRef<SVGSVGElement>((props, ref) => (
      <LastPage {...props} ref={ref} />
    )),
    NextPage: forwardRef<SVGSVGElement>((props, ref)=> (
      <ChevronRight {...props} ref={ref} />
    )),
    PreviousPage: forwardRef<SVGSVGElement>((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef<SVGSVGElement>((props, ref) => (
      <Clear {...props} ref={ref} />
    )),
    Search: forwardRef<SVGSVGElement>((props, ref)=> (
      <Search {...props} ref={ref} />
    )),
    SortArrow: forwardRef<SVGSVGElement>((props, ref) => (
      <ArrowUpward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef<SVGSVGElement>((props, ref) => (
      <ViewColumn {...props} ref={ref} />
    )),
  }
  const [entries, setEntries] = useState({
    data: [
      {
        id: '',
        name: '',
        when: '',
      },
    ],
  })


  function readCookie(name:string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  let data: Array<any> = [];
  const token =readCookie('token');
  const headers = {
    Authorization: `Bearer ${token}`,
"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":true ,"Content-Type": "application/json", }
  useEffect(() => {
    axios
      .get('https://localhost:5001/activities/', { headers })
      .then((response) => {
   
        response.data.forEach((el:tableProps) => {
          data.push({
            id: el.id,
            name: el.name,
            when: el.when,
          })
        })
        setEntries({ data })

      
      })
      .catch(function (error) {
        console.log(error)
      })
     // eslint-disable-next-line
  }, [entries.data.length])


//ทำสอบ การเชื่อม  แบบ button
 // const [datas, setDatas] = React.useState([]);
{/*  const onCheck= async() => { 
    const result = await axios.put(
      `/activities/38`,
      {name: "นัดหมอ_del_momodsd", when: "2020-12-01T14:00:00"},
      { headers } 
    );
    setDatas(result.data);
  console.log('re',datas)
  }
*/}
const history =useHistory()
const onLoginOut = () => { 
  document.cookie = "token" + '=; Max-Age=-99999999;';  
  history.push('/')
}

  return (
    <>
      { /*  <button onClick={onLogin}> check_put</button>*/}
      <button onClick={onLoginOut}> logout</button>
    <MaterialTable
    icons={tableIcons}
      title="Report Table"
      columns={[
        { title: 'id', field: 'id' ,editable: 'never'},
        { title: 'name', field: 'name' },
        { title: 'when', field: 'when', type: 'datetime' },
      ]}
      data={entries.data}
        editable={{
        //update
        onRowUpdate: (newData:DataProps, oldData:any) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve()
              const data = [...entries.data]
              console.log(typeof oldData)
              data[oldData.tableData.id] = newData
              
              axios
                .put(
                  `/activities/${oldData.id}`,
                  { name: newData.name, when: newData.when },
                  { headers } 
                )
                .then((res) => console.log(res.data))
              setEntries({ ...entries, data })
            }, 600)
          }),
          //delete
        onRowDelete: (oldData:DataProps) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve()
              const data = [...entries.data]
              data.splice(data.indexOf(oldData), 1)
              axios
                .delete(`/activities/${oldData.id}`, { headers })
                .then((res) => console.log(res.data))
              setEntries({ ...entries, data })
            }, 600)
          }),
        //add
          onRowAdd: (newData:DataProps) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve()
              const data = [...entries.data]
              data[data.length] = newData
              axios
                .post(
                  `/activities`,
                  { name: newData.name, when: newData.when },
                  { headers }
                )
                .then((res) => console.log(res.data))
              setEntries({ ...entries, data })
            }, 600)
          }),
      }}
      />
      </>
  )
}
