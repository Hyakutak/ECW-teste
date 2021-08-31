import React,  { useState, useEffect } from "react";
import Axios from 'axios';
import {FormControl, Paper, Select, TextField} from "@material-ui/core";
import "./style.css";

const Main = () => {
    const [text1, settext1] = useState(1);
    const [text2, settext2] = useState(1);
    const [country, setcountry] = useState([])
    const [country2, setcountry2] = useState([])
    const [value1, setvalue1] = useState(1);
    const [value2, setvalue2] = useState(1);

    useEffect(()=>{
        getdata();
    },[]);
    async function getdata(){
        const result = await Axios.get("http://data.fixer.io/api/latest?access_key=5b12a8a059f5d3091e1f0f2c16a32f96");
        console.log(result.data);
        setcountry(result.data.rates);
        setcountry2(result.data.rates);
    }
    function convert(e) {
        e.preventDefault();
        let num = (value2 / value1) * text1;
        settext2(num);
    }
    return(
        <div>
            <Paper className="paper">
                <h3>Conversor de Moedas</h3>
                <form onSubmit={convert}>
                    <div>
                        <TextField variant="outlined" value={text1 || ""} onChange={(e)=>settext1(e.target.value)} autoComplete='off' />
                        <FormControl className="dropdown" variant="outliner" onChange={(e)=>setvalue1(e.target.value)}>
                            <Select native>
                                {Object.keys(country).map((value, index)=>
                                <option key={index} value={country[value]}>{value}</option>)}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField variant="outlined" value={text2 || ""}/>
                        <FormControl className="dropdown" variant="outliner" onChange={(e)=>setvalue2(e.target.value)}>
                        <Select native>
                                {Object.keys(country2).map((value, index)=>
                                <option key={index} value={country[value]}>{value}</option>)}
                            </Select>
                        </FormControl>
                    </div>
                    <button type="submit" className="button" variant="contained">Converter</button>
                </form>
            </Paper>
        </div>
    );
};
export default Main;