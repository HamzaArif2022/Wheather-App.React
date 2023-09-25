import { Button, Form } from "react-bootstrap";
import styles from './SearchBar.module.css'
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetwheather, setwheather } from "../../Store/SliceStore";
import PositionSvg from "../Svgs/PositionSvg";
export const SearchBar = () => {
    const [cities, setcities] = useState([]);
    const [GeoLocation, setGeoLocation] = useState(undefined)
    const [isCurrentLocation, setisCurrentLocation] = useState(false)
    const dispatch = useDispatch()
    /* Handlers  */
    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setisCurrentLocation(true)
            setGeoLocation({
                lat: position?.coords?.latitude, lon: position?.coords?.longitude
            })
        })

    }
    const HasGeoLocation = () => {
        return navigator.geolocation// verifier si utilisateur active votre localisation
    }

    // au chargement de la page en verife que utilisateur il y bien active votre localisation au niveau de navigator 
    useEffect(() => {
        if (HasGeoLocation()) {

            getGeoLocation()
        }


    }, [])
    useEffect(() => {//the first effect return my current location if is it activited and the second effect depends on the Ceolocation value for every selected value
        if (GeoLocation) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${GeoLocation.lat}&units=metric&lon=${GeoLocation.lon}&appid=cbb7da2463b169417c4bd6896d2373d9`).then((response) => {
                return response.json()
            }).then((response) => {
                const { clouds, main, name, sys, weather, wind } = response
                dispatch(setwheather({ clouds, main, name, sys, weather, wind, isSelected: true }))
            })
        }
    }, [GeoLocation])

    // lorsque on fait un rechecher sur une valeur 
    const handleAutocompleteSelect = (e, value) => {
        if (value != null) {
            const { lon, lat } = value;// value return object of the selected citiy with it's information 

            setisCurrentLocation(false)




            // setGeoLocation({
            //     lat,lon
            // })
            // on faire un update sur GeoLocation pour faire un fetch dynamique sur the weather of this city 
            setGeoLocation({
                lat: lat, lon: lon
            })


        } else {
            resetwheather(dispatch(resetwheather(false)))
        }


    }
    const handlerClicklocation = (e) => {
        e.preventDefault()
        getGeoLocation()

    }
    // lorsque on y entain de rechercher (onchageInput) sur quelque chose en affecter tout les dependance de la recherche au niveau <TextFeiled/>  
    const handleInputChange = (e) => {
        const { value } = e.currentTarget


        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=5fa3b69d2d6541fe9c1c90af2a0f9d72`).then((response) => {
            return response.json()
        }).then((response) => {
            setcities(response.results?.map(ele => {// fill the setCities by the result of the api 
                const { lon, lat, country, city, formatted } = ele
                return { lon, lat, country, city, formatted };
            })
            )
        })
    }
    const handlerReset = () => {// lorsque On faire un close de selectionne on a reduire la valeur de store 
        dispatch(resetwheather(false))
    }
    return (
        <>
            <Form>
                <Form.Group className={styles.searchContainer}>
                    <Autocomplete className={styles.searchInput}
                        clearOnBlur={cities.length > 0 ? false : true}
                        onReset={handlerReset}
                        onChange={handleAutocompleteSelect}// change the selected value
                        getOptionLabel={(option) => option.formatted}
                        renderInput={(params) =>
                            <TextField onChange={handleInputChange} {...params}
                                label={'Enter your city ...'} />}
                        options={cities || []} />

                    <Button onClick={handlerClicklocation} size={'lg'} disabled={GeoLocation === undefined || isCurrentLocation === true} variant='primary'><PositionSvg color={'rgba(255,255,255,0.7)'} /></Button>
                </Form.Group>
            </Form>
        </>
    )
}