function scrollToTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function enableScroll(){
    //enable vertical scroll bar
    document.body.style.overflowY = "scroll";
    //scroll to chapters div
    document.getElementById("books").scrollIntoView({behavior: 'smooth'});
    document.getElementById("toChapters").setAttribute("disabled","");
    createGrid();
}

function createGrid(){
    var colName, rowName, newRow, newCol, chapterLink, bookName, newBook;
    var arrow, buttonLink;
    var bookAmt, chapterAmt;

    const chapterData = new XMLHttpRequest();
    chapterData.overrideMimeType("application/json");
    chapterData.open("GET", "chapterDetails.json", true);

    chapterData.onload = function(){
        var data = JSON.parse(this.response);

        bookAmt = Object.keys(data).length;

        /* lessonAmt = Object.keys(data.book_one.chapter_one.lessons).length;
        console.log(lessonAmt); */

        const appendChapter = document.getElementById("books");
        for (let w = 0; w < bookAmt; w++){
            if (w == 0){
                chapterAmt = Object.keys(data.book_one.chapters).length;
            } else {
                chapterAmt = Object.keys(data.book_two.chapters).length;
            }
            //create arrow up
            buttonLink = document.createElement("button");
            buttonLink.setAttribute("id", "titleBook"+(w+1));
            buttonLink.setAttribute("class", "button");
            buttonLink.setAttribute("onclick", "dropDown('"+"titleBook"+(w+1)+"')");
            arrow = document.createElement("i");
            arrow.setAttribute("class", "arrow-up");
            buttonLink.appendChild(arrow);

            bookName = "book"+(w+1);
            newBook = document.createElement("div");
            newBook.setAttribute('id', bookName);
            newBook.setAttribute ('class', "book");
            newBook.appendChild(buttonLink);
            buttonLink.appendChild(document.createTextNode(" "+bookName));
            //put the new book title into "books" div
            appendChapter.appendChild(newBook);
            //creating rows
            for (let y = 0; y < chapterAmt; y++){
                //set row name (0 is top)
                rowName = bookName+"row"+y;
                //row will be div container for cols
                newRow = document.createElement("div");
                newRow.setAttribute('id', rowName);
                newRow.setAttribute('class', "row");
                document.getElementById(bookName).appendChild(newRow);
                //creating cols in the created row
                for (let x = 0; x < 3; x++){
                    //set newCol name
                    colName = "col"+x;
                    newCol = document.createElement("div")
                    newCol.setAttribute("id", colName);
                    //set class attribute to new col with the pos
                    newCol.setAttribute("class", "column");
                    if (w == 0){
                        if (x == 0)
                            newCol.appendChild(document.createTextNode(data.book_one.chapters[y].title));
                        else if (x==1){
                            newCol.appendChild(document.createTextNode(data.book_one.chapters[y].desc));
                        } else{
                            chapterLink = document.createElement("a");
                            chapterLink.setAttribute("href", "chapters/chapters.html");
                            newChapter = document.createElement("button");
                            newChapter.appendChild(document.createTextNode("Click here to access the chapter"));
                            newChapter.setAttribute("class", "button");
                            chapterLink.appendChild(newChapter);
                            //localStorage to get user selected chapter on chapters.html
                            localStorage.setItem(bookName+data.book_one.chapters[y].title, "book one "+y);
                            console.log(localStorage.getItem(bookName+data.book_one.chapters[y].title));
                            newCol.appendChild(chapterLink);
                        }
                    }
                    else {
                        if (x == 0)
                            newCol.appendChild(document.createTextNode(data.book_two.chapters[y].title));
                        else if(x==1){
                            newCol.appendChild(document.createTextNode(data.book_two.chapters[y].desc));
                        }
                        else{
                            chapterLink = document.createElement("a");
                            chapterLink.setAttribute("href", "chapters/chapters.html");
                            newChapter = document.createElement("button");
                            newChapter.appendChild(document.createTextNode("Click here to access the chapter"));
                            newChapter.setAttribute("class", "button");
                            chapterLink.appendChild(newChapter);
                            //localStorage to get user selected chapter on chapters.html
                            localStorage.setItem(bookName+data.book_one.chapters[y].title, "book two "+y);
                            console.log(localStorage.getItem(bookName+data.book_two.chapters[y].title));
                            newCol.appendChild(chapterLink);
                        }
                    }
                    //append the new col to the new row
                    document.getElementById(rowName).appendChild(newCol);
                }
            }
        }
    }

    chapterData.send();
}

function dropDown(element){
    //get parent element from button
    let parent = document.getElementById(element).parentElement;
    //check if the list is hidden; if it isn't, hide it, otherwise show it (duh)
    if (parent.childNodes[1].style.display == "block"){
        //go through all the rows and hide them
        for (let x = 1; x < parent.childNodes.length; x++){
            //transistion();
            parent.childNodes[x].style.display = "none";
        }
        //change arrow to down
        document.getElementById(element).childNodes[0].className = "arrow-up";
    }
    else{
        //go through all the rows and show them
        for (let x = 1; x < parent.childNodes.length; x++){
            //transistion();
            parent.childNodes[x].style.display = "block";
        }
        //change arrow to up
        document.getElementById(element).childNodes[0].className = "arrow-down";
    }
}

function transistion(){
    ;//will add some fade animation for dropdown lists
}

window.onload = function(){
    var load = performance.getEntriesByType("navigation")[0].type;
    if (load == "reload"){
        scrollToTop();
    } else if (load == "back_forward"){
        scrollToTop();
    }
}
