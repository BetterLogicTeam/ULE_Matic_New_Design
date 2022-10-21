import {useTable} from 'react-table';
// import './Table.css';
const Table = ({columns, data}) => {
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data})
    return ( 
        // <div className='d-flex mt-md-3 TableOver table-responsive'>
                <table className="table card-table border table-vcenter text-nowrap align-items-center" {...getTableProps()} >
                    <thead className="thead-light">
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup
                            .headers
                            .map(column => (
                                <th  {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr className='tabl' {...row.getRowProps()}>
                            {row
                                .cells
                                .map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
            // </div>
     );
}
 
export default Table;