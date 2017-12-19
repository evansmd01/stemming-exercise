const fileParser = require("./file-parser")

module.exports.aggregate = (filepath, stemFunction) => {
	const sentenceData = fileParser.parseSentences(filepath)

	var wordAggregations = {}

	sentenceData.forEach((sentence) => {
		sentence.words
			.map((word) => { return word.toLowerCase() })
			.forEach((word) => {
				const stem = stemFunction(word)
				aggregateData = wordAggregations[stem] || { stem: stem, occurances: 0, sentenceIndexes: [], words: [] }

				aggregateData.occurances += 1
				if(!aggregateData.sentenceIndexes.includes(sentence.index)){
					aggregateData.sentenceIndexes.push(sentence.index)
				}
				if(!aggregateData.words.includes(word)) {
					aggregateData.words.push(word)
				}

				wordAggregations[stem] = aggregateData
			})
	})

	return Object.values(wordAggregations)
}