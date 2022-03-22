function enableScroll(){
    //enable vertical scroll bar
    document.body.style.overflowY = "scroll";
    //scroll to chapters div
    document.getElementById("chapters").scrollIntoView({behavior: 'smooth'});
    createGrid();
}

function createGrid(){
    var colName, rowName, newRow, newCol;
    var insertToRow, pos, styleAttr;
    const appendRow = document.getElementById("chapters");
    pos = 0;
    //creating rows
    for (let y = 0; y < 10; y++){
        //set row name (0 is top)
        rowName = "row"+y;
        //row will be div container for cols
        newRow = document.createElement("div");
        newRow.setAttribute('id', rowName);
        newRow.setAttribute('class', "row");
        //put the new row into "chapters" div
        appendRow.appendChild(newRow);
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
