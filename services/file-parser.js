const English = require('parse-english');
var fs = require('fs');

const exclusionList = [ 
	// exclusions from the requirements
	"a", "the", "and", "of", "in", "be", "also", "as", 
	// additonal exclusions added as a judgement call
	"an", "by", "is", "or"
	]

module.exports.parseSentences = (filepath) => {
	var contents = fs.readFileSync(filepath, 'utf-8');
	const rootNode = new English().parse(contents)
	
	sentences = []
	rootNode.children.forEach((paragraph) => {
		paragraph.children
			.filter((node) => { return node.type == "SentenceNode" })
			.forEach((sentence) => {
				sentences.push({
					index: sentences.length,
					words: sentence.children
						.filter((node) => {
							return node.type == "WordNode"
						})
						.map((word) => {
							return word.children.map((node) => { return node.value}).join()
						})
						.filter((word) => {
							return !exclusionList.includes(word.toLowerCase())
						})
				})
			})
	})
	return sentences
}