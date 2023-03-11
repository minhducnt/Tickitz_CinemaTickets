# Tickitz Booking Cinema

Movie Tickets Online Booking Website Using ReactJS

## Resources

```text
Main API: https://github.com/congdanh0101/cinema-booking/tree/spring
TMDB API: https://www.themoviedb.org
Ionicons: https://ionic.io/ionicons
Google Font: https://fonts.google.com/specimen/Overpass
Cache Image Proxy: https://images.weserv.nl
```

## Main technology used

- React, Ant Design, Styled Components
- Redux, Redux Toolkit (State management)
- Axios, SWR (Data fetching)
- Swiper (Slider)
- React Hook Form , Yup (Validation)
- Sweetalert2, React-toastify (Message UI)
- Other: react-router-dom, uuid, react-lazy-load-image-component, moment, query-string

## Features

`User`

- Search movies by name.
- Explore and Booking available seats
- View detail movie info including poster, overview, casts, trailers...
- View Featured Article Posts
- Check History booking, Cancel booking, Update profile

`Admin`

- Manage Cinemas: View information all cinema
- Manage Movies: Add new, update, delete movie.
- Manage User: Add new, update, delete user.
- Manage Showtimes: Add new, update, delete showtime, view info showtime including price, total seats are booked, total money ticket sales.

## Environment Variables

```text
# CLIENT URL
REACT_APP_PUBLIC = http://localhost:3000 (or Link vercel)

# API URL
REACT_APP_API =

# See: https://www.themoviedb.org/
REACT_APP_TMDB_KEY = "api_key_tmdb"
```
