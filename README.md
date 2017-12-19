## Setup

It should be noted that this was developed and tested on a Windows machine. Linux/Mac mileage may vary. 

Ensure you have the latest nodejs installed. This project was built on `8.9.3` and is not guaranteed to work on earlier versions. 

```
node --version
```

Be sure to install node packages **and also run the link command** in order to create symlinks for the CLI commands 

```
npm install
npm link
```

## Usage

Run the tool with the following command

```
analyze test.txt
```

For your convenience, a file test.txt already exists. To test other texts, you can pass a different file to the analyze command. The file should be qualified with the relative path from the directory in which you are running the command. 

## Interpretation of Requirements

### Restricted Words

In the requirements, the following list of words were said to be excluded: `["a", "the", "and", "of", "in", "be", "also", "as"]`

However, in the example expected output which was provided, the first three words were `["all", "alphebetized", "analysis"]`. 

When I ran the analysis against the text, I found `"an"` as the third word. So I took the liberty of adding some additional words to the exlusion list, which can be found in `services/file-parser.js`.

### Displaying whole word vs stem

In the example expected output, I noticed whole words were displayed, like `alphebetized`, instead of just the stem, `alphabet`. For this reason, I put in logic that says if there is only one word found for a given stem, display the whole word. Otherwise, display only the stem. 

### Sentence Indexes

For the purposes of this exercise, I took the requirement of including the `sentence-indexes` to mean, the zero-based index of the sentence if the text is considered an array of sentences. That seems to match the numbers found in the example output. 

For example: 

```
{ 
	"word": "superfunk",
	"occurrences": 3,
	"sentence-indexes": [0, 3]
}
```

The above example would mean there are 3 total occurrences, found across 2 separate sentences. One of the sentences is the first sentence in the text. The other is the fourth sentence in the text. 

There are some limitations to this data structure. For example. It doesn't tell me which sentence is the one with 2 occurrences, where in the sentences the words occur, or the absolute positions of the sentence as a (line, character) coordinate within the text. 

In a real world scenario, I would work with whoever needs this data to clarify the requirements and perhaps come up with a better structure for communicating meaningful information. 

## Frameworks

My first instinct for this was to look for some NLP-related frameworks as this is a very broad topic that has been studied a lot and any implementation I come up with in a single evening would be rudimentary at best. 

I broke the problem up into 2 parts.

1. Break a block of text into distinct sentences in order to keep track of the sentence indexes
2. Determine the stem of a word 

### Parsing Sentences & Words

For this I used the [parse-english](https://github.com/wooorm/parse-english) node package.

Alternatively, I considered just using regex to search for puncutation that generally denotes the end of a sentance, like `['.', '!', '?']`. However, that's pretty primitive and could easily have issues with abbreviations and titles e.g. "Mr. Smith". The framework I found accounts for that by maintaining a list of common english titles and abbreviations. 

### Stemming

For this I used the [stemmer](https://github.com/words/stemmer) node package. 

It took me a while to find it. Even though you provided a hint by using the word `stem` in the requirements, I didn't notice it and was searching by terms like "root words", or "derived words". But eventually I landed on a wikipedia article called [Stemming](https://en.wikipedia.org/wiki/Stemming#Algorithms) and from there I recognized it as the agreed upon word for this concept within NLP and then I was able to search for packages with the right keywords. 

Alternatively, I considered creating a suffix tree data structure, where you map words in the following way

do ____ es
 \_____ ing
  \____ g ____ gy
         \____ house

But as you can see in my example above, this structure finds shared roots between words that are not related. From there I considered creating a list of known suffixes, and creating the tree where the nodes are only broken up by known suffixes. That's similar to one of the solutions in the wikipedia solution, but it's still pretty limited. 



