import styles from './Wheather.module.scss'
import { Card } from "react-bootstrap";
import PositionSvg from "../Svgs/PositionSvg";
import DefaultWeather from "../Svgs/DefaultWeather";
import Thermometer from "../Svgs/Thermometer";
import Time from "../Svgs/Time";
import Wind from "../Svgs/Wind";
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import Huimidity from '../Svgs/Huimidity';
import SpeedorMeter from '../Svgs/SpeedorMeter';
import { easeInOut, motion } from 'framer-motion';
import { Hidden } from '@mui/material';


export const Weather = () => {
    const wheatherData = useSelector((data) => data.wheather)
    console.log(wheatherData);
    return (
        <>
            {wheatherData.isSelected ? (


                <Card className={styles.container}>
                    <Card.Body>
                        <Card.Title>
                            {wheatherData.name} ,{wheatherData.sys.country}  <PositionSvg color={'rgba(255,255,255,0.7)'} />
                            <div className={styles.date}>
                                <Moment format='lll' />
                                <div><Time width={'15px'} height={'15px'} /></div>
                            </div>
                        </Card.Title>
                        <Card.Text as={'div'} className={styles.weather_infos}>
                            <div>
                                {/*  <DefaultWeather width={'250px'} height={'250px'}/> */}
                                <motion.img
                                    initial={
                                        {
                                            display: 'hidden',
                                            opacity: 0
                                        }
                                    }
                                    animate={{
                                        display: 'block',
                                        opacity: 2
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        delay: .6,
                                        ease: easeInOut
                                    }}
                                    src={`https://openweathermap.org/img/wn/${wheatherData.weather[0].icon}@2x.png`} width={"200px"} alt="" />
                            </div>
                            <div className={styles.temperature}>
                                <div>{wheatherData.main.temp}° C</div>
                                <div>
                                    <Thermometer />
                                </div>
                            </div>
                            <div>
                                Good Morning  {wheatherData.name}
                                <div className={styles.separator}></div>
                            </div>
                            <div className={styles.infos}>
                                <div className={styles.border_right}>
                                    <div><DefaultWeather color={'#fff'} /></div>
                                    <div>Sunrise</div>
                                    <div>
                                        <Moment unit='true' format='hh:mm'>

                                            {wheatherData.sys.sunrise}
                                        </Moment>
                                    </div>
                                </div>
                                <div className={styles.border_right}>
                                    <div><Wind /></div>
                                    <div>Wind</div>
                                    <div>{wheatherData.wind.speed}m/s</div>
                                </div>
                                <div>
                                    <div><Thermometer color={'#fff'} width={'25px'} height={'25px'} /></div>
                                    <div>Temp</div>
                                    <div>{wheatherData.main.temp_min.toFixed(0)}° C</div>
                                </div>
                                <div>
                                    <div><Huimidity color={'#fff'} width={'25px'} height={'25px'} /></div>
                                    <div>Huimidity</div>
                                    <div>{wheatherData.main.humidity}° C</div>
                                </div>


                                <motion.div 
                                
                                 initial={
                                    {
                                       
                                        opacity: 0
                                    }
                                }
                                animate={{
                                    
                                    
                                    opacity: 2
                                }}
                                transition={{
                                    duration: 0.2,
                                    delay: .6,
                                    ease: easeInOut
                                }}
                                
                               >
                                    <div><SpeedorMeter color={'#fff'} width={'25px'} height={'25px'} /></div>
                                    <div>SpeedorMeter</div>
                                    <div>{wheatherData.wind.speed}° C</div>
                                </motion.div>
                            </div>

                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <Card.Title className={styles.container}>
                    <h2 className='p-2 flex-fill'>

                        Entrer your city...
                    </h2>
                </Card.Title>
            )
            }
        </>
    )
}