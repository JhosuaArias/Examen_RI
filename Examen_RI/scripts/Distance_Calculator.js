
/**Hamming Distance**/
function computeHammingDistance(string1, string2) {
	var string1Length = string1.length;
    var string2Length = string2.length;

    if(string1Length < string2Length) {
        string1 = fillStringWithEmptyChar(string1,string2Length-string1Length);
    }else{
        if(string1Length > string2Length) {
        	string2 = fillStringWithEmptyChar(string2,string1Length-string2Length);
        }
    }

    return compareStringsHammingDistance(string1,string2);	
}

function  fillStringWithEmptyChar(string, emptyCharNumber){
	var array = [string];
        for (let i = 1; i <= emptyCharNumber; i++) {
            array[i] = String.fromCharCode(0);
        }
        return array.join("");
}

function compareStringsHammingDistance(string1, string2){
    var hammingDistance = 0; // Zero means that both string are equal.

    for (let i = 0; i < string1.length ; i++) {
        if(string1.charAt(i) != string2.charAt(i)) {
            hammingDistance++;
        }
    }
    return hammingDistance;
}

/**Levenshtein Distance**/
function computeLevenshteinDistance(string1, string2, stepByStep){
	var X = string1.length;
    var Y = string2.length;
    var distance = new Array(X+1);
    for (i=0; i < X+1; i++)
    	distance[i] = new Array(Y+1);

    var cost;

    for (let i = 0; i <= X; i++) {
        distance[i][0] = i;
    }
    for (let j = 0; j <= Y; j++) {
        distance[0][j] = j;
    }

    for (let i = 1; i <= X; i++) {
        for (let j = 1; j <= Y; j++) {

            cost = (string1.charAt(i-1) == string2.charAt(j-1))? 0 : 1;

            distance[i][j] = min(
            	distance[i-1][j] + 1,       // Deletion
                distance[i][j-1] + 1,       // Insertion
                distance[i-1][j-1] + cost); // Substitution

        }
    }

    return distance[X][Y];
}

function min(n1, n2, n3) {
	if (n1 < n2 && n1 < n3)
            return n1;

    if (n2 < n1 && n2 < n3)
        return n2;

    return n3;
}

/**Bigrams Distance**/
function computeBigramsDistance(string1, string2) {
	var uniqueBigramsString1 = getUniqueBigrams(string1);
	var uniqueBigramsString2 = getUniqueBigrams(string2);

	console.log(uniqueBigramsString1);
	console.log(uniqueBigramsString2);

	var commomBigramsCounter = compareBigrams(Array.from(uniqueBigramsString1), Array.from(uniqueBigramsString2));

	return computeBigramsDistanceFormula(commomBigramsCounter, uniqueBigramsString1.size, uniqueBigramsString2.size);
}

function getUniqueBigrams(string){
	var uniqueBigrams = new Set();

	var currentBigram;
	 for (let i = 0; i < string.length-1 ; i++) {
        currentBigram = string.substring(i,i+2);
        uniqueBigrams.add(currentBigram);
    }
    return uniqueBigrams;

}

function compareBigrams(uniqueBigramsString1, uniqueBigramsString2) {
	var commonBigramsCounter = 0;
		console.log(uniqueBigramsString1);
        for (let bigram of uniqueBigramsString1) {
            if(uniqueBigramsString2.includes(bigram)){
                commonBigramsCounter++;
            }
        }
    return commonBigramsCounter;
}

function computeBigramsDistanceFormula(commonBigramsAB, uniqueBigramsA, uniqueBigramsB) {
	return ((2.0*commonBigramsAB)/(uniqueBigramsA+uniqueBigramsB));
}


function pressButtonCalcular(){
    /**Getting all components**/
    var component_word1 = document.getElementById("inword1");
    var component_word2 = document.getElementById("inword2");

    var component_Palabra1 = document.getElementById("word1"); 
    var component_Palabra2 = document.getElementById("word2");

    var component_hamming_distance = document.getElementById("hamming_distance");
    var component_levenshtein_distance = document.getElementById("levenshtein_distance");
    var component_bigrams_distance = document.getElementById("bigrams_distance");

    var component_hamming_time = document.getElementById("hamming_time");
    var component_levenshtein_time = document.getElementById("levenshtein_time");
    var component_bigrams_time = document.getElementById("bigrams_time");


       /**Setting words in the HTML document**/
    var word1_text = component_word1.value;
    var word2_text = component_word2.value;

    component_Palabra1.innerHTML = word1_text;
    component_Palabra2.innerHTML = word2_text;

        /**Making LowerCase the words**/
    word1_text = word1_text.toLowerCase();
    word2_text = word2_text.toLowerCase();

       /**Making distance and time vars**/
    var hamming_distance;
    var levenshtein_distance;
    var bigrams_distance;

    /** Computing distances here **/
    var performance = window.performance;

    const hamming_start_time = performance.now();
    hamming_distance = computeHammingDistance(word1_text, word2_text);
    const hamming_end_time = performance.now();

    const levenshtein_start_time = performance.now();
    levenshtein_distance = computeLevenshteinDistance(word1_text, word2_text,true);
    const levenshtein_end_time = performance.now();

    const bigrams_start_time = performance.now();
    bigrams_distance = computeBigramsDistance(word1_text, word2_text);
    const bigrams_end_time = performance.now();

    /**Setting values in HTML document**/
    console.log(hamming_end_time - hamming_start_time);
    console.log(levenshtein_end_time - levenshtein_start_time);
    console.log(bigrams_end_time - bigrams_start_time);

    component_hamming_distance.innerHTML = hamming_distance;
    component_levenshtein_distance.innerHTML = levenshtein_distance;
    component_bigrams_distance.innerHTML = bigrams_distance;
}