import React from "react"

const AddToCalendarButton = ({ title, location, details, startTime, endTime }) => {

    const parseDate = ( rawDate ) => ( `${ rawDate.split('-').join('').split(':').join('').split(".")[0] }Z` )

    const composedDates = `${ parseDate(startTime) }/${ parseDate(endTime) }`

    const composedUrl = `https://calendar.google.com/calendar/r/eventedit?text=${ encodeURI(title) }&dates=${ composedDates }&details=${ encodeURI(details) }&location=${ encodeURI(location) }`

    return (<a className="button button--calendar" href={ composedUrl } target="_blank" rel="noopener noreferrer">Add To Google Calendar</a>)

}

export default AddToCalendarButton