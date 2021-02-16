import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';


export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { name: 'Search',
         geoJSon:{},
         newGeoJSon:[]};

        this.onChange = this.onChange.bind(this);    
        this.onSearch = this.onSearch.bind(this);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    toGeoJSON =()=>{
        var res=[];
        //console.log(geoJSONFormat);
        const z= this.state.geoJSon;
        for(let i=0;i<z.length;i++){
            var geoJSONFormat = {
                'type': 'Feature',
                    'geometry': {
                    'type': 'Point',
                    'coordinates': []
                    },
                    'properties': {
                    'title': 'Mapbox DC'
                    }
                    }
            geoJSONFormat.title=z[i].name
            geoJSONFormat.coordinates=z[i].location            
           res.push(geoJSONFormat)
        //    this.setState({newGeoJSon:k})
        }
        console.log(res);
    }
    
    onSearch = async e => {
        e.preventDefault();
        e.stopPropagation();
        const formData = this.state.name;
        //console.log(formData);
        const url = 'http://localhost:3000/api';
      

        axios.post(url, formData)
   .then(res=>{
       this.setState({geoJSon:res.data})
   })
   .catch(err => console.log(err))
    }

    render() {

        const { name,geoJSon,newGeoJSon} = this.state;
       // console.log(this.state)
        return (<div>
                <form onSubmit={this.onSearch}>
                    {/* {JSON.stringify(newGeoJSon)} */}
                    <input type="text" name="name" value={name} onChange={this.onChange}  />
                    <button type="submit">Search </button>
                   
                </form>
                <button type="submit" onClick={this.toGeoJSON}>Show geoJSONFormat </button>
                </div>  
        )
    }
}

