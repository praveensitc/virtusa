//Listener Component
const processOutput = () => {
	let input1 = document.getElementById("string1").value;
	let input2 = document.getElementById("string2").value;

  	document.getElementById("output1").value = getExpectedResult(input1,input2);
	document.getElementById("output2").value = getExpectedResult(input2,input1);

}

//Resuable Component for string comparission
const getExpectedResult = (str1,str2) => {
	var output = "";
	for (let i = 0; i < str1.length; i++) {
		if(str2.indexOf(str1.charAt(i)) == -1){			
			output += str1.charAt(i);
		}
		
	}
	return output;
}

//API fetch
const getApiCall = () =>{
	let id = document.getElementById("searchID").value;
	var url = "https://reqres.in/api/users/";
	if(id != ""){
		url += id;
	}
	
	fetch(url)
	.then(response => {
		const contentType = response.headers.get('content-type');
		if (!contentType || !contentType.includes('application/json')) {
			throw new TypeError("Unable to fetch the JSON records.");
		}
		return response.json();
	})
	.then(data => {		
		var str = "";		
		if(Array.isArray(data["data"])){
			data["data"].map((value, index)=>{
				//console.log(value["email"]);
				str +="<p>"+value["email"]+"</p>";
			});
		}
		else{
			if(JSON.stringify(data) === '{}')			
				str +="<p>Data not found.</p>";
			else
				str +="<p>"+data["data"].email+"</p>";
		}
		document.getElementById('listRecords').innerHTML = str;
		
	})
	.catch(error => console.error(error));
}

document.getElementById("process").addEventListener("click", processOutput);
document.getElementById("fetchRecords").addEventListener("click", getApiCall);