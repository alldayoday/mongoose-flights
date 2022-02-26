import { Flight } from "../models/flight.js"


function newFlight(req, res) {
  res.render('flights/new')
}

function create(req, res) {
  console.log(req.body)
  const flight = new Flight(req.body)
  console.log(flight)
  flight.save(function(err) {
    if (err) return res.redirect('/flights/new')
    res.redirect('/flights')
  })
}

function index(req, res) {
  Flight.find({}, function (error, flights) {
    console.log(error)
    res.render("flights/", {
      error: error,
      flights: flights,
    })
  })
}

export {
  newFlight as new,
  create,
  index
}
