import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@mui/material/TablePagination';
import EventDropDown from './subComponents/EventsDropDown';
import { GetRecordsEventsPageable } from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import NoEvent from './NoEvent';
import { handlePagination } from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';


const Records = () => {
  const dispatch = useDispatch();
  const recordsData = useSelector(state => state?.EmployeeEventsSlice?.recordsEvents);
  // console.log(recordsData);
  let body;
  var today = new Date();
  let time_in_miliseconds = today.getTime();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const dropDownProps = {
    panel: 'records',
    firstItem: 'DOWNLOAD FILE',
    secondItem: 'VIEW DETAILS',
    thirdItem: 'CANCEL EVENT',
    fourthItem: 'APPROVE EVENT',
  }

  useEffect(() => {
    body = {
      date: time_in_miliseconds,
      pagination: {
        order: true,
        page: page,
        size: rowsPerPage,
        sortBy: "id"
      }
    }
    dispatch(GetRecordsEventsPageable(body));
  }, [])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(handlePagination({
      name: "page",
      value: newPage
    }));
    body = {
      date: time_in_miliseconds,
      pagination: {
        "order": true,
        "page": newPage,
        "size": rowsPerPage,
        "sortBy": "id"
      }
    }
    dispatch(GetRecordsEventsPageable(body));
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    dispatch(handlePagination({
      name: "size",
      value: parseInt(event.target.value)
    }));
    body = {
      date: time_in_miliseconds,
      pagination: {
        "order": true,
        "page": page,
        "size": parseInt(event.target.value),
        "sortBy": "id"
      }
    }
    dispatch(GetRecordsEventsPageable(body));
  };

  return (
    <>
      {
        recordsData?.content?.length !== 0 ?
          <>
            <div className="eventTables" style={{ height: "25rem" }}>
              <table style={{ width: "100%" }}>
                <thead>
                  <th className='first'>name</th>
                  <th>zone</th>
                  <th>host</th>
                  <th>date</th>
                  <th className='last'>options</th>
                </thead>
                {
                  recordsData?.content?.map(item => (
                    <tr key={item.id}>
                      <td className='first'>{item?.name}</td>
                      <td>{item?.unitSection}</td>
                      <td>{item?.host?.name}</td>
                      <td>
                        {new Date(item?.createdAt).toJSON().split("T")[0]}<br />
                        {new Date(item?.createdAt).toJSON().split("T")[1].split(".")[0]}
                      </td>
                      <td className='last'>
                        <EventDropDown dropDownProps={dropDownProps} event={item} />
                      </td>
                    </tr>
                  ))
                }
              </table>
            </div>
            <div className='d-flex justify-content-between align-items-center px-3'>
              <p>{`Total ${recordsData?.totalElements} of ${recordsData?.numberOfElements}`}</p>
              <TablePagination
                component="div"
                rowsPerPageOptions={[2, 4, 6, 8]}
                count={recordsData?.totalElements}
                page={page}
                onPageChange={handleChangePage}
                labelRowsPerPage="Roles per page"
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </> :
          <NoEvent title="records Events" />
      }
    </>
  )
}

export default Records