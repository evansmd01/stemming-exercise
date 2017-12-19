#!/usr/bin/env node
const stemmer = require('stemmer');
const program = require('commander');
const aggregator = require('./services/stem-aggregator')


function printResults(results, includeWords) {
	const displayObject = {
		results: results
		.sort((r1,r2) => { return r1.stem === r2.stem ? 0 : r1.stem > r2.stem ? 1 : -1 })
		.map((result) => {
			var item = {
				word: result.words.length > 1 ? result.stem : result.words[0],
				"total-occurances": result.occurances,
				"sentence-indexes": result.sentenceIndexes
			}
			if (includeWords) {
				item.words = result.words
			}
			return item
		})
	}
	console.log(JSON.stringify(displayObject, null, '  '))
}

program
  .command('<file-path>', 'uses the stemmer package, based on the Porter algorithm, to analyze text for unique root words')
  .option('-w, --with-words', 'add the array of matching words to each result')
  .action((file, options) => {
    const results = aggregator.aggregate(file, stemmer)
    printResults(results, options.withWords)
  })

program.parse(process.argv);