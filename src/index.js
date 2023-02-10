import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { countryCardTemplate, countryListTemplate }  from './js/template';  

const DEBOUNCE_DELAY = 300;


const refs = {
	searchBox: document.getElementById('search-box'),
	countryList: document.querySelector('.country-list'),
	countryInfo: document.querySelector('.country-info'),
};
 
refs.searchBox.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
	const countryName = refs.searchBox.value.trim();
	if (countryName === '') {
		refs.countryInfo.innerHTML = '';
		refs.countryList.innerHTML = '';
		return;
	}

	fetchCountries(countryName)
		.then(countrys => {
			if (countrys.length > 10) {
				Notify.info('Too many matches found. Please enter a more specific name.');
				refs.countryInfo.innerHTML = '';
				refs.countryList.innerHTML = '';
				return;
			}
			if (countrys.length <= 10) {
				const listMerkup = countrys.map(country => countryListTemplate(country));
				refs.countryList.innerHTML = listMerkup.join('');
				refs.countryInfo.innerHTML = '';
			}
			if (countrys.length === 1) {
				const markup = countrys.map(country =>  countryCardTemplate(country));
				refs.countryInfo.innerHTML = markup.join('');
				refs.countryList.innerHTML = '';				
			}
		})
		.catch(error => {
			Notify.failure(`Oops, there is no country with that name`);
			refs.countryInfo.innerHTML = '';
			refs.countryList.innerHTML = '';
			return error;
		})
}
		
