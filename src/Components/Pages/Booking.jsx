import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import './booking.css'
import { useNavigate } from 'react-router-dom'

const Booking = () => {

    const { register, handleSubmit, reset } = useForm()

    const movies = ['Movie01', 'Movie02', 'Movie03', 'Movie04']

    const navigate = useNavigate()

    const rows = 6
    const cols = 26

    const [seats, setSeats] = useState(
        Array(rows).fill(null).map(() => {
            return (
                Array(cols).fill('available')
            )
        })
        
    )

    const [bookedSeats, setBookedSeats] = useState([])

    const handleClick = (r, c) => {

        const newSeats = seats.map((row, rowIndex)=>(
            row.map((seat, colIndex)=>{
                if(r === rowIndex && c === colIndex){
                    const newSeatStatus = seat ==='available' ? 'booked' : 'available'

                    if(newSeatStatus === 'booked'){
                        setBookedSeats([...bookedSeats, [r, c]])
                    }
                    else{
                        setBookedSeats(bookedSeats.filter(([row, col])=> row !== r || col !== c ))
                    }

                    
                    return newSeatStatus
                }
                else{
                    return seat
                }
            })
        ))

        setSeats(newSeats)
        console.log("aa",bookedSeats)

    }


    const saveData = async (data) => {

        console.log("aa",bookedSeats)

        data.bseats = bookedSeats
        
        await axios.post('http://localhost:8020/bookings', data)
        alert('Ticket Booked..!!')
        reset()
        setSeats(Array(rows).fill(null).map(() => {
            return (
                Array(cols).fill('available')
            )
        }))
        navigate('/show')

    }




    return (
        <div className='d-flex justify-content-center mt-5'>
            <form className='form-control w-75' onSubmit={handleSubmit(saveData)}>
                <h1>Book Your Ticket</h1>
                <div className="mb-3 d-flex flex-row mt-5 ms-2 justify-content-start">
                    <label htmlFor="nameInput" className="form-label col-1 w-10 text-start">Name : </label>
                    <input type="text" className="form-control col-6 w-50" id="nameInput" placeholder='Name must be same as on ID card' {...register('name')} />
                </div>
                <div className="mb-3 d-flex flex-row mt-5 ms-2 justify-content-start">
                    <label htmlFor="mobInput" className="form-label col-1 w-10 text-start">Mobile Number : </label>
                    <input type="text" className="form-control col-6 w-50" id="nameInput" placeholder='Ticket will be sent to this no.' {...register('mob')} />
                </div>
                <div className='mt-5 ms-2 d-flex justify-content-start'>
                    <label className="form-label col-1 w-10 text-start">Gender : </label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Male" {...register('gender')} />
                        <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Female" {...register('gender')} />
                        <label className="form-check-label" htmlFor="inlineRadio2">FeMale</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="other" {...register('gender')} />
                        <label className="form-check-label" htmlFor="inlineRadio2">Other</label>
                    </div>
                </div>

                <div className='mt-5 ms-2 d-flex justify-content-start'>
                    <label className="form-label col-2 w-10 text-start">Select Movie : </label>

                    {
                        movies.map((mov, index) =>
                        (
                            <div key={index}>
                                <input type="radio" className="btn-check" name="options-base" id={`option${index}`} autoComplete="off" value={mov}{...register('movie')}/>
                                <label className="btn btn-outline-primary me-3" htmlFor={`option${index}`}>{mov}</label>
                            </div>
                        )
                        )
                    }

                </div>

                {/* <div className='mt-5 ms-2 d-flex justify-content-start'>
                    <label className="form-label col-2 w-10 text-start">Select Seat : </label>
                    <select className="form-select w-25" aria-label="Default select example">
                        <option selected>Select your seat number</option>
                        
                        <option value="1">One</option>

                    </select>
                </div > */}
                
                <div className='theater mt-5 w-75 mx-auto'>
                <label className="form-label col-2 w-10 text-start mb-3">Select Seat : </label>
                    {
                        seats.map((row, rowIndex) => (
                            <div className='row' key={rowIndex}>
                                {
                                    row.map((seat, colIndex) => (
                                        <div className={`seat ${seat}`}
                                            onClick={() => { handleClick(rowIndex, colIndex) }}
                                            key={colIndex}
                                        >
                                            {colIndex + 1}
                                        </div>
                                    ))
                                }
                            </div>
                        )
                        )
                    }
                </div>


                <div className='mt-5 ms-2 d-flex justify-content-start'>


                </div>


                <div className='mt-5 ms-2 d-flex justify-content-start'>
                    <label className="form-label col-2 w-10 text-start">Select Show date: </label>
                    <input className='form-control w-25' type='date' {...register('date')}/>
                </div>

                <div className='mt-5 ms-2 d-flex justify-content-start mb-5'>
                    <label className="form-label col-2 w-10 text-start">Select Show Time: </label>
                    <input type="radio" className="btn-check" name="options-base-2" id="option11" value="9 to 12pm" {...register('time')}/>
                    <label className="btn btn-outline-primary me-3" htmlFor="option11">9 to 12pm</label>

                    <input type="radio" className="btn-check" name="options-base-2" id="option12" value="1 to 4pm" {...register('time')}/>
                    <label className="btn btn-outline-primary me-3" htmlFor="option12">1 to 4pm</label>

                    <input type="radio" className="btn-check" name="options-base-2" id="option13"  value="5 to 8pm" {...register('time')}/>
                    <label className="btn btn-outline-primary me-3" htmlFor="option13">5 to 8pm</label>

                    <input type="radio" className="btn-check" name="options-base-2" id="option14"  value="9 to 12am" {...register('time')}/>
                    <label className="btn btn-outline-primary me-3" htmlFor="option14">9 to 12am</label>

                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Booking




