import { Meal } from '../models/meal.js'
import { Flight } from "../models/flight.js"



function newFlight(req, res) {
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {departsDate});
}

function create(req, res) {
  console.log(req.body)
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  const flight = new Flight(req.body)
  console.log(flight)
  flight.save(function(err) {
    if (err) {
      console.log(err)
      return res.redirect('/flights/new')}
    res.redirect(`/flights/${flight._id}`)
  })
}

function index(req, res) {
  Flight.find({}).sort({departs: 'asc'}).exec ((error, flights) => {
    console.log(error)
    res.render("flights/", {
      error: error,
      flights: flights,
    })
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('eats')
  .exec(function(err, flight) {
    Meal.find({_id: {$nin: flight.eats}}, 
      function(err, meals) {
      res.render('flights/show', {
        title: 'Flight Detail', 
        flight: flight,
        meals: meals,
      })
    })
  })
}

function createTicket(req,res){
    Flight.findById(req.params.id, function(err, flight) {
      flight.tickets.push(req.body)
      flight.save(function(err) {
        res.redirect(`/flights/${flight._id}`)
      })
    })
}

function deleteFlight(req,res) {
  Flight.findByIdAndDelete(req.params.id, function(err, flight) {
    res.redirect('/flights')
  })
}

function addToEat(req,res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.eats.push(req.body.mealId)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}



export {
  newFlight as new,
  create,
  index,
  show,
  createTicket,
  deleteFlight as delete,
  addToEat,
}
