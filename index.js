function scrollToTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function enableScroll(){
    //enable vertical scroll bar
    document.body.style.overflowY = "scroll";
    //scroll to chapters div
    document.getElementById("chapters").scrollIntoView({behavior: 'smooth'});
    createGrid();
}

function createGrid(){
    var colName, rowName, newRow, newCol, newChapter, chapterName;
    var pos, styleAttr, arrow, buttonLink;
    const appendChapter = document.getElementById("chapters");
    pos = 0;
    for (let w = 0; w < 9; w++){
        //create arrow up
        buttonLink = document.createElement("button");
        buttonLink.setAttribute("id", "titleChapter"+w);
        buttonLink.setAttribute("class", "button");
        buttonLink.setAttribute("onclick", "dropDown('"+"titleChapter"+w+"')");
        arrow = document.createElement("i");
        arrow.setAttribute("class", "arrow-up");
        buttonLink.appendChild(arrow);

        chapterName = "chapter"+w;
        newChapter = document.createElement("div");
        newChapter.setAttribute('id', chapterName);
        newChapter.setAttribute ('class', "chapter");
        newChapter.appendChild(buttonLink);
        buttonLink.appendChild(document.createTextNode(" test"+w));
        //put the new chapter title into "chapters" div
        appendChapter.appendChild(newChapter);
        //creating rows
        for (let y = 0; y < 10; y++){
            //set row name (0 is top)
            rowName = chapterName+"row"+y;
            //row will be div container for cols
            newRow = document.createElement("div");
            newRow.setAttribute('id', rowName);
            newRow.setAttribute('class', "row");
            document.getElementById(chapterName).appendChild(newRow);
            //creating cols in the created row
            for (let x = 0; x < 4; x++){
                //set newCol name
                colName = "col"+x;
                newCol = document.createElement("div")
                newCol.setAttribute("id", colName);
                //Determine position of cols (either left (l), centre-left (c), centre-right (c2), right (r))
                switch(pos){
                    case 0:
                        styleAttr = "l";
                        break;
                    case 1:
                        styleAttr = "c";
                        break;
                    case 2:
                        styleAttr= "c2";
                        break;
                    case 3:
                        styleAttr = "r";
                        break;
                }
                //set class attribute to new col with the pos
                newCol.setAttribute("class", "column "+styleAttr);
                if (x == 0){
                    newCol.appendChild(document.createTextNode(y));
                } else{
                    newCol.appendChild(document.createTextNode("test"));
                }
                //append the new col to the new row
                document.getElementById(rowName).appendChild(newCol);
            }
            pos++;
            //reset orientation back to left if the last column has been appended to the row
            if (pos == 4){
                pos = 0;
            }
        }
    }
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
