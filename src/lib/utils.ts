
export const  hashtag =(text:string)=>{
    var repl = text.replace(/#(\w+)/g, `<span style="color:blue;">$&</span>`);
    return repl;
}

export const stringToHTML = (str:string) =>{
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};

export const emailPatten = /\S+@\S+\.\S+/;