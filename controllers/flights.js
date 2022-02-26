// import { Flight } from "../models/flight.js"


function newFlight(req, res) {
  res.render('flights/new')
}


export {
  newFlight as new,
}
