import React , {useState,useEffect} from "react";
import "./css/style.css";

const Tempapp = () => {
    const [city,setCity] = useState(null);
    const [search,setSearch] = useState("Mumbai");
    const [climate,setClimate] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=0581c34929a95ab316ededc47ea4f406`
            const response = await fetch(url);
            console.log(response);
            const resJson = await response.json();
            setCity(resJson.main);
            setClimate(resJson.weather ? resJson.weather[0] : null);
        }

        fetchApi();
    }, [search])

    const renderWeatherIcon = (climate) => {
        if (!climate) return null;
        switch (climate.main) {
            case "Clouds":
                return <i className="fa-solid fa-cloud" id="icons"></i>;
            case "Rain":
                return <i className="fa-solid fa-cloud-showers-heavy" id="icons"/>; 
            case "Haze":
                return <i className="fa-solid fa-wind" id="icons"></i>;
            case "Mist":
                return <i className="fa-solid fa-smog" id="icons"/>;
            case "Snow":
                return <i className="fa-regular fa-snowflake" id="icons"></i>;
            case "Clear":
                return <i className="fa-solid fa-cloud-sun" id="icons"/>;            
            default:
                return <i className="fa-solid fa-cloud-sun" id="icons"/>;
        }
    };


    return(
        <>
         <div className="box">
            <div className="inputData">
                <input type="search" className="inputFeild" 
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value)
                }}/>
            </div>

            {!city ? (
                <p>No Data Found !</p>
            ) : (
                <div>
                    <div className="info">
            <h2 className="location">
            <i className="fa-solid fa-street-view"></i>{search}
            </h2>
            <div className="forecast">
               <h2 className="name">{climate.main}</h2>
               {renderWeatherIcon(climate)}
            </div>
            <h1 className="temp">
                {city.temp}{'\u00B0'}Cel
            </h1>
            <h3 className="tempmin_max">Min : {city.temp_min}{'\u00B0'}Cel | Max : {city.temp_max}{'\u00B0'}Cel </h3>
         </div>

         <div className="ocean">
            <div className="wave"></div>
            <div className="wave"></div>
         </div>
                </div>
            )

            }
         </div>
        </>
    );
}

export default Tempapp;