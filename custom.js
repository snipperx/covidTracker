
let jsFunction;

    const display = countries => {
        let select  = document.getElementById("populate-select");
      for (let i=0; i < countries.length; i++){
            let opt = countries[i];
          select.innerHTML += "<option value=\"" + opt.Country + "\">" + opt.Country + "</option>";
      }
    }


     jsFunction = function(value) {

         let requestOptions = {
             method: 'GET',
             redirect: 'follow'
         };
         //new request
         const firstRequest = `https://restcountries.com/v3.1/name/${value}?fullText=true`
         const secondRequest = `https://api.covid19api.com/live/country/${value}/status/confirmed`;

         axios.all([axios.get(firstRequest),
             axios.get(secondRequest,requestOptions)])
             .then(axios.spread((firstResponse, secondResponse) => {
                 const dict=[];
                 let lastElement = secondResponse.data.slice(-1)
                 dict.push(firstResponse.data[0].flags.png);

                         dict.push(lastElement[0].Country,
                             lastElement[0].Active,
                             lastElement[0].Confirmed,
                             lastElement[0].Deaths,
                             lastElement[0].Recovered
                         )
                 document.getElementById('img').src =dict[0];
                 document.getElementById("country").innerHTML = dict[1];
                 document.getElementById("active_cases").innerHTML = dict[2];
                 document.getElementById("confirmed").innerHTML = dict[3];
                 document.getElementById("deaths").innerHTML = dict[4];
                 document.getElementById("recovered").innerHTML = dict[5];
                 console.log(dict)
             }))
             .catch(error => console.log(error));
    }


$(document).ready(function () {

    const fetchCountries = async () => {
        let countries = null;
        try{
            countries =  await axios.get('https://api.covid19api.com/countries')
        }catch (err) {
        } finally {
            display(countries.data)
        }
    }li
    fetchCountries();

})