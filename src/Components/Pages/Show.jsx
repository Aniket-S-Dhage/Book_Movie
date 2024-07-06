import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Show = () => {

    const [bookings, setBookings] = useState([])

    const getData = async()=>{
        const response = await axios.get('http://localhost:8020/bookings')

        const result = response.data

        setBookings(result)
    }

    useEffect(()=>{
        getData()
    },[])

  return (
    <div>
        <h1>Show all Tickets Bought</h1>
        <table className='table n  '>
            <thead>
                <tr className='table-primary'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Mobile no.</th>
                    <th>Gender</th>
                    <th>Movie Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Seats</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    bookings.map((book, index)=>(
                        <tr key={book.id} className='table-success'>
                            <td>{index + 1}</td>
                            <td>{book.name}</td>
                            <td>{book.mob}</td>
                            <td>{book.gender}</td>
                            <td>{book.movie}</td>
                            <td>{book.date}</td>
                            <td>{book.time}</td>
                            <td>{book.seats.map((seat)=>{
                                return(
                                    '(' + seat + '),'
                                )
                            })}</td>
                            <td>
                            <NavLink to={`/update/${book.id}`}><button className='btn btn-warning me-3'>Update</button></NavLink>
                            <NavLink><button className='btn btn-danger'>Delete</button></NavLink>
                            </td>
                        </tr>
                    ))
                }
            </tbody>

        </table>
    </div>
  )
}

export default Show