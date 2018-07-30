const fromValue = document.querySelector('#from-value');
const fromSelect = document.querySelector('#from-select');
const toValue = document.querySelector('#to-value');
const toSelect = document.querySelector('#to-select');
const latestDate = document.querySelector('#latest');

const xhttp = new XMLHttpRequest();

let latestCurrencyRates = new Object;
let activeCurrencies = {
  from: { EUR: 1 }, to: { EUR: 1 }
}

let activeCurrenciesHistory = [];
let xmlDoc;
let excFrom = 1;
let excTo = 1;
let excValue = (fromValue.value / excFrom * excTo)

xhttp.onreadystatechange = function () {

  if (this.readyState == 4 && this.status == 200) {
    xmlDoc = this.responseXML;
    jsonObj = xmlToJson(xmlDoc).NODE.Cube.Cube;

    getLatestCurrencyRates()
    recalculate()
    appendDOM(fromSelect);
    appendDOM(toSelect);


    excFrom = activeCurrencies.from[fromSelect.value];
    excTo = activeCurrencies.to[toSelect.value];

    latestDate.innerText = jsonObj[0].time

    console.log('JSON: ', jsonObj[0]);
    console.log('latest: ', latestCurrencyRates);
  };
};
xhttp.open("GET", "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml", true);
xhttp.send();

const xmlToJson = (xml) => { // Modified version from here: http://davidwalsh.name/convert-xml-json

  let obj = {};

  if (xml.nodeType === 1) {
    if (xml.attributes.length > 0) {
      obj = {};
      for (let j = 0; j < xml.attributes.length; j += 1) {
        const attribute = xml.attributes.item(j);
        obj[attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
    obj = xml.nodeValue;
  }

  if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
    obj = xml.childNodes[0].nodeValue;
  } else if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i += 1) {
      let item = xml.childNodes.item(i);
      let nodeName;
      if (item.nodeName == 'gesmes:Envelope') {
        nodeName = 'NODE'
      } else {
        nodeName = item.nodeName
      }
      if (typeof (obj[nodeName]) === 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof (obj[nodeName].push) === 'undefined') {
          let old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
};

const appendDOM = (domElement) => {
  for (let i = 0; i < jsonObj[0].Cube.length; i++) {
    let option = document.createElement('option');
    let currency = document.createTextNode(jsonObj[0].Cube[i].currency)
    option.appendChild(currency)
    domElement.appendChild(option)
  }
}

const getLatestCurrencyRates = () => {
  for (let i = 0; i < jsonObj[0].Cube.length; i++) {
    latestCurrencyRates[`${jsonObj[0].Cube[i].currency}`] = jsonObj[0].Cube[i].rate
  }
  latestCurrencyRates['EUR'] = '1';
}

const recalculate = () => {
  excValue = (fromValue.value / excFrom * excTo);
  toValue.innerText = finantial(excValue)
}

const finantial = (n) => {
  return Number.parseFloat(n).toFixed(2);
}

const getActiveCurrencyHistory = () => {
  let fromHistory = [];
  let toHistory = [];
  if(activeCurrencies)
  for (let i = 0; i < jsonObj.length; i++) {
    fromHistory.push(
      {
        x: getTimestamp(jsonObj[i].time),
        y: jsonObj[i].Cube
      }

    )
  }

}

const getTimestamp = (date) => {
  return Math.floor(new Date(date).getTime() / 1000)
}

fromValue.addEventListener('keyup', () => {
  recalculate()
});

fromValue.addEventListener('change', () => {
  recalculate()
});

fromSelect.addEventListener('change', () => {
  activeCurrencies['from'] = { [fromSelect.value]: latestCurrencyRates[fromSelect.value] }
  excFrom = activeCurrencies.from[fromSelect.value];
  recalculate()
});

toSelect.addEventListener('change', () => {
  activeCurrencies['to'] = { [toSelect.value]: latestCurrencyRates[toSelect.value] }
  excTo = activeCurrencies.to[toSelect.value];
  recalculate()
});







