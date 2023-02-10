export function countryCardTemplate({ flags, name, capital, population, languages }) {
	return `
	<div class="country-info__container">		
		<img class="contry-info__flags" src="${flags.svg}" alt="${name}" width="40"/>
		<h2 class="country-info__name">${name}</h2>
		<p class="country-info__capital">Capital:${capital}</p>
		<p class="country-info__population">Population:${population}</p>
		<p class="country-info__languages">Languages:${languages}</p>
		</div>
		`;
}

export function countryListTemplate({ flags, name }) {
	return `
	<li class="country-list__item">
		<img class="country-list__flags" src="${flags.svg}" alt="${name}"/>
		<h2 class="country-list__name">${name}</h2>
	</li>
		`;
}