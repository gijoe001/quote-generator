const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
// Show Loading Spinners
function showLoadingSpinner() {
   loader.hidden = false;
   quoteText.hidden = true;
   authorText.hidden = true;
};

// Hide Loading Spinner
function removeLoadingSpinner() {
   loader.hidden = true;
   quoteText.hidden = false;
   authorText.hidden = false;
   
}

// Show new quote
function newQuote() {
   showLoadingSpinner();
   // Pick random quote from apiQuotes array
   const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
   //Check if author field is blank and replace it with 'Unknown'
   if (!quote.author){ 
      authorText.textContent = "Unknown"
   } else {
      authorText.textContent = quote.author;
   };
   // Check the quote length to determine the styling 
if (quote.text.length > 150) {
   quoteText.classList.add('long-quote');
} else {
   quoteText.classList.remove('long-quote');
}
// Set Quote, Hide Loader 
   quoteText.textContent = quote.text;
   removeLoadingSpinner();
}
// Get quotes from API
async function getQuotes () {
   showLoadingSpinner();
const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'; 
try {
   const response = await fetch(apiUrl);
   apiQuotes = await response.json();
   console.log(newQuote());
} catch (error) {
    // Catch Error Here
}
};

// Tweet Quote 
function tweetQuote() {
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
   window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getQuotes();
