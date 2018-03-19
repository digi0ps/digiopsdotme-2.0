import React from "react";
import Axios from "axios";
import TweenLite from "gsap";

class Quote extends React.Component {
  /*
Get's a list of my favourite quotes from FavQs using their API.
To prevent unneccesary calls to the API,  I store the result
in localStorage. So when the component mounts, it first hits
the localStorage and if there aren't any quotes then it makes 
a new request.
*/
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      qotd: null,
    };
  }

  componentDidMount() {
    if (this.state.loaded) return;
    const store = JSON.parse(localStorage.getItem(this.props.storeId));
    if (!store) {
      // The number of seconds in a day
      this.fetchQuotesFromAPI();
    } else {
      const day = 86400000;
      const diff = Date.now() - store.lastChecked;
      if (diff > day) this.fetchQuotesFromAPI();
      else {
        this.setQuote(store.quotes);
      }
    }
  }

  setLocalStorage(q) {
    // q - Array of quotes
    // Returns q

    //localStorage ID
    // adds the current time in milliseconds
    const reduced = q.map(obj => {
      // reduces the query object to
      // {id, query, author}
      return { id: obj.id, quote: obj.body, author: obj.author };
    });
    const obj = Object.assign({}, null, {
      quotes: reduced,
      lastChecked: Date.now(),
    });
    const store = JSON.stringify(obj);
    localStorage.setItem(this.props.storeId, store);
    return reduced;
  }

  setQuote(quotes) {
    // An array of my favourite quotes

    //RandomIntegerGenerator between (0, max)
    const randInt = max => {
      const min = 0;
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    if (!quotes.length) return;
    const n = randInt(quotes.length);
    const quote = quotes[n];
    this.setState({
      loaded: true,
      qotd: quote,
    });
  }

  fetchQuotesFromAPI() {
    // Fetches a list of my favourites from FavQs
    // Returns the promise
    const endpoint = "https://favqs.com/api/quotes/?type=user&filter=digi0ps";
    const key = "97868c8709c3ac6ef7d0ec80a0e4ca4b";
    const headers = {
      "Content-Type": "application/json",
      Authorization: 'Token token="' + key + '"',
    };
    Axios({
      method: "get",
      url: endpoint,
      headers: headers,
    })
      .then(response => response.data)
      .then(favs => {
        if (favs.last_page) return favs.quotes;
      })
      .then(quotes => {
        const q = this.setLocalStorage(quotes);
        this.setQuote(q);
      });
  }

  tween(height) {
    var auth = document.getElementById("auth");
    const translate = "translate(0," + height + "px)";
    const opacity = height ? 0 : 1;
    TweenLite.to(auth, 0.5, { transform: translate, opacity: opacity });
  }

  render() {
    if (!this.state.qotd) {
      return <div />;
    }
    return (
      <div
        title="My favourite quote of the day :)"
        onMouseEnter={this.tween.bind(null, 0)}
        onMouseLeave={this.tween.bind(null, -10)}
      >
        <div className="quote">"{this.state.qotd.quote}"</div>
        <div className="author" id="auth">
          ~{this.state.qotd.author}
        </div>
      </div>
    );
  }
}

export default Quote;
