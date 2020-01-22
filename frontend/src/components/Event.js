import React from 'react'

// Parse and render event
const Event = ({ classes, event, TableCell, TableRow, TableHead, TableBody, Table }) => {
    const title = event.title
    const startDay = event.start_date_details.day
    const startMonth = event.start_date_details.month
    const endDay = event.end_date_details.day
    const endMonth = event.end_date_details.month
    const startHour = event.start_date_details.hour
    const startMinute = event.start_date_details.minutes
    const endHour = event.end_date_details.hour
    const endMinute = event.end_date_details.minutes

    if (event.all_day){
        return (
            <TableBody>
                <TableRow key={event.id}>
                    <TableCell render="left">{title}</TableCell>
                    <TableCell render="right">{startDay}.{startMonth}</TableCell>
                    <TableCell render="right"></TableCell>
                </TableRow>
            </TableBody>
        )
        
    } else {
        return (
            <TableRow key={event.id}>
            <TableCell render="left">{title}</TableCell>
            <TableCell render="right">{startDay}.{startMonth}</TableCell>
            <TableCell render="right">{startHour}:{startMinute}</TableCell>
            </TableRow>
        )
        
    }
}

export default Event