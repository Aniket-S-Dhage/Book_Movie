import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const Show = () => {

    const [bookings, setBookings] = useState([])
    const navigate = useNavigate()

    const getData = async () => {
        const response = await axios.get('http://localhost:8020/bookings')

        setBookings(response.data)

        console.log(response.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const [refresh, setRefresh] = useState(true)

    async function deleteBooking(id, name){
        const ans = window.confirm(`Do you want to delete booking for ${id}: ${name}`)

        if (ans){
            await axios.delete(`http://localhost:8020/bookings/${id}`)
            getData()
        }

    }



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
                        bookings.map((book, index) => (
                            <tr key={book.id} className='table-success'>
                                <td>{index + 1}</td>
                                <td>{book.name}</td>
                                <td>{book.mob}</td>
                                <td>{book.gender}</td>
                                <td>{book.movie}</td>
                                <td>{book.date}</td>
                                <td>{book.time}</td>
                                <td>
                                    {
                                        book.bseats.length ?
                                            book.bseats.map((s, index) => {
                                                return (
                                                    <p key={index}> {`(${String.fromCharCode(65+s[0])},${s[1]})`} </p>
                                                )
                                            }) : "No Seats" 

                                    }
                                </td>
                                <td>
                                    <NavLink to={`/update/${book.id}`}><button className='btn btn-warning me-3'>Update</button></NavLink>
                                    <NavLink><button className='btn btn-danger' onClick={()=>{deleteBooking(book.id, book.name)}}>Delete</button></NavLink>
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