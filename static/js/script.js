const inputElement = document.getElementById("input");
const preview = document.getElementById("preview");

// false here means execute in bubbling phase
inputElement.addEventListener("change",handleFiles,false);

function handleFiles() {
    // Take the files selected by the user and display them in the page if they are images.
    // Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
    const fileList = this.files;
    
    for (let i=0, numFiles=fileList.length; i < numFiles; i++) {
        const file = fileList[i];
        
        // check media type e.g. image/png, text/html
        if (!file.type.startsWith("image/")) { continue; }
        
        // adds <img class="obj"> to preview div
        const img = document.createElement("img");
        img.classList.add('obj');
        // add a file attribute to each img object so that the file 
        // object can be easily retrieved later
        img.file = file;
        preview.appendChild(img);

        // The FileReader object asynchronously reads the file
        // from the user's computer
        const reader = new FileReader();

        // JavaScript closure
        // https://www.w3schools.com/js/js_function_closures.asp
        // A closure is a function having access to the parent scope, even after the parent function has closed.
        // The variable userImage is available even after the self-invoking function has ran.
        // A self-invoking function is an anonymous function that is invoked immediately after its definition e.g.
        // (function () { ... })()
        
        reader.onload = (function (userImage) {
            return function (event) {
                const dataUri = event.target.result;
                userImage.src = dataUri;
            };
        })(img);

        reader.onerror = function(event) {
             console.error("File could not be read! Code " + event.target.error.code);
        };

        // initiate a read and return the file contents as a data URL
        // if file is successfully read, call the onload handler 
        // if file wasn't read for some reason, call the onerror handler 
        reader.readAsDataURL(file);
    }
}