class App {
    constructor(serverUrl) {
        if (serverUrl) {
            this.serverUrl = serverUrl;
            this.name = "";
            this.species = "";
            this.language = "";
            this.films = [];
            this.otherCharacters = [];
        } 
        else {
            this.initError('App init error! No init url.');
        }
    }   
    getDataFromServer() {
        const { serverUrl } = this;
        const that = this;

        if (serverUrl) {
            fetch(serverUrl).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw new Error('Network response was failed.');
                }
            }).then(person => {
                this.name = person.name;
                let filmsRequest = person.films.map(filmUrl => {
                    return fetch(filmUrl).then(res => res.json());
                });

                Promise.all(filmsRequest).then(function(resFilms) {
                    let titles = resFilms.map(film => {
                       return that.films.push(film.title);    
                    })   
                });
                let speciesRequest = person.species.map(speciesElem => {
                    return fetch(speciesElem).then(res => res.json())
                });

                return Promise.all(speciesRequest);
            })
            .then(function(resultSpecies) {
                let speciesArr = resultSpecies.map(item => {
                    that.species = item.name;
                    that.language = item.language;
            
                    let personsThisSpecies = item.people.map(peopleURL => {
                        return fetch(peopleURL).then(res => res.json());
                    });

                    Promise.all(personsThisSpecies).then(result => {
                        let personArr = result.map(item => {
                            return that.otherCharacters.push(item.name);  
                        });
                        that.render();
                    })
                })
        })
        .catch((error) => {
                this.renderError(error);
            });
        } else {
            this.renderError('No results... Change query and try again.');
        }
    }
    render() {
        let h1 = document.querySelector("h1");
        let language = document.querySelector("p.language");
        let kindSpecies = document.querySelector("p.species");
        let listFilms = document.querySelector("ul.films");
        let listCharacters = document.querySelector("ul.otherCharacters");
        
        h1.textContent = `${this.name} character information`;
        language.textContent = `Language of this kind of species is ${this.language}`;
        kindSpecies.textContent = `Kind of species is ${this.species}`;

        this.films.forEach(film => {
            let li = document.createElement("li");
            li.textContent = `${film}`;
            listFilms.appendChild(li);
        });

         this.otherCharacters.forEach(function(character) {
            let li = document.createElement("li");
            li.textContent = `${character}`;
            listCharacters.appendChild(li);
        })
    }
    renderError(message) {
        let p = Array.from(document.querySelectorAll("main > p"));
        p.forEach(element => {
            element.textContent = "";
        })
        let error = document.querySelector("p.error");
        error.textContent = `${message}`;
    }
}

const newCharacter = new App('http://swapi.co/api/people/6');
newCharacter.getDataFromServer();
